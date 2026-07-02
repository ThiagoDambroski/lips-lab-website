import normalGloss from "../assets/gloss final.svg";
import normalBatom from "../assets/batom final.svg";
import lipCombo from "../assets/lip combo.svg";
import glossCombo from "../assets/gloss combo.svg";
import batomCombo from "../assets/batom combo.svg";
import lipOil from "../assets/lipOil.png";
import type { ProductItem } from "../ReserveNow/ProductCarouselProps";

export type IncludeItem = {
  id: number;
  title: string;
  description: string;
};

export const experienceProducts: ProductItem[] = [
  { id: 1, title: "GLOSS LABIAL", price: "55€", imageUrl: normalGloss, alt: "Gloss labial rosa Lips Lab" },
  { id: 2, title: "BATOM", price: "55€", imageUrl: normalBatom, alt: "Batom branco com tampa rosa Lips Lab" },
  { id: 3, title: "LIP OIL", price: "55€", imageUrl: lipOil, alt: "Lip oil Lips Lab" },
  { id: 4, title: "LIP COMBO", price: "99€", imageUrl: lipCombo, alt: "Lip combo Lips Lab" },
  { id: 5, title: "GLOSS COMBO", price: "99€", imageUrl: glossCombo, alt: "Gloss combo Lips Lab" },
  { id: 6, title: "BATOM COMBO", price: "99€", imageUrl: batomCombo, alt: "Batom combo Lips Lab" },
];

export const includedItems: IncludeItem[] = [
  {
    id: 1,
    title: "CRIAÇÃO NO LABORATÓRIO LIPS LAB",
    description: "Veste a bata e entra no nosso laboratório. Escolhe a base, cria a cor, adiciona o aroma, a essência e o aditivo. És tu quem decide tudo!",
  },
  {
    id: 2,
    title: "BEBIDA DE BOAS-VINDAS",
    description: "Uma bebida especial para desfrutares enquanto vives a experiência Lips Lab.",
  },
  {
    id: 3,
    title: "COLORAÇÃO PESSOAL",
    description: "Descobre a cartela de tons que realça a tua beleza natural e valoriza os teus traços.",
  },
  {
    id: 4,
    title: "EMBALAGEM PERSONALIZADA",
    description: "Grava o teu nome, símbolo ou palavra na embalagem do teu produto.",
  },
  {
    id: 5,
    title: "CHARMS DECORATIVOS",
    description: "Pequenos detalhes únicos que tornam a tua criação ainda mais especial.",
  },
  {
    id: 6,
    title: "OFERTA MISTÉRIO",
    description: "Uma oferta mistério para acrescentar à tua experiência.",
  },
];

export const howItWorksSteps: IncludeItem[] = [
  { id: 1, title: "ESCOLHE A BASE", description: "Descobre as diferentes opções de acabamento e escolhe a que mais gostas." },
  { id: 2, title: "CRIA A COR", description: "Trabalha com uma especialista em cores para encontrares a cor perfeita para ti" },
  { id: 3, title: "ADICIONA O AROMA E A ESSÊNCIA", description: "Escolhe o aroma e a essência que dão uma personalidade única à tua criação." },
  { id: 4, title: "ESCOLHE O ADITIVO", description: "Dá o toque final. São vários os aditivos que podes acrescentar à tua fórmula perfeita." },
  { id: 5, title: "PERSONALIZA A EMBALAGEM", description: "Grava o teu nome na embalagem e adiciona charms para tornar o teu produto único" },
];
