import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, CATEGORIES } from '@/config/site';

const STATIC_PAGES = [
  '',
  'about',
  'contact',
  'search',
  'faq',
  'authors',
  'science-tools',
  'science-tools/planet-weight-calculator',
  'science-tools/age-on-planets',
  'science-tools/light-year-converter',
  'science-tools/distance-converter',
  'science-tools/gravity-calculator',
  'science-tools/scientific-notation',
  'science-tools/unit-converter',
  'science-tools/periodic-table',
  'science-tools/solar-system-explorer',
  'science-tools/space-timeline',
  'privacy-policy',
  'terms',
  'cookie-policy',
  'editorial-policy',
  'corrections-policy',
  'disclaimer',
  'sitemap',
];

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const base = SITE.url.replace(/\/$/, '');

  const urls = [
    ...STATIC_PAGES.map((p) => ({
      loc: `${base}/${p}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: p === '' ? 'daily' : 'weekly',
      priority: p === '' ? '1.0' : '0.8',
    })),
    ...CATEGORIES.map((cat) => ({
      loc: `${base}/${cat}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.9',
    })),
    ...articles.map((a) => ({
      loc: `${base}/articles/${a.slug}`,
      lastmod: a.data.updatedDate,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
