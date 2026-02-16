# Claude Instructions - API Dev Studio Website

**USE BUN INSTEAD OF NPM** | **Do not push to github without user approval**

## Project Context

**URL**: https://apidevstudio.com | **Hosting**: Cloudflare Pages | **Branch**: `master`

```
website/
├── index.html              # Landing page (static, vanilla HTML/CSS/JS)
├── success.html            # Email signup confirmation
├── docs-src/               # Astro/Starlight documentation source
│   ├── src/content/docs/   # Synced from monorepo docs/ via sync-docs.sh
│   ├── astro.config.mjs
│   └── package.json
├── workers/                # Cloudflare Workers
│   ├── license/            # License key gen/validation (Stripe + Loops)
│   ├── email-subscription/ # Newsletter signup
│   ├── email-automation/   # Scheduled email sender
│   ├── pricing/            # Pricing endpoints
│   └── releases-proxy/     # GitHub releases proxy
├── _redirects / _headers   # Cloudflare Pages config
├── project_notes/          # bugs.md, decisions.md, key_facts.md, issues.md
└── *.png, *.ico            # Favicon and OG images
```

---

## Commands

```bash
cd /c/code/api-dev-studio/website

# Documentation
cd docs-src && bun install && bun run dev      # Dev server
cd docs-src && bun run build                   # Build for production

# Workers
cd workers/license && bun install && bun run dev      # Local test
cd workers/license && bun run deploy                  # Deploy
cd workers/email-automation && bun run deploy          # Deploy
```

## Documentation Workflow

**Always edit `docs/` (monorepo root), never `website/docs-src/` directly.**

```bash
# From monorepo root:
./scripts/sync-docs.sh    # Copies docs/ -> docs-src/, builds, deploys
```

---

## Deployment

- **Landing page**: Edit `index.html` -> commit -> push to `master` -> auto-deploys
- **Docs**: Edit `docs/` -> run `sync-docs.sh` -> auto-deploys
- **Workers**: Edit code -> `bun run dev` (test) -> `bun run deploy`
- **Secrets**: Set via Wrangler CLI or Cloudflare dashboard, use `.dev.vars` locally

---

## Workers API Reference

### License (`workers/license/`)
- `POST /api/license/generate` - Generate key (requires Stripe confirmation)
- `POST /api/license/validate` - Validate key (used by desktop app)
- `POST /api/license/gift` - Create gift license (admin only)

### Email (`workers/email-subscription/`)
- `POST /api/subscribe` - Newsletter signup (double opt-in, Loops)
- `POST /api/unsubscribe` - One-click unsubscribe

---

## Release File Patterns

**Desktop**: `API-Dev-Studio_{version}_x64-setup.exe` / `_aarch64.dmg` / `_amd64.AppImage` / `_amd64.deb`
**CLI**: `apidev-{version}-{target}.{tar.gz|zip}` (tagged `cli-v{version}`)

---

## Things to Avoid

- Don't add third-party scripts or analytics without disclosure (privacy-first)
- Don't use CSS frameworks on landing page (keep vanilla)
- Don't edit `docs-src/src/content/docs/` directly (use monorepo `docs/`)
- Don't hardcode secrets in worker code
- Don't deploy workers without local testing

## Common Issues

| Issue | Solution |
|-------|---------|
| Docs build fails | Clear cache: `rm -rf docs-src/.astro`, reinstall: `bun install --force` |
| Changes not showing | Purge Cloudflare cache, wait 1-2 min for CDN propagation |
| Worker deploy fails | `wrangler whoami` to check auth, `wrangler login` to re-auth |

---

## Project Memory

Check `project_notes/` before proposing changes:
- **bugs.md** - Known bugs and solutions
- **decisions.md** - ADRs with context
- **key_facts.md** - Config, URLs, build commands
- **issues.md** - Work log

---

Last updated: February 8, 2026
