import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../src/content/articles');

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
const articles = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const url = content.match(/featuredImage: "([^"]+)"/)?.[1];
  if (url) articles.push({ file: f, url });
}

async function check(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (r.ok) return true;
    const r2 = await fetch(url, { method: 'GET', redirect: 'follow' });
    return r2.ok;
  } catch {
    return false;
  }
}

const broken = [];
const ok = [];

for (const a of articles) {
  const valid = await check(a.url);
  process.stdout.write(valid ? '.' : 'X');
  if (valid) ok.push(a.url);
  else broken.push(a);
}

console.log(`\n\nOK: ${articles.length - broken.length}, Broken: ${broken.length}`);
broken.forEach((b) => console.log(`  ${b.file}: ${b.url}`));

fs.writeFileSync(
  path.join(__dirname, '../src/data/broken-images.json'),
  JSON.stringify(broken, null, 2)
);
