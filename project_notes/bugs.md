# Bug Log - apidevstudio.com

## 2026-01-25: Docs custom CSS not visually applying
- **Symptom**: Docs site showed default Starlight white theme instead of custom dark theme
- **Investigation**: Confirmed customCss WAS being compiled into output correctly
- **Cause**: Cache issue (browser or CDN) serving old CSS
- **Solution**: Hard refresh or clear Cloudflare cache
- **Prevention**: Use cache-busting hashes in CSS filenames (Astro does this automatically)

## 2026-01-25: Button text unreadable on docs site
- **Symptom**: Green/lime buttons had same color text as background
- **Cause**: Starlight default button styles didn't account for lime accent color
- **Solution**: Added `!important` override in custom.css:
  ```css
  .sl-link-button { color: #0a0a0b !important; }
  ```

## 2026-01-25: Astro build overwrote docs folder contents
- **Symptom**: Files in `docs/` folder were deleted by Astro build
- **Cause**: `outDir: '../docs'` in astro.config.mjs completely replaces output folder
- **Data Lost**: Multiple files that were in .gitignore (not recoverable)
- **Solution**: Changed `outDir` to `./dist` to prevent overwrites
- **Prevention**: Never output directly to folders containing other content
