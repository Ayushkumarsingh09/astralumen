# AstraLumen — Hostinger Deployment Guide

Complete guide for deploying the AstraLumen static site to [Hostinger](https://www.hostinger.com) shared hosting with PHP API endpoints for contact and newsletter forms.

**Production URL:** https://astralumen.science

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js (local build) | 18+ |
| Hostinger plan | Premium or Business (PHP + SSL) |
| Domain | astralumen.science pointed to Hostinger |

---

## 1. Local Build

```bash
# Install dependencies
npm install

# Generate article content (first time / content refresh)
npm run generate:articles

# Run content audit
npm run audit

# Production build
npm run build
```

The build outputs static files to `dist/`. This folder is what you upload to Hostinger.

---

## 2. Hostinger Account Setup

### 2.1 Add domain

1. Log in to **hPanel** → **Websites** → **Add Website**
2. Connect `astralumen.science` (or transfer existing domain)
3. Point DNS to Hostinger nameservers if domain is registered elsewhere

### 2.2 Enable SSL

1. **hPanel** → **Security** → **SSL**
2. Enable free **Let's Encrypt** certificate for `astralumen.science`
3. Wait for provisioning (usually 5–15 minutes)
4. The `.htaccess` file forces HTTPS automatically

### 2.3 PHP configuration

1. **hPanel** → **Advanced** → **PHP Configuration**
2. Select PHP **8.1** or **8.2**
3. Enable extensions: `curl`, `json`, `mbstring`, `session`
4. Set `session.save_path` to default (required for rate limiting)

---

## 3. Upload Files

### Option A: File Manager (small updates)

1. **hPanel** → **Files** → **File Manager**
2. Navigate to `public_html/`
3. Delete default `index.html` if present
4. Upload **all contents** of `dist/` into `public_html/`

> **Important:** Upload the *contents* of `dist/`, not the `dist` folder itself.  
> `public_html/index.html` should exist after upload.

### Option B: FTP/SFTP (recommended for full deploys)

| Setting | Value |
|---------|-------|
| Host | `ftp.astralumen.science` or IP from hPanel |
| Port | 21 (FTP) or 22 (SFTP) |
| Username | From hPanel → FTP Accounts |
| Remote path | `/public_html/` |

Use FileZilla or `lftp` to sync `dist/` → `public_html/`.

### Option C: Git deploy (advanced)

Hostinger Business plans support Git. Clone your repo, run build on server or upload `dist/` via CI.

---

## 4. PHP API Endpoints

The contact and newsletter handlers live in `public/api/` and are copied to `dist/api/` during build.

### 4.1 Configure contact form

Edit `public_html/api/contact.php` (or configure before build in `public/api/contact.php`):

```php
const CONTACT_TO_EMAIL     = 'contact@astralumen.science';
const CONTACT_FROM_EMAIL   = 'noreply@astralumen.science';
```

### 4.2 Configure newsletter

Edit `public_html/api/newsletter.php`:

```php
const NEWSLETTER_PROVIDER = 'mailchimp'; // or brevo | convertkit

// Mailchimp
const MAILCHIMP_API_KEY       = 'your_key-us1';
const MAILCHIMP_LIST_ID       = 'abc123';
const MAILCHIMP_SERVER_PREFIX = 'us1';
```

### 4.3 Test endpoints

```bash
# Contact form
curl -X POST https://astralumen.science/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Deploy test","message":"Testing contact form after deployment.","form_loaded_at":1700000000}'

# Newsletter
curl -X POST https://astralumen.science/api/newsletter.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","first_name":"Test"}'
```

Expected response: `{"success":true,"message":"..."}`

### 4.4 Email deliverability

1. **hPanel** → **Emails** → Create `noreply@astralumen.science` and `contact@astralumen.science`
2. Add **SPF** record: `v=spf1 include:_spf.mail.hostinger.com ~all`
3. Enable **DKIM** in hPanel email settings
4. For newsletter providers, use their recommended DNS records (Mailchimp/Brevo/ConvertKit dashboards)

---

## 5. Apache Configuration

The `public/.htaccess` file is deployed automatically. It provides:

- HTTPS redirect
- Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Gzip compression
- Cache headers for static assets (1 year for CSS/JS/images, 1 hour for HTML)

No SPA fallback is configured — this is a fully static Astro site.

### Verify headers

```bash
curl -I https://astralumen.science/
```

Look for `X-Content-Type-Options: nosniff` and `Strict-Transport-Security` (if added at CDN level).

---

## 6. Post-Deploy Checklist

- [ ] Homepage loads at https://astralumen.science
- [ ] SSL padlock shows in browser
- [ ] `/robots.txt` accessible
- [ ] `/sitemap-index.xml` accessible
- [ ] `/api/contact.php` returns JSON (not 404)
- [ ] `/api/newsletter.php` returns JSON (not 404)
- [ ] Favicon and OG image load (`/favicon.svg`, `/images/og-default.svg`)
- [ ] Author avatars load (`/images/authors/*.svg`)
- [ ] Contact form on `/contact` submits successfully
- [ ] Newsletter signup on homepage/footer works
- [ ] Google Search Console property verified (see `docs/SEO-SETUP.md`)

---

## 7. Continuous Deployment Workflow

```bash
# 1. Make changes locally
npm run dev          # preview at localhost:4321

# 2. Validate
npm run audit
npm run build

# 3. Upload dist/ to public_html/

# 4. Smoke test production URLs
```

### Recommended release cadence

| Change type | Action |
|-------------|--------|
| Content/articles | `generate:articles` → `audit` → `build` → upload |
| PHP config only | Edit `public_html/api/*.php` directly |
| Design/code | Full `build` → upload `dist/` |

---

## 8. Troubleshooting

### 500 error on PHP endpoints

- Check PHP version is 8.1+
- Verify `curl` extension enabled
- Check Hostinger error logs: **hPanel** → **Advanced** → **Error Logs**

### Contact emails not arriving

- Confirm mailbox exists in Hostinger
- Check spam folder
- Verify SPF/DKIM records
- Test with `mail()` using a simple PHP script

### Mixed content warnings

- Ensure all asset URLs use `https://`
- Check `PUBLIC_SITE_URL` in build environment

### .htaccess not working

- Confirm `mod_rewrite` is enabled (default on Hostinger)
- Check file is named exactly `.htaccess` (not `.htaccess.txt`)

### 404 on article pages

- Re-run `npm run build` and re-upload full `dist/`
- Astro generates static HTML per route — partial uploads cause missing pages

---

## 9. Environment Variables (Build Time)

Create `.env` from `.env.example` before building:

```env
PUBLIC_SITE_URL=https://astralumen.science
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GTM_ID=GTM-XXXXXXX
```

PHP endpoints use inline constants (not `.env`) — edit the PHP files directly on the server or in `public/api/` before build.

---

## Support

- **Hostinger:** Live chat in hPanel
- **AstraLumen:** contact@astralumen.science
