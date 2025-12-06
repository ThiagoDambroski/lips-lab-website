import { useEffect, useState } from "react";
import type { productType } from "../Functions/CreateBatomBox/Types";

type CartProduct = Exclude<productType, null>;

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

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <h1>O teu carrinho está vazio</h1>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>O teu carrinho</h1>
      <ul>
        {items.map((item) => {
          const displayType = item.type
            ? item.type.toUpperCase()
            : "PRODUTO"; // fallback if undefined

          return (
            <li key={item.id}>
              <div>
                <strong>{displayType}</strong>
              </div>
              <div>Cor: {item.color}</div>
              <div>Glitter: {item.glitter}</div>
              <div>Base: {item.base}</div>
              <div>Cheiro: {item.smell}</div>
              <div>Aditivo: {item.aditive}</div>
              <div>Essência: {item.esence}</div>
              <div>Texto da caixa: {item.boxText}</div>

              <button onClick={() => handleRemove(item.id)}>
                Remover do carrinho
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleClear}>Esvaziar carrinho</button>
    </main>
  );
}

export default CartPage;