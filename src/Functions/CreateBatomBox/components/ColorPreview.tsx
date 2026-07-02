import type { CSSProperties } from "react";
import type { TypesOptions } from "../Types";
import glossWhioutImage from "../../../assets/gloss whiout.png";
import batomBaseNoTip from "../../../assets/batom_base_no_tip.png";
import batomTipMaskAlpha from "../../../assets/batom_tip_shading2.png";
import batomTipShading from "../../../assets/batom_tip_shading2.png";

export type ColorPreviewProps = {
  type: TypesOptions;
  step: number;
  doItYourSelf: boolean | undefined;
  selectedColor: string | undefined;
};

function ColorPreview({ type, step, doItYourSelf, selectedColor }: ColorPreviewProps) {
  const shouldShowPreview =
    doItYourSelf === true && ((step > 0 && step <= 4) || (step > 5 && step < 7) || step === 8);

  if (!shouldShowPreview) return null;

  if (type === "gloss" || type === "oil") {
    return (
      <div className="create-batom__color-preview item-display-2">
        <div className="create-batom__gloss-preview item-img-2-color-wrapper">
          <div
            className="item-color-fill item-color-fill-2 is-tip"
            style={{ backgroundColor: selectedColor || "transparent" }}
          />
          <img src={glossWhioutImage} alt="" className="item-img-2-create"  decoding="async"  loading="lazy" />
        </div>
      </div>
    );
  }

  return (
    <div className="create-batom__color-preview item-display-2">
      <div className="create-batom__lipstick-preview item-batom-wrapper">
        <div
          className="batom-color-fill"
          style={
            {
              backgroundColor: selectedColor || "transparent",
              "--batomMask": `url(${batomTipMaskAlpha})`,
            } as CSSProperties
          }
        />
        <img src={batomTipShading} alt="" className="batom-tip-shading"  decoding="async"  loading="lazy" />
        <img src={batomBaseNoTip} alt="" className="item-batom-img"  decoding="async"  loading="lazy" />
      </div>
    </div>
  );
}

export default ColorPreview;
