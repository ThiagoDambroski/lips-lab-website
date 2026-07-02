import { useMemo, useState } from "react";
import type { TypesOptions } from "../Types";
import { FORMULA_ITEMS } from "../constants/formulaItems";

export type FormulaSectionProps = {
  type: TypesOptions;
  onContinue: () => void;
};

function FormulaSection({ type, onContinue }: FormulaSectionProps) {
  const [openFormulaId, setOpenFormulaId] = useState<string | null>(null);
  const formulaItems = useMemo(() => FORMULA_ITEMS.filter((item) => item.type === type), [type]);

  const toggleFormula = (id: string) => {
    setOpenFormulaId((previousId) => (previousId === id ? null : id));
  };

  return (
    <div className="create-batom-formula formula-section">
      <h2>
        Na Lips Lab, cada fórmula começa com uma selecção rigorosa
        <br /> de ingredientes seguros, nutritivos e de origem responsável.
      </h2>

      <ul className="create-batom-formula__list formula-clean-list">
        {formulaItems.map((item) => {
          const isOpen = openFormulaId === item.id;

          return (
            <li key={`${item.type}-${item.id}`} className={["create-batom-formula__item", "formula-clean-item", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}>
              <button type="button" className="create-batom-formula__header formula-clean-header" onClick={() => toggleFormula(item.id)}>
                <span>{item.question}</span>
                <span className="create-batom-formula__toggle formula-clean-toggle">+</span>
              </button>

              <div className={["create-batom-formula__body", "formula-clean-body", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}>
                <p>{item.answers}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <button type="button" className="continue-button" onClick={onContinue}>
        Continuar!
      </button>
    </div>
  );
}

export default FormulaSection;
