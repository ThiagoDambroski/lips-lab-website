import type { KeyboardEvent } from "react";

export function isKeyboardClick(event: KeyboardEvent<HTMLElement>) {
  return event.key === "Enter" || event.key === " ";
}
