# API Dev Studio Website

**The marketing site and documentation for API Dev Studio** - The all-in-one local API development tool.

---

## 🌐 Live Site

**Production URL**: https://apidevstudio.com

**Hosting**: Cloudflare Pages (auto-deploys from `master` branch)

---

## 📁 Structure

This repository contains three main components:

### 1. Landing Page (`index.html`)

**Type**: Static HTML site (no build step)

**Purpose**: Product marketing, feature showcase, download links

**Tech**: Vanilla HTML, CSS, JavaScript

**Key Features**:
- Responsive design (mobile-first)
- Platform-specific download detection
- Newsletter signup integration
- Fast load times (static assets only)
- SEO optimized

**File locations**:
- `index.html` - Main landing page
- `*.png`, `*.ico` - Favicons and OG images
- `_redirects` - Cloudflare Pages routing
- `_headers` - Security headers (CSP, HSTS, etc.)

### 2. Documentation (`docs-src/` → `docs/`)

**Type**: Astro + Starlight static site

**Purpose**: Product documentation, guides, API reference

**Tech**: Astro 4.x, Starlight theme, Markdown

**Key Features**:
- Auto-generated navigation
- Full-text search
- Dark/light themes
- Fast static site generation
- Mobile-responsive

**Workflow**:
1. Edit markdown in `docs-src/src/content/docs/`
2. Build with `bun run build` (in `docs-src/`)
3. Output goes to `docs-src/dist/`
4. Copy `dist/` to `docs/` for deployment

**Important**: Always edit `docs-src/`, never edit `docs/` directly (it's the build output).

### 3. Cloudflare Workers (`workers/`)

**Type**: Serverless functions

**Purpose**: License validation, email automation, API endpoints

**Tech**: TypeScript, Cloudflare Workers runtime

**Workers**:
- `license/` - License key generation, validation, gift codes (Stripe integration)
- `email-automation/` - Newsletter subscriptions, onboarding emails (Loops integration)

**Deployment**: Via Wrangler CLI (`bun run deploy` in each worker directory)

---

## 💻 Tech Stack

### Landing Page
- HTML5, CSS3, JavaScript (ES6+)
- No frameworks (intentionally simple)
- Cloudflare Pages hosting
- Cloudflare CDN

### Documentation
- [Astro](https://astro.build/) 4.x - Static site generator
- [Starlight](https://starlight.astro.build/) - Documentation theme
- Markdown/MDX - Content format
- TypeScript - Configuration
- Cloudflare Pages hosting

### Workers
- TypeScript
- Cloudflare Workers runtime
- Integrations: Stripe, Loops, KV Storage
- Wrangler CLI for deployment

---

## 🚀 Development

### Prerequisites

- **Bun** (preferred) or npm
- **Node.js** 18+ (for Astro)
- **Git**
- **Wrangler CLI** (for workers): `bun add -g wrangler`

### Setup

```bash
# Clone repository (if not part of monorepo)
git clone https://github.com/jpeggdev/apidevstudio.com.git
cd apidevstudio.com

# Documentation: Install dependencies
cd docs-src
bun install

# Workers: Install dependencies (per worker)
cd workers/license
bun install
cd ../email-automation
bun install
```

### Local Development

**Landing Page**:
```bash
# Open index.html in browser (no dev server needed)
open index.html  # macOS
start index.html # Windows
```

**Documentation**:
```bash
cd docs-src
bun run dev
# Open http://localhost:4321/docs/
```

**Workers**:
```bash
cd workers/license
bun run dev
# Test at http://localhost:8787
```

### Building for Production

**Documentation**:
```bash
cd docs-src
bun run build
# Output: docs-src/dist/

# Copy to deployment directory
# (Manual step - could be scripted)
```

**Workers**:
```bash
cd workers/license
bun run deploy
# Deploys to Cloudflare Workers
```

**Landing Page**:
- No build step required (static HTML)
- Just commit and push to `master`

---

## 🚢 Deployment

### Cloudflare Pages

**Auto-deployment**: Pushes to `master` branch auto-deploy to production

**Configuration**:
- Build command: None (static files)
- Output directory: `/` (root)
- Environment: Production

**URL Routing**:
- `/` → `index.html` (landing page)
- `/docs/` → `docs/` directory (built documentation)

### Cloudflare Workers

**Manual deployment** (per worker):
```bash
cd workers/{worker-name}
bun run deploy
```

**Environment variables**: Set via Wrangler CLI or Cloudflare dashboard
- `STRIPE_SECRET_KEY`
- `LOOPS_API_KEY`
- `LICENSE_SIGNING_KEY`

**Never commit secrets** - use `.dev.vars` for local testing (gitignored)

---

## 📝 Content Updates

### Landing Page Copy

**Edit**: `index.html`

**Common updates**:
- Version numbers (download links)
- Feature descriptions
- Testimonials
- Pricing information

**Testing**: Open in browser, check responsive design

**Deploy**: Commit and push to `master`

### Documentation

**Edit**: `docs-src/src/content/docs/*.md`

**Structure**:
```
docs-src/src/content/docs/
├── index.mdx              # Docs homepage
├── getting-started/
│   ├── installation.md
│   └── quickstart.md
├── features/
│   ├── mock-apis.md
│   ├── webhooks.md
│   └── proxy-recording.md
└── reference/
    ├── cli.md
    └── api.md
```

**Workflow**:
1. Edit markdown files
2. Test locally: `bun run dev`
3. Build: `bun run build`
4. Copy `docs-src/dist/` to `docs/`
5. Commit both `docs-src/` and `docs/`
6. Push to `master`

**Tips**:
- Use frontmatter for page metadata (title, description, sidebar position)
- Add code blocks with syntax highlighting
- Include screenshots for UI features
- Cross-link related pages

### Workers (API Changes)

**Edit**: `workers/{worker-name}/src/*.ts`

**Testing**:
```bash
bun run dev  # Local test server
# Test endpoints manually or with scripts
```

**Deploy**:
```bash
bun run deploy
# Verify production endpoint works
```

---

## 🎨 Design System

### Colors

**Primary Accent**: `#c8ff00` (lime green)
- CTAs, links, highlights

**Backgrounds**:
- `#0a0a0b` (primary)
- `#131316` (secondary)
- `#1a1a1d` (tertiary/cards)

**Text**:
- `#ffffff` (primary)
- `#a0a0a0` (secondary)
- `#666666` (muted)

### Typography

**Font Stack**: System fonts (San Francisco, Segoe UI, Roboto, Helvetica, Arial)

**Sizes**:
- H1: 3rem (48px)
- H2: 2rem (32px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)

### Spacing

**Base Unit**: 8px (0.5rem)
- Use increments: 0.5rem, 1rem, 1.5rem, 2rem, 4rem

---

## 🔍 SEO

### Meta Tags (Landing Page)

**Title**: "API Dev Studio - The All-in-One Local API Development Tool"

**Description**: "Mock APIs, receive webhooks, and proxy real APIs with a beautiful unified interface. Local-first, privacy-focused, and open source."

**OG Image**: `/og-image.png` (1200x630px)

### Sitemap & Robots

- `sitemap.xml` - Auto-generated or manual
- `robots.txt` - Allow all

### Performance Targets

- Lighthouse score: 95+ (all categories)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

---

## 🔐 Security

### Headers (`_headers`)

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS

- Cloudflare enforces HTTPS
- HSTS enabled
- Auto-redirect HTTP → HTTPS

### Worker Security

- API keys in Cloudflare secrets (never committed)
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- CORS configured per endpoint

---

## 📦 Project Memory

This project uses a `project_notes/` directory for institutional knowledge:

- `bugs.md` - Bug log and solutions
- `decisions.md` - Architectural decisions (ADRs)
- `key_facts.md` - Configuration, URLs, colors, commands
- `issues.md` - Work log and status

**See `CLAUDE.md` for AI assistant instructions and full context.**

---

## 📞 Links

- **Live Site**: https://apidevstudio.com
- **GitHub (Website)**: https://github.com/jpeggdev/apidevstudio.com
- **GitHub (Desktop App)**: https://github.com/jpeggdev/api-dev-studio
- **Twitter**: @jpegg_dev

---

## 📄 License

License TBD (will be determined before v1.0 launch)

---

**Built with care for developers**

Last updated: January 29, 2026
