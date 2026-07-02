import type { IncludeItem } from "../../data/experienceContent";

type IncludedItemsProps = {
  items: IncludeItem[];
  openId: number | null;
  onToggle: (id: number) => void;
};

export default function IncludedItems({ items, openId, onToggle }: IncludedItemsProps) {
  return (
    <ul className="include-list" aria-label="Itens incluídos na experiência">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `include-panel-${item.id}`;

        return (
          <li key={item.id} className={`include-item ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="include-pill"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(item.id)}
            >
              <span className="include-title">{item.title}</span>
              <span className="include-plus" aria-hidden="true">
                +
              </span>
            </button>

            <div id={panelId} className="include-panel">
              <p>{item.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
