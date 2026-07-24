# AstraLumen — SEO Setup Guide

Step-by-step guide for Google Search Console, Analytics, Tag Manager, and future AdSense preparation.

**Site:** https://astralumen.science

---

## 1. Technical SEO Foundation

AstraLumen ships with built-in SEO infrastructure:

| Feature | Location |
|---------|----------|
| Meta tags & Open Graph | `src/utils/seo.ts`, `src/layouts/BaseLayout.astro` |
| XML Sitemap | Auto-generated at `/sitemap-index.xml` via `@astrojs/sitemap` |
| RSS Feed | `/rss.xml` |
| robots.txt | `public/robots.txt` |
| Canonical URLs | Per-page via `generateSEO()` |
| JSON-LD Schema | Organization, WebSite, Article, FAQ, Breadcrumb |
| Default OG image | `/images/og-default.svg` |

### Verify after deploy

```bash
curl https://astralumen.science/robots.txt
curl https://astralumen.science/sitemap-index.xml
```

---

## 2. Google Search Console

### 2.1 Add property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property** → **URL prefix**
3. Enter: `https://astralumen.science`

### 2.2 Verify ownership

**Recommended: DNS TXT record (Hostinger)**

1. Search Console provides a TXT record like:  
   `google-site-verification=XXXXXXXX`
2. **hPanel** → **Domains** → **DNS / Nameservers** → **DNS records**
3. Add **TXT** record:
   - Name: `@`
   - Value: `google-site-verification=XXXXXXXX`
4. Wait 5–30 minutes, click **Verify** in Search Console

**Alternative: HTML file**

1. Download verification file from Search Console
2. Upload to `public_html/` via File Manager
3. Verify at `https://astralumen.science/googleXXXX.html`

### 2.3 Submit sitemap

1. Search Console → **Sitemaps**
2. Enter: `sitemap-index.xml`
3. Click **Submit**
4. Monitor indexing status over 1–2 weeks

### 2.4 Ongoing monitoring

| Report | Action |
|--------|--------|
| **Pages** | Check indexed vs. not indexed |
| **Experience** | Monitor Core Web Vitals |
| **Enhancements** | Review FAQ rich results (articles have FAQ schema) |
| **Links** | Track internal/external link growth |

Run `npm run audit` before each deploy to catch broken internal links and missing meta fields.

---

## 3. Google Analytics 4 (GA4)

### 3.1 Create property

1. Go to [Google Analytics](https://analytics.google.com)
2. **Admin** → **Create property**
3. Property name: `AstraLumen`
4. Time zone: your primary audience timezone
5. Industry: **Science & Education**
6. Create **Web** data stream for `https://astralumen.science`
7. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3.2 Configure in AstraLumen

Add to `.env` before building:

```env
PUBLIC_GA_ID=G-XXXXXXXXXX
```

Rebuild and redeploy. GA4 loads via `BaseLayout.astro` when `PUBLIC_GA_ID` is set.

### 3.3 Recommended events (custom)

Track in GA4 **Admin** → **Events** or via GTM (Section 4):

| Event | Trigger |
|-------|---------|
| `newsletter_signup` | Successful newsletter form submission |
| `contact_submit` | Successful contact form submission |
| `tool_usage` | Science tool interaction |
| `article_read` | Scroll depth 75% on article pages |

### 3.4 Link Search Console

**Admin** → **Product links** → **Search Console links** → Link your property.

---

## 4. Google Tag Manager (GTM)

GTM is recommended when you need flexible tracking without redeploying code.

### 4.1 Create container

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create account: `AstraLumen`
3. Container: **Web** for `astralumen.science`
4. Copy **Container ID** (`GTM-XXXXXXX`)

### 4.2 Configure in AstraLumen

```env
PUBLIC_GTM_ID=GTM-XXXXXXX
```

When GTM ID is set, it takes precedence over direct GA4 injection in the layout.

### 4.3 Essential tags

| Tag | Type | Trigger |
|-----|------|---------|
| GA4 Configuration | Google Analytics: GA4 Configuration | All Pages |
| GA4 Event — Newsletter | GA4 Event | Custom event `newsletter_signup` |
| GA4 Event — Contact | GA4 Event | Custom event `contact_submit` |

### 4.4 Publish workflow

1. Create tags in **Workspace**
2. **Preview** with Tag Assistant
3. **Submit** → **Publish** with version notes
4. Never edit production tags without previewing first

---

## 5. Google AdSense (Future Preparation)

AdSense approval requires established content, traffic, and policy compliance. Prepare now; apply when you have 50+ quality articles indexed and steady traffic.

### 5.1 Pre-approval checklist

- [ ] 100+ original, expert-reviewed articles (run `npm run generate:articles`)
- [ ] Privacy Policy at `/privacy-policy` (mention cookies, analytics, future ads)
- [ ] Cookie Policy at `/cookie-policy`
- [ ] Editorial Policy at `/editorial-policy`
- [ ] About page with clear site purpose
- [ ] Contact page with working form
- [ ] No prohibited content (see [AdSense policies](https://support.google.com/adsense/answer/48182))
- [ ] HTTPS enabled
- [ ] Mobile-friendly (AstraLumen is responsive by default)
- [ ] Fast page loads (static Astro build)

### 5.2 Technical prep (before applying)

1. **Reserve ad placement zones** in article layout (do not show ads until approved):
   - Below article title (optional leaderboard)
   - Mid-article (after 2nd H2)
   - Below article content
   - Sidebar on category pages

2. **Add ads.txt** when approved:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
   Upload to `public/ads.txt` → rebuild → deploy.

3. **Consent Management Platform (CMP)**  
   Required in EEA/UK. Options:
   - Google Consent Mode v2 via GTM
   - Cookiebot, OneTrust, or similar

4. **Update Privacy Policy** to disclose:
   - Third-party ad serving
   - Cookie usage for personalized ads
   - User opt-out links (NAI, DAA)

### 5.3 Apply for AdSense

1. [Google AdSense](https://www.google.com/adsense) → **Get started**
2. Enter `https://astralumen.science`
3. Add AdSense code snippet to `<head>` (via GTM or layout)
4. Wait for review (days to 2 weeks)

### 5.4 Post-approval

- Start with **Auto ads**, then add manual units
- Monitor **Page RPM** and **Core Web Vitals** — ads can impact CLS
- Never click your own ads
- Keep ad density below policy limits (avoid more ads than content)

---

## 6. Additional SEO Recommendations

### 6.1 Structured data testing

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Test article URLs for Article + FAQ schema
- Test homepage for Organization + WebSite schema

### 6.2 Page speed

```bash
# Lighthouse (Chrome DevTools) or:
npx lighthouse https://astralumen.science --view
```

Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms

### 6.3 Social sharing

Default OG image: `/images/og-default.svg`  
Per-article images use NASA featured images from frontmatter.

Test sharing:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 6.4 Bing Webmaster Tools

1. [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Import from Google Search Console (fastest)
3. Submit same sitemap: `https://astralumen.science/sitemap-index.xml`

---

## 7. SEO Maintenance Schedule

| Frequency | Task |
|-----------|------|
| Weekly | Check Search Console for crawl errors |
| Bi-weekly | Run `npm run audit` before deploys |
| Monthly | Review top queries & pages in GSC + GA4 |
| Quarterly | Update underperforming meta descriptions |
| Quarterly | Refresh `updatedDate` on major articles |

---

## Quick Reference — Environment Variables

```env
PUBLIC_SITE_URL=https://astralumen.science
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GTM_ID=GTM-XXXXXXX
```

Rebuild after changing any `PUBLIC_*` variable.
