# Accessibility Pass 1 and 2

This pass keeps the existing visual design and logic while improving keyboard access, modal behavior, and screen-reader semantics.

## Added

- `src/hooks/useFocusTrap.ts`
- Focus trapping for product builder info dialogs.
- Focus trapping for glitter preview dialogs.
- Focus trapping for the font selector dialog.
- Focus trapping for the gift card personalization modal.
- Escape-to-close behavior through the focus trap.
- Focus return to the previously active element after dialogs close.

## Improved

- Additive options now expose `role="button"`, `tabIndex`, `aria-pressed`, and keyboard selection.
- Base options now expose `role="button"`, `tabIndex`, `aria-pressed`, and keyboard selection.
- Glitter options now expose `role="button"`, `tabIndex`, `aria-pressed`, and keyboard selection.
- Product selection group now has a clearer accessible label.
- Color creation buttons now use Portuguese accessible names.
- Automatic color selection images are now keyboard usable.
- Engraving symbols now expose selected state with `aria-pressed`.
- Purchase summary edit areas are now keyboard usable and have edit labels.
- Decorative icons/images now use empty alt text and `aria-hidden` where appropriate.

## Not changed

- Product logic.
- Shopify payload logic.
- Product step order.
- Existing visual class names.
- Existing CSS visual output.
- Asset paths.
