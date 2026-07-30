import { CART_STORAGE_KEY } from "../constants/cartConfig";
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
    typeof item.shopifyVariantId === "string" &&
    typeof item.description === "string" &&
    Array.isArray(item.details)
  );
}

export function readCartItems() {
  const storedItems = readJsonStorage<unknown>(localStorage, CART_STORAGE_KEY, []);

  if (!Array.isArray(storedItems)) return [];

  return storedItems.filter(isCartItem);
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
