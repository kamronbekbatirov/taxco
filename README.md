# TAX CONSENSUS — taxco.uz

The corporate website for **TAX CONSENSUS**, a Tashkent-based tax-advisory practice that has served Uzbek businesses since 2012. Trilingual (Russian, Uzbek-Cyrillic, English), framework-free, and engineered to be the fastest tax-advisory site in the country.

[![Live](https://img.shields.io/badge/live-taxco.uz-000?style=flat-square)](https://taxco.uz)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

## Why static?

A consulting site is not a SaaS product. People come from a Google search, want to learn what the firm does, what it costs, and how to book a consultation — every additional millisecond of latency loses leads. We chose hand-written HTML + CSS + a single JavaScript file over any framework: the entire site weighs less than the JavaScript bundle of an average competitor's home page, scores 100/100 on Lighthouse, and has zero supply-chain risk.

683 lines of vanilla JavaScript run the language switcher, smooth scrolling, header transitions, and the booking widget. There is **no build step**.

## What's in the box

### Marketing pages

| Page | File | What it covers |
| --- | --- | --- |
| Home | `index.html` | Hero, brand story, our approach, our values |
| About | `about.html` | History since 2012, team, credentials |
| Services | `services.html` | Practices: tax disputes, planning, accounting |
| Pricing | `pricing.html` | Service tiers and rates |
| News | `news.html` | Articles and tax updates |
| Contact | `contact.html` | Form, address, working hours |
| Booking | `booking.html` + `booking/` | Online consultation booking |

### Booking subsystem (`booking/`)

A small PHP + SQLite booking engine — 1.7k lines total — that lets clients reserve a one-hour consultation slot. It is intentionally framework-free and self-contained.

| File | Lines | Purpose |
| --- | --- | --- |
| `api.php` | 680 | JSON REST API — six endpoints listed below |
| `booking.js` | 210 | Front-end calendar that talks to the API |
| `manage.html` | 496 | Admin view of upcoming bookings |
| `config.example.php` | 46 | Copy to `config.php` and fill in admin emails, working hours, DB path |
| `README.md` | 296 | Russian-language operator guide for the booking subsystem |

API endpoints (`api.php?action=…`):

- `get_available_slots` — list free time-slots for a given date
- `create_booking` — reserve a slot, send confirmation emails
- `get_booking` — look up a booking by ID
- `cancel_booking` — release a slot
- `reschedule_booking` — move a booking to a new slot
- `get_ics` — download an `.ics` calendar file

Working hours come from the config (`WORK_START_HOUR`, `WORK_END_HOUR`, lunch interval, weekly schedule). The default is Monday-Friday 10:00–13:00 and 14:00–18:00, one-hour slots, in the `Asia/Tashkent` timezone.

> **Production note** — on `taxco.uz` the booking engine is currently disabled at the reverse-proxy layer (`@php → 403` in the Caddy config). The PHP code is shipped here so anyone can self-host the full experience, but the live site routes booking through a different channel.

## Internationalisation

Three languages share one HTML — every translatable string carries a `data-translate="<key>"` attribute. The dictionary lives at the bottom of `script.js` as `translations.ru`, `translations.uz` (Cyrillic), `translations.en`. A locale toggle in the navigation swaps `textContent` on every tagged element without a page reload.

To add a new language:
1. Extend the `translations` object in `script.js` with a new locale key.
2. Add the flag to the toggle element in each HTML page.

The whole language switch is `< 30 lines` of vanilla JavaScript.

## SEO

- Per-page `<title>`, `<meta description>`, canonical URL, and Open Graph + Twitter Card metadata.
- Hreflang-style locale alternates declared in the head.
- `sitemap.xml` and `robots.txt` shipped at the repository root.
- Structured-data-friendly markup (Organization, BreadcrumbList).
- A complete Russian-language SEO audit lives in `SEO_ОТЧЕТ.txt`.

## Local development

No build step, no dependencies. Open `index.html` directly in a browser, or serve the directory with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

For the booking subsystem, you also need PHP 8 with the SQLite extension and a writable database path. Copy `booking/config.example.php` to `booking/config.php`, fill in the admin emails and DB path, then point Apache or a PHP CLI server at the directory:

```bash
php -S 127.0.0.1:8000
# Browse to http://127.0.0.1:8000/booking.html
```

## Apache (.htaccess) and Caddy

The repository ships an `.htaccess` for Apache hosts — it enables PHP processing for `*.php`, denies access to SQLite databases, and sets a baseline of security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`).

For Caddy:

```caddy
taxco.uz, www.taxco.uz {
    root * /srv/taxco
    header X-Content-Type-Options nosniff
    header Strict-Transport-Security "max-age=31536000"
    @php path *.php
    respond @php "Access Denied" 403          # remove this line to enable booking
    @sensitive path_regexp \.(db|sql|bak|backup|env)$|/\.git
    respond @sensitive "Access Denied" 403
    file_server
}
```

The `@php → 403` rule is what disables the booking engine on the live site. Remove the rule and add a PHP-FPM upstream to make it routable again.

## Project layout

```
.
├── index.html              # Hero + Approach + Values
├── about.html              # Firm history, team
├── services.html           # Tax practices
├── pricing.html            # Rates
├── news.html               # Articles
├── contact.html            # Office details
├── booking.html            # Calendar UI entry point
├── styles.css              # 1,536 lines of hand-written CSS
├── script.js               # 683 lines: i18n dictionary, animations, booking
├── booking/                # PHP + SQLite booking engine (see above)
├── favicon/                # Multi-resolution favicons
├── building-background.jpg # Hero image
├── sitemap.xml             # Generated sitemap
├── robots.txt
├── BOOKING_SYSTEM_GUIDE.txt # Russian-language operator guide
├── SEO_ОТЧЕТ.txt           # Russian-language SEO audit
└── .htaccess               # Apache configuration
```

## License

Released under the [MIT License](LICENSE).
