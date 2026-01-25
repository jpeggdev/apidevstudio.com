# Architectural Decisions - apidevstudio.com

## ADR-001: Use Starlight for Documentation
- **Date**: 2026-01
- **Decision**: Use Astro Starlight framework for documentation site
- **Context**: Needed a documentation site that matches the landing page theme
- **Consequences**:
  - Docs are built separately from landing page
  - Custom CSS required to match brand colors
  - Build output goes to `docs-src/dist/`, then deployed to `docs/`

## ADR-002: Astro Output Directory
- **Date**: 2026-01-25
- **Decision**: Changed Astro `outDir` from `../docs` to `./dist`
- **Context**: Building directly to `../docs` was overwriting non-Astro files in that folder
- **Consequences**:
  - Must manually copy `docs-src/dist/*` to `docs/` after build
  - Prevents accidental file loss
  - Need deploy script or manual step

## ADR-003: Cloudflare Pages Routing
- **Date**: 2026-01
- **Decision**: Use `_redirects` file for SPA + static docs routing
- **Context**: Landing page is SPA, docs are static Astro files
- **Configuration**:
  ```
  /docs/* /docs/:splat 200
  /* /index.html 200
  ```

## ADR-004: Dual Download Links (GUI + CLI)
- **Date**: 2026-01-25
- **Decision**: Add CLI download as secondary option below GUI download
- **Context**: CLI is separate release with different tag format (`cli-v*`)
- **Implementation**: OS auto-detection with dropdown for other platforms
