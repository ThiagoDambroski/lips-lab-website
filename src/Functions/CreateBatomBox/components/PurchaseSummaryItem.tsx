import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import editIcon from "../../../assets/edit icon.svg";

type PurchaseSummaryItemProps = {
  label: string;
  onEdit: () => void;
  children?: ReactNode;
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

function PurchaseSummaryItem({
  label,
  onEdit,
  children,
  contentClassName,
  contentStyle,
}: PurchaseSummaryItemProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    onEdit();
  };

  return (
    <li>
      <div
        onClick={onEdit}
        onKeyDown={handleKeyDown}
        className={contentClassName}
        style={contentStyle}
        role="button"
        tabIndex={0}
        aria-label={`Editar ${label}`}
      >
        {children}
      </div>
      <p>{label}</p>
      <img src={editIcon} alt="" className="edit-icon" decoding="async" loading="lazy" aria-hidden="true" />
    </li>
  );
}

export default PurchaseSummaryItem;
