import type { BaseOptions, EsenceOptions, SmelltOptions, TypesOptions } from "../Types";
import { GLITTER_LABELS } from "../constants/glitterLabels";
import { getProductConfig, SHOPIFY_SHOP_URL } from "../constants/productConfig";

export type ProductGlitterValue = number | string | null | undefined;

export type ShopifyProductPayload = {
  id: number;
  type: TypesOptions;
  glitter: ProductGlitterValue;
  base: BaseOptions;
  smell: SmelltOptions;
  aditive: string;
  esence: EsenceOptions;
  boxText: string;
  boxFont: string;
  boxImage: string;
  batomFormat: string;
};

function safeString(value: unknown): string | null {
  if (value === null || value === undefined) return null;

  const stringValue = String(value).trim();

  return stringValue.length ? stringValue : null;
}

function toBase64Url(input: string): string {
  const utf8 = encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  const base64 = btoa(utf8);

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function resolveGlitterLabel(glitter: ProductGlitterValue): string {
  const value = glitter ?? "none";

  if (typeof value === "number") {
    return GLITTER_LABELS[value] ?? String(value);
  }

  return String(value);
}

export function buildShopifyPermalink(
  product: ShopifyProductPayload,
  selectedColorsSub: string,
  finalColorHex: string
): string {
  const variantId = getProductConfig(product.type).variantId;
  const properties: Record<string, string> = {
    type: safeString(product.type) ?? "none",
    selected_colors_sub: safeString(selectedColorsSub) ?? "none",
    final_color_hex: safeString(finalColorHex) ?? "none",
    glitter: resolveGlitterLabel(product.glitter),
    base: safeString(product.base) ?? "none",
    smell: safeString(product.smell) ?? "none",
    aditive: safeString(product.aditive) ?? "none",
    esence: safeString(product.esence) ?? "none",
    boxText: safeString(product.boxText) ?? "none",
    boxImage: safeString(product.boxImage) ?? "none",
    boxFont: safeString(product.boxFont) ?? "none",
    batomFormat: safeString(product.batomFormat) ?? "none",
    lipslab_item_id: safeString(product.id) ?? "none",
  };
  const encodedProperties = toBase64Url(JSON.stringify(properties));

  return `${SHOPIFY_SHOP_URL}/cart/${variantId}:1?properties=${encodedProperties}`;
}

export function goToShopify(url: string) {
  window.location.assign(url);
}
