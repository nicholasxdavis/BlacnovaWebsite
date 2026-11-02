# Blacnova SEO runbook (www + blog)

## Canonical hosts
- Main: `https://www.blacnova.net` (never `.com` in meta)
- Blog: `https://blog.blacnova.net`

## After every deploy
1. Confirm key file is live:
   - `https://www.blacnova.net/46b6af37-9b5b-4e2d-aa49-f4fd87f3d164.txt`
   - `https://blog.blacnova.net/46b6af37-9b5b-4e2d-aa49-f4fd87f3d164.txt`
2. Ping IndexNow:
   ```bash
   cd BlacnovaWebsite && npm run indexnow
   cd BlacnovaBlog && npm run indexnow
   ```
3. In Google Search Console (both properties):
   - Submit `sitemap.xml`
   - Request indexing for money pages
4. In Bing Webmaster Tools: import GSC or submit sitemap + IndexNow

## Money pages (rank targets)
- `/las-cruces-web-design/`
- `/las-cruces-web-development/`
- `/las-cruces-seo/`
- Blog pillars under `/blogs/...`

## Audits
```bash
npm run audit:seo
npm run audit:lighthouse
```

## NAP (current)
- Phone: `(575) 270-1276` / `tel:+15752701276` / schema `+1-575-270-1276`
- Email: `nic@blacnova.net`
- Service area: Las Cruces, El Paso, and surrounding areas

## Still needed for local pack (manual)
- Street address if you want a pin-level local pack (optional for service-area business)
- Google Business Profile claimed + linked to www.blacnova.net
- 301 `blacnova.com` → `blacnova.net` at DNS/Cloudflare if you own `.com`
- Compress `ui/img/hero.png` (~11MB) for performance
- Unique 1200×630 OG images per money page
