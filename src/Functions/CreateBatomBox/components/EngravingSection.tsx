import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import type { TypesOptions } from "../Types";
import { FONT_OPTIONS, type FontOption } from "../constants/fontOptions";
import { SYMBOL_OPTIONS } from "../constants/symbolOptions";
import FontSelectorOverlay from "./FontSelectorOverlay";

export type EngravingSectionProps = {
  type: TypesOptions;
  boxText: string;
  setBoxText: (value: string) => void;
  boxImg: string;
  setBoxImg: (value: string) => void;
  boxFont: string;
  setBoxFont: (value: string) => void;
  onContinue: (nextStep: number) => void;
};

function EngravingSection({
  type,
  boxText,
  setBoxText,
  boxImg,
  setBoxImg,
  boxFont,
  setBoxFont,
  onContinue,
}: EngravingSectionProps) {
  const initialFont = useMemo(
    () => FONT_OPTIONS.find((font) => font.id === boxFont) ?? FONT_OPTIONS[0],
    [boxFont]
  );
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(boxImg === "none" ? null : boxImg);
  const [selectedFont, setSelectedFont] = useState<FontOption>(initialFont);
  const [isFontsOpen, setIsFontsOpen] = useState(false);
  const canContinue = boxText.trim().length <= 10;

  useEffect(() => {
    setSelectedFont(initialFont);
  }, [initialFont]);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBoxText(event.target.value);
  };

  const handleSymbolClick = (symbol: string) => {
    if (boxImg === symbol) {
      setBoxImg("none");
      setSelectedSymbol(null);
      return;
    }

    setBoxImg(symbol);
    setSelectedSymbol(symbol);
  };

  const handleFontClick = (font: FontOption) => {
    setBoxFont(font.id);
    setSelectedFont(font);
    setIsFontsOpen(false);
  };

  const handleNextStep = () => {
    onContinue(type !== "batom" ? 8 : 7);
  };

  return (
    <section className="create-batom-engraving engraving">
      <div className="create-batom-engraving__content engraving-main">
        <span className="create-batom-engraving__badge engraving-span-title">personaliza a embalagem </span>

        <h2 className="create-batom-engraving__title engraving-title">
          Grava o teu nome, uma palavra ou símbolo.
          <br />
          O toque&nbsp; que torna o teu GLOSS único E ESPECIAL.
        </h2>

        <div className="create-batom-engraving__input-wrapper engraving-input-wrapper">
          <input
            type="text"
            className="create-batom-engraving__input engraving-input"
            value={boxText}
            maxLength={5}
            placeholder="ESCREVE AQUI O QUE QUERES GRAVAR NO TEU PRODUTO!"
            onChange={handleTextChange}
            style={{ fontFamily: selectedFont.cssFamily }}
            aria-label="Texto para gravar no produto"
          />

          <button className="create-batom-engraving__font-trigger engraving-test-fonts" type="button" onClick={() => setIsFontsOpen(true)}>
            TESTA AS NOSSAS FONTES
          </button>
        </div>

        <p className="create-batom-engraving__subtitle engraving-subtitle">ESCOLHE UM SÍMBOLO</p>

        <div className="create-batom-engraving__symbol-list engraving-symbol-list">
          {SYMBOL_OPTIONS.map((symbol) => (
            <button
              key={symbol.id}
              type="button"
              className={
                "engraving-symbol" + (selectedSymbol === symbol.id ? " engraving-symbol--active" : "")
              }
              onClick={() => handleSymbolClick(symbol.id)}
              aria-pressed={selectedSymbol === symbol.id}
              aria-label={`Selecionar símbolo ${symbol.id}`}
            >
              <img src={symbol.img} alt="" decoding="async" loading="lazy" aria-hidden="true" />
            </button>
          ))}
        </div>

        <button
          className="create-batom-engraving__continue engraving-continue"
          type="button"
          disabled={!canContinue && boxImg === "none"}
          onClick={handleNextStep}
          aria-disabled={!canContinue && boxImg === "none"}
        >
          CONTINUAR!
        </button>
      </div>

      {isFontsOpen && (
        <FontSelectorOverlay
          selectedFont={selectedFont}
          onSelectFont={handleFontClick}
          onClose={() => setIsFontsOpen(false)}
        />
      )}
    </section>
  );
}

export default EngravingSection;
