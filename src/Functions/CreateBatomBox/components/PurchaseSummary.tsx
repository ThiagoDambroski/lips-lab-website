import type { CSSProperties } from "react";
import type {
  AdditivesOptions,
  BaseOptions,
  EsenceOptions,
  SmelltOptions,
  TypesOptions,
} from "../Types";
import type { ProductConfig } from "../constants/productConfig";
import { CREATE_BATOM_PRICE } from "../constants/productConfig";
import { findSymbolImage } from "../constants/symbolOptions";
import { resolveEssenceIcon, resolveSmellIcon } from "../constants/tasteAssets";
import PurchaseSummaryItem from "./PurchaseSummaryItem";
import logoLibs from "../../../assets/logo.png";

type ImageOption = {
  id: string | number;
  img: string;
};

export type PurchaseSummaryProps = {
  type: TypesOptions;
  productConfig: ProductConfig;
  selectedColor: string | undefined;
  glitterSelected: number | null;
  baseSelected: BaseOptions;
  smell: SmelltOptions;
  aditive: AdditivesOptions[];
  esence: EsenceOptions;
  boxText: string;
  boxImage: string;
  glitterOptions: ImageOption[];
  additiveOptions: ImageOption[];
  smellOptions: ImageOption[];
  allEsence: ImageOption[];
  onEditStep: (step: number) => void;
  onEditColor: () => void;
  onFinishPurchase: () => void;
};

function PurchaseSummary({
  type,
  productConfig,
  selectedColor,
  glitterSelected,
  baseSelected,
  smell,
  aditive,
  esence,
  boxText,
  boxImage,
  glitterOptions,
  additiveOptions,
  smellOptions,
  allEsence,
  onEditStep,
  onEditColor,
  onFinishPurchase,
}: PurchaseSummaryProps) {
  const selectedGlitterObj = glitterOptions.find((glitter) => glitter.id === glitterSelected);
  const firstAdditive = aditive[0] ?? null;
  const firstAdditiveObj = additiveOptions.find((additive) => additive.id === firstAdditive);
  const selectedSmellObj = smellOptions.find((option) => option.id === smell);
  const selectedEssenceObj = allEsence.find((option) => option.id === esence);
  const smellIcon = smell !== "none" ? resolveSmellIcon(smell, selectedSmellObj?.img) : undefined;
  const essenceIcon = esence !== "none" ? resolveEssenceIcon(esence, selectedEssenceObj?.img) : undefined;

  const renderCustomizationSummary = () => {
    const symbolImage = findSymbolImage(boxImage);
    const text = boxText.trim();

    if (boxImage !== "none" && symbolImage) {
      return <img src={symbolImage} alt=""  decoding="async"  loading="lazy" />;
    }

    if (boxImage === "none" && text) {
      return <p>{text}</p>;
    }

    return <p>none</p>;
  };

  return (
    <div className="create-batom-summary purchse-screen">
      <div className="create-batom-summary__content purchse-screen-logo">
        <img src={logoLibs} alt="Lips Lab logo"  decoding="async"  loading="lazy" />

        <div className="create-batom-summary__header purchse-screen-logo-div">
          <h2>CRIASTE O TEU próprio {productConfig.displayName}!</h2>
          <p>Antes de adicionares ao carrinho, confirma se está tudo correto.</p>
        </div>

        <ul className={["create-batom-summary__list", "purchase-summary", productConfig.summaryClassName ?? ""].filter(Boolean).join(" ")}>
          {type !== "oil" && (
            <PurchaseSummaryItem label="base" onEdit={() => onEditStep(0)}>
              <p>{baseSelected === "none" ? "none" : baseSelected}</p>
            </PurchaseSummaryItem>
          )}

          <PurchaseSummaryItem
            label="cor"
            onEdit={onEditColor}
            contentStyle={{ "--swatch": selectedColor } as CSSProperties}
          />

          <PurchaseSummaryItem label="pigmento" onEdit={() => onEditStep(3)}>
            {selectedGlitterObj ? <img src={selectedGlitterObj.img} alt=""  decoding="async"  loading="lazy" /> : <p>none</p>}
          </PurchaseSummaryItem>

          <PurchaseSummaryItem label="SABOR" onEdit={() => onEditStep(4)}>
            <div className="smell-esence">{smellIcon ? <img src={smellIcon} alt=""  decoding="async"  loading="lazy" /> : <p>none</p>}</div>
          </PurchaseSummaryItem>

          <PurchaseSummaryItem label="ESSÊNCIA" onEdit={() => onEditStep(4)}>
            <div className="smell-esence">
              {essenceIcon ? <img src={essenceIcon} alt=""  decoding="async"  loading="lazy" /> : <p>none</p>}
            </div>
          </PurchaseSummaryItem>

          <PurchaseSummaryItem label="aditivo" onEdit={() => onEditStep(5)}>
            {firstAdditiveObj ? <img src={firstAdditiveObj.img} alt=""  decoding="async"  loading="lazy" /> : <p>none</p>}
          </PurchaseSummaryItem>

          <PurchaseSummaryItem label="PERSONALIZAÇÃO" onEdit={() => onEditStep(6)} contentClassName="last-step">
            {renderCustomizationSummary()}
          </PurchaseSummaryItem>
        </ul>

        <div className="create-batom-summary__actions button-container">
          <span>{CREATE_BATOM_PRICE.toFixed(2).replace(".", ",")}€</span>

          <button type="button" onClick={onFinishPurchase}>
            <p>ADICIONAR AO CARRINHO</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSummary;
