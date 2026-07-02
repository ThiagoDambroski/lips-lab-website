import { useRef, type RefObject } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import type { GiftProperties } from "../utils/giftShopify";

type GiftPersonalizationModalProps = {
  titleId: string;
  descriptionId: string;
  giftProps: GiftProperties;
  confirmBtnRef: RefObject<HTMLButtonElement | null>;
  isConfirmDisabled: boolean;
  onChange: (props: GiftProperties) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function GiftPersonalizationModal({
  titleId,
  descriptionId,
  giftProps,
  confirmBtnRef,
  isConfirmDisabled,
  onChange,
  onClose,
  onConfirm,
}: GiftPersonalizationModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(dialogRef, true, onClose, confirmBtnRef);

  return (
    <div
      className="gift-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="gift-modal__card"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="gift-modal__header">
          <h3 id={titleId} className="gift-modal__title">
            Dados do cartão-presente
          </h3>

          <button type="button" className="gift-modal__close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <p id={descriptionId} className="sr-only">
          Preenche os dados opcionais do cartão-presente.
        </p>

        <div className="gift-modal__form">
          <label className="gift-modal__field">
            <span>De</span>
            <input
              type="text"
              value={giftProps.de}
              onChange={(event) => onChange({ ...giftProps, de: event.target.value })}
              placeholder="Ex: Letícia"
              autoComplete="off"
            />
          </label>

          <label className="gift-modal__field">
            <span>Para</span>
            <input
              type="text"
              value={giftProps.para}
              onChange={(event) => onChange({ ...giftProps, para: event.target.value })}
              placeholder="Ex: Maria"
              autoComplete="off"
            />
          </label>
        </div>

        <div className="gift-modal__actions">
          <button type="button" className="gift-modal__secondary" onClick={onClose}>
            Cancelar
          </button>

          <button
            ref={confirmBtnRef}
            type="button"
            className="gift-modal__primary"
            onClick={onConfirm}
            aria-label="Confirmar e ir para o carrinho"
            disabled={isConfirmDisabled}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
