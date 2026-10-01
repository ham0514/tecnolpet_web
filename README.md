# Tecnolpet S.A. — website

Bilingual corporate site (Spanish by default / English) built with Vite + React + TypeScript. Designed for shared cPanel hosting as static files plus a PHP endpoint for forms.

## Local development

Requirements: **Node.js 20+** (22/24 recommended).

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set your Cloudflare Turnstile site key:

```bash
VITE_TURNSTILE_SITE_KEY=your_site_key_here
```

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Deploy on cPanel

1. Run `npm run build` on your machine.
2. Upload **all contents** of `dist/` to `public_html/` (FTP / File Manager).
   - Includes `.htaccess`, `index.html`, `assets/`, `favicon.png`, `robots.txt`, and `api/contact.php`.
3. Edit `public_html/api/contact.php`:
   - Set `$to` / `$from` if your domain email differs.
   - Set `$turnstileSecret` to your Cloudflare Turnstile **secret** key.
4. In the Turnstile widget settings, allow your production hostname (and `localhost` for local testing).
5. Test routes (`/servicios`, `/contacto`, etc.) and the ES/EN switch.
6. Send a test message from Contact.

### Notes

- `.htaccess` rewrites SPA routes to `index.html`.
- Forms `POST` to `/api/contact.php` using PHP `mail()`, after Turnstile verification.
- Some cPanel hosts require configuring the domain sender (`noreply@tecnolpet.com`) in email settings.

## Languages

- Default: Spanish (`es`)
- Alternative: English (`en`)
- Preference stored in `localStorage` (`tecnolpet-lang`)

## Structure

- `src/pages` — site pages
- `src/components` — layout, logo, forms, hero visuals
- `src/i18n/locales` — ES/EN copy
- `src/assets/brand` — official logos
- `api/contact.php` / `public/api/contact.php` — form handler (copied into `dist/api` on build)
