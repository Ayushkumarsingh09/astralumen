#!/usr/bin/env node
/**
 * AstraLumen Content Audit Script
 *
 * Checks article count, image duplication, internal link integrity,
 * and required frontmatter meta fields.
 *
 * Usage: npm run audit
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const SRC_DIR = path.join(ROOT, 'src');
const DIST_DIR = path.join(ROOT, 'dist');

const REQUIRED_META = [
  'title',
  'seoTitle',
  'description',
  'category',
  'tags',
  'author',
  'featuredImage',
  'imageAttribution',
  'imageSource',
  'publishedDate',
  'updatedDate',
  'readingTime',
  'scienceFacts',
  'faqs',
  'references',
];

const VALID_CATEGORIES = new Set([
  'space', 'astronomy', 'planets', 'stars', 'galaxies', 'black-holes',
  'earth-science', 'geology', 'climate-science', 'biology', 'animals',
  'human-body', 'physics', 'chemistry', 'technology-science',
  'science-facts', 'science-news', 'experiments',
]);

const VALID_AUTHORS = new Set([
  'dr-elena-vasquez',
  'dr-marcus-chen',
  'dr-sarah-okonkwo',
  'dr-james-whitfield',
  'dr-amira-hassan',
]);

// ── Utilities ─────────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: null, body: content, error: 'Missing frontmatter' };

  const raw = match[1];
  const body = content.slice(match[0].length);
  const meta = {};

  // Simple YAML parser for our flat frontmatter structure
  const lines = raw.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (!keyMatch) {
      i++;
      continue;
    }

    const [, key, rest] = keyMatch;

    if (rest === '' || rest === '|' || rest === '>') {
      // Multi-line or block — try JSON array/object on next lines
      const collected = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].startsWith('\t'))) {
        collected.push(lines[i].trim());
        i++;
      }
      const joined = collected.join('\n');
      try {
        meta[key] = JSON.parse(joined.startsWith('[') || joined.startsWith('{') ? joined : `[${joined}]`);
      } catch {
        meta[key] = collected;
      }
      continue;
    }

    if (rest.startsWith('"') || rest.startsWith("'")) {
      meta[key] = rest.slice(1, -1);
    } else if (rest === 'true' || rest === 'false') {
      meta[key] = rest === 'true';
    } else if (/^\d+$/.test(rest)) {
      meta[key] = parseInt(rest, 10);
    } else if (rest.startsWith('[')) {
      try {
        meta[key] = JSON.parse(rest);
      } catch {
        meta[key] = rest;
      }
    } else {
      meta[key] = rest.replace(/^["']|["']$/g, '');
    }
    i++;
  }

  return { meta, body, error: null };
}

function collectInternalRoutes() {
  const routes = new Set(['/']);

  function walk(dir, prefix = '') {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('_') || entry.name === 'api') continue;
        walk(full, prefix + '/' + entry.name);
      } else if (entry.name.endsWith('.astro')) {
        const name = entry.name.replace(/\.astro$/, '');
        if (name === 'index') {
          routes.add(prefix || '/');
        } else if (name.startsWith('[')) {
          // dynamic route — handled separately via article slugs
        } else {
          routes.add((prefix + '/' + name).replace(/\/+/g, '/'));
        }
      }
    }
  }

  walk(path.join(SRC_DIR, 'pages'));
  return routes;
}

function extractMarkdownLinks(body) {
  const links = [];
  const mdLink = /\[([^\]]*)\]\((\/[^)\s#]+)/g;
  let m;
  while ((m = mdLink.exec(body)) !== null) {
    links.push(m[2]);
  }
  return links;
}

// ── Audit checks ──────────────────────────────────────────────────────────────

const issues = [];
const warnings = [];
let exitCode = 0;

function fail(msg) {
  issues.push(msg);
  exitCode = 1;
}

function warn(msg) {
  warnings.push(msg);
}

console.log('\n🔭 AstraLumen Content Audit\n');
console.log('─'.repeat(50));

// 1. Article count
if (!fs.existsSync(ARTICLES_DIR)) {
  warn(`Articles directory not found: ${ARTICLES_DIR}`);
  warn('Run "npm run generate:articles" to create content.');
} else {
  const articleFiles = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
  console.log(`\n📄 Articles: ${articleFiles.length} found`);

  if (articleFiles.length === 0) {
    warn('No articles found. Expected 100 after running generate:articles.');
  } else if (articleFiles.length < 100) {
    warn(`Article count (${articleFiles.length}) is below target of 100.`);
  }

  const staticRoutes = collectInternalRoutes();
  const articleSlugs = new Set(articleFiles.map((f) => f.replace(/\.md$/, '')));
  const imageUsage = new Map();
  const articles = [];

  for (const file of articleFiles) {
    const slug = file.replace(/\.md$/, '');
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    const { meta, body, error } = parseFrontmatter(content);

    if (error || !meta) {
      fail(`[${slug}] ${error || 'Failed to parse frontmatter'}`);
      continue;
    }

    articles.push({ slug, meta, body });

    // 2. Meta field validation
    for (const field of REQUIRED_META) {
      if (meta[field] === undefined || meta[field] === null || meta[field] === '') {
        fail(`[${slug}] Missing required meta field: ${field}`);
      }
    }

    if (meta.description && meta.description.length < 50) {
      warn(`[${slug}] Description is short (${meta.description.length} chars). Aim for 120–160.`);
    }
    if (meta.description && meta.description.length > 320) {
      warn(`[${slug}] Description is long (${meta.description.length} chars). May truncate in SERPs.`);
    }

    if (meta.seoTitle && meta.seoTitle.length > 70) {
      warn(`[${slug}] seoTitle exceeds 70 characters (${meta.seoTitle.length}).`);
    }

    if (meta.category && !VALID_CATEGORIES.has(meta.category)) {
      fail(`[${slug}] Invalid category: ${meta.category}`);
    }

    if (meta.author && !VALID_AUTHORS.has(meta.author)) {
      fail(`[${slug}] Unknown author: ${meta.author}`);
    }

    if (meta.draft === true) {
      warn(`[${slug}] Marked as draft.`);
    }

    // Date validation
    for (const dateField of ['publishedDate', 'updatedDate']) {
      if (meta[dateField] && !/^\d{4}-\d{2}-\d{2}$/.test(meta[dateField])) {
        fail(`[${slug}] Invalid ${dateField} format: ${meta[dateField]}`);
      }
    }

    if (meta.publishedDate && meta.updatedDate && meta.updatedDate < meta.publishedDate) {
      fail(`[${slug}] updatedDate is before publishedDate.`);
    }

    // 3. Image duplication tracking
    const img = meta.featuredImage;
    if (img) {
      if (!imageUsage.has(img)) imageUsage.set(img, []);
      imageUsage.get(img).push(slug);
    }

    // 4. Internal link checks — relatedArticles
    if (Array.isArray(meta.relatedArticles)) {
      for (const related of meta.relatedArticles) {
        if (!articleSlugs.has(related)) {
          fail(`[${slug}] Broken relatedArticle link: ${related}`);
        }
      }
    }

    // Markdown internal links
    const mdLinks = extractMarkdownLinks(body);
    for (const link of mdLinks) {
      if (link.startsWith('/articles/')) {
        const relatedSlug = link.replace('/articles/', '').replace(/\/$/, '');
        if (!articleSlugs.has(relatedSlug)) {
          fail(`[${slug}] Broken markdown link: ${link}`);
        }
      } else if (
        !staticRoutes.has(link) &&
        !link.match(/^\/(space|astronomy|planets|stars|galaxies|black-holes|earth-science|geology|climate-science|biology|animals|human-body|physics|chemistry|technology-science|science-facts|science-news|experiments|science-tools)(\/|$)/)
      ) {
        // Only warn for non-category static links
        const knownPages = ['/about', '/contact', '/faq', '/search', '/authors', '/privacy-policy', '/terms', '/cookie-policy', '/editorial-policy', '/corrections-policy', '/disclaimer', '/sitemap'];
        if (!knownPages.some((p) => link === p || link.startsWith(p + '/'))) {
          warn(`[${slug}] Unverified internal link: ${link}`);
        }
      }
    }
  }

  // Report duplicate images
  console.log(`\n🖼️  Image duplication check:`);
  let dupCount = 0;
  for (const [url, slugs] of imageUsage) {
    if (slugs.length > 1) {
      dupCount++;
      if (dupCount <= 10) {
        warn(`Image used ${slugs.length} times: ${url.slice(0, 80)}… → ${slugs.slice(0, 3).join(', ')}${slugs.length > 3 ? '…' : ''}`);
      }
    }
  }
  if (dupCount === 0) {
    console.log('   ✓ No duplicate featured images.');
  } else {
    console.log(`   ⚠ ${dupCount} duplicate featured image URL(s) found.`);
  }

  // Category distribution
  const byCategory = {};
  for (const { meta } of articles) {
    byCategory[meta.category] = (byCategory[meta.category] || 0) + 1;
  }
  console.log(`\n📊 Category distribution:`);
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`);
  }
}

// 5. Public asset checks
console.log(`\n📁 Public assets:`);
const requiredAssets = [
  'public/favicon.svg',
  'public/images/logo.svg',
  'public/images/og-default.svg',
  'public/robots.txt',
  'public/.htaccess',
  'public/api/contact.php',
  'public/api/newsletter.php',
];

for (const asset of requiredAssets) {
  const exists = fs.existsSync(path.join(ROOT, asset));
  console.log(`   ${exists ? '✓' : '✗'} ${asset}`);
  if (!exists) fail(`Missing required asset: ${asset}`);
}

const authorAvatars = [
  'elena-vasquez.svg', 'marcus-chen.svg', 'sarah-okonkwo.svg',
  'james-whitfield.svg', 'amira-hassan.svg',
];
for (const avatar of authorAvatars) {
  const p = `public/images/authors/${avatar}`;
  const exists = fs.existsSync(path.join(ROOT, p));
  if (!exists) fail(`Missing author avatar: ${p}`);
}

// 6. Build output check (optional)
if (fs.existsSync(DIST_DIR)) {
  const sitemap = path.join(DIST_DIR, 'sitemap-index.xml');
  const robots = path.join(DIST_DIR, 'robots.txt');
  console.log(`\n🏗️  Build output:`);
  console.log(`   ${fs.existsSync(sitemap) ? '✓' : '✗'} sitemap-index.xml`);
  console.log(`   ${fs.existsSync(robots) ? '✓' : '—'} robots.txt (copied from public/)`);
} else {
  console.log(`\n🏗️  Build output: not found (run "npm run build" to verify)`);
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log('\n' + '─'.repeat(50));

if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.slice(0, 20).forEach((w) => console.log(`   • ${w}`));
  if (warnings.length > 20) console.log(`   … and ${warnings.length - 20} more`);
}

if (issues.length > 0) {
  console.log(`\n❌ Errors (${issues.length}):`);
  issues.slice(0, 20).forEach((e) => console.log(`   • ${e}`));
  if (issues.length > 20) console.log(`   … and ${issues.length - 20} more`);
  console.log('\nAudit FAILED.\n');
  process.exit(1);
}

console.log('\n✅ Audit passed.\n');
process.exit(0);
