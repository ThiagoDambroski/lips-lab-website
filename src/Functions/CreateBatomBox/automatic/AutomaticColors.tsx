import React, { useMemo, useState } from "react";
import type {
  EyeColorOptions,
  HairColorOptions,
  SkinToneOptions,
  PaletteCombo,
} from "../Types";
import { useApp } from "../../../Contexts/AppProvider";
import { getPaletteComboFor } from "./Rules";
import goBackArrow from "../../../assets/goBackArrow.svg"

type AutomaticColorsProps = {
  toggleColor: (hex: string) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setDoItYourSelf: React.Dispatch<React.SetStateAction<Boolean | undefined>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onContinueToManual: (paletteHexes: string[]) => void;
};

function AutomaticColors({
  toggleColor,
  setSelected,
  setDoItYourSelf,
  onContinueToManual,
}: AutomaticColorsProps) {
  const { eyesOptions, skinOptions, hairOptions } = useApp();

  const [internalStep, setInternalStep] = useState(0);
  const [eyeColor, setEyeColor] = useState<EyeColorOptions>(undefined);
  const [skinTone, setSkinTone] = useState<SkinToneOptions>(undefined);
  const [hairColor, setHairColor] = useState<HairColorOptions>(undefined);
  const [paletteCombo, setPaletteCombo] = useState<PaletteCombo | undefined>(
    undefined
  );

  const canFinish =
    skinTone !== undefined && eyeColor !== undefined && hairColor !== undefined;

  const finish = () => {
    if (!canFinish) return;

    setInternalStep(3);

    // Reset current selection and then choose the suggested primary color
    setSelected([]);

    const combo = getPaletteComboFor(hairColor!, skinTone!, eyeColor!);
    setPaletteCombo(combo);

    // Preselect 1 color so the next flow starts with something selected
    toggleColor(combo.primary);
  };

  const goBack = () => {
    internalStep == 0 ? setDoItYourSelf(undefined) :
    setInternalStep((prev) => Math.max(0, prev - 1));
    
  };

  const rows = useMemo(() => paletteCombo?.rows ?? [[], []], [paletteCombo]);

  const continueToManualFlow = () => {
    if (!paletteCombo) return;

    // Flatten rows into a single list of palette hexes
    const paletteHexes = paletteCombo.rows.flat();

    // Let parent decide how to switch flows and what FristStep should display
    onContinueToManual(paletteHexes);
  };

  return (
    <>
      {internalStep === 0 && (
        <div className="automatic-color-container">
          <div className="automatic-color-bgk">
            <img className="go-back-arrow" src={goBackArrow} alt="" onClick={goBack}/>
            <span>PASSO 1 DE 3</span>
            <h2>QUAL É O TOM DA TUA PELE?</h2>
            <p>Seleciona o tom que mais se aproxima do teu tom de pele.</p>

            <div>
              {skinOptions.map((s) => (
                <img
                  key={s.id}
                  src={s.img}
                  alt=""
                  onClick={() => setSkinTone(s.id)}
                  style={{
                    outline: skinTone === s.id ? "3px solid white" : "none",
                  }}
                />
              ))}
            </div>

            <button
              disabled={skinTone === undefined}
              onClick={() => setInternalStep(1)}
            >
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {internalStep === 1 && (
        <div className="automatic-color-container">
          <div className="automatic-color-bgk">
            <img className="go-back-arrow" src={goBackArrow} alt="" onClick={goBack}/>
            <span>PASSO 2 DE 3</span>
            <h2>QUAL É A COR DOS TEUS OLHOS?</h2>
            <p>
              Seleciona o tom que mais se aproxima da cor natural dos teus
              olhos.
            </p>

            <div>
              {eyesOptions.map((e) => (
                <img
                  key={e.id}
                  src={e.img}
                  alt=""
                  onClick={() => setEyeColor(e.id)}
                  style={{
                    outline: eyeColor === e.id ? "3px solid white" : "none",
                  }}
                />
              ))}
            </div>

            <button
              disabled={eyeColor === undefined}
              onClick={() => setInternalStep(2)}
            >
              CONTINUAR
            </button>
          </div>
        </div>
      )}


      {internalStep === 2 && (
        <div className="automatic-color-container">
          <div className="automatic-color-bgk">
            <img className="go-back-arrow" src={goBackArrow} alt="" onClick={goBack} />
            <span>PASSO 3 DE 3</span>
            <h2>QUAL É A COR DO TEU CABELO?</h2>
            <p>
              Seleciona o tom que mais se aproxima da cor atual do teu cabelo.
            </p>

            <div>
              {hairOptions.map((h) => (
                <img
                  key={h.id}
                  src={h.img}
                  alt=""
                  onClick={() => setHairColor(h.id)}
                  style={{
                    outline: hairColor === h.id ? "3px solid white" : "none",
                  }}
                />
              ))}
            </div>

            <button disabled={hairColor === undefined} onClick={finish}>
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
            Podes ajustá-los, explorar diferentes opções e personalizá-los à tua
            maneira.
          </p>

          <div className="pallet-colors-container">
            {rows.map((row, rowIndex) => (
              <div className="palette-row" key={rowIndex}>
                {row.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    className="swatch"
                    onClick={() => toggleColor(hex)}
                    title={hex}
                    style={{ backgroundColor: hex }}
                  >
                    <span className="hex">{hex}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="continue-pallet-button"
            onClick={continueToManualFlow}
          >
            CONTINUAR
          </button>
        </div>
      )}
    </>
  );
}

export default AutomaticColors;
