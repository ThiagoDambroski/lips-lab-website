import { SHOPIFY_SHOP_URL } from "../../config/site";
import { safeString, toBase64Url } from "../../utils/string";

export type GiftProperties = {
  de: string;
  para: string;
};

export function buildShopifyGiftPermalink(variantId: number, props: GiftProperties): string {
  const properties: Record<string, string> = {
    De: safeString(props.de) ?? " ",
    Para: safeString(props.para) ?? " ",
  };

  const encoded = toBase64Url(JSON.stringify(properties));

  return `${SHOPIFY_SHOP_URL}/cart/${variantId}:1?properties=${encoded}`;
}

export function goToShopifyAlways(url: string) {
  window.location.assign(url);
}
