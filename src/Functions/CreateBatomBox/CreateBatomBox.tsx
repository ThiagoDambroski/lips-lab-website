import type { Dispatch, SetStateAction } from "react";
import type { TypesOptions } from "./Types";
import "../../scss/CreateBatom.css";
import { getProductConfig, type ProductKey } from "./constants/productConfig";
import CreateBatomBackButton from "./components/CreateBatomBackButton";
import CreationSteps from "./components/CreationSteps";
import ProductSelector from "./components/ProductSelector";
import PurchaseSummary from "./components/PurchaseSummary";
import { useCreateBatomState } from "./hooks/useCreateBatomState";
import { buildShopifyPermalink, goToShopify, type ShopifyProductPayload } from "./utils/shopify";
import { resolveSelectedSubLabels } from "./utils/colorSelection";
import { additiveOptions, allColors, allEsence, glitterOptions, smellOptions } from "./data/builderOptions";

type CreateBatomBoxProps = {
  setCreateActive: Dispatch<SetStateAction<boolean>>;
  typeInput: TypesOptions;
};

function CreateBatomBox({ setCreateActive, typeInput }: CreateBatomBoxProps) {
  const { state, actions } = useCreateBatomState(typeInput);
  const productConfig = getProductConfig(state.type);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleTypeChange = (nextType: ProductKey) => {
    actions.resetProductState(nextType);
    scrollToTop();
  };

  const buildProductFromState = (): ShopifyProductPayload => ({
    id: Date.now(),
    type: state.type,
    glitter: state.glitterSelected ?? "none",
    base: state.baseSelected,
    smell: state.smell,
    aditive: state.aditive.length ? state.aditive.join(", ") : "none",
    esence: state.esence,
    boxText: state.boxText,
    boxFont: state.boxFont,
    boxImage: state.boxImage,
    batomFormat: state.batomFormat,
  });

  const handleFinishPurchase = () => {
    const product = buildProductFromState();
    const selectedSubLabels = resolveSelectedSubLabels(state.mixSelected, allColors);
    const selectedSubLabelsText = selectedSubLabels.length ? selectedSubLabels.join(", ") : "none";
    const finalHex = state.selectedColor ?? "none";
    const url = buildShopifyPermalink(product, selectedSubLabelsText, finalHex);

    goToShopify(url);
  };

  const goBackFunction = () => {
    if (state.type === undefined) {
      setCreateActive(false);
      return;
    }

    if (state.step === -1) {
      actions.setType(undefined);
      return;
    }

    if (state.step === 0) {
      actions.setStep(-1);
      actions.setDoItYourSelf(undefined);
      return;
    }

    if (state.step === 1 && state.type === "oil") {
      actions.setStep(-1);
      actions.setDoItYourSelf(undefined);
      return;
    }

    if (state.step === 8) {
      actions.setStep(state.type === "gloss" ? 6 : 7);
      return;
    }

    if (state.step === 3) {
      actions.setStep(1);
    } else {
      actions.setStep((previousStep) => Math.max(-1, previousStep - 1));
    }

    scrollToTop();
  };

  const handleEditColor = () => {
    actions.setDoItYourSelf(true);
    actions.setStep(1);
  };

  return (
    <div>
      <CreateBatomBackButton isVisible={state.doItYourSelf !== false} onBack={goBackFunction} />

      {state.type === undefined && <ProductSelector onSelectProduct={handleTypeChange} />}

      {state.type !== undefined &&
        (state.step === 9 ? (
          <PurchaseSummary
            type={state.type}
            productConfig={productConfig}
            selectedColor={state.selectedColor}
            glitterSelected={state.glitterSelected}
            baseSelected={state.baseSelected}
            smell={state.smell}
            aditive={state.aditive}
            esence={state.esence}
            boxText={state.boxText}
            boxImage={state.boxImage}
            glitterOptions={glitterOptions}
            additiveOptions={additiveOptions}
            smellOptions={smellOptions}
            allEsence={allEsence}
            onEditStep={actions.setStep}
            onEditColor={handleEditColor}
            onFinishPurchase={handleFinishPurchase}
          />
        ) : (
          <CreationSteps state={state} actions={actions} productConfig={productConfig} />
        ))}
    </div>
  );
}

export default CreateBatomBox;
