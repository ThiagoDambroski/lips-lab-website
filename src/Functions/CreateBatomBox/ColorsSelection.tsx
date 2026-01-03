// ColorsSelection.tsx
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
}: ColorsSelectionProps) {
  const { allColors } = useApp();

  const [selected, setSelected] = useState<string[]>([]);
  const [weights, setWeights] = useState<Record<string, number>>({});

  // ✅ Determine palette mode BEFORE effects run (prevents the "overwrite" bug)
  const hasPalette = Boolean(paletteOptions && paletteOptions.length > 0);

  const [isFromAutomatic, setIsFromAutomatic] = useState<boolean>(() => hasPalette);

  const [firstStepColors, setFirstStepColors] = useState<ColorOption[]>(() => {
    return hasPalette ? (paletteOptions as ColorOption[]) : allColors;
  });

  // ✅ If paletteOptions changes (or comes back after remount), apply it with priority
  useEffect(() => {
    if (paletteOptions && paletteOptions.length > 0) {
      setIsFromAutomatic(true);
      setFirstStepColors(paletteOptions);
    }
  }, [paletteOptions]);

  // ✅ Keep default list in sync ONLY when NOT using palette
  useEffect(() => {
    if (!paletteOptions || paletteOptions.length === 0) {
      setIsFromAutomatic(false);
      setFirstStepColors(allColors);
    }
  }, [allColors, paletteOptions]);

  const toggleColor = (hex: string) => {
    setSelected((prev) => {
      if (prev.includes(hex)) {
        setWeights((w) => {
          const { [hex]: _, ...rest } = w;
          return rest;
        });
        return prev.filter((c) => c !== hex);
      }

      if (prev.length >= 4) return prev; // limit 4

      setWeights((w) => ({ ...w, [hex]: 100 }));
      return [...prev, hex];
    });
  };

  // ✅ Avoid step hijacking (only guard within color flow)
  useEffect(() => {
    if (doItYourSelf === true && selected.length === 0 && (step === 0 || step === 1)) {
      setStep(0);
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
      // ✅ do NOT overwrite an existing color when remounting
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
    // leaving palette mode
    setPaletteOptions(null);
    setIsFromAutomatic(false);
    setFirstStepColors(allColors);

    setSelected([]);
    setWeights({});

    setDoItYourSelf(true);
    setStep(0);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  };

  const startAutomaticFlow = () => {
    setPaletteOptions(null);
    setIsFromAutomatic(false);

    setSelected([]);
    setWeights({});

    setDoItYourSelf(false);
    setStep(0);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  };

  const continueFromAutomaticPalette = (paletteHexes: string[]) => {
    const unique = Array.from(new Set(paletteHexes)).filter(Boolean);

    const options: ColorOption[] = unique.map((hex) => ({
      hex,
      sub: hex,
    }));

    // ✅ persist in parent (survives unmount at step 8)
    setPaletteOptions(options);

    // ✅ apply immediately too
    setIsFromAutomatic(true);
    setFirstStepColors(options);

    setDoItYourSelf(true);
    setStep(0);
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
          {step === 0 && (
            <FristStep
              allColors={firstStepColors}
              selected={selected}
              toggleColor={toggleColor}
              setStep={setStep}
              variant={isFromAutomatic ? "palette" : "default"}
            />
          )}

          {step === 1 && (
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
