import React, { useMemo, useState, type KeyboardEvent } from "react";
import type {
  EyeColorOptions,
  HairColorOptions,
  SkinToneOptions,
  PaletteCombo,
} from "../Types";
import { getPaletteComboFor } from "./Rules";
import goBackArrow from "../../../assets/goBackArrow.svg";
import { allColors, eyesOptions, hairOptions, skinOptions } from "../data/builderOptions";

type AutomaticColorsProps = {
  toggleColor: (hex: string) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setDoItYourSelf: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onContinueToManual: (paletteHexes: string[]) => void;
};

function AutomaticColors({
  toggleColor,
  setSelected,
  setDoItYourSelf,
  onContinueToManual,
}: AutomaticColorsProps) {
  const allowedHexSet = useMemo(() => {
    return new Set(allColors.map((c) => c.hex.toLowerCase()));
  }, []);

  const [internalStep, setInternalStep] = useState(0);
  const [eyeColor, setEyeColor] = useState<EyeColorOptions>(undefined);
  const [skinTone, setSkinTone] = useState<SkinToneOptions>(undefined);
  const [hairColor, setHairColor] = useState<HairColorOptions>(undefined);
  const [paletteCombo, setPaletteCombo] = useState<PaletteCombo | undefined>(undefined);

  const canFinish = skinTone !== undefined && eyeColor !== undefined && hairColor !== undefined;

  const finish = () => {
    if (!canFinish) return;

    setInternalStep(3);
    setSelected([]);

    const combo = getPaletteComboFor(hairColor!, skinTone!, eyeColor!);
    setPaletteCombo(combo);
    if (combo?.primary && allowedHexSet.has(combo.primary.toLowerCase())) {
      toggleColor(combo.primary);
    }
  };

  const goBack = () => {
    if (internalStep === 0) setDoItYourSelf(undefined);
    else setInternalStep((prev) => Math.max(0, prev - 1));
  };

  const rows = useMemo(() => paletteCombo?.rows ?? [[], []], [paletteCombo]);

  const continueToManualFlow = () => {
    if (!paletteCombo) return;
    const paletteHexes = paletteCombo.rows.flat();
    onContinueToManual(paletteHexes);
  };

  const handleKeyboardSelect = (event: KeyboardEvent<HTMLElement>, action: () => void) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    action();
  };

  const formatLabel = (value: string | undefined) => String(value ?? "").replaceAll("-", " ");

  return (
    <>
      {internalStep === 0 && (
        <div className="automatic-color-container">
          <div className="automatic-color-bgk">
            <img
              className="go-back-arrow"
              src={goBackArrow}
              alt=""
              role="button"
              tabIndex={0}
              aria-label="Voltar"
              onClick={goBack}
              onKeyDown={(event) => handleKeyboardSelect(event, goBack)}
              decoding="async"
              loading="lazy"
            />
            <span>PASSO 1 DE 3</span>
            <h2>QUAL É O TOM DA TUA PELE?</h2>
            <p>Seleciona o tom que mais se aproxima do teu tom de pele.</p>

            <div role="group" aria-label="Tons de pele">
              {skinOptions.map((s) => {
                const isSelected = skinTone === s.id;

                return (
                  <img
                    key={s.id}
                    src={s.img}
                    alt=""
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`Selecionar tom de pele ${formatLabel(s.id)}`}
                    onClick={() => setSkinTone(s.id)}
                    onKeyDown={(event) => handleKeyboardSelect(event, () => setSkinTone(s.id))}
                    style={{ outline: isSelected ? "3px solid white" : "none" }}
                    decoding="async"
                    loading="lazy"
                  />
                );
              })}
            </div>

            <button type="button" disabled={skinTone === undefined} onClick={() => setInternalStep(1)}>
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {internalStep === 1 && (
        <div className="automatic-color-container">
          <div className="automatic-color-bgk">
            <img
              className="go-back-arrow"
              src={goBackArrow}
              alt=""
              role="button"
              tabIndex={0}
              aria-label="Voltar"
              onClick={goBack}
              onKeyDown={(event) => handleKeyboardSelect(event, goBack)}
              decoding="async"
              loading="lazy"
            />
            <span>PASSO 2 DE 3</span>
            <h2>QUAL É A COR DOS TEUS OLHOS?</h2>
            <p>Seleciona o tom que mais se aproxima da cor natural dos teus olhos.</p>

            <div role="group" aria-label="Cores dos olhos">
              {eyesOptions.map((e) => {
                const isSelected = eyeColor === e.id;

                return (
                  <img
                    key={e.id}
                    src={e.img}
                    alt=""
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`Selecionar cor dos olhos ${formatLabel(e.id)}`}
                    onClick={() => setEyeColor(e.id)}
                    onKeyDown={(event) => handleKeyboardSelect(event, () => setEyeColor(e.id))}
                    style={{ outline: isSelected ? "3px solid white" : "none" }}
                    decoding="async"
                    loading="lazy"
                  />
                );
              })}
            </div>

            <button type="button" disabled={eyeColor === undefined} onClick={() => setInternalStep(2)}>
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {internalStep === 2 && (
        <div className="automatic-color-container">
          <div className="automatic-color-bgk">
            <img
              className="go-back-arrow"
              src={goBackArrow}
              alt=""
              role="button"
              tabIndex={0}
              aria-label="Voltar"
              onClick={goBack}
              onKeyDown={(event) => handleKeyboardSelect(event, goBack)}
              decoding="async"
              loading="lazy"
            />
            <span>PASSO 3 DE 3</span>
            <h2>QUAL É A COR DO TEU CABELO?</h2>
            <p>Seleciona o tom que mais se aproxima da cor atual do teu cabelo.</p>

            <div role="group" aria-label="Cores do cabelo">
              {hairOptions.map((h) => {
                const isSelected = hairColor === h.id;

                return (
                  <img
                    key={h.id}
                    src={h.img}
                    alt=""
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`Selecionar cor do cabelo ${formatLabel(h.id)}`}
                    onClick={() => setHairColor(h.id)}
                    onKeyDown={(event) => handleKeyboardSelect(event, () => setHairColor(h.id))}
                    style={{ outline: isSelected ? "3px solid white" : "none" }}
                    decoding="async"
                    loading="lazy"
                  />
                );
              })}
            </div>

            <button type="button" disabled={hairColor === undefined} onClick={finish}>
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {internalStep === 3 && paletteCombo && (
        <div className="palette-result">
          <h2>A TUA PALETA DE CORES</h2>
          <p>
            Estes são os tons que podem valorizar ainda mais o teu look.
            <br />
            Podes ajustá-los, explorar diferentes opções e personalizá-los à tua maneira.
          </p>

          <div className="pallet-colors-container" aria-label="Paleta de cores sugerida">
            {rows.map((row, rowIndex) => (
              <div className="palette-row" key={rowIndex}>
                {row.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    className="swatch"
                    disabled
                    title={hex}
                    style={{ backgroundColor: hex }}
                    aria-label={`Cor sugerida ${hex}`}
                  >
                    <span className="hex">{hex}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          <button type="button" className="continue-pallet-button" onClick={continueToManualFlow}>
            CONTINUAR
          </button>
        </div>
      )}
    </>
  );
}

export default AutomaticColors;
