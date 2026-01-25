# Key Facts - apidevstudio.com

## Project Overview
- **Purpose**: Landing page and documentation site for API Dev Studio
- **URL**: https://apidevstudio.com
- **Hosting**: Cloudflare Pages

## Repository Structure
```
C:\code\apidevstudio.com\
├── index.html          # Main landing page (SPA)
├── docs/               # Built documentation (from docs-src)
├── docs-src/           # Astro/Starlight documentation source
│   ├── src/
│   │   ├── content/docs/   # Markdown documentation files
│   │   ├── styles/custom.css
│   │   └── assets/         # Logo files
│   ├── astro.config.mjs
│   └── dist/           # Astro build output
├── _redirects          # Cloudflare Pages routing
├── robots.txt
└── sitemap.xml
```

## URLs
- Landing page: https://apidevstudio.com
- Documentation: https://apidevstudio.com/docs/
- GitHub: https://github.com/apidevstudio/apidevstudio

## Build Commands
- **Docs build**: `cd docs-src && npm run build`
- **Output**: `docs-src/dist/` (must be copied to `docs/` for deployment)

## GitHub Releases
- GUI releases: Tag format `v${VERSION}` (e.g., v0.3.12)
- CLI releases: Tag format `cli-v${VERSION}` (e.g., cli-v0.1.1)

## CLI Download File Patterns
- Windows: `apidev-{version}-x86_64-pc-windows-msvc.zip`
- macOS ARM: `apidev-{version}-aarch64-apple-darwin.tar.gz`
- macOS Intel: `apidev-{version}-x86_64-apple-darwin.tar.gz`
- Linux: `apidev-{version}-x86_64-unknown-linux-gnu.tar.gz`

## Theme Colors
- Primary accent: `#c8ff00` (lime green)
- Background: `#0a0a0b`
- Secondary background: `#131316`
