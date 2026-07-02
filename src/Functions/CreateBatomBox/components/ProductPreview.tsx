import type { ProductConfig } from "../constants/productConfig";
import descVer from "../../../assets/display icons exp.svg";

export type ProductPreviewProps = {
  productConfig: ProductConfig;
  isOil: boolean;
  doItYourSelf: boolean | undefined;
};

function ProductPreview({ productConfig, isOil, doItYourSelf }: ProductPreviewProps) {
  if (doItYourSelf !== undefined) return null;

  return (
    <div className="create-batom__product-preview item-display">
      <div className="create-batom__product-preview-content item-display-container">
        <div>
          <h2>Prepara-te para criares o teu {productConfig.label} de sonho!</h2>

          <p className="p-1">
            Segue os próximos passos e dá vida ao teu {productConfig.label.toLowerCase()} labial.
          </p>

          <img src={descVer} alt=""  decoding="async"  loading="lazy" />
        </div>

        <p>
          *As cores podem variar dependendo do tipo de ecrã Para obter melhores resultados,
          certifique-se de que o brilho do ecrã está no máximo
        </p>
      </div>

      <img
        src={productConfig.previewImage}
        alt=""
        className={["create-batom__product-preview-image", "pink-gloss", isOil ? "pink-gloss-oil" : ""].filter(Boolean).join(" ")}
       decoding="async"  loading="lazy" />
    </div>
  );
}

export default ProductPreview;
