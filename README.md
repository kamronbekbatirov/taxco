# TAX CONSENSUS — taxco.uz

> **The corporate site for one of Tashkent's oldest tax-advisory firms — and probably the fastest tax site in Uzbekistan.**

[taxco.uz](https://taxco.uz) is the public face of **TAX CONSENSUS**, a tax-consulting practice that has served Uzbek businesses since 2012. The site has zero JavaScript frameworks, zero build step, and ships in three languages — Russian, Uzbek (Cyrillic), and English. It scores 100 on Lighthouse and weighs less than the framework bundle on most competitor home pages.

[![Live](https://img.shields.io/badge/live-taxco.uz-000?style=flat-square)](https://taxco.uz)
[![No build](https://img.shields.io/badge/build%20step-none-success?style=flat-square)](.)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?style=flat-square)](.)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

---

## Why static?

A consulting site isn't a SaaS product. People arrive from a Google search, want to know what the firm does, what it costs, and how to book a meeting — every millisecond of latency loses leads. The whole site is hand-written HTML + CSS + a single 683-line JavaScript file:

- 🚀 No framework, no bundler, no build
- 🛡️ Zero supply-chain surface
- ⚡ First Contentful Paint under a second on slow 3G
- 📦 Whole site smaller than a single npm package install

## What's on the site

| Page | What it covers |
| --- | --- |
| 🏠 **Home** (`index.html`) | Hero, our approach, our values |
| 👥 **About** (`about.html`) | History since 2012, team, credentials |
| 🧾 **Services** (`services.html`) | Tax disputes, planning, accounting |
| 💵 **Pricing** (`pricing.html`) | Service tiers and rates |
| 📰 **News** (`news.html`) | Articles, tax updates |
| ✉️ **Contact** (`contact.html`) | Form, address, working hours |
| 📅 **Booking** (`booking.html` + `booking/`) | Online consultation booking |

## The booking engine

A small **PHP + SQLite** booking engine — 1.7k lines total — lives in `booking/`. Clients pick a day, see free one-hour consultation slots, and book one in four clicks. Self-contained, no dependencies, no framework.

| File | Purpose |
| --- | --- |
| `api.php` | JSON REST API — 6 endpoints |
| `booking.js` | Calendar UI |
| `manage.html` | Admin view |
| `config.example.php` | Copy → `config.php`, set admins + working hours + DB path |

Endpoints: `get_available_slots`, `create_booking`, `get_booking`, `cancel_booking`, `reschedule_booking`, `get_ics`. Default working hours: Monday–Friday 10:00–13:00 and 14:00–18:00, `Asia/Tashkent`.

> 💡 **Production note** — on the live site the PHP booking engine is disabled at the reverse proxy (`@php → 403`); booking is currently routed through a different channel. The PHP is shipped here so anyone can self-host the full experience.

## How i18n works

Three languages share one HTML. Every translatable string carries a `data-translate="<key>"` attribute. The dictionary lives at the bottom of `script.js` as `translations.ru` / `translations.uz` / `translations.en`. A toggle in the nav swaps `textContent` on every tagged element — no reload, no extra request, ~30 lines of vanilla JS.

To add a new language:
1. Extend the `translations` object with a new locale key.
2. Add the flag to the toggle.

## SEO

Per-page `<title>`, meta description, canonical URL, Open Graph + Twitter Cards, hreflang locale alternates, `sitemap.xml`, `robots.txt`, structured-data-friendly markup. A full Russian-language SEO audit lives in `SEO_ОТЧЕТ.txt`.

## Run it locally

No build step, no dependencies — open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
# or
npx serve .
```

For the booking subsystem you'll need PHP 8 with the SQLite extension. Copy `booking/config.example.php` → `config.php`, fill it in, then:

```bash
php -S 127.0.0.1:8000
# http://127.0.0.1:8000/booking.html
```

## Project layout

```
.
├── index.html · about.html · services.html ·
├── pricing.html · news.html · contact.html ·
├── booking.html
├── styles.css            1,536 lines of hand-written CSS
├── script.js             683 lines: i18n + animations + booking
├── booking/              PHP + SQLite booking engine
├── favicon/              Multi-resolution favicons
├── sitemap.xml · robots.txt
├── BOOKING_SYSTEM_GUIDE.txt   Russian-language operator guide
├── SEO_ОТЧЕТ.txt              Russian-language SEO audit
└── .htaccess
```

---

## For contributors / AI agents

> A short technical orientation for anyone (human or AI) being handed this repo for the first time.

### Mental model
A **framework-free** corporate marketing site for a tax-advisory firm. Static HTML across seven pages, one shared `styles.css`, one shared `script.js`. The site is deliberately built to outlast its developers — no npm install, no bundler, no compile step, no node_modules. Adding *any* runtime dependency is a regression.

The optional booking subsystem under `booking/` is a separate, equally-self-contained PHP + SQLite app that the front-end calls via AJAX.

### Where things live

| You want to … | Open … |
| --- | --- |
| Add or rewrite copy on a page | The matching `*.html`. Translatable strings carry `data-translate="<key>"`. |
| Add a new translatable string | Find the right page, wrap the element with `data-translate`, then add the key to the `translations` object at the bottom of `script.js` (in `ru`, `uz`, **and** `en`). |
| Change visual styling | `styles.css`. There is no other stylesheet (per-page tweaks live in `<style>` at the top of each HTML). |
| Tweak header animation, language toggle, smooth scroll | `script.js`. The whole script is plain ES5/ES6 — no modules. |
| Touch booking | Everything inside `booking/`: `api.php` (server), `booking.js` (client), `manage.html` (admin), `config.example.php` (per-deploy settings). |
| Reconfigure working hours, lunch, weekends | `booking/config.php` — copy from `config.example.php` on first deploy. |
| Update SEO meta or Open Graph | The `<head>` of each HTML page. The site relies on per-page hreflang. |

### Booking API quick reference

`booking/api.php?action=<X>` over JSON:

```
get_available_slots   ?date=YYYY-MM-DD       → list of free slots
create_booking        POST {name,phone,...}  → reserves + emails confirmation
get_booking           ?id=<uuid>             → single booking
cancel_booking        POST {id, token}       → frees the slot
reschedule_booking    POST {id, new_slot}    → moves to a new time
get_ics               ?id=<uuid>             → .ics calendar file
```

State lives in `booking/data.db` (SQLite, gitignored). Schema bootstraps on first request.

### Conventions and gotchas

- **No build step. No package.json. No npm.** Anyone cloning this expects to `python3 -m http.server` and have it work. Don't introduce a bundler.
- **Three locales must move together.** Every `data-translate` key must exist in `translations.ru`, `translations.uz`, and `translations.en`. A missing key falls back to the raw key string and looks broken.
- **The booking PHP is currently disabled in production** by `@php → 403` in the live Caddy config. The PHP code is shipped here so anyone can self-host the full experience, but `taxco.uz` itself routes booking through a different channel — don't assume the production site exercises the PHP.
- **`.htaccess` is for Apache hosts.** It denies access to `*.db`, `*.sql`, `*.bak`, and sets baseline security headers. Caddy hosts use the snippet at the bottom of this README instead — both must stay in sync if you tighten one.
- **`SEO_ОТЧЕТ.txt` and `BOOKING_SYSTEM_GUIDE.txt` are Russian-language operator docs.** Keep them updated alongside English README changes when the corresponding subsystem changes.
- **The favicon set is generated.** Don't hand-edit individual files in `favicon/` — regenerate from a single source SVG.
- **Vanity domain is `taxco.uz`.** All canonical URLs, sitemap entries, and Open Graph tags reference it. If the domain changes, sweep every HTML head + `sitemap.xml` + `robots.txt`.

## License

[MIT](LICENSE)
