import type { GiftOption } from "../constants/giftCardOptions";
import { giftOptions, GIFT_OPTION_LABEL_BY_OPTION } from "../constants/giftCardOptions";

type GiftOptionSelectorProps = {
  groupName: string;
  selected: GiftOption;
  selectedLabel: string;
  onChange: (option: GiftOption) => void;
  onBuyClick: () => void;
};

export default function GiftOptionSelector({
  groupName,
  selected,
  selectedLabel,
  onChange,
  onBuyClick,
}: GiftOptionSelectorProps) {
  return (
    <div className="gift-radio-group" role="radiogroup" aria-label="Escolhe o cartão-presente">
      {giftOptions.map((option) => (
        <label key={option} className="gift-radio">
          <input
            type="radio"
            name={groupName}
            value={option}
            checked={selected === option}
            onChange={() => onChange(option)}
          />
          <span className="gift-radio__label">{GIFT_OPTION_LABEL_BY_OPTION[option]}</span>
        </label>
      ))}

      <button
        type="button"
        className="gift-buy-btn"
        onClick={onBuyClick}
        aria-label={`Comprar ${selectedLabel} e preencher dados do presente`}
      >
        Comprar
      </button>
    </div>
  );
}
