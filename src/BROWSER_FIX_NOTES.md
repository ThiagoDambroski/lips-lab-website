# Browser visual fix

Fixed the online experience page and the images that were showing black backgrounds in the browser.

## Changes

- Added a scoped `online-experience-page` wrapper to the online experience route.
- Added scoped CSS for the shared `HowItWorksSection` inside the online experience page, so the video no longer renders huge/uncontrolled.
- Restored transparent SVG/PNG assets for the product displays that were incorrectly converted to WebP and caused black backgrounds.
- Updated imports for online product cards, CreateBatom product selection, experience carousel products, and the Lips step badge.
- Removed the accidental `assets.zip` file from inside `src`.

## Notes

The performance optimization is still mostly preserved, but transparent product/mockup assets were restored to their original formats because those specific WebP conversions broke the visual design.
