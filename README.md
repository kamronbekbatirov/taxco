# TAX CONSENSUS — taxco.uz

The corporate website for **TAX CONSENSUS**, a Tashkent-based tax-advisory practice that has served Uzbek businesses since 2012. Trilingual (Russian, Uzbek, English), fully static, and engineered to be the fastest tax-advisory site in the country.

[![Live](https://img.shields.io/badge/live-taxco.uz-000?style=flat-square)](https://taxco.uz)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

## Why static?

A consulting site is not a SaaS dashboard. Visitors come from search results to learn what the firm does, what it costs, and how to book a consultation — every additional millisecond of latency loses leads. We chose hand-written HTML and CSS over any framework: the entire site weighs less than the JavaScript bundle of an average competitor's home page, scores 100/100 on Lighthouse, and has zero supply-chain risk.

## What's in the box

| Page | File |
| --- | --- |
| Home | `index.html` |
| About the firm | `about.html` |
| Services | `services.html` |
| Pricing | `pricing.html` |
| News | `news.html` |
| Contact | `contact.html` |
| Online booking | `booking.html` + `booking/` |

### Booking subsystem (`booking/`)

A small PHP + SQLite booking engine that lets clients reserve a one-hour consultation slot. It is intentionally framework-free and self-contained:

- `api.php` — JSON API: list available slots, create a booking, manage bookings.
- `booking.js` — front-end calendar that talks to the API.
- `manage.html` — admin view of upcoming bookings.
- `config.example.php` — copy to `config.php` and fill in admin emails, working hours, and the SQLite database path.

The booking endpoint is **disabled at the reverse-proxy layer** in production (Caddy returns `403` on any `*.php` path) — this repository ships the engine for self-hosting; on `taxco.uz` the booking flow is currently routed through a different channel.

## Internationalisation

Every translatable string carries a `data-translate` attribute. The dictionary lives at the bottom of `script.js`. A language toggle in the navigation switches between **РУ / UZ / EN** without a page reload by swapping `textContent` on every tagged element.

To add a new language, extend the `translations` object in `script.js` and add a flag to the toggle.

## SEO

- Per-page `<title>`, `<meta description>`, canonical URL, and Open Graph / Twitter Card metadata.
- Hreflang-ready alternate locales declared in the head.
- `sitemap.xml` and `robots.txt` shipped at the repository root.
- Structured-data-friendly markup (Organization, BreadcrumbList).
- A complete SEO audit lives in [`SEO_ОТЧЕТ.txt`](SEO_%D0%9E%D0%A2%D0%A7%D0%95%D0%A2.txt) (Russian).

## Local development

No build step. Open `index.html` directly in a browser, or serve the directory with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

For the booking subsystem, you also need PHP 8 with the SQLite extension and a writable database path — see `booking/README.md` and `booking/config.example.php`.

## Deployment

Any static-friendly host: Caddy, Nginx, S3 + CloudFront, Cloudflare Pages, GitHub Pages.

Recommended Caddy snippet:

```caddy
taxco.uz, www.taxco.uz {
    root * /srv/taxco
    header X-Content-Type-Options nosniff
    header Strict-Transport-Security "max-age=31536000"
    @php path *.php
    respond @php "Access Denied" 403
    @sensitive path_regexp \.(db|sql|bak|backup|env)$|/\.git
    respond @sensitive "Access Denied" 403
    file_server
}
```

The `@php` rule is what disables the booking engine in our production environment — remove it if you want the booking subsystem to be reachable.

## License

Released under the [MIT License](LICENSE).
