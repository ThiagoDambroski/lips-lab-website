import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import type { TypesOptions } from "./Types";
import "../../styles/CreateBatom.css";
import { CREATE_BATOM_PRICE, getProductConfig, type ProductKey } from "./constants/productConfig";
import CreateBatomBackButton from "./components/CreateBatomBackButton";
import CreationSteps from "./components/CreationSteps";
import ProductSelector from "./components/ProductSelector";
import PurchaseSummary from "./components/PurchaseSummary";
import { useCreateBatomState } from "./hooks/useCreateBatomState";
import { addCartItem } from "../../Cart/utils/cartStorage";
import { buildCartDescription } from "../../Cart/utils/cartItems";
import { ROUTES } from "../../config/routes";
import { GLITTER_LABELS } from "./constants/glitterLabels";
import { resolveSelectedSubLabels } from "./utils/colorSelection";
import { additiveOptions, allColors, allEsence, glitterOptions, smellOptions } from "./data/builderOptions";

type CreateBatomBoxProps = {
  setCreateActive: Dispatch<SetStateAction<boolean>>;
  typeInput: TypesOptions;
};

function CreateBatomBox({ setCreateActive, typeInput }: CreateBatomBoxProps) {
  const navigate = useNavigate();
  const { state, actions } = useCreateBatomState(typeInput);
  const productConfig = getProductConfig(state.type);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleTypeChange = (nextType: ProductKey) => {
    actions.resetProductState(nextType);
    scrollToTop();
  };

  const handleFinishPurchase = () => {
    if (!state.type) return;

    const selectedSubLabels = resolveSelectedSubLabels(state.mixSelected, allColors);
    const selectedSubLabelsText = selectedSubLabels.length ? selectedSubLabels.join(", ") : "none";
    const glitterLabel = state.glitterSelected ? GLITTER_LABELS[state.glitterSelected] ?? String(state.glitterSelected) : "none";
    const details = [
      { label: "Tipo", value: productConfig.displayName },
      { label: "Cores selecionadas", value: selectedSubLabelsText },
      { label: "Cor final", value: state.selectedColor ?? "none" },
      { label: "Glitter", value: glitterLabel },
      { label: "Base", value: state.baseSelected },
      { label: "Aroma", value: state.smell },
      { label: "Aditivo", value: state.aditive.length ? state.aditive.join(", ") : "none" },
      { label: "Essência", value: state.esence },
      { label: "Gravação", value: state.boxText.trim() || "none" },
      { label: "Símbolo", value: state.boxImage },
      { label: "Fonte", value: state.boxFont },
      ...(state.type === "batom" ? [{ label: "Formato", value: state.batomFormat || "none" }] : []),
    ];

    addCartItem({
      source: "online-experience",
      name: productConfig.displayName,
      quantity: 1,
      unitPrice: CREATE_BATOM_PRICE,
      shopifyVariantId: String(productConfig.variantId),
      details,
      description: buildCartDescription(details),
    });

    navigate(ROUTES.cart);
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
