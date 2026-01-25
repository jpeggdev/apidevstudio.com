# Work Log - apidevstudio.com

## 2026-01-25: CLI Download Link Implementation
- **Status**: Complete
- **Description**: Added CLI download button below GUI download on landing page
- **Details**:
  - Auto-detects OS (Windows, macOS ARM/Intel, Linux)
  - Dropdown for selecting other platforms
  - Fetches from GitHub releases with `cli-v*` tag format
  - Smaller/secondary styling compared to GUI button
- **Note**: CLI release must be published (not draft) to appear

## 2026-01-25: Documentation Site Setup
- **Status**: Complete
- **Description**: Set up Starlight docs at /docs/
- **Details**:
  - Custom CSS matching landing page theme
  - Fixed button/link contrast issues
  - Added _redirects for Cloudflare routing
  - Added Docs link to landing page navigation

## 2026-01-25: Fixed Astro Output Directory
- **Status**: Complete
- **Description**: Changed Astro to output to `./dist` instead of `../docs`
- **Reason**: Previous config was overwriting files in docs folder

## TODO
- [ ] Create deploy script to copy `docs-src/dist/*` to `docs/`
- [ ] Recreate lost documentation files from docs folder
