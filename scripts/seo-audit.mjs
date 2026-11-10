#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const requiredRoot = [
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'humans.txt',
  'ai.txt',
  'site.webmanifest',
  'CNAME',
  '.nojekyll',
  '46b6af37-9b5b-4e2d-aa49-f4fd87f3d164.txt',
  '.well-known/security.txt',
  'img/og-default.png',
];

const issues = [];
const ok = [];

for (const f of requiredRoot) {
  const p = join(ROOT, f);
  if (existsSync(p)) ok.push(`root:${f}`);
  else issues.push(`MISSING ${f}`);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walk(ROOT);
for (const file of htmlFiles) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  if (rel === '404.html') continue;
  // skip redirect stubs (noindex)
  if (
    [
      'about/index.html',
      'projects/index.html',
      'tools/index.html',
      'intake/index.html',
      'legal/index.html',
      'color-palette-generator/index.html',
      'qr-generator/index.html',
      'pfp-previewer/index.html',
      'ssl-checker/index.html',
      'font-finder/index.html',
    ].includes(rel)
  ) {
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (html.includes('blacnova.com')) issues.push(`${rel}: still references blacnova.com`);
  if (html.includes('575-123-4567')) issues.push(`${rel}: placeholder phone still present`);
  if (!html.includes('rel="canonical"') && !html.includes("rel='canonical'")) {
    issues.push(`${rel}: missing canonical`);
  }
  if (!/application\/ld\+json/.test(html) && !rel.includes('404')) {
    // redirect stubs already skipped; landers + main pages should have JSON-LD
    if (
      rel === 'index.html' ||
      rel.startsWith('las-cruces-') ||
      rel.startsWith('pages/')
    ) {
      issues.push(`${rel}: missing JSON-LD`);
    }
  }
  if (/og:image[^>]+hero\.png|twitter:image[^>]+hero\.png|content="[^"]*\/img\/hero\.png"/.test(html)) {
    issues.push(`${rel}: social meta still points at /img/hero.png`);
  }
}

console.log(`SEO audit — checked ${htmlFiles.length} HTML files`);
for (const line of ok) console.log(`  OK  ${line}`);
if (issues.length) {
  console.log('\nIssues:');
  for (const i of issues) console.log(`  !!  ${i}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
