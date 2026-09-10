export type CartItemSource = "products" | "online-experience" | "gift-card";

export type CartItemDetail = {
  label: string;
  value: string;
};

export type CartItem = {
  id: string;
  source: CartItemSource;
  name: string;
  quantity: number;
  unitPrice: number;
  shopifyVariantId: string | null;
  shopifyProductId?: string | null;
  shopifyExcludedVariantIds?: string[];
  description: string;
  details: CartItemDetail[];
};

export type CartItemInput = Omit<CartItem, "id">;
