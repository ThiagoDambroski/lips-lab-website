import BatomFormat from "../BatomFormat";
import ColorsSelection from "../ColorsSelection";
import FormatAndText from "../FormatAndText";
import GlitterBaseSelection from "../GlitterBaseSelection";
import SmellAndAditive from "../SmellAndAditive";
import type { ProductConfig } from "../constants/productConfig";
import type { CreateBatomActions, CreateBatomState } from "../hooks/useCreateBatomState";
import ColorPreview from "./ColorPreview";
import ProductPreview from "./ProductPreview";
import libsBackground from "../../../assets/libs back.png";

export type CreationStepsProps = {
  state: CreateBatomState;
  actions: CreateBatomActions;
  productConfig: ProductConfig;
};

function CreationSteps({ state, actions, productConfig }: CreationStepsProps) {
  return (
    <main className="create-batom create-batom--steps main-color-selection" style={{ backgroundImage: `url(${libsBackground})` }}>
      <div className="create-batom__steps-layout main-color-back">
        <ProductPreview
          productConfig={productConfig}
          isOil={state.type === "oil"}
          doItYourSelf={state.doItYourSelf}
        />

        <ColorPreview
          type={state.type}
          step={state.step}
          doItYourSelf={state.doItYourSelf}
          selectedColor={state.selectedColor}
        />

        <ColorsSelection
          setSelectedColor={actions.setSelectedColor}
          currentSelectedColor={state.selectedColor}
          paletteOptions={state.paletteOptions}
          setPaletteOptions={actions.setPaletteOptions}
          step={state.step}
          setStep={actions.setStep}
          doItYourSelf={state.doItYourSelf}
          setDoItYourSelf={actions.setDoItYourSelf}
          selected={state.mixSelected}
          setSelected={actions.setMixSelected}
          weights={state.mixWeights}
          setWeights={actions.setMixWeights}
          type={state.type ?? ""}
        />

        <GlitterBaseSelection
          step={state.step}
          setStep={actions.setStep}
          glitterSelected={state.glitterSelected}
          setGlitterSelected={actions.setGlitterSelected}
          type={state.type ?? ""}
          baseSelected={state.baseSelected}
          setBaseSelected={actions.setBaseSelected}
        />

        <SmellAndAditive
          type={state.type}
          step={state.step}
          setStep={actions.setStep}
          smell={state.smell}
          setSmell={actions.setSmell}
          aditive={state.aditive}
          setAditive={actions.setAditive}
          esence={state.esence}
          setEsence={actions.setEsence}
        />

        <BatomFormat
          type={state.type}
          step={state.step}
          setStep={actions.setStep}
          setBatomFormat={actions.setBatomFormat}
          batomFormat={state.batomFormat}
        />

        <FormatAndText
          step={state.step}
          setStep={actions.setStep}
          type={state.type}
          boxText={state.boxText}
          setBoxText={actions.setBoxText}
          boxImg={state.boxImage}
          setBoxImg={actions.setBoxImage}
          boxFont={state.boxFont}
          setBoxFont={actions.setBoxFont}
        />
      </div>
    </main>
  );
}

export default CreationSteps;
