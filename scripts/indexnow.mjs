#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex, Seznam, Naver, etc.) with key URLs.
 * Usage:
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs https://www.blacnova.net/las-cruces-seo/
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(__dirname, 'indexnow-key.json'), 'utf8'));

const DEFAULT_URLS = [
  'https://www.blacnova.net/',
  'https://www.blacnova.net/las-cruces-web-design/',
  'https://www.blacnova.net/las-cruces-web-development/',
  'https://www.blacnova.net/las-cruces-seo/',
  'https://www.blacnova.net/pages/about/',
  'https://www.blacnova.net/pages/projects/',
  'https://www.blacnova.net/pages/intake/',
  'https://www.blacnova.net/sitemap.xml',
];

const argUrls = process.argv.slice(2).filter((u) => u.startsWith('http'));
const urlList = argUrls.length ? argUrls : DEFAULT_URLS;

const payload = {
  host: cfg.host,
  key: cfg.key,
  keyLocation: cfg.keyLocation,
  urlList,
};

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

let ok = 0;
for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const body = await res.text();
    console.log(`${endpoint} → ${res.status} ${body.slice(0, 200)}`);
    if (res.status === 200 || res.status === 202) ok += 1;
  } catch (err) {
    console.error(`${endpoint} → error:`, err.message);
  }
}

console.log(`Submitted ${urlList.length} URL(s). ${ok}/${endpoints.length} endpoints accepted.`);
process.exit(ok > 0 ? 0 : 1);
