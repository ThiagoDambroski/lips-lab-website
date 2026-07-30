import { SHOPIFY_SHOP_URL } from "../../config/site";
import type { CartItem } from "./cartTypes";

const STOREFRONT_API_VERSION = "2026-07";

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type CartCreateResponse = {
  data?: {
    cartCreate?: {
      cart?: {
        checkoutUrl?: string;
      } | null;
      userErrors?: Array<{
        field?: string[] | null;
        message: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
};

function buildLineAttributes(item: CartItem) {
  return [
    { key: "Descrição", value: item.description },
    ...item.details.map((detail) => ({ key: detail.label, value: detail.value })),
    { key: "Lips Lab item", value: item.id },
  ];
}

export async function createShopifyCheckoutUrl(items: CartItem[]) {
  const response = await fetch(`${SHOPIFY_SHOP_URL}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: CART_CREATE_MUTATION,
      variables: {
        input: {
          lines: items.map((item) => ({
            merchandiseId: `gid://shopify/ProductVariant/${item.shopifyVariantId}`,
            quantity: item.quantity,
            attributes: buildLineAttributes(item),
          })),
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível criar o carrinho no Shopify.");
  }

  const payload = (await response.json()) as CartCreateResponse;
  const graphQlError = payload.errors?.[0]?.message;
  const userError = payload.data?.cartCreate?.userErrors?.[0]?.message;
  const checkoutUrl = payload.data?.cartCreate?.cart?.checkoutUrl;

  if (graphQlError) {
    throw new Error(graphQlError);
  }

  if (userError) {
    throw new Error(userError);
  }

  if (!checkoutUrl) {
    throw new Error("O Shopify não devolveu um checkout válido.");
  }

  return checkoutUrl;
}

export function buildShopifyCartFallbackUrl(items: CartItem[]) {
  const variants = items.map((item) => `${item.shopifyVariantId}:${item.quantity}`).join(",");
  const params = new URLSearchParams();

  params.set("storefront", "true");

  items.forEach((item, index) => {
    params.set(`attributes[Produto ${index + 1}]`, `${item.name} — ${item.description}`);
  });

  return `${SHOPIFY_SHOP_URL}/cart/${variants}?${params.toString()}`;
}
