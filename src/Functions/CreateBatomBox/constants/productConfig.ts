import type { TypesOptions } from "../Types";
import pinkGloss from "../../../assets/gloss pink.svg";
import finalBatom from "../../../assets/final batom.svg";

export type ProductKey = Exclude<TypesOptions, undefined>;

export type ProductConfig = {
  type: ProductKey;
  label: string;
  displayName: string;
  variantId: number;
  previewImage: string;
  summaryClassName?: string;
};

export const SHOPIFY_SHOP_URL = "https://lips-lab.myshopify.com";
export const CREATE_BATOM_PRICE = 35;
export const DEFAULT_BOX_FONT = "century-gothic";

export const PRODUCT_CONFIG: Record<ProductKey, ProductConfig> = {
  gloss: {
    type: "gloss",
    label: "GLOSS",
    displayName: "GLOSS LABIAL",
    variantId: 47048949006593,
    previewImage: pinkGloss,
  },
  batom: {
    type: "batom",
    label: "BATOM",
    displayName: "BATOM",
    variantId: 47049932833025,
    previewImage: finalBatom,
  },
  oil: {
    type: "oil",
    label: "LIP OIL",
    displayName: "LIP OIL",
    variantId: 48760459821313,
    previewImage: pinkGloss,
    summaryClassName: "purchase-summary-oil",
  },
};

export const FALLBACK_PRODUCT_TYPE: ProductKey = "gloss";

export function getProductConfig(type: TypesOptions): ProductConfig {
  return PRODUCT_CONFIG[type ?? FALLBACK_PRODUCT_TYPE];
}
