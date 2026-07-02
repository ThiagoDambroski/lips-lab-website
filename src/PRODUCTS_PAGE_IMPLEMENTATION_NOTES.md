# Products page implementation

This version restores the CSS entry files so the browser does not load raw Sass `@use` statements.

The Products page now includes:
- Initial product selection for Lip Gloss and Batom.
- Product builder inside the Products page.
- Color selection.
- Optional extras priced at +2€ each:
  - Glitter
  - Aroma/essência
  - Aditivo
  - Gravação na embalagem
  - Charms
- Total price updates automatically.
- Adds the configured item to the local cart and sends all selected properties forward.
- Lip Oil is not included.

Important Shopify note:
The frontend sends the selected extras as line-item properties. Shopify must still have the correct base product/variant pricing configured if the checkout amount needs to match the dynamic frontend total exactly.
