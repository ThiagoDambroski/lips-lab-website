# Performance pass 1

## What changed

- Added optimized WebP versions for the heavy raster assets used by the site.
- Converted heavy visual SVG exports to WebP when they behaved like images instead of lightweight icons.
- Updated current imports to use optimized WebP assets where it was safe.
- Removed original heavy image files when the current source no longer referenced them.
- Reduced `src/assets` from about 61 MB to about 20 MB.
- Removed old `.eot`, `.ttf`, `.woff`, demo font files, and unused font stylesheet from the active asset folder.
- Centralized active font loading to WOFF2-only declarations in `src/index.css` and `src/scss/base`.
- Removed duplicate `@font-face` blocks from feature SCSS/CSS files.
- Moved product-builder option data out of `AppProvider` into `src/Functions/CreateBatomBox/data/builderOptions.ts`.
- Lazy-loaded `CreateBatomBox` inside the online experience page so builder-specific assets are not requested until the user opens the builder.
- Added safer image loading attributes to many images without changing their visual classes.
- Added `public/_headers` with cache rules for Netlify.

## Important

The original project archive did not include package/build config, so a real production build could not be executed here. TypeScript/TSX transpilation and relative import checks were completed successfully.

## After replacing files

Run these locally in the real project root:

```bash
npm install
npm run build
npm run preview
```

Then test the deployed site with Lighthouse/PageSpeed and compare LCP, INP, CLS, total JS, and image transfer size.
