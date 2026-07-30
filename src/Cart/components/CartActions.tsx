type CartActionsProps = {
  isBuying: boolean;
  onClear: () => void;
  onBuyNow: () => void;
};

export default function CartActions({ isBuying, onClear, onBuyNow }: CartActionsProps) {
  return (
    <div className="cart-actions">
      <button type="button" onClick={onClear} disabled={isBuying}>
        Esvaziar carrinho
      </button>

      <button type="button" className="buy-button" onClick={onBuyNow} disabled={isBuying}>
        {isBuying ? "A enviar para o Shopify..." : "Finalizar compra"}
      </button>
    </div>
  );
}
