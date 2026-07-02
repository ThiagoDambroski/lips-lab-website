import { GLITTER_LABELS } from "../constants/cartConfig";
import { SYMBOLS } from "../constants/cartSymbols";
import type { CartProduct } from "../utils/cartTypes";

type CartItemCardProps = {
  item: CartProduct;
  onRemove: (id: number) => void;
};

function getItemPrice(item: CartProduct) {
  return typeof (item as any).price === "number" ? (item as any).price : 0;
}

function getGlitterLabel(item: CartProduct) {
  if (typeof (item as any).glitter === "number") {
    return GLITTER_LABELS[(item as any).glitter as number] ?? "—";
  }

  return (item as any).glitter;
}

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  const displayType = item.type ? item.type.toUpperCase() : "PRODUTO";
  const itemPrice = getItemPrice(item);
  const selectedSymbol = SYMBOLS.find((symbol) => symbol.id === item.boxImage);

  return (
    <li className="cart-item">
      <strong>{displayType}</strong>

      <div className="cart-color">
        <span>Cor:</span>
        <span className="cart-color-swatch" style={{ backgroundColor: item.color ?? "transparent" }} />
      </div>

      <div>Glitter: {getGlitterLabel(item)}</div>
      <div>Base: {item.base}</div>
      <div>Cheiro: {item.smell}</div>
      <div>Aditivo: {item.aditive}</div>
      <div>Essência: {item.esence}</div>
      <div>Charms: {(item as any).charms ?? "none"}</div>

      <div className="cart-personalization">
        Personalização:
        {item.boxImage !== "none" && selectedSymbol && (
          <img src={selectedSymbol.img} alt="Símbolo escolhido para personalização" loading="lazy"  decoding="async" />
        )}
        {item.boxText && (
          <span>
            {item.boxText} - Fonte : {item.boxFont}
          </span>
        )}
      </div>

      <div className="cart-price">Preço: €{itemPrice.toFixed(2)}</div>

      <button type="button" onClick={() => onRemove(item.id)}>
        Remover do carrinho
      </button>
    </li>
  );
}
