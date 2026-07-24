import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../src/data/nasa-images-verified.json');

const QUERIES = [
  'galaxy', 'nebula', 'planet', 'mars', 'jupiter', 'saturn', 'earth',
  'sun', 'moon', 'asteroid', 'comet', 'black hole', 'supernova',
  'telescope', 'iss', 'aurora', 'volcano', 'ocean', 'climate',
  'dna', 'cell', 'brain', 'physics', 'chemistry', 'electron',
  'hubble', 'webb', 'solar system', 'milky way', 'exoplanet',
];

async function fetchImages(query, page = 1) {
  const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=50&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.collection?.items || [];
}

async function checkUrl(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return r.ok;
  } catch {
    return false;
  }
}

function toOrigUrl(nasaId) {
  return `https://images-assets.nasa.gov/image/${nasaId}/${nasaId}~orig.jpg`;
}

const seen = new Set();
const images = [];

// Seed with known-good curated images
const CURATED = [
  'PIA12348', 'PIA03153', 'PIA16800', 'PIA19085', 'PIA17563', 'PIA00271',
  'PIA18182', 'PIA19953', 'PIA21449', 'PIA15415', 'PIA04921', 'PIA04213',
  'PIA23645', 'PIA23653', 'PIA18185', 'PIA12235', 'PIA16828', 'PIA16884',
  'GSFC_20171208_Archive_e001435', 'GSFC_20171208_Archive_e000136',
  'GSFC_20171208_Archive_e001219', 'GSFC_20171208_Archive_e001124',
  'GSFC_20171208_Archive_e000709', 'PIA14417', 'PIA04216', 'PIA04220',
  'PIA04225', 'GSFC_20171208_Archive_e001465',
];

for (const id of CURATED) {
  if (!seen.has(id)) {
    seen.add(id);
    images.push({ id, url: toOrigUrl(id), attr: 'NASA', source: 'NASA' });
  }
}

console.log('Fetching from NASA API...');

for (const query of QUERIES) {
  if (images.length >= 120) break;
  try {
    const items = await fetchImages(query);
    for (const item of items) {
      if (images.length >= 120) break;
      const id = item.data?.[0]?.nasa_id;
      const title = item.data?.[0]?.title || id;
      const attr = item.data?.[0]?.center || 'NASA';
      if (!id || seen.has(id)) continue;
      const url = toOrigUrl(id);
      const ok = await checkUrl(url);
      if (ok) {
        seen.add(id);
        images.push({ id, url, title, attr, source: 'NASA' });
        process.stdout.write('.');
      }
    }
  } catch (e) {
    console.warn(`\nQuery failed: ${query}`);
  }
}

console.log(`\nCollected ${images.length} verified images`);

if (images.length < 100) {
  console.error('Not enough images fetched!');
  process.exit(1);
}

fs.writeFileSync(OUT, JSON.stringify(images, null, 2));
console.log(`Saved to ${OUT}`);
