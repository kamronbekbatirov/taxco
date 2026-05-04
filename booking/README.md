# Система бронирования TAX CONSENSUS

## Описание

Система онлайн-бронирования консультаций для сайта TAX CONSENSUS с поддержкой трёх языков (русский, узбекский, английский).

## Возможности

✅ **Онлайн-бронирование**
- Выбор даты и времени консультации
- Автоматическая проверка доступности слотов
- Мгновенное подтверждение

✅ **Управление бронированием**
- Отмена записи
- Перенос на другое время
- Уникальный ID для каждого бронирования

✅ **Email уведомления**
- Подтверждение клиенту
- Уведомление администратору
- Информация об отмене/переносе

✅ **Многоязычность**
- Русский (по умолчанию)
- Узбекский (кириллица)
- Английский

## Рабочие часы

- **Рабочие дни:** Понедельник - Пятница
- **Время работы:** 10:00 - 18:00
- **Обед:** 13:00 - 14:00
- **Длительность слота:** 1 час

## Структура файлов

```
booking/
├── api.php              # REST API для обработки бронирований
├── config.php           # Конфигурация и функции базы данных
├── booking.js           # JavaScript для страницы бронирования
├── manage.html          # Страница управления бронированием
├── bookings.db          # SQLite база данных
└── README.md            # Эта документация
```

## Настройка

### 1. Email администратора

Откройте файл `config.php` и измените:

```php
define('ADMIN_EMAIL', 'taxco@example.uz'); // ЗАМЕНИТЕ НА ВАШУ ПОЧТУ
```

на ваш реальный email:

```php
define('ADMIN_EMAIL', 'your-email@taxco.uz');
```

### 2. Проверка прав доступа

База данных и директория должны быть доступны для записи веб-сервером:

```bash
sudo chown www-data:www-data /var/www/taxco.uz/booking/bookings.db
sudo chmod 664 /var/www/taxco.uz/booking/bookings.db
sudo chmod 775 /var/www/taxco.uz/booking/
```

### 3. Требования

- PHP 8.0+
- Расширение SQLite3
- Apache с mod_php
- Настроенный mail() в PHP

Проверить установку SQLite:
```bash
php -m | grep sqlite
```

Если не установлен:
```bash
sudo apt-get install php-sqlite3
sudo systemctl restart apache2
```

## API Endpoints

### 1. Получить доступные слоты
```
GET /booking/api.php?action=get_available_slots&date=2025-12-15
```

### 2. Создать бронирование
```
POST /booking/api.php?action=create_booking
Content-Type: application/json

{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+998901234567",
  "date": "2025-12-15",
  "time": "10:00:00",
  "language": "ru",
  "notes": "Вопрос по НДС"
}
```

### 3. Получить информацию о бронировании
```
GET /booking/api.php?action=get_booking&booking_id=A1B2C3D4E5F6
```

### 4. Отменить бронирование
```
POST /booking/api.php?action=cancel_booking
Content-Type: application/json

{
  "booking_id": "A1B2C3D4E5F6"
}
```

### 5. Перенести бронирование
```
POST /booking/api.php?action=reschedule_booking
Content-Type: application/json

{
  "booking_id": "A1B2C3D4E5F6",
  "new_date": "2025-12-16",
  "new_time": "14:00:00"
}
```

## Использование

### Для клиентов

1. Зайти на страницу: https://taxco.uz/booking.html
2. Выбрать язык интерфейса
3. Заполнить контактные данные
4. Выбрать дату и время
5. Получить подтверждение на email с ссылкой для управления

### Управление записью

Клиент получает email с уникальной ссылкой:
```
https://taxco.uz/booking/manage.html?id=A1B2C3D4E5F6
```

По этой ссылке можно:
- Посмотреть детали записи
- Отменить запись
- Перенести на другое время

## База данных

SQLite база данных с одной таблицей:

```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status TEXT DEFAULT 'confirmed',
    language TEXT DEFAULT 'ru',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Статусы:**
- `confirmed` - подтверждено
- `cancelled` - отменено

## Email уведомления

Система отправляет email в следующих случаях:

1. **При создании бронирования:**
   - Клиенту: подтверждение с деталями и ссылкой на управление
   - Администратору: уведомление о новой записи

2. **При отмене:**
   - Клиенту: подтверждение отмены
   - Администратору: уведомление об отмене

3. **При переносе:**
   - Клиенту: новые дата и время
   - Администратору: информация об изменении

Все email включают:
- Номер бронирования
- Контактные данные
- Дату и время
- Адрес офиса

## Безопасность

✅ Валидация всех входных данных
✅ Защита от SQL-инъекций (параметризованные запросы)
✅ Уникальные ID бронирований (12 символов hex)
✅ База данных недоступна через веб (.htaccess)
✅ CORS headers для API
✅ Проверка доступности слотов перед бронированием

## Резервное копирование

Рекомендуется регулярно создавать резервные копии базы данных:

```bash
# Ручное копирование
cp /var/www/taxco.uz/booking/bookings.db /backup/bookings-$(date +%Y%m%d).db

# Автоматическое (добавить в crontab)
0 2 * * * cp /var/www/taxco.uz/booking/bookings.db /backup/bookings-$(date +\%Y\%m\%d).db
```

## Просмотр бронирований

Для просмотра всех бронирований через командную строку:

```bash
sqlite3 /var/www/taxco.uz/booking/bookings.db "SELECT * FROM bookings ORDER BY booking_date, booking_time;"
```

Только активные бронирования:

```bash
sqlite3 /var/www/taxco.uz/booking/bookings.db "SELECT booking_id, client_name, booking_date, booking_time FROM bookings WHERE status='confirmed' ORDER BY booking_date, booking_time;"
```

## Решение проблем

### Email не отправляются

1. Проверьте конфигурацию PHP mail():
```bash
php -i | grep sendmail_path
```

2. Установите sendmail или настройте SMTP в php.ini

3. Проверьте логи:
```bash
sudo tail -f /var/log/mail.log
```

### База данных недоступна

Проверьте права:
```bash
ls -l /var/www/taxco.uz/booking/bookings.db
```

Должно быть:
```
-rw-rw-r-- 1 www-data www-data 28K bookings.db
```

### API возвращает ошибки

Проверьте логи Apache:
```bash
sudo tail -f /var/log/apache2/error.log
```

## Техническая поддержка

При возникновении проблем:
1. Проверьте логи Apache и PHP
2. Убедитесь, что SQLite3 установлен
3. Проверьте права доступа к файлам
4. Проверьте конфигурацию email

---

**Версия:** 1.0  
**Дата:** 11.12.2025  
**Разработано для:** TAX CONSENSUS



