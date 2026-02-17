# Claude Instructions - API Dev Studio Website

**USE BUN INSTEAD OF NPM** | **Do not push to github without user approval**

## Project Context

**URL**: https://apidevstudio.com | **Hosting**: Cloudflare Pages | **Branch**: `master`

```
website/
├── index.html              # Landing page (static, vanilla HTML/CSS/JS)
├── apis.html               # Public API directory (100+ APIs, one-click import)
├── success.html            # Email signup confirmation
├── docs/                   # Pre-built Astro/Starlight docs (don't edit directly)
├── _redirects / _headers   # Cloudflare Pages config
├── sitemap.xml / robots.txt
├── CONTRIBUTING.md / LICENSE (MIT)
└── *.png, *.ico            # Favicons and OG images
```

---

## Deployment

- **Landing page / APIs page**: Edit HTML -> commit -> push to `master` -> auto-deploys
- **Docs**: Source lives in monorepo `docs/`; `website/docs/` is build output — don't edit directly

---

## URL Routing (`_redirects`)

- `/verify/*` -> License worker (`apidevstudio-license.jeff-pegg.workers.dev`)
- `/docs/*` -> Static files from `docs/`

---

## Pricing Tiers

| Tier | Price | Notes |
|------|-------|-------|
| Free | $0 | 3 projects, 10 endpoints, 500 history |
| Pro | $49 one-time | Unlimited, import/export, MCP, tunneling, HTTPS |
| Pro+ | $8/month | CLI, CI/CD, load testing, contract validation |

---

## Design Tokens (from `index.html`)

```
--color-accent: #c8ff00       --color-bg: #0a0a0b
--color-bg-elevated: #131316  --color-bg-card: #18181c
--color-border: #2a2a30       --color-text: #fafafa
--color-text-muted: #8a8a94   --color-text-dim: #5a5a64
--font-display: 'Space Grotesk'
--font-mono: 'JetBrains Mono'
```

---

## Release File Patterns

**Desktop**: `API-Dev-Studio_{version}_x64-setup.exe` / `_aarch64.dmg` / `_amd64.AppImage` / `_amd64.deb`
**CLI**: `apidev-{version}-{target}.{tar.gz|zip}` (tagged `cli-v{version}`)

---

## Things to Avoid

- Don't use CSS frameworks on landing page (keep vanilla)
- Don't edit `docs/` directly (it's build output from monorepo `docs/` source)
- Don't hardcode secrets in code
- Keep landing page style consistent: Space Grotesk + JetBrains Mono, dark theme with `#c8ff00` accent

## Common Issues

| Issue | Solution |
|-------|---------|
| Changes not showing | Purge Cloudflare cache, wait 1-2 min for CDN propagation |

---

Last updated: February 17, 2026
