import { SHOPIFY_QUEUE_KEY } from "../constants/cartConfig";
import { readJsonStorage, writeJsonStorage } from "../../utils/storage";

export function saveQueue(urls: string[]) {
  writeJsonStorage(sessionStorage, SHOPIFY_QUEUE_KEY, urls);
}

export function loadQueue(): string[] {
  return readJsonStorage<string[]>(sessionStorage, SHOPIFY_QUEUE_KEY, []).filter((item) => typeof item === "string");
}

export function shiftQueue(): string | null {
  const queue = loadQueue();
  const next = queue.shift() ?? null;
  saveQueue(queue);
  return next;
}
