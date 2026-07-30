import { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar/Navbar";
import CartActions from "./components/CartActions";
import CartItemCard from "./components/CartItemCard";
import { clearCartItems, readCartItems, removeCartItem } from "./utils/cartStorage";
import { buildShopifyCartFallbackUrl, createShopifyCheckoutUrl } from "./utils/cartShopify";
import type { CartItem } from "./utils/cartTypes";
import "../styles/Cart.css";

function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBuying, setIsBuying] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);

  useEffect(() => {
    setItems(readCartItems());
  }, []);

  const handleRemove = (id: string) => {
    setItems(removeCartItem(id));
  };

  const handleClear = () => {
    clearCartItems();
    setItems([]);
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [items]);

  const handleBuyNow = async () => {
    if (!items.length || isBuying) return;

    setBuyError(null);
    setIsBuying(true);

    try {
      const checkoutUrl = await createShopifyCheckoutUrl(items);
      window.location.assign(checkoutUrl);
    } catch {
      try {
        window.location.assign(buildShopifyCartFallbackUrl(items));
      } catch {
        setBuyError("Não foi possível enviar o carrinho para o Shopify. Tenta novamente.");
        setIsBuying(false);
      }
    }
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

        <CartActions isBuying={isBuying} onClear={handleClear} onBuyNow={handleBuyNow} />

        {buyError && <p className="cart-error">{buyError}</p>}
      </main>
    </>
  );
}

export default CartPage;
