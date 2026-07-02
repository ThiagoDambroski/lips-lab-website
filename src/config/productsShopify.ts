export type ProductExtraCount = 0 | 1 | 2 | 3 | 4 | 5;

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
