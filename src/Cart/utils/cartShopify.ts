import { SHOPIFY_SHOP_URL } from "../../config/site";
import type { CartItem } from "./cartTypes";

const STOREFRONT_API_VERSION = "2026-07";

const PRODUCT_VARIANTS_QUERY = `
  query ProductVariants($id: ID!) {
    product(id: $id) {
      variants(first: 20) {
        nodes {
          id
          availableForSale
        }
      }
    }
  }
`;

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

type ProductVariantsResponse = {
  data?: {
    product?: {
      variants?: {
        nodes?: Array<{
          id: string;
          availableForSale?: boolean;
        }>;
      };
    } | null;
  };
  errors?: Array<{
    message: string;
  }>;
};

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

type ShopifyReadyCartItem = CartItem & {
  shopifyVariantId: string;
};

function getNumericShopifyId(gid: string) {
  return gid.split("/").at(-1) ?? "";
}

async function fetchStorefrontGraphQl<T>(query: string, variables: Record<string, unknown>) {
  const response = await fetch(`${SHOPIFY_SHOP_URL}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível comunicar com o Shopify.");
  }

  return response.json() as Promise<T>;
}

async function resolveShopifyVariantId(item: CartItem) {
  if (item.shopifyVariantId) return item.shopifyVariantId;

  if (!item.shopifyProductId) {
    throw new Error(`O produto “${item.name}” ainda não está ligado ao Shopify.`);
  }

  const payload = await fetchStorefrontGraphQl<ProductVariantsResponse>(PRODUCT_VARIANTS_QUERY, {
    id: `gid://shopify/Product/${item.shopifyProductId}`,
  });

  const graphQlError = payload.errors?.[0]?.message;

  if (graphQlError) {
    throw new Error(graphQlError);
  }

  const excludedVariantIds = new Set(item.shopifyExcludedVariantIds ?? []);
  const variants = payload.data?.product?.variants?.nodes ?? [];
  const variant = variants.find((candidate) => {
    const variantId = getNumericShopifyId(candidate.id);
    return candidate.availableForSale !== false && !excludedVariantIds.has(variantId);
  });

  if (!variant) {
    throw new Error(`Não foi encontrada uma variante disponível para “${item.name}”.`);
  }

  return getNumericShopifyId(variant.id);
}

async function resolveShopifyItems(items: CartItem[]): Promise<ShopifyReadyCartItem[]> {
  return Promise.all(
    items.map(async (item) => ({
      ...item,
      shopifyVariantId: await resolveShopifyVariantId(item),
    })),
  );
}

function buildLineAttributes(item: CartItem) {
  return [
    { key: "Descrição", value: item.description },
    ...item.details.map((detail) => ({ key: detail.label, value: detail.value })),
    { key: "Lips Lab item", value: item.id },
  ];
}

export async function createShopifyCheckoutUrl(items: CartItem[]) {
  const resolvedItems = await resolveShopifyItems(items);
  const payload = await fetchStorefrontGraphQl<CartCreateResponse>(CART_CREATE_MUTATION, {
    input: {
      lines: resolvedItems.map((item) => ({
        merchandiseId: `gid://shopify/ProductVariant/${item.shopifyVariantId}`,
        quantity: item.quantity,
        attributes: buildLineAttributes(item),
      })),
    },
  });

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

export async function buildShopifyCartFallbackUrl(items: CartItem[]) {
  const resolvedItems = await resolveShopifyItems(items);
  const variants = resolvedItems.map((item) => `${item.shopifyVariantId}:${item.quantity}`).join(",");
  const params = new URLSearchParams();

  params.set("storefront", "true");

  resolvedItems.forEach((item, index) => {
    params.set(`attributes[Produto ${index + 1}]`, `${item.name} — ${item.description}`);
  });

  return `${SHOPIFY_SHOP_URL}/cart/${variants}?${params.toString()}`;
}
