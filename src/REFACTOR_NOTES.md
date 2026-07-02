# Full src refactor notes

## Scope

This version keeps the original logic and visual class names while improving code organization across the rest of the src folder.

## Main changes

- Split page logic into smaller feature components.
- Moved repeated/static page content into data files.
- Moved cart Shopify helpers, queue helpers, symbols, and labels into dedicated files.
- Moved gift card Shopify permalink logic and option config into dedicated files.
- Added shared hooks and utilities for body scroll locking, keyboard activation, and JSON storage.
- Reorganized page SCSS into feature folders with index files.
- Kept compiled CSS output for visual safety.
- Updated page imports to the new SCSS folders.
- Kept the CreateBatom refactor from the previous step.

## Validation

- TypeScript and TSX syntax was checked with TypeScript transpilation.
- Relative code imports were checked.
- The assets folder is still expected to stay in the project because it was not included in the uploaded archive.
