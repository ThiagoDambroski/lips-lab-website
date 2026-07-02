import { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar/Navbar";
import CartActions from "./components/CartActions";
import CartItemCard from "./components/CartItemCard";
import { CART_STORAGE_KEY } from "./constants/cartConfig";
import { buildCartPermalinkForSingleItem } from "./utils/cartShopify";
import type { CartProduct } from "./utils/cartTypes";
import { saveQueue, shiftQueue } from "./utils/shopifyQueue";
import { readJsonStorage, writeJsonStorage } from "../utils/storage";
import "../scss/Cart.css";

function CartPage() {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [isBuying, setIsBuying] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);

  useEffect(() => {
    setItems(readJsonStorage<CartProduct[]>(localStorage, CART_STORAGE_KEY, []));
  }, []);

  const handleRemove = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    writeJsonStorage(localStorage, CART_STORAGE_KEY, updated);
  };

  const handleClear = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = typeof (item as any).price === "number" ? (item as any).price : 0;
      return sum + price;
    }, 0);
  }, [items]);

  const handleBuyNow = () => {
    setBuyError(null);

    try {
      if (!items.length) return;

      const urls = items.map(buildCartPermalinkForSingleItem);
      saveQueue(urls);

      const first = shiftQueue();
      if (!first) return;

      setIsBuying(true);
      window.location.assign(first);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao iniciar o checkout no Shopify.";
      setBuyError(message);
      setIsBuying(false);
    }
  };

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
        <main id="main-content" className="cart-page">
          <h1>O teu carrinho está vazio</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar css={1} />
      <main id="main-content" className="cart-page">
        <h1>O teu carrinho</h1>

        <ul className="cart-list">
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} onRemove={handleRemove} />
          ))}
        </ul>

        <div className="cart-total">
          <strong>Total</strong>
          <span>€{total.toFixed(2)}</span>
        </div>

        <CartActions
          isBuying={isBuying}
          onClear={handleClear}
          onBuyNow={handleBuyNow}
          onAddNext={handleAddNextToShopify}
        />

        {buyError && <p className="cart-error">{buyError}</p>}
      </main>
    </>
  );
}

export default CartPage;
