import { useId, useRef } from "react";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import type { InfoContent } from "../constants/tasteInfo";

type InfoPanelProps = {
  info: InfoContent;
  onClose: () => void;
};

function InfoPanel({ info, onClose }: InfoPanelProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLElement | null>(null);

  useFocusTrap(dialogRef, true, onClose);

  return (
    <div
      className="glitter-info-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        ref={dialogRef}
        tabIndex={-1}
        className="glitter-info-card"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="glitter-info-close"
          onClick={onClose}
          aria-label="Fechar informação"
        >
          ×
        </button>

        <h3 id={titleId} className="glitter-info-title">
          {info.title}
        </h3>

        <div className="glitter-info-body">
          {info.paragraphs.map((paragraph, index) => (
            <p key={`${info.title}-p-${index}`}>{paragraph}</p>
          ))}

          {info.noteTitle && <h4 className="glitter-info-note-title">{info.noteTitle}</h4>}

          {info.noteLines?.map((line, index) => (
            <p key={`${info.title}-n-${index}`} className="glitter-info-note-line">
              {line}
            </p>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default InfoPanel;
