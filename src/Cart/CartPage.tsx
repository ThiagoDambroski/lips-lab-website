import { useEffect, useMemo, useState } from "react";
import type { productType } from "../Functions/CreateBatomBox/Types";
import "../scss/cart.css";
import Navbar from "../Navbar/Navbar";

// =======================
// TYPES
// =======================
type CartProduct = Exclude<productType, null>;

type SymbolOption = {
  id: string;
  img: string;
};

// =======================
// SYMBOL IMAGES
// =======================
import sparks from "../assets/sparks.svg";
import star from "../assets/star.svg";
import heart from "../assets/heart.svg";
import flower from "../assets/flower.svg";
import lipsIcon from "../assets/libs icon.svg";
import infinity from "../assets/inifity.svg";
import aries from "../assets/aries.svg";
import taurus from "../assets/taurus.svg";
import gemini from "../assets/gemini.svg";
import cancer from "../assets/cancer.svg";
import leo from "../assets/leo.svg";
import virgo from "../assets/virgo.svg";
import libra from "../assets/libra.svg";
import scorpio from "../assets/scorpio.svg";
import sagittarius from "../assets/sagittarius.svg";
import capricornio from "../assets/capricornio.svg";
import aquarius from "../assets/aquarius.svg";
import peixe from "../assets/peixe.svg";

// =======================
// SYMBOL MAP
// =======================
const SYMBOLS: SymbolOption[] = [
  { id: "sparks", img: sparks },
  { id: "star", img: star },
  { id: "heart", img: heart },
  { id: "flower", img: flower },
  { id: "lips", img: lipsIcon },
  { id: "infinity", img: infinity },
  { id: "aries", img: aries },
  { id: "taurus", img: taurus },
  { id: "gemini", img: gemini },
  { id: "cancer", img: cancer },
  { id: "leo", img: leo },
  { id: "virgo", img: virgo },
  { id: "libra", img: libra },
  { id: "scorpio", img: scorpio },
  { id: "sagittarius", img: sagittarius },
  { id: "capricornio", img: capricornio },
  { id: "aquarius", img: aquarius },
  { id: "peixes", img: peixe },
];

// =======================
// GLITTER LABELS
// =======================
const GLITTER_LABELS: Record<number, string> = {
  1: "Crystal",
  2: "Bronze",
  3: "Fuchsia",
  4: "Garnet",
  5: "Opal",
  6: "Pink",
  7: "Pink Diamond",
  8: "Russet",
  9: "Silver",
  10: "Star Ruby",
  11: "Violet",
  12: "Antique Gold",
  13: "Brass",
  14: "Copper",
  15: "Coral",
  16: "Fire Opal",
  17: "Gold",
  18: "Sienna",
  19: "Sand",
  20: "Carnelian",
  21: "Champagne",
  22: "Pink Gold",
  23: "Rose Gold",
  24: "Alexandrite",
  25: "Azurite",
  26: "Chrysolite",
  27: "Morganite",
  28: "Indigolite",
  29: "Pink (Foil)",
  30: "Bronze (Foil)",
  31: "Gold (Foil)",
  32: "Silver (Foil)",
  33: "Red (Foil)",
  34: "Rainbow (Foil)",
  35: "Dazzle Dust",
  36: "Gold Dust",
  37: "Diamond Dust",
};

// =======================
// SHOPIFY (NO TOKEN)
// =======================
const SHOPIFY_SHOP_URL = "https://lips-lab.myshopify.com";

// ✅ ESTES SÃO OS IDS CORRETOS (VARIANT IDS)
const SHOPIFY_GLOSS_VARIANT_ID = 47048949006593;
const SHOPIFY_BATOM_VARIANT_ID = 47049932833025;

// =======================
// Helpers
// =======================
function toBase64Url(input: string): string {
  const utf8 = encodeURIComponent(input).replace(
    /%([0-9A-F]{2})/g,
    (_, hex) => String.fromCharCode(parseInt(hex, 16))
  );
  const b64 = btoa(utf8);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function safeString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const v = String(value).trim();
  return v.length ? v : null;
}

function buildLineItemProperties(item: CartProduct): Record<string, string> {
  const props: Record<string, string> = {};

  const put = (key: string, value: unknown) => {
    const v = safeString(value);
    if (!v) return;
    props[key] = v;
  };

  put("type", item.type);
  put("color", item.color);

  if (typeof (item as any).glitter === "number") {
    const num = (item as any).glitter as number;
    put("glitter", GLITTER_LABELS[num] ?? String(num));
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

  put("lipslab_item_id", item.id);

  return props;
}

function resolveVariantIdForItem(item: CartProduct): number {
  const t = (item.type ?? "").toLowerCase();
  if (t.includes("gloss")) return SHOPIFY_GLOSS_VARIANT_ID;
  if (t.includes("batom")) return SHOPIFY_BATOM_VARIANT_ID;

  // fallback: se não reconhecer, manda para gloss
  return SHOPIFY_GLOSS_VARIANT_ID;
}

function buildCartPermalinkForSingleItem(item: CartProduct): string {
  const variantId = resolveVariantIdForItem(item);
  const props = buildLineItemProperties(item);
  const encoded = toBase64Url(JSON.stringify(props));
  return `${SHOPIFY_SHOP_URL}/cart/${variantId}:1?properties=${encoded}`;
}

// Guarda uma “fila” de checkouts no sessionStorage
const QUEUE_KEY = "lipslab_shopify_queue";

function saveQueue(urls: string[]) {
  sessionStorage.setItem(QUEUE_KEY, JSON.stringify(urls));
}

function loadQueue(): string[] {
  const raw = sessionStorage.getItem(QUEUE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function shiftQueue(): string | null {
  const q = loadQueue();
  const next = q.shift() ?? null;
  saveQueue(q);
  return next;
}

// =======================
// COMPONENT
// =======================
function CartPage() {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [isBuying, setIsBuying] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lipslab_cart");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as CartProduct[];
      setItems(parsed);
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  const handleRemove = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("lipslab_cart", JSON.stringify(updated));
  };

  const handleClear = () => {
    setItems([]);
    localStorage.removeItem("lipslab_cart");
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = typeof (item as any).price === "number" ? (item as any).price : 0;
      return sum + price;
    }, 0);
  }, [items]);

  /**
   * ✅ Comprar agora (um item por vez, para garantir properties em TODOS)
   *
   * Fluxo:
   * 1) cria uma fila de URLs (1 por item)
   * 2) redireciona para o primeiro URL
   *
   * Nota: Depois de finalizar/adicionar no Shopify, o utilizador volta aqui e clica “Comprar agora” de novo
   * para adicionar o próximo item.
   *
   * Se quiseres automação total (sem voltar), precisas Storefront API.
   */
  const handleBuyNow = () => {
    setBuyError(null);

    try {
      if (!items.length) return;

      // cria 1 URL por item (garante properties sempre)
      const urls = items.map(buildCartPermalinkForSingleItem);

      // guarda a fila e manda o primeiro
      saveQueue(urls);

      const first = shiftQueue();
      if (!first) return;

      setIsBuying(true);
      window.location.assign(first);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha ao iniciar o checkout no Shopify.";
      setBuyError(msg);
      setIsBuying(false);
    }
  };

  /**
   * ✅ Botão opcional: “Adicionar próximo item ao Shopify”
   * Útil se o cliente voltar e quiser mandar o próximo da fila.
   */
  const handleAddNextToShopify = () => {
    const next = shiftQueue();
    if (!next) {
      setBuyError("Não há mais itens na fila para enviar ao Shopify.");
      return;
    }
    window.location.assign(next);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar css={1} />
        <main className="cart-page">
          <h1>O teu carrinho está vazio</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar css={1} />
      <main className="cart-page">
        <h1>O teu carrinho</h1>

        <ul className="cart-list">
          {items.map((item) => {
            const displayType = item.type ? item.type.toUpperCase() : "PRODUTO";
            const itemPrice = typeof (item as any).price === "number" ? (item as any).price : 0;

            return (
              <li key={item.id} className="cart-item">
                <strong>{displayType}</strong>

                <div className="cart-color">
                  <span>Cor:</span>
                  <span
                    className="cart-color-swatch"
                    style={{ backgroundColor: item.color ?? "transparent" }}
                  />
                </div>

                <div>
                  Glitter:{" "}
                  {typeof (item as any).glitter === "number"
                    ? GLITTER_LABELS[(item as any).glitter as number] ?? "—"
                    : (item as any).glitter}
                </div>

                <div>Base: {item.base}</div>
                <div>Cheiro: {item.smell}</div>
                <div>Aditivo: {item.aditive}</div>
                <div>Essência: {item.esence}</div>

                <div className="cart-personalization">
                  Personalização:
                  {item.boxImage !== "none" && (
                    <img src={SYMBOLS.find((s) => s.id === item.boxImage)?.img} alt="" />
                  )}
                  {item.boxText && (
                    <span>
                      {item.boxText} - Fonte : {item.boxFont}
                    </span>
                  )}
                </div>

                <div className="cart-price">Preço: €{itemPrice.toFixed(2)}</div>

                <button onClick={() => handleRemove(item.id)}>Remover do carrinho</button>
              </li>
            );
          })}
        </ul>

        <div className="cart-total">
          <strong>Total</strong>
          <span>€{total.toFixed(2)}</span>
        </div>

        <div className="cart-actions">
          <button onClick={handleClear} disabled={isBuying}>
            Esvaziar carrinho
          </button>

          <button className="buy-button" onClick={handleBuyNow} disabled={isBuying}>
            {isBuying ? "A redirecionar..." : "Comprar agora"}
          </button>

          {/* Opcional: útil para mandar o próximo item sem ter de recalcular */}
          <button onClick={handleAddNextToShopify} disabled={isBuying}>
            Adicionar próximo item ao Shopify
          </button>
        </div>

        {buyError && <p className="cart-error">{buyError}</p>}
      </main>
    </>
  );
}

export default CartPage;
