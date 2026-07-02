import React from "react";

type ColorOption = {
  hex: string;
  sub: string;
};

type FristStepProps = {
  allColors: ColorOption[];
  selected: string[];
  toggleColor: (hex: string) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  variant?: "default" | "palette";
  suggestedPalette?: ColorOption[] | null;
};

function FristStep({
  allColors,
  selected,
  toggleColor,
  setStep,
  variant = "default",
  suggestedPalette = null,
}: FristStepProps) {
  const nextStep = () => {
    setStep(3);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <section className="colors-selection">
      <span className="title-button">cria a cor</span>
      <h3>
        Combina até 4 pigmentos, mistura tons
        <br /> e encontra a cor que revela quem és!
      </h3>

      {variant === "palette" && suggestedPalette && suggestedPalette.length > 0 && (
        <>
          <h4>A tua paleta de cores para te inspirares</h4>

          <div className="pallet-colors-container">
            {Array.from({ length: Math.ceil(suggestedPalette.length / 7) }).map((_, rowIndex) => {
              const slice = suggestedPalette.slice(rowIndex * 7, rowIndex * 7 + 7);
              return (
                <div className="palette-row" key={`suggested-row-${rowIndex}`}>
                  {slice.map((c) => (
                    <button
                      key={`suggested-${c.hex}`}
                      type="button"
                      className="swatch"
                      disabled
                      title={c.sub}
                      style={{ backgroundColor: c.hex,opacity: 0.9 }}
                    >
                      <span className="hex">{c.hex}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          <h4>
            21 cores que te dão total controlo
            <br /> para criares qualquer tom imaginável.
          </h4>
        </>
      )}

      {variant === "default" && (
        <h4>
          21 cores que te dão total controlo
          <br /> para criares qualquer tom imaginável.
        </h4>
      )}

      <div className={`colors-containers ${variant === "palette" ? "is-palette" : ""}`}>
        {allColors.map((c) => {
          const active = selected.includes(c.hex);
          return (
            <div className="colors-section-div" key={c.hex}>
              <button
                type="button"
                className="colors-section"
                onClick={() => toggleColor(c.hex)}
                style={{
                  backgroundColor: c.hex,
                  border: active ? "3px solid green" : "1px solid #ccc",
                  borderRadius: 50,
                  cursor: "pointer",
                }}
                aria-pressed={active}
                aria-label={`Selecionar cor ${c.sub}`}
              />
              <p>{c.sub}</p>
            </div>
          );
        })}
      </div>

      <button type="button" onClick={nextStep} disabled={selected.length === 0}>
        Continuar
      </button>
    </section>
  );
}

export default FristStep;
