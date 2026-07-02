type CartActionsProps = {
  isBuying: boolean;
  onClear: () => void;
  onBuyNow: () => void;
  onAddNext: () => void;
};

export default function CartActions({ isBuying, onClear, onBuyNow, onAddNext }: CartActionsProps) {
  return (
    <div className="cart-actions">
      <button type="button" onClick={onClear} disabled={isBuying}>
        Esvaziar carrinho
      </button>

      <button type="button" className="buy-button" onClick={onBuyNow} disabled={isBuying}>
        {isBuying ? "A redirecionar..." : "Comprar agora"}
      </button>

      <button type="button" onClick={onAddNext} disabled={isBuying}>
        Adicionar próximo item ao Shopify
      </button>
    </div>
  );
}
