export type ProductExtraCount = 0 | 1 | 2 | 3 | 4 | 5;
export type TirondsShopifyProductId = "batom" | "gloss" | "pack";

export const PRODUCTS_SHOPIFY_CART_BASE_URL = "https://lips-lab.myshopify.com/cart";

export const PRODUCTS_VARIANT_IDS = {
  gloss: {
    0: "49508902502657",
    1: "49508902535425",
    2: "49508902568193",
    3: "49508902600961",
    4: "49508902633729",
    5: "49508902666497",
  },
  batom: {
    0: "49508957389057",
    1: "49508957421825",
    2: "49508957454593",
    3: "49508957487361",
    4: "49508957520129",
    5: "49508957552897",
  },
} as const;

export const TIRONDS_SHOPIFY_PRODUCTS = {
  batom: {
    productId: "9346890137857",
    defaultVariantId: "50298942685441",
    charmsVariantId: null,
  },
  gloss: {
    productId: "9346891055361",
    defaultVariantId: "50298967982337",
    charmsVariantId: "50298967949569",
  },
  pack: {
    productId: "9346891677953",
    defaultVariantId: "50298974535937",
    charmsVariantId: "50298974503169",
  },
} as const;

export function getTirondsShopifyCartTarget(productId: TirondsShopifyProductId, hasCharms = false) {
  const product = TIRONDS_SHOPIFY_PRODUCTS[productId];
  const shopifyVariantId = hasCharms && product.charmsVariantId
    ? product.charmsVariantId
    : product.defaultVariantId;

  return {
    shopifyProductId: product.productId,
    shopifyVariantId,
    shopifyExcludedVariantIds: [],
  };
}
