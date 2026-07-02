import type { ProductKey } from "./productConfig";
import glossImage from "../../../assets/gloss online exp.svg";
import batomImage from "../../../assets/batom final exp.svg";
import lipOilImage from "../../../assets/lipOil.png";

export type ProductSelectorItem = {
  type: ProductKey;
  label: string;
  image: string;
  alt: string;
  className?: string;
};

export const PRODUCT_SELECTOR_ITEMS: ProductSelectorItem[] = [
  {
    type: "gloss",
    label: "GLOSS",
    image: glossImage,
    alt: "Gloss",
  },
  {
    type: "batom",
    label: "BATOM",
    image: batomImage,
    alt: "Batom",
  },
  {
    type: "oil",
    label: "LIP OIL",
    image: lipOilImage,
    alt: "Lip Oil",
    className: "gloss-or-batom-container-image-oil",
  },
];
