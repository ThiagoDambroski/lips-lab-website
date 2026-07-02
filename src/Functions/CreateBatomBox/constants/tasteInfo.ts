import type { AdditivesOptions, EsenceOptions, SmelltOptions } from "../Types";

export type InfoContent = {
  title: string;
  paragraphs: string[];
  noteTitle?: string;
  noteLines?: string[];
};

export type InfoKind = "additive" | "smell" | "esence" | "creative";

export function createInfoKey(kind: InfoKind, id: string): string {
  return `${kind}:${id}`;
}

export const TASTE_INFO: Record<string, InfoContent> = {
  [createInfoKey("additive", "HIDRATANTE")]: {
    title: "HIDRATANTE",
    paragraphs: [
      "Mistura de óleos naturais de abacate, grainha de uva e jojoba, enriquecida com óleos botânicos ricos em antioxidantes.",
      "Ajuda a hidratar, nutrir e proteger os lábios, proporcionando conforto e suavidade.",
      "Este componente é essencial em batons com acabamento perolado ou cintilante, garantindo uma aplicação mais uniforme e confortável.",
    ],
  },
  [createInfoKey("additive", "SUAVIZAÇÃO")]: {
    title: "SUAVIZAÇÃO",
    paragraphs: [
      "Aditivo de origem vegetal que confere uma textura sedosa, cremosa e luxuosa ao batom.",
      "Formulado com óleos botânicos naturais, melhora o conforto na aplicação e deixa os lábios visivelmente mais suaves e macios.",
    ],
  },
  [createInfoKey("additive", "PROTEÇÃO SOLAR")]: {
    title: "PROTEÇÃO SOLAR",
    paragraphs: [
      "Formulado com Octylmethoxycinnamate, um filtro solar cosmético que ajuda a reforçar a proteção solar do batom.",
      "Todas as bases de batom e gloss incluem proteção solar de base (FPS 8).",
    ],
  },
  [createInfoKey("additive", "DENSIFICADOR")]: {
    title: "DENSIFICADOR",
    paragraphs: [
      "Aditivo que acrescenta corpo, hidratação e brilho à base do batom personalizado, criando um acabamento mais luxuoso e uniforme.",
      "Pode ser utilizado em fórmulas cremosas, mate ou brilhantes, sem provocar separação da fórmula, garantindo estabilidade e conforto.",
    ],
  },
  [createInfoKey("additive", "VOLUME LABIAL")]: {
    title: "VOLUME LABIAL",
    paragraphs: [
      "Aditivo volumizador com o tripeptídeo patenteado Maxi-Lip™, desenvolvido para:",
      "• Ajudar a aumentar o volume visível",
      "• Hidratar intensamente",
      "• Suavizar linhas finas",
      "• Melhorar o contorno dos lábios",
      "• Funciona estimulando a produção de colagénio nos tecidos conjuntivos",
      "",
      "Resultados de estudos clínicos, aplicado três vezes por dia durante vinte e nove dias:",
      "• Aumento de 40% no volume dos lábios",
      "• Melhoria de 60% na hidratação labial",
      "• Aumento de 70% na suavidade dos lábios",
      "• Melhoria de 100% na condição labial",
      "• Redução de 29% nas linhas e rugas superficiais",
    ],
  },
  [createInfoKey("additive", "ANTI-IDADE & REGENERADOR")]: {
    title: "ANTI-IDADE & REGENERADOR",
    paragraphs: [
      "Aditivo antioxidante que ajuda a reforçar a barreira natural da pele, promovendo hidratação e regeneração labial.",
      "Rico em polissacarídeos e minerais naturais como zinco, cálcio, magnésio, ferro e cobre, contribui para reduzir a aparência de linhas finas.",
      "Fórmula anti-envelhecimento, sem parabenos, ideal para cuidado e conforto diário dos lábios.",
    ],
  },
  [createInfoKey("smell", "Canela")]: {
    title: "CANELA",
    paragraphs: ["Sabor adocicado e intenso, derivado de paus de canela."],
  },
  [createInfoKey("smell", "Cereja jubilee")]: {
    title: "CEREJA JUBILEE",
    paragraphs: ["Sabor a cereja madura."],
  },
  [createInfoKey("smell", "Trufa de framboesa")]: {
    title: "TRUFA DE FRAMBOESA",
    paragraphs: ["Sabor a bolo de mousse de chocolate com cobertura de framboesa."],
  },
  [createInfoKey("smell", "Crème brûlée")]: {
    title: "CRÈME BRÛLÉE",
    paragraphs: ["Sabor a creme caramelizado, doce e com um delicado toque tostado."],
  },
  [createInfoKey("smell", "Cenoura")]: {
    title: "CENOURA",
    paragraphs: ["Sabor quente e levemente picante, inspirado num bolo de cenoura acabado de fazer."],
  },
  [createInfoKey("smell", "Menta")]: {
    title: "MENTA",
    paragraphs: ["Sabor fresco e revigorante de hortelã, semelhante a um mojito ou a uma tarte tropical de lima."],
  },
  [createInfoKey("smell", "Lima com Coco")]: {
    title: "LIMA E COCO",
    paragraphs: ["Sabor a lima espremida com coco, inspirado numa sobremesa tropical."],
  },
  [createInfoKey("smell", "Pink Champanhe")]: {
    title: "PINK CHAMPANHE",
    paragraphs: ["Sabor de morangos em champanhe."],
  },
  [createInfoKey("smell", "avela")]: {
    title: "AVELÃ",
    paragraphs: ["Sabor a avelã torrada, ligeiramente adocicada."],
  },
  [createInfoKey("smell", "Pêssego")]: {
    title: "PÊSSEGO",
    paragraphs: ["Sabor a pêssego maduro, com notas refrescantes."],
  },
  [createInfoKey("smell", "mimosa")]: {
    title: "MIMOSA",
    paragraphs: ["Sabor cítrico e delicado, combinação de laranja e tangerina."],
  },
  [createInfoKey("esence", "Especiarias Exóticas")]: {
    title: "ESPECIARIAS EXÓTICAS",
    paragraphs: ["Mistura quente e envolvente de lavanda, patchouli, coentros, ylang-ylang, rosa e outros botânicos."],
  },
  [createInfoKey("esence", "Baunilha")]: {
    title: "BAUNILHA",
    paragraphs: ["Fragrância predominantemente de baunilha, indicada para clientes sensíveis a cheiros fortes."],
  },
  [createInfoKey("esence", "Cappuccino")]: {
    title: "CAPPUCCINO",
    paragraphs: ["Aroma rico a café, criado a partir de grãos naturais de café."],
  },
  [createInfoKey("esence", "LARANJA E FLOR DE MIMOSA")]: {
    title: "LARANJA E FLOR DE MIMOSA",
    paragraphs: ["Mistura cítrica de laranja e flor de mimosa, ideal para clientes sensíveis a fragrâncias intensas."],
  },
  [createInfoKey("esence", "Chocolate")]: {
    title: "CHOCOLATE",
    paragraphs: ["Aroma a chocolate de leite, delicioso e fácil de combinar com outros aromas."],
  },
  [createInfoKey("esence", "Rosa Parisiense")]: {
    title: "ROSA PARISIENSE",
    paragraphs: ["Fragrância suave de rosa parisiense, com uma nota de base exclusiva e subtil."],
  },
  [createInfoKey("creative", "combos")]: {
    title: "EXEMPLOS DE COMBINAÇÕES CRIATIVAS",
    paragraphs: [
      "• Chocolate + Menta → Girl Scout Thin Mint",
      "• Baunilha + Avelã + Cappuccino → Vanilla Nut Latte",
      "• Cereja + Chocolate → Chocolate Covered Cherry",
      "• Avelã + Baunilha + Chocolate → Baby Ruth Bar",
      "• Sorvete de Pêssego + Baunilha → Sherbet",
      "• Canela → contribui para um efeito de volume visível nos lábios",
    ],
  },
};

export function getFallbackInfo<T extends AdditivesOptions | SmelltOptions | EsenceOptions>(
  id: T,
  name?: string,
  description?: string
): InfoContent | null {
  const text = description?.trim();

  if (!text) return null;

  return {
    title: String(name ?? id).toUpperCase(),
    paragraphs: [text],
  };
}
