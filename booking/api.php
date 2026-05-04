<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'config.php';

// Получаем запрос
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// CORS headers для AJAX запросов - ограничено только taxco.uz
$allowed_origins = ['https://taxco.uz', 'https://www.taxco.uz'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: https://taxco.uz');
}
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

try {
    switch ($action) {
        case 'get_available_slots':
            $date = $_GET['date'] ?? date('Y-m-d');
            $slots = getAvailableSlots($date);
            echo json_encode(['success' => true, 'slots' => $slots]);
            break;
            
        case 'create_booking':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed');
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Валидация
            if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || 
                empty($data['date']) || empty($data['time'])) {
                throw new Exception('All fields are required');
            }
            
            // Проверяем email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Invalid email address');
            }
            
            // Проверяем, свободен ли слот
            $db = new SQLite3(DB_FILE);
            $stmt = $db->prepare('SELECT id FROM bookings WHERE booking_date = ? AND booking_time = ? AND status = "confirmed"');
            $stmt->bindValue(1, $data['date'], SQLITE3_TEXT);
            $stmt->bindValue(2, $data['time'], SQLITE3_TEXT);
            $result = $stmt->execute();
            
            if ($result->fetchArray()) {
                throw new Exception('This time slot is already booked');
            }
            
            // Создаём бронирование
            $bookingId = generateBookingId();
            $stmt = $db->prepare('INSERT INTO bookings (booking_id, client_name, client_email, client_phone, booking_date, booking_time, language, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->bindValue(1, $bookingId, SQLITE3_TEXT);
            $stmt->bindValue(2, $data['name'], SQLITE3_TEXT);
            $stmt->bindValue(3, $data['email'], SQLITE3_TEXT);
            $stmt->bindValue(4, $data['phone'], SQLITE3_TEXT);
            $stmt->bindValue(5, $data['date'], SQLITE3_TEXT);
            $stmt->bindValue(6, $data['time'], SQLITE3_TEXT);
            $stmt->bindValue(7, $data['language'] ?? 'ru', SQLITE3_TEXT);
            $stmt->bindValue(8, $data['notes'] ?? '', SQLITE3_TEXT);
            
            if (!$stmt->execute()) {
                throw new Exception('Failed to create booking');
            }
            
            $db->close();
            
            // Отправляем email уведомления
            sendBookingEmails($bookingId, $data);
            
            echo json_encode([
                'success' => true,
                'booking_id' => $bookingId,
                'message' => 'Booking created successfully'
            ]);
            break;
            
        case 'get_booking':
            $bookingId = $_GET['booking_id'] ?? '';
            if (empty($bookingId)) {
                throw new Exception('Booking ID required');
            }
            
            $db = new SQLite3(DB_FILE);
            $stmt = $db->prepare('SELECT * FROM bookings WHERE booking_id = ?');
            $stmt->bindValue(1, $bookingId, SQLITE3_TEXT);
            $result = $stmt->execute();
            $booking = $result->fetchArray(SQLITE3_ASSOC);
            $db->close();
            
            if (!$booking) {
                throw new Exception('Booking not found');
            }
            
            echo json_encode(['success' => true, 'booking' => $booking]);
            break;
            
        case 'cancel_booking':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed');
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            $bookingId = $data['booking_id'] ?? '';
            
            if (empty($bookingId)) {
                throw new Exception('Booking ID required');
            }
            
            $db = new SQLite3(DB_FILE);
            $stmt = $db->prepare('UPDATE bookings SET status = "cancelled", updated_at = CURRENT_TIMESTAMP WHERE booking_id = ?');
            $stmt->bindValue(1, $bookingId, SQLITE3_TEXT);
            
            if (!$stmt->execute()) {
                throw new Exception('Failed to cancel booking');
            }
            
            $db->close();
            
            // Отправляем email об отмене
            sendCancellationEmail($bookingId);
            
            echo json_encode(['success' => true, 'message' => 'Booking cancelled']);
            break;
            
        case 'reschedule_booking':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed');
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            $bookingId = $data['booking_id'] ?? '';
            $newDate = $data['new_date'] ?? '';
            $newTime = $data['new_time'] ?? '';
            
            if (empty($bookingId) || empty($newDate) || empty($newTime)) {
                throw new Exception('All fields required');
            }
            
            // Проверяем, свободен ли новый слот
            $db = new SQLite3(DB_FILE);
            $stmt = $db->prepare('SELECT id FROM bookings WHERE booking_date = ? AND booking_time = ? AND status = "confirmed" AND booking_id != ?');
            $stmt->bindValue(1, $newDate, SQLITE3_TEXT);
            $stmt->bindValue(2, $newTime, SQLITE3_TEXT);
            $stmt->bindValue(3, $bookingId, SQLITE3_TEXT);
            $result = $stmt->execute();
            
            if ($result->fetchArray()) {
                throw new Exception('New time slot is already booked');
            }
            
            // Обновляем бронирование
            $stmt = $db->prepare('UPDATE bookings SET booking_date = ?, booking_time = ?, updated_at = CURRENT_TIMESTAMP WHERE booking_id = ?');
            $stmt->bindValue(1, $newDate, SQLITE3_TEXT);
            $stmt->bindValue(2, $newTime, SQLITE3_TEXT);
            $stmt->bindValue(3, $bookingId, SQLITE3_TEXT);
            
            if (!$stmt->execute()) {
                throw new Exception('Failed to reschedule booking');
            }
            
            $db->close();
            
            // Отправляем email о переносе
            sendRescheduleEmail($bookingId, $newDate, $newTime);
            
            echo json_encode(['success' => true, 'message' => 'Booking rescheduled']);
            break;
        
        // Endpoint для скачивания ICS файла
        case 'get_ics':
            $bookingId = $_GET['booking_id'] ?? '';
            if (empty($bookingId)) {
                throw new Exception('Booking ID required');
            }
            
            $db = new SQLite3(DB_FILE);
            $stmt = $db->prepare('SELECT * FROM bookings WHERE booking_id = ?');
            $stmt->bindValue(1, $bookingId, SQLITE3_TEXT);
            $result = $stmt->execute();
            $booking = $result->fetchArray(SQLITE3_ASSOC);
            $db->close();
            
            if (!$booking) {
                throw new Exception('Booking not found');
            }
            
            $ics = generateICSFile($booking);
            
            header('Content-Type: text/calendar; charset=utf-8');
            header('Content-Disposition: attachment; filename="taxconsensus-booking-' . $bookingId . '.ics"');
            echo $ics;
            exit;
            
        default:
            throw new Exception('Invalid action');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

// Функция генерации ICS файла для календаря
function generateICSFile($booking) {
    $date = $booking['booking_date'];
    $time = $booking['booking_time'];
    $clientName = $booking['client_name'];
    $bookingId = $booking['booking_id'];
    
    // Время начала и конца (1 час консультация)
    $startDateTime = new DateTime($date . ' ' . $time, new DateTimeZone('Asia/Tashkent'));
    $endDateTime = clone $startDateTime;
    $endDateTime->add(new DateInterval('PT1H'));
    
    // Форматируем для ICS (UTC)
    $startDateTime->setTimezone(new DateTimeZone('UTC'));
    $endDateTime->setTimezone(new DateTimeZone('UTC'));
    
    $dtStart = $startDateTime->format('Ymd\THis\Z');
    $dtEnd = $endDateTime->format('Ymd\THis\Z');
    $dtStamp = gmdate('Ymd\THis\Z');
    
    $summary = "Консультация TAX CONSENSUS";
    $description = "Налоговая консультация\\nКлиент: {$clientName}\\nНомер записи: {$bookingId}\\nТелефон: {$booking['client_phone']}";
    $location = "Квартира 22, дом 44, Киёт-5, Ташкент, Узбекистан";
    
    $ics = "BEGIN:VCALENDAR\r\n";
    $ics .= "VERSION:2.0\r\n";
    $ics .= "PRODID:-//TAX CONSENSUS//Booking System//EN\r\n";
    $ics .= "CALSCALE:GREGORIAN\r\n";
    $ics .= "METHOD:REQUEST\r\n";
    $ics .= "BEGIN:VEVENT\r\n";
    $ics .= "UID:{$bookingId}@taxco.uz\r\n";
    $ics .= "DTSTAMP:{$dtStamp}\r\n";
    $ics .= "DTSTART:{$dtStart}\r\n";
    $ics .= "DTEND:{$dtEnd}\r\n";
    $ics .= "SUMMARY:{$summary}\r\n";
    $ics .= "DESCRIPTION:{$description}\r\n";
    $ics .= "LOCATION:{$location}\r\n";
    $ics .= "STATUS:CONFIRMED\r\n";
    $ics .= "ORGANIZER;CN=TAX CONSENSUS:mailto:info@taxco.uz\r\n";
    $ics .= "BEGIN:VALARM\r\n";
    $ics .= "TRIGGER:-PT1H\r\n";
    $ics .= "ACTION:DISPLAY\r\n";
    $ics .= "DESCRIPTION:Напоминание: Консультация TAX CONSENSUS через 1 час\r\n";
    $ics .= "END:VALARM\r\n";
    $ics .= "BEGIN:VALARM\r\n";
    $ics .= "TRIGGER:-PT1D\r\n";
    $ics .= "ACTION:DISPLAY\r\n";
    $ics .= "DESCRIPTION:Напоминание: Консультация TAX CONSENSUS завтра\r\n";
    $ics .= "END:VALARM\r\n";
    $ics .= "END:VEVENT\r\n";
    $ics .= "END:VCALENDAR\r\n";
    
    return $ics;
}

// Функция генерации ссылок для добавления в календарь
function generateCalendarLinks($booking) {
    $date = $booking['booking_date'];
    $time = $booking['booking_time'];
    $clientName = $booking['client_name'];
    $bookingId = $booking['booking_id'];
    
    // Время начала и конца
    $startDateTime = new DateTime($date . ' ' . $time, new DateTimeZone('Asia/Tashkent'));
    $endDateTime = clone $startDateTime;
    $endDateTime->add(new DateInterval('PT1H'));
    
    $title = urlencode("Консультация TAX CONSENSUS");
    $description = urlencode("Налоговая консультация\nКлиент: {$clientName}\nНомер записи: {$bookingId}\nТелефон: {$booking['client_phone']}");
    $location = urlencode("Квартира 22, дом 44, Киёт-5, Ташкент, Узбекистан");
    
    // Google Calendar
    $googleStart = $startDateTime->format('Ymd\THis');
    $googleEnd = $endDateTime->format('Ymd\THis');
    $googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
        . "&text={$title}"
        . "&dates={$googleStart}/{$googleEnd}"
        . "&ctz=Asia/Tashkent"
        . "&details={$description}"
        . "&location={$location}";
    
    // Outlook/Office 365
    $outlookStart = $startDateTime->format('Y-m-d\TH:i:s');
    $outlookEnd = $endDateTime->format('Y-m-d\TH:i:s');
    $outlookUrl = "https://outlook.live.com/calendar/0/deeplink/compose?"
        . "subject={$title}"
        . "&startdt={$outlookStart}"
        . "&enddt={$outlookEnd}"
        . "&body={$description}"
        . "&location={$location}";
    
    // Yahoo Calendar
    $yahooStart = $startDateTime->format('Ymd\THis\Z');
    $yahooDuration = "0100"; // 1 hour
    $yahooUrl = "https://calendar.yahoo.com/?v=60"
        . "&title={$title}"
        . "&st={$yahooStart}"
        . "&dur={$yahooDuration}"
        . "&desc={$description}"
        . "&in_loc={$location}";
    
    // ICS файл (для Apple Calendar и других)
    $icsUrl = "https://taxco.uz/booking/api.php?action=get_ics&booking_id={$bookingId}";
    
    return [
        'google' => $googleUrl,
        'outlook' => $outlookUrl,
        'yahoo' => $yahooUrl,
        'ics' => $icsUrl
    ];
}

// Функция отправки email уведомлений
function sendBookingEmails($bookingId, $data) {
    $db = new SQLite3(DB_FILE);
    $stmt = $db->prepare('SELECT * FROM bookings WHERE booking_id = ?');
    $stmt->bindValue(1, $bookingId, SQLITE3_TEXT);
    $result = $stmt->execute();
    $booking = $result->fetchArray(SQLITE3_ASSOC);
    $db->close();
    
    if (!$booking) return;
    
    $lang = $booking['language'];
    $calendarLinks = generateCalendarLinks($booking);
    
    // Тексты на разных языках
    $translations = [
        'ru' => [
            'subject_client' => 'Подтверждение записи - TAX CONSENSUS',
            'subject_admin' => 'Новая запись на консультацию',
            'greeting' => 'Здравствуйте',
            'confirmation' => 'Ваша запись на консультацию подтверждена!',
            'details' => 'Детали записи:',
            'date' => 'Дата',
            'time' => 'Время',
            'phone' => 'Телефон',
            'booking_id' => 'Номер записи',
            'manage' => 'Управление записью',
            'cancel_link' => 'Для отмены или переноса записи используйте ссылку',
            'address' => 'Адрес: Квартира 22, дом 44, Киёт-5, город Ташкент, 100017',
            'thanks' => 'Спасибо за обращение!',
            'team' => 'С уважением, команда TAX CONSENSUS',
            'add_calendar' => 'Добавить в календарь',
            'google_calendar' => 'Google Calendar',
            'apple_calendar' => 'Apple/iCal',
            'outlook' => 'Outlook'
        ],
        'uz' => [
            'subject_client' => 'Yozuvni tasdiqlash - TAX CONSENSUS',
            'subject_admin' => 'Konsultatsiyaga yangi yozuv',
            'greeting' => 'Assalomu alaykum',
            'confirmation' => 'Konsultatsiyaga yozuvingiz tasdiqlandi!',
            'details' => 'Yozuv tafsilotlari:',
            'date' => 'Sana',
            'time' => 'Vaqt',
            'phone' => 'Telefon',
            'booking_id' => 'Yozuv raqami',
            'manage' => 'Yozuvni boshqarish',
            'cancel_link' => 'Yozuvni bekor qilish yoki ko\'chirish uchun havoladan foydalaning',
            'address' => 'Manzil: 22-xonadon, 44-uy, Qiyot-5, Toshkent, 100017',
            'thanks' => 'Murojaat qilganingiz uchun rahmat!',
            'team' => 'Hurmat bilan, TAX CONSENSUS jamoasi',
            'add_calendar' => 'Taqvimga qo\'shish',
            'google_calendar' => 'Google Calendar',
            'apple_calendar' => 'Apple/iCal',
            'outlook' => 'Outlook'
        ],
        'en' => [
            'subject_client' => 'Appointment Confirmation - TAX CONSENSUS',
            'subject_admin' => 'New consultation appointment',
            'greeting' => 'Hello',
            'confirmation' => 'Your consultation appointment is confirmed!',
            'details' => 'Appointment details:',
            'date' => 'Date',
            'time' => 'Time',
            'phone' => 'Phone',
            'booking_id' => 'Booking ID',
            'manage' => 'Manage appointment',
            'cancel_link' => 'To cancel or reschedule, use this link',
            'address' => 'Address: Apartment 22, Building 44, Kiyot-5, Tashkent, 100017',
            'thanks' => 'Thank you for contacting us!',
            'team' => 'Best regards, TAX CONSENSUS team',
            'add_calendar' => 'Add to Calendar',
            'google_calendar' => 'Google Calendar',
            'apple_calendar' => 'Apple/iCal',
            'outlook' => 'Outlook'
        ]
    ];
    
    $t = $translations[$lang];
    $manageUrl = 'https://taxco.uz/booking/manage.html?id=' . $bookingId;
    
    // Форматируем дату для отображения
    $dateObj = new DateTime($booking['booking_date']);
    $formattedDate = $dateObj->format('d.m.Y');
    $timeFormatted = substr($booking['booking_time'], 0, 5);
    
    // Email клиенту
    $clientSubject = $t['subject_client'];
    $clientMessage = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;'>
        <div style='background: #2c5282; color: white; padding: 20px; text-align: center;'>
            <h1 style='margin: 0; font-size: 24px;'>TAX CONSENSUS</h1>
        </div>
        
        <div style='padding: 30px;'>
            <h2 style='color: #2c5282;'>{$t['greeting']}, {$booking['client_name']}!</h2>
            <p style='font-size: 18px;'><strong>✅ {$t['confirmation']}</strong></p>
            
            <div style='background: #f7fafc; padding: 20px; border-left: 4px solid #2c5282; margin: 20px 0; border-radius: 4px;'>
                <h3 style='margin-top: 0; color: #2c5282;'>📋 {$t['details']}</h3>
                <p style='margin: 8px 0;'><strong>📅 {$t['date']}:</strong> {$formattedDate}</p>
                <p style='margin: 8px 0;'><strong>🕐 {$t['time']}:</strong> {$timeFormatted}</p>
                <p style='margin: 8px 0;'><strong>📞 {$t['phone']}:</strong> {$booking['client_phone']}</p>
                <p style='margin: 8px 0;'><strong>🔖 {$t['booking_id']}:</strong> {$bookingId}</p>
            </div>
            
            <p>📍 {$t['address']}</p>
            
            <!-- Кнопки добавления в календарь -->
            <div style='background: #edf2f7; padding: 20px; border-radius: 8px; margin: 25px 0;'>
                <h4 style='margin-top: 0; color: #2c5282;'>📅 {$t['add_calendar']}</h4>
                <p style='margin-bottom: 15px; font-size: 14px; color: #666;'>Нажмите, чтобы добавить напоминание:</p>
                <table cellpadding='0' cellspacing='0' border='0'>
                    <tr>
                        <td style='padding-right: 10px; padding-bottom: 10px;'>
                            <a href='{$calendarLinks['google']}' target='_blank' style='display: inline-block; padding: 12px 20px; background: #4285f4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                📱 {$t['google_calendar']}
                            </a>
                        </td>
                        <td style='padding-right: 10px; padding-bottom: 10px;'>
                            <a href='{$calendarLinks['ics']}' style='display: inline-block; padding: 12px 20px; background: #333; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                🍎 {$t['apple_calendar']}
                            </a>
                        </td>
                        <td style='padding-bottom: 10px;'>
                            <a href='{$calendarLinks['outlook']}' target='_blank' style='display: inline-block; padding: 12px 20px; background: #0078d4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                📧 {$t['outlook']}
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style='margin: 30px 0;'>
                <h4 style='color: #2c5282;'>⚙️ {$t['manage']}</h4>
                <p>{$t['cancel_link']}:</p>
                <a href='{$manageUrl}' style='display: inline-block; padding: 14px 28px; background: #2c5282; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;'>Управление записью / Manage Booking</a>
            </div>
            
            <p>{$t['thanks']}</p>
            <p>{$t['team']}</p>
        </div>
        
        <div style='background: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;'>
            <p style='font-size: 12px; color: #718096; margin: 0;'>
                TAX CONSENSUS<br>
                📞 +998 90 970 01 75<br>
                📧 info@taxco.uz<br>
                🌐 <a href='https://taxco.uz' style='color: #2c5282;'>taxco.uz</a>
            </p>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: TAX CONSENSUS <info@taxco.uz>\r\n";
    $headers .= "Reply-To: info@taxco.uz\r\n";
    
    mail($booking['client_email'], $clientSubject, $clientMessage, $headers);
    
    // Email администратору
    $adminSubject = "📅 Новая запись: {$formattedDate} в {$timeFormatted} - {$booking['client_name']}";
    $adminMessage = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;'>
        <div style='background: #2c5282; color: white; padding: 20px; text-align: center;'>
            <h1 style='margin: 0; font-size: 24px;'>📅 Новая запись на консультацию</h1>
        </div>
        
        <div style='padding: 30px;'>
            <div style='background: #f7fafc; padding: 20px; border-left: 4px solid #2c5282; margin: 20px 0; border-radius: 4px;'>
                <p style='margin: 8px 0;'><strong>👤 Клиент:</strong> {$booking['client_name']}</p>
                <p style='margin: 8px 0;'><strong>📧 Email:</strong> <a href='mailto:{$booking['client_email']}'>{$booking['client_email']}</a></p>
                <p style='margin: 8px 0;'><strong>📞 Телефон:</strong> <a href='tel:{$booking['client_phone']}'>{$booking['client_phone']}</a></p>
                <p style='margin: 8px 0;'><strong>📅 Дата:</strong> {$formattedDate}</p>
                <p style='margin: 8px 0;'><strong>🕐 Время:</strong> {$timeFormatted}</p>
                <p style='margin: 8px 0;'><strong>🌐 Язык:</strong> {$lang}</p>
                <p style='margin: 8px 0;'><strong>🔖 Номер записи:</strong> {$bookingId}</p>
                " . (!empty($booking['notes']) ? "<p style='margin: 8px 0;'><strong>📝 Примечания:</strong> {$booking['notes']}</p>" : "") . "
            </div>
            
            <!-- Кнопки добавления в календарь для админа -->
            <div style='background: #edf2f7; padding: 20px; border-radius: 8px; margin: 25px 0;'>
                <h4 style='margin-top: 0; color: #2c5282;'>📅 Добавить в календарь</h4>
                <table cellpadding='0' cellspacing='0' border='0'>
                    <tr>
                        <td style='padding-right: 10px; padding-bottom: 10px;'>
                            <a href='{$calendarLinks['google']}' target='_blank' style='display: inline-block; padding: 12px 20px; background: #4285f4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                📱 Google Calendar
                            </a>
                        </td>
                        <td style='padding-right: 10px; padding-bottom: 10px;'>
                            <a href='{$calendarLinks['ics']}' style='display: inline-block; padding: 12px 20px; background: #333; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                🍎 Apple/iCal
                            </a>
                        </td>
                        <td style='padding-bottom: 10px;'>
                            <a href='{$calendarLinks['outlook']}' target='_blank' style='display: inline-block; padding: 12px 20px; background: #0078d4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                📧 Outlook
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            
            <p><a href='{$manageUrl}' style='color: #2c5282;'>Посмотреть детали записи →</a></p>
        </div>
    </body>
    </html>
    ";
    
    // Отправляем всем админам
    $adminEmails = explode(',', ADMIN_EMAILS);
    foreach ($adminEmails as $adminEmail) {
        mail(trim($adminEmail), $adminSubject, $adminMessage, $headers);
    }
}

function sendCancellationEmail($bookingId) {
    $db = new SQLite3(DB_FILE);
    $stmt = $db->prepare('SELECT * FROM bookings WHERE booking_id = ?');
    $stmt->bindValue(1, $bookingId, SQLITE3_TEXT);
    $result = $stmt->execute();
    $booking = $result->fetchArray(SQLITE3_ASSOC);
    $db->close();
    
    if (!$booking) return;
    
    $dateObj = new DateTime($booking['booking_date']);
    $formattedDate = $dateObj->format('d.m.Y');
    $timeFormatted = substr($booking['booking_time'], 0, 5);
    
    $subject = "❌ Отмена записи - TAX CONSENSUS";
    $message = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;'>
        <div style='background: #e53e3e; color: white; padding: 20px; text-align: center;'>
            <h1 style='margin: 0; font-size: 24px;'>❌ Запись отменена</h1>
        </div>
        
        <div style='padding: 30px;'>
            <p>Ваша запись на <strong>{$formattedDate}</strong> в <strong>{$timeFormatted}</strong> была отменена.</p>
            <p>Если вы хотите записаться на другое время, посетите <a href='https://taxco.uz/booking.html' style='color: #2c5282;'>наш сайт</a>.</p>
            <p>С уважением,<br>TAX CONSENSUS</p>
        </div>
        
        <div style='background: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;'>
            <p style='font-size: 12px; color: #718096; margin: 0;'>
                TAX CONSENSUS | 📞 +998 90 970 01 75 | 🌐 taxco.uz
            </p>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: TAX CONSENSUS <info@taxco.uz>\r\n";
    $headers .= "Reply-To: info@taxco.uz\r\n";
    
    mail($booking['client_email'], $subject, $message, $headers);
    
    // Отправляем всем админам
    $adminEmails = explode(',', ADMIN_EMAILS);
    foreach ($adminEmails as $adminEmail) {
        mail(trim($adminEmail), "❌ Клиент отменил запись: {$formattedDate} {$timeFormatted} - " . $booking['client_name'], $message, $headers);
    }
}

function sendRescheduleEmail($bookingId, $newDate, $newTime) {
    $db = new SQLite3(DB_FILE);
    $stmt = $db->prepare('SELECT * FROM bookings WHERE booking_id = ?');
    $stmt->bindValue(1, $bookingId, SQLITE3_TEXT);
    $result = $stmt->execute();
    $booking = $result->fetchArray(SQLITE3_ASSOC);
    $db->close();
    
    if (!$booking) return;
    
    // Обновляем данные бронирования для генерации ссылок
    $booking['booking_date'] = $newDate;
    $booking['booking_time'] = $newTime;
    $calendarLinks = generateCalendarLinks($booking);
    
    $dateObj = new DateTime($newDate);
    $formattedDate = $dateObj->format('d.m.Y');
    $timeFormatted = substr($newTime, 0, 5);
    
    $subject = "🔄 Запись перенесена - TAX CONSENSUS";
    $message = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;'>
        <div style='background: #38a169; color: white; padding: 20px; text-align: center;'>
            <h1 style='margin: 0; font-size: 24px;'>🔄 Запись перенесена</h1>
        </div>
        
        <div style='padding: 30px;'>
            <p>Ваша запись была успешно перенесена.</p>
            
            <div style='background: #f7fafc; padding: 20px; border-left: 4px solid #38a169; margin: 20px 0; border-radius: 4px;'>
                <p style='margin: 8px 0;'><strong>📅 Новая дата:</strong> {$formattedDate}</p>
                <p style='margin: 8px 0;'><strong>🕐 Новое время:</strong> {$timeFormatted}</p>
                <p style='margin: 8px 0;'><strong>🔖 Номер записи:</strong> {$bookingId}</p>
            </div>
            
            <!-- Кнопки обновления календаря -->
            <div style='background: #edf2f7; padding: 20px; border-radius: 8px; margin: 25px 0;'>
                <h4 style='margin-top: 0; color: #2c5282;'>📅 Обновить в календаре</h4>
                <table cellpadding='0' cellspacing='0' border='0'>
                    <tr>
                        <td style='padding-right: 10px; padding-bottom: 10px;'>
                            <a href='{$calendarLinks['google']}' target='_blank' style='display: inline-block; padding: 12px 20px; background: #4285f4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                📱 Google Calendar
                            </a>
                        </td>
                        <td style='padding-right: 10px; padding-bottom: 10px;'>
                            <a href='{$calendarLinks['ics']}' style='display: inline-block; padding: 12px 20px; background: #333; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                🍎 Apple/iCal
                            </a>
                        </td>
                        <td style='padding-bottom: 10px;'>
                            <a href='{$calendarLinks['outlook']}' target='_blank' style='display: inline-block; padding: 12px 20px; background: #0078d4; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;'>
                                📧 Outlook
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            
            <p>С уважением,<br>TAX CONSENSUS</p>
        </div>
        
        <div style='background: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;'>
            <p style='font-size: 12px; color: #718096; margin: 0;'>
                TAX CONSENSUS | 📞 +998 90 970 01 75 | 🌐 taxco.uz
            </p>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: TAX CONSENSUS <info@taxco.uz>\r\n";
    $headers .= "Reply-To: info@taxco.uz\r\n";
    
    mail($booking['client_email'], $subject, $message, $headers);
    
    // Отправляем всем админам
    $adminEmails = explode(',', ADMIN_EMAILS);
    foreach ($adminEmails as $adminEmail) {
        mail(trim($adminEmail), "🔄 Запись перенесена: {$formattedDate} {$timeFormatted} - " . $booking['client_name'], $message, $headers);
    }
}
?>
