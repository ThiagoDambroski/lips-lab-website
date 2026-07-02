# Netlify ready fix notes

This src package keeps the current Products page logic and Shopify integration, but fixes the build/style issues reported:

- React imports now use the stable root CSS files for the existing pages.
- Products page keeps its dedicated CSS file.
- Removed unsafe generated CSS paths and avoided absolute Windows paths.
- Checked imported CSS files for missing URL references.
- Fixed the Products page white icon issue by styling the actual current classes: `.products-builder__option-icon` and `.products-builder__option-icon img`.
- Products page SCSS was adjusted to avoid Sass mixed-unit `min()` errors.
- Gloss and Batom Shopify variant configuration remains active.

Recommended before deploying:

```bash
npm run build
```

Do not use Live Sass Compiler to rewrite the CSS before deploying. If you use it, verify that no generated CSS contains a local Windows path such as `C:\Users\...`.
