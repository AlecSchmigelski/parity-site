# Parity marketing site

The landing page from the design handoff, built with Next.js (App Router) as static files.

```bash
npm install
```

```bash
npm run dev
```

`npm run build` writes the static site to `out/`, which any static host can serve.

| To change | Edit |
| --- | --- |
| Copy and section data | `lib/content.ts` |
| Where the calls to action go | `links` in `lib/config.ts` (all `#` for now) |
| Hero visual, auto-cycling, stats row | `NEXT_PUBLIC_HERO_VISUAL=collapse`, `NEXT_PUBLIC_AUTO_CYCLE=false`, `NEXT_PUBLIC_SHOW_STATS=false` at build time |

Numbers, names, account IDs and code identifiers on the page are illustrative placeholders from the handoff. Confirm them with product before launch.

## Deployment

Pushing to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`. The workflow sets `NEXT_PUBLIC_NOINDEX=true`, which asks search engines not to index the page. The site is still public to anyone with the link. Remove that setting at launch.
