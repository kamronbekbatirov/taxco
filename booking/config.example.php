<?php
// Copy this file to config.php and fill in real values.

// Path to the SQLite database file (must be writable by the web user)
define('DB_FILE', '/var/lib/taxco/bookings.db');

// Comma-separated list of admin emails that receive booking notifications
define('ADMIN_EMAILS', 'admin@example.com');

// Working hours (24h, Asia/Tashkent timezone)
define('WORK_START_HOUR', 10);
define('WORK_END_HOUR', 18);
define('LUNCH_START_HOUR', 13);
define('LUNCH_END_HOUR', 14);

// Working days (1 = Monday, 7 = Sunday)
$WORK_DAYS = [1, 2, 3, 4, 5];

// Slot duration in hours
define('SLOT_DURATION', 1);

date_default_timezone_set('Asia/Tashkent');

// --- Database bootstrap (do not modify unless you know what you're doing) ---
function initDatabase() {
    $db = new SQLite3(DB_FILE);
    $db->exec('CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_id TEXT UNIQUE NOT NULL,
        client_name TEXT NOT NULL,
        client_email TEXT NOT NULL,
        client_phone TEXT NOT NULL,
        booking_date DATE NOT NULL,
        booking_time TIME NOT NULL,
        status TEXT DEFAULT "confirmed",
        language TEXT DEFAULT "ru",
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_booking_id ON bookings(booking_id)');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_date_time ON bookings(booking_date, booking_time)');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_status ON bookings(status)');
    $db->close();
}
initDatabase();
