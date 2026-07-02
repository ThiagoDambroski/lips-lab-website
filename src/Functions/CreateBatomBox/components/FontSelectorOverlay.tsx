import { useId, useRef } from "react";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import type { FontOption } from "../constants/fontOptions";
import { FONT_OPTIONS } from "../constants/fontOptions";

export type FontSelectorOverlayProps = {
  selectedFont: FontOption;
  onSelectFont: (font: FontOption) => void;
  onClose: () => void;
};

function FontSelectorOverlay({ selectedFont, onSelectFont, onClose }: FontSelectorOverlayProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLElement | null>(null);

  useFocusTrap(dialogRef, true, onClose);

  return (
    <div
      className="create-batom-fonts-overlay engraving-fonts-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <aside
        ref={dialogRef}
        tabIndex={-1}
        className="create-batom-fonts engraving-fonts"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="create-batom-fonts__close engraving-fonts-close"
          onClick={onClose}
          aria-label="Fechar seletor de fonte"
        >
          ×
        </button>

        <h3 id={titleId} className="create-batom-fonts__title engraving-fonts-title">
          Escolhe a fonte
        </h3>

        <ul className="create-batom-fonts__list engraving-fonts-list">
          {FONT_OPTIONS.map((font) => {
            const isSelected = selectedFont.id === font.id;

            return (
              <li key={font.id}>
                <button
                  type="button"
                  className={"engraving-font-item" + (isSelected ? " engraving-font-item--active" : "")}
                  style={{ fontFamily: font.cssFamily }}
                  onClick={() => onSelectFont(font)}
                  aria-pressed={isSelected}
                >
                  {font.label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export default FontSelectorOverlay;
