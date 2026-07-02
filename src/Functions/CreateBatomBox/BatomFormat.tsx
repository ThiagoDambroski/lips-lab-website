import React, { type JSX } from "react";
import type { TypesOptions } from "./Types";
import batomComeia from "../../assets/batomComeia.png";
import batomFinal from "../../assets/final batom create.png";
import comeiaTip from "../../assets/comeia tip.png";
import lisaTip from "../../assets/lisa tip.png";
import "../../scss/create-batom/batom-format.css";

type BatomFormatProps = {
  type: TypesOptions | undefined;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setBatomFormat: React.Dispatch<React.SetStateAction<string>>;
  batomFormat: string;
};

function BatomFormat({
  type,
  step,
  setStep,
  setBatomFormat,
  batomFormat,
}: BatomFormatProps): JSX.Element | null {
  if (type !== "batom") return null;
  if (step !== 7) return null;

  const selectedStyle = (value: string): React.CSSProperties =>
    value === batomFormat ? { backgroundColor: "#c41123" } : {};

  return (
    <main className="create-batom-format batom-format-main">
      <img src={batomComeia} alt="Batom com textura colmeia"  decoding="async"  loading="lazy" />

      <div className="create-batom-format__content batom-format-container">
        <h1 className="title-button">Textura</h1>

        <div className="create-batom-format__options batom-format-options">
          <div>
            <img src={comeiaTip} alt="Textura colmeia"  decoding="async"  loading="lazy" />
            <button
              type="button"
              onClick={() => setBatomFormat("comeia")}
              style={selectedStyle("comeia")}
            >
              Padrão geométrico em colmeia
            </button>
          </div>

          <div>
            <img src={lisaTip} alt="Textura lisa"  decoding="async"  loading="lazy" />
            <button
              type="button"
              onClick={() => setBatomFormat("liso")}
              style={selectedStyle("liso")}
            >
              Acabamento liso acetinado
            </button>
          </div>
        </div>

        <button
          type="button"
          className="create-batom-format__continue engraving-continue"
          onClick={() => setStep(8)}
          disabled={!batomFormat}
        >
          Continuar
        </button>
      </div>

      <img src={batomFinal} alt="Prévia do batom final"  decoding="async"  loading="lazy" />
    </main>
  );
}

export default BatomFormat;