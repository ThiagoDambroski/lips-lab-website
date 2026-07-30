import type { CartItem } from "../utils/cartTypes";

type CartItemCardProps = {
  item: CartItem;
  onRemove: (id: string) => void;
};

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  return (
    <li className="cart-item">
      <strong>{item.name}</strong>

      <dl className="cart-item-details">
        {item.details.map((detail, index) => (
          <div className="cart-item-detail" key={`${detail.label}-${index}`}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>

      <div className="cart-price">Preço: €{(item.unitPrice * item.quantity).toFixed(2)}</div>

      <button type="button" onClick={() => onRemove(item.id)}>
        Remover do carrinho
      </button>
    </li>
  );
}
