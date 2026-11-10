import { copyFile, mkdir, mkdtemp, readdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../', import.meta.url))
const target = await mkdtemp(join(tmpdir(), 'blacnova-website-'))
const files = [
  'index.html', '404.html', 'robots.txt', 'sitemap.xml', 'maintenance.json',
  'site.webmanifest', 'favicon.ico', 'apple-touch-icon.png', 'ai.txt', 'humans.txt', 'llms.txt',
  '46b6af37-9b5b-4e2d-aa49-f4fd87f3d164.txt', '.well-known/security.txt',
  '_headers', '_redirects',
  ...['about', 'intake', 'legal', 'projects'].map(page => `pages/${page}/index.html`),
  ...['about', 'intake', 'legal', 'projects', 'las-cruces-seo',
    'las-cruces-web-design', 'las-cruces-web-development'].map(page => `${page}/index.html`),
]

async function copy(path) {
  const output = join(target, path)
  await mkdir(dirname(output), { recursive: true })
  await copyFile(join(source, path), output)
}

async function copyPublicAssets(folder, types) {
  const entries = await readdir(join(source, folder), { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const path = join(folder, entry.name)
    if (entry.isDirectory()) await copyPublicAssets(path, types)
    else if (entry.isFile() && types.test(entry.name)) await copy(path)
  }
}

await Promise.all(files.map(copy))
await Promise.all([
  copyPublicAssets('img', /\.(?:png|jpe?g|gif|webp|svg)$/),
  copyPublicAssets('ui/img', /\.(?:png|jpe?g|gif|webp|svg)$/),
  copyPublicAssets('ui/js', /\.js$/),
  copyPublicAssets('ui/css', /^(?:styles|money|tailwind|site-menu)\.css$/),
])
console.log(target)
