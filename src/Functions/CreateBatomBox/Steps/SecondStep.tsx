import type React from "react";
import type { ChangeEvent } from "react";

type SecondStepProps = {
  selected: string[];
  weights: Record<string, number>;
  setWeights: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  toggleColor: (hex: string) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

function SecondStep({
  selected,
  weights,
  setWeights,
  toggleColor,
  setStep,
}: SecondStepProps) {
  const nexStep = () => {
    setStep(3)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  const onWeightChange =
    (hex: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      const value = Number.isFinite(raw)
        ? Math.max(0, Math.min(100, raw))
        : 0;

      setWeights((prev) => ({
        ...prev,
        [hex]: value,
      }));
    };

  return (
    <div className="second-step">
      {selected.map((color) => (
        <div key={color} className="color-row">
          <div className="color-row__top">
            <div
              className="color-swatch"
              style={{ backgroundColor: color }}
              aria-label={`Selected color ${color}`}
            />

            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={weights[color] ?? 0}
              onChange={onWeightChange(color)}
              className="color-range"
              aria-label={`Intensity for ${color}`}
              style={{
                ["--accent" as any]: color,
                ["--val" as any]: weights[color] ?? 0,
              }}
            />
          </div>

          <button
            className="step-second-exclude-button"
            onClick={() => toggleColor(color)}
          >
            EXCLUIR
          </button>
        </div>
      ))}

      {selected.length !== 4 && (
        <div className="add-color-wrapper">
          <button
            className="add-color-btn"
            onClick={() => setStep(0)}
            aria-label="Add another color"
          >
            <span className="plus">+</span>
          </button>
          <span className="add-color-text">adiciona outra cor!</span>
        </div>
      )}

      <button className="continue-button" onClick={() => nexStep()}>
        Continuar!
      </button>
    </div>
  );
}

export default SecondStep;
