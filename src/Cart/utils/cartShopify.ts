import { SHOPIFY_SHOP_URL } from "../../config/site";
import { safeString, toBase64Url } from "../../utils/string";
import { GLITTER_LABELS, SHOPIFY_BATOM_VARIANT_ID, SHOPIFY_GLOSS_VARIANT_ID } from "../constants/cartConfig";
import type { CartProduct } from "./cartTypes";

function buildLineItemProperties(item: CartProduct): Record<string, string> {
  const props: Record<string, string> = {};

  const put = (key: string, value: unknown) => {
    const normalized = safeString(value);
    if (!normalized) return;
    props[key] = normalized;
  };

  put("type", item.type);
  put("color", item.color);
  put("selected_colors_sub", (item as any).selected_colors_sub);
  put("final_color_hex", (item as any).final_color_hex);

  if (typeof (item as any).glitter === "number") {
    const glitter = (item as any).glitter as number;
    put("glitter", GLITTER_LABELS[glitter] ?? String(glitter));
  } else {
    put("glitter", (item as any).glitter);
  }

  put("base", item.base);
  put("smell", item.smell);
  put("aditive", item.aditive);
  put("esence", item.esence);
  put("boxImage", item.boxImage);
  put("boxText", item.boxText);
  put("boxFont", item.boxFont);
  put("batomFormat", (item as any).batomFormat);
  put("charms", (item as any).charms);
  put("price_site", (item as any).price);
  put("lipslab_item_id", item.id);

  return props;
}

function resolveVariantIdForItem(item: CartProduct): number {
  const type = (item.type ?? "").toLowerCase();
  if (type.includes("gloss")) return SHOPIFY_GLOSS_VARIANT_ID;
  if (type.includes("batom")) return SHOPIFY_BATOM_VARIANT_ID;
  return SHOPIFY_GLOSS_VARIANT_ID;
}

export function buildCartPermalinkForSingleItem(item: CartProduct): string {
  const variantId = resolveVariantIdForItem(item);
  const props = buildLineItemProperties(item);
  const encoded = toBase64Url(JSON.stringify(props));

  return `${SHOPIFY_SHOP_URL}/cart/${variantId}:1?properties=${encoded}`;
}
