import glossImage from "../assets/gloss.png";
import batomImage from "../assets/final batom create.png";
import glossTexture from "../assets/gloss-background.png";

export type ProductsPageProductId = "gloss" | "batom";

export type ProductsPageProduct = {
  id: ProductsPageProductId;
  title: string;
  displayTitle: string;
  basePrice: number;
  description: string;
  image: string;
  textureImage: string;
  imageAlt: string;
  benefits: string[];
  safety: string[];
  usageTips: string[];
};

export const PRODUCT_EXTRA_PRICE = 2;

export const productsPageItems: ProductsPageProduct[] = [
  {
    id: "gloss",
    title: "Lip Gloss",
    displayTitle: "Cria o teu Lip Gloss personalizado",
    basePrice: 19,
    description:
      "Bálsamo labial com cor, hidratante e nutritivo, com acabamento brilhante, que hidrata, suaviza e protege os lábios de forma imediata.",
    image: glossImage,
    textureImage: glossTexture,
    imageAlt: "Lip gloss Lips Lab personalizado",
    benefits: ["Acabamento brilhante", "Sensação hidratante", "Personalização com cor e extras"],
    safety: ["Produto cosmético de uso externo.", "Evitar contacto direto com os olhos.", "Não utilizar em caso de irritação nos lábios."],
    usageTips: ["Aplicar diretamente nos lábios.", "Reaplicar ao longo do dia sempre que necessário.", "Guardar em local fresco e seco."],
  },
  {
    id: "batom",
    title: "Batom",
    displayTitle: "Cria o teu Batom personalizado",
    basePrice: 22,
    description:
      "Batom com acabamento personalizável, criado para dar cor, conforto e identidade à tua rotina de beleza.",
    image: batomImage,
    textureImage: glossTexture,
    imageAlt: "Batom Lips Lab personalizado",
    benefits: ["Cor intensa", "Acabamento confortável", "Personalização com extras"],
    safety: ["Produto cosmético de uso externo.", "Evitar contacto direto com os olhos.", "Não utilizar em caso de irritação nos lábios."],
    usageTips: ["Aplicar diretamente nos lábios.", "Reaplicar quando necessário.", "Guardar em local fresco e seco."],
  },
];
