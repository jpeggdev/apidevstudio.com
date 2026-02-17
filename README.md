# API Dev Studio Website

**The marketing site and documentation for API Dev Studio** - Mocks, webhooks, and proxies in one app.

---

## Live Site

**Production URL**: https://apidevstudio.com

**Hosting**: Cloudflare Pages (auto-deploys from `master` branch)

---

## Structure

```
website/
├── index.html              # Landing page (static, vanilla HTML/CSS/JS)
├── apis.html               # Public API directory page
├── success.html            # Email signup confirmation
├── docs/                   # Built documentation (Astro/Starlight output)
│   ├── getting-started/    # Installation & first project
│   ├── features/           # Feature docs (mocks, webhooks, proxy, etc.)
│   ├── reference/          # CLI, keyboard shortcuts, settings
│   ├── troubleshooting/    # Common issues
│   └── collections/        # Schema definitions
├── _redirects              # Cloudflare Pages routing
├── _headers                # Content-type headers
├── sitemap.xml             # Landing page sitemap
├── robots.txt              # Crawler config
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # MIT License
└── *.png, *.ico            # Favicons and OG images
```

---

## Pages

### Landing Page (`index.html`)

Product marketing, feature showcase, pricing, and download links.

- Vanilla HTML, CSS, JavaScript (no frameworks)
- Responsive design
- Platform-specific download detection
- Newsletter signup (Loops integration)
- Google Analytics (`G-VBWT6X0PNM`)
- Structured data (SoftwareApplication + FAQPage)

### Public API Directory (`apis.html`)

Browsable directory of 100+ public APIs with one-click import into API Dev Studio.

### Documentation (`docs/`)

Pre-built Astro/Starlight static site. Source lives in the monorepo `docs/` directory and is synced/built separately.

**Sections**: Getting Started, Features (24 guides), Reference, Troubleshooting

---

## Pricing (as shown on site)

| Tier | Price | Key Features |
|------|-------|-------------|
| Free | $0 | 3 projects, 10 endpoints each, 500 request history |
| Pro | $49 one-time | Unlimited everything, import/export, MCP, tunneling, HTTPS |
| Pro+ | $8/month | CLI tools, CI/CD integration, load testing, contract validation |

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#c8ff00` | CTAs, links, highlights |
| `--color-bg` | `#0a0a0b` | Primary background |
| `--color-bg-elevated` | `#131316` | Elevated surfaces |
| `--color-bg-card` | `#18181c` | Cards |
| `--color-border` | `#2a2a30` | Borders |
| `--color-text` | `#fafafa` | Primary text |
| `--color-text-muted` | `#8a8a94` | Secondary text |

### Typography

- **Display**: Space Grotesk (headings)
- **Mono**: JetBrains Mono (body, code)

---

## Development

### Landing Page

No build step. Open `index.html` in a browser or push to `master` to deploy.

### Documentation

Documentation source lives in the monorepo `docs/` directory. The `docs/` folder in this repo is pre-built output — do not edit directly.

---

## Deployment

- **Landing page / APIs page**: Edit HTML -> commit -> push to `master` -> auto-deploys
- **Docs**: Built from monorepo `docs/` source, output committed to `docs/`

### URL Routing

- `/` -> `index.html`
- `/apis` -> `apis.html`
- `/docs/*` -> `docs/` (static files)
- `/verify/*` -> License worker (Cloudflare Workers proxy)

---

## SEO

**Title**: "API Dev Studio - Mocks, Webhooks, and Proxies in One App"

**Description**: "API Dev Studio — Free desktop app for mocking APIs, catching webhooks, and proxying requests. Built with Rust + Tauri. No cloud, no subscription. Pro from $49 one-time."

**OG Images**: `og-image.png` (main), `og-apis.png` (API directory)

**Sitemaps**: `sitemap.xml` (landing), `docs/sitemap-index.xml` (docs)

---

## Links

- **Live Site**: https://apidevstudio.com
- **Documentation**: https://apidevstudio.com/docs/
- **API Directory**: https://apidevstudio.com/apis
- **GitHub**: https://github.com/jpeggdev/api-dev-studio
- **Twitter**: @jpegg_dev

---

## License

MIT License - Copyright (c) 2025-2026 Jeff Pegg

---

Last updated: February 17, 2026
