import type { Dispatch, SetStateAction } from "react";
import type { TypesOptions } from "./Types";
import EngravingSection from "./components/EngravingSection";
import FormulaSection from "./components/FormulaSection";

type FormatAndTextProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  type: TypesOptions;
  boxText: string;
  setBoxText: Dispatch<SetStateAction<string>>;
  boxImg: string;
  setBoxImg: Dispatch<SetStateAction<string>>;
  boxFont: string;
  setBoxFont: Dispatch<SetStateAction<string>>;
};

function FormatAndText({
  step,
  setStep,
  type,
  boxText,
  setBoxText,
  boxImg,
  setBoxImg,
  boxFont,
  setBoxFont,
}: FormatAndTextProps) {
  if (step === 8) {
    return <FormulaSection type={type} onContinue={() => setStep(9)} />;
  }

  if (step === 6) {
    return (
      <EngravingSection
        type={type}
        boxText={boxText}
        setBoxText={setBoxText}
        boxImg={boxImg}
        setBoxImg={setBoxImg}
        boxFont={boxFont}
        setBoxFont={setBoxFont}
        onContinue={setStep}
      />
    );
  }

  return null;
}

export default FormatAndText;
