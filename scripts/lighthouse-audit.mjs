#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const ROOT = join(import.meta.dirname, '..');
const PORT = 4174;
const OUT = join(ROOT, '.development', 'lighthouse');
mkdirSync(OUT, { recursive: true });

const paths = [
  '/',
  '/las-cruces-web-design/',
  '/las-cruces-web-development/',
  '/las-cruces-seo/',
];

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return;
    } catch {
      /* retry */
    }
    await wait(250);
  }
  throw new Error(`Server not ready at ${url}`);
}

const serve = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['serve', '-l', String(PORT), '.'],
  { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32' }
);

let chrome;
const summary = [];

try {
  await waitForServer(`http://127.0.0.1:${PORT}/`);
  chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  for (const path of paths) {
    const url = `http://127.0.0.1:${PORT}${path}`;
    console.log(`Lighthouse → ${url}`);
    const result = await lighthouse(url, {
      port: chrome.port,
      output: ['json', 'html'],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 412, height: 915, deviceScaleFactor: 2.625, disabled: false },
    });
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([k, v]) => [k, Math.round((v.score || 0) * 100)])
    );
    summary.push({ path, scores });
    const slug = path === '/' ? 'home' : path.replaceAll('/', '').replaceAll('-', '_');
    writeFileSync(join(OUT, `${slug}.json`), result.report[0]);
    writeFileSync(join(OUT, `${slug}.html`), result.report[1]);
    console.log(`  scores:`, scores);
  }

  writeFileSync(join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(`\nReports written to ${OUT}`);
} finally {
  if (chrome) await chrome.kill();
  serve.kill('SIGTERM');
}
