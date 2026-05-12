import React, { useEffect, useMemo, useState } from "react";
import FristStep from "./Steps/FristStep";
import SecondStep from "./Steps/SecondStep";
import { useApp } from "../../Contexts/AppProvider";
import AutomaticColors from "./automatic/AutomaticColors";

import virtual from "../../assets/virutal as.png";
import cloud from "../../assets/cloud pens.png";
import "../../scss/CreateBatom.css";

type ColorOption = { hex: string; sub: string };

type ColorsSelectionProps = {
  setSelectedColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentSelectedColor: string | undefined;

  paletteOptions: ColorOption[] | null;
  setPaletteOptions: React.Dispatch<React.SetStateAction<ColorOption[] | null>>;

  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  doItYourSelf: Boolean | undefined;
  setDoItYourSelf: React.Dispatch<React.SetStateAction<Boolean | undefined>>;

  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;

  weights: Record<string, number>;
  setWeights: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  type: string;
};

function ColorsSelection({
  setSelectedColor,
  currentSelectedColor,
  paletteOptions,
  setPaletteOptions,
  step,
  setStep,
  doItYourSelf,
  setDoItYourSelf,
  selected,
  setSelected,
  weights,
  setWeights,
  type

}: ColorsSelectionProps) {
  const { allColors } = useApp();

  const hasSuggestedPalette = Boolean(paletteOptions && paletteOptions.length > 0);
  const [isFromAutomatic, setIsFromAutomatic] = useState<boolean>(() => hasSuggestedPalette);

  // selectable colors are ALWAYS base pigments
  const [firstStepColors, setFirstStepColors] = useState<ColorOption[]>(() => allColors);

  // ✅ allowed set (base pigments only)
  const allowedHexSet = useMemo(() => {
    return new Set(allColors.map((c) => c.hex.toLowerCase()));
  }, [allColors]);

  useEffect(() => {
    setFirstStepColors(allColors);
  }, [allColors]);

  useEffect(() => {
    setIsFromAutomatic(hasSuggestedPalette);
  }, [hasSuggestedPalette]);

  // ✅ IMPORTANT FIX: ignore any hex not in base pigments
  const toggleColor = (hex: string) => {
    const normalized = hex.toLowerCase();
    if (!allowedHexSet.has(normalized)) return;

    setSelected((prev) => {
      if (prev.some((c) => c.toLowerCase() === normalized)) {
        setWeights((w) => {
          const key = Object.keys(w).find((k) => k.toLowerCase() === normalized) ?? hex;
          const { [key]: _, ...rest } = w;
          return rest;
        });
        return prev.filter((c) => c.toLowerCase() !== normalized);
      }

      if (prev.length >= 4) return prev;

      // store weights using the exact hex from allColors (canonical casing)
      const canonicalHex =
        allColors.find((c) => c.hex.toLowerCase() === normalized)?.hex ?? hex;

      setWeights((w) => ({ ...w, [canonicalHex]: 100 }));
      return [...prev, canonicalHex];
    });
  };

  useEffect(() => {
    if (doItYourSelf === true && selected.length === 0 && (step === 1 || step === 2)) {
      setStep(1);
    }
  }, [doItYourSelf, selected.length, step, setStep]);

  const hexToRgb = (hex: string) => {
    const c = hex.replace("#", "");
    const bigint = parseInt(c, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const h = Math.round(x).toString(16);
        return h.length === 1 ? "0" + h : h;
      })
      .join("");

  useMemo(() => {
    if (selected.length === 0) {
      const fallback = currentSelectedColor ?? "#ffffff";
      if (!currentSelectedColor) setSelectedColor("#ffffff");
      return fallback;
    }

    const raw = selected.map((hex) => ({ hex, w: weights[hex] ?? 0 }));
    const sum = raw.reduce((acc, { w }) => acc + w, 0);

    const normalized =
      sum > 0
        ? raw.map((x) => ({ ...x, w: x.w / sum }))
        : raw.map((x) => ({ ...x, w: 1 / raw.length }));

    const acc = normalized.reduce(
      (a, { hex, w }) => {
        const { r, g, b } = hexToRgb(hex);
        a.r += r * w;
        a.g += g * w;
        a.b += b * w;
        return a;
      },
      { r: 0, g: 0, b: 0 }
    );

    const mixed = rgbToHex(acc.r, acc.g, acc.b);
    setSelectedColor(mixed);
    return mixed;
  }, [selected, weights, setSelectedColor, currentSelectedColor]);

  const startManualFromScratch = () => {
    setPaletteOptions(null);
    setIsFromAutomatic(false);

    setSelected([]);
    setWeights({});

    setDoItYourSelf(true);
    if(type === "oil"){
      setStep(1);
    }else{
      setStep(0);
    }
    
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const startAutomaticFlow = () => {
    setPaletteOptions(null);
    setIsFromAutomatic(false);

    setSelected([]);
    setWeights({});

    setDoItYourSelf(false);
    setStep(-1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // ✅ suggested palette is DISPLAY ONLY, but sub must come from base pigments if possible
  const continueFromAutomaticPalette = (paletteHexes: string[]) => {
    const uniqueHexes = Array.from(new Set(paletteHexes)).filter(Boolean);

    const suggested: ColorOption[] = uniqueHexes.map((hex) => {
      const found = allColors.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
      return {
        hex,
        sub: (found?.sub ?? hex).toUpperCase(),
      };
    });

    setPaletteOptions(suggested);

    setIsFromAutomatic(true);
    setDoItYourSelf(true);
    if(type === "oil"){
      setStep(1);
    }else{
      setStep(0);
    }
  };

  return (
    <>
      {doItYourSelf === undefined && (
        <div className="main-color-selection-options">
          <h3>
            Escolhe como vais viver a <br /> tua experiência lips lab:
          </h3>
          <div>
            <button onClick={startAutomaticFlow}>
              <img src={virtual} alt="" />
              assistência virtual
            </button>

            <button onClick={startManualFromScratch}>
              <img src={cloud} alt="" />
              cria a partir do zero
            </button>
          </div>
        </div>
      )}

      {doItYourSelf === true && (
        <>
          {step === 1 && (
            <FristStep
              allColors={firstStepColors}
              selected={selected}
              toggleColor={toggleColor}
              setStep={setStep}
              variant={isFromAutomatic ? "palette" : "default"}
              suggestedPalette={paletteOptions}
            />
          )}

          {step === 2 && (
            <SecondStep
              selected={selected}
              weights={weights}
              setWeights={setWeights}
              toggleColor={toggleColor}
              setStep={setStep}
            />
          )}
        </>
      )}

      {doItYourSelf === false && (
        <AutomaticColors
          toggleColor={toggleColor}
          selected={selected}
          setSelected={setSelected}
          setDoItYourSelf={setDoItYourSelf}
          setStep={setStep}
          onContinueToManual={continueFromAutomaticPalette}
        />
      )}
    </>
  );
}

export default ColorsSelection;
