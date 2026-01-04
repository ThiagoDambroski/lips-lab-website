import { useEffect, useState } from "react";
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
// COMPONENT
// =======================
function CartPage() {
  const [items, setItems] = useState<CartProduct[]>([]);

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

  const total = items.reduce((sum, item) => {
    const price = typeof (item as any).price === "number" ? (item as any).price : 0;
    return sum + price;
  }, 0);

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
            const displayType = item.type
              ? item.type.toUpperCase()
              : "PRODUTO";

            const itemPrice =
              typeof (item as any).price === "number" ? (item as any).price : 0;

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
                  {typeof item.glitter === "number"
                    ? GLITTER_LABELS[item.glitter] ?? "—"
                    : item.glitter}
                </div>

                <div>Base: {item.base}</div>
                <div>Cheiro: {item.smell}</div>
                <div>Aditivo: {item.aditive}</div>
                <div>Essência: {item.esence}</div>

                <div className="cart-personalization">
                  Personalização:
                  {item.boxImage !== "none" && (
                    <img
                      src={SYMBOLS.find((s) => s.id === item.boxImage)?.img}
                      alt=""
                    />
                  )}
                  {item.boxText && <span>{item.boxText} - Fonte : {item.boxFont}</span>}
                  
                </div>

                <div className="cart-price">Preço: €{itemPrice.toFixed(2)}</div>

                <button onClick={() => handleRemove(item.id)}>
                  Remover do carrinho
                </button>
              </li>
            );
          })}
        </ul>

        <div className="cart-total">
          <strong>Total</strong>
          <span>€{total.toFixed(2)}</span>
        </div>

        <div className="cart-actions">
          <button onClick={handleClear}>Esvaziar carrinho</button>
          <button className="buy-button">Comprar agora</button>
        </div>
      </main>
    </>
  );
}

export default CartPage;
