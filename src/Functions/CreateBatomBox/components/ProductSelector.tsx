import type { ProductKey } from "../constants/productConfig";
import { PRODUCT_SELECTOR_ITEMS } from "../constants/productSelectorItems";
import libsBackground from "../../../assets/libs back.png";

export type ProductSelectorProps = {
  onSelectProduct: (type: ProductKey) => void;
};

function ProductSelector({ onSelectProduct }: ProductSelectorProps) {
  return (
    <main style={{ backgroundImage: `url(${libsBackground})` }} className="create-batom create-batom--selector main-create-box">
      <h1>Inicia a tua experiência</h1>
      <p id="product-selector-description">escolhe o teu produto:</p>

      <div
        className="create-batom__product-grid gloss-or-batom-container"
        role="group"
        aria-labelledby="product-selector-description"
      >
        {PRODUCT_SELECTOR_ITEMS.map((item) => (
          <div
            key={item.type}
            className={["create-batom__product-card", "gloss-or-batom-container-image", item.className].filter(Boolean).join(" ")}
          >
            <img src={item.image} alt={item.alt} decoding="async" loading="lazy" />
            <button type="button" onClick={() => onSelectProduct(item.type)} aria-label={`Selecionar ${item.label}`}>
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProductSelector;
