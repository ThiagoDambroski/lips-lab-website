import type { KeyboardEvent } from "react";
import type { OnlineExperienceProduct } from "../../data/onlineExperienceProducts";
import { isKeyboardClick } from "../../utils/keyboard";

type OnlineProductCardProps = {
  product: OnlineExperienceProduct;
  onSelect: (type: OnlineExperienceProduct["id"]) => void;
};

export default function OnlineProductCard({ product, onSelect }: OnlineProductCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isKeyboardClick(event)) return;

    event.preventDefault();
    onSelect(product.id);
  };

  return (
    <div
      className={["online-buy-card", product.className].filter(Boolean).join(" ")}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product.id)}
      onKeyDown={handleKeyDown}
      aria-label={product.ariaLabel}
    >
      <div className="online-buy-card-img-wrapper">
        <img src={product.imageSrc} alt={product.imageAlt}  decoding="async"  loading="lazy" />
      </div>

      <h3>{product.title}</h3>
      <span>{product.priceText}</span>
    </div>
  );
}
