import type { CartItemDetail } from "./cartTypes";

export function buildCartDescription(details: CartItemDetail[]) {
  return details
    .filter((detail) => detail.value.trim().length > 0)
    .map((detail) => `${detail.label}: ${detail.value}`)
    .join(" | ");
}
