# Netlify SCSS/CSS fix

This folder removes absolute Windows `@import url(c:\Users\...)` paths from generated CSS files.

Important workflow:

1. Do not use SCSS files that import `.css` files.
2. Wrapper SCSS files now use SCSS imports like `@use "../NavBar";`.
3. Generated `index.css` files contain real CSS, not local Windows imports.
4. Before deploying, run `npm run build`.

If Live Sass Compiler rewrites any CSS with `c:\Users\...`, stop the watcher and replace this `src/scss` folder again.
