import { CART_STORAGE_KEY } from "../constants/cartConfig";
import { GIFT_OPTION_LABEL_BY_OPTION, PRICE_BY_GIFT_OPTION, VARIANT_BY_GIFT_OPTION, giftOptions } from "../../GiftCard/constants/giftCardOptions";
import { buildCartDescription } from "./cartItems";
import { readJsonStorage, writeJsonStorage } from "../../utils/storage";
import type { CartItem, CartItemInput } from "./cartTypes";

function createCartItemId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<CartItem>;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.quantity === "number" &&
    typeof item.unitPrice === "number" &&
    (typeof item.shopifyVariantId === "string" || item.shopifyVariantId === null) &&
    (item.shopifyProductId === undefined || item.shopifyProductId === null || typeof item.shopifyProductId === "string") &&
    (item.shopifyExcludedVariantIds === undefined ||
      (Array.isArray(item.shopifyExcludedVariantIds) &&
        item.shopifyExcludedVariantIds.every((variantId) => typeof variantId === "string"))) &&
    typeof item.description === "string" &&
    Array.isArray(item.details)
  );
}

function synchronizeGiftPrice(item: CartItem): CartItem {
  if (item.source !== "gift-card") return item;

  const option = giftOptions.find((giftOption) =>
    String(VARIANT_BY_GIFT_OPTION[giftOption]) === item.shopifyVariantId,
  );

  if (!option) return item;

  const unitPrice = PRICE_BY_GIFT_OPTION[option];
  const label = GIFT_OPTION_LABEL_BY_OPTION[option];
  const details = item.details.map((detail) =>
    detail.label === "Opção" && detail.value !== label
      ? { ...detail, value: label }
      : detail,
  );
  const description = buildCartDescription(details);

  if (item.unitPrice === unitPrice && description === item.description) return item;

  return { ...item, unitPrice, details, description };
}

export function readCartItems() {
  const storedItems = readJsonStorage<unknown>(localStorage, CART_STORAGE_KEY, []);

  if (!Array.isArray(storedItems)) return [];

  const storedCartItems = storedItems.filter(isCartItem);
  const currentCartItems = storedCartItems.map(synchronizeGiftPrice);

  if (currentCartItems.some((item, index) => item !== storedCartItems[index])) {
    writeJsonStorage(localStorage, CART_STORAGE_KEY, currentCartItems);
  }

  return currentCartItems;
}

export function saveCartItems(items: CartItem[]) {
  writeJsonStorage(localStorage, CART_STORAGE_KEY, items);
}

export function addCartItem(input: CartItemInput) {
  const item: CartItem = {
    ...input,
    id: createCartItemId(),
  };
  const items = [...readCartItems(), item];
  saveCartItems(items);
  return item;
}

export function removeCartItem(id: string) {
  const items = readCartItems().filter((item) => item.id !== id);
  saveCartItems(items);
  return items;
}

export function clearCartItems() {
  localStorage.removeItem(CART_STORAGE_KEY);
}
