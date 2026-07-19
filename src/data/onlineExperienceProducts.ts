import gloss from "../assets/gloss final.svg";
import batom from "../assets/batom final.svg";
import oil from "../assets/lipOil.png";
import type { TypesOptions } from "../Functions/CreateBatomBox/Types";
import { PRODUCT_VISIBILITY } from "../config/productVisibility";

export type OnlineExperienceProduct = {
  id: Exclude<TypesOptions, undefined>;
  title: string;
  priceText: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  ariaLabel: string;
};

export const onlineExperienceProducts: OnlineExperienceProduct[] = [
  {
    id: "gloss",
    title: "GLOSS LABIAL",
    priceText: "Cria o teu gloss labial / 35€",
    imageSrc: gloss,
    imageAlt: "Gloss labial personalizado Lips Lab",
    ariaLabel: "Criar gloss labial personalizado",
  },
  {
    id: "batom",
    title: "BATOM",
    priceText: "Cria o teu batom / 35€",
    imageSrc: batom,
    imageAlt: "Batom personalizado Lips Lab",
    ariaLabel: "Criar batom personalizado",
  },
  ...(PRODUCT_VISIBILITY.lipOil
    ? [
        {
          id: "oil" as const,
          title: "LIP OIL",
          priceText: "Cria o teu lip oil / 35€",
          imageSrc: oil,
          imageAlt: "Lip oil personalizado Lips Lab",
          className: "online-buy-card-oil",
          ariaLabel: "Criar lip oil personalizado",
        },
      ]
    : []),
];
