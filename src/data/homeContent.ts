import circlesRed from "../assets/colorsVer.svg";
import circlesPink from "../assets/colorsVib.svg";
import circlesNude from "../assets/colorsNude.svg";
import circlesExpressive from "../assets/colorsExp.svg";
import collageRed from "../assets/colageVer.jpg";
import collagePink from "../assets/collageVib.png";
import collageNude from "../assets/colageNude.svg";
import collageExpressive from "../assets/colageExp.png";
import type { Slide } from "../HomePage/ToneCarousel";

export type HomeStep = {
  id: number;
  title: string;
  description: string;
};

export const homeSteps: HomeStep[] = [
  {
    id: 1,
    title: "Escolhe a tua base",
    description: "Descobre as diferentes opções de acabamento e escolhe a que mais gostas.",
  },
  {
    id: 2,
    title: "Cria a tua cor ",
    description: "Trabalha com uma especialista em cores para encontrares a cor perfeita para ti.",
  },
  {
    id: 3,
    title: "Adiciona o aroma e essência",
    description: "Escolhe o aroma e a essência que dão uma personalidade única à tua criação.",
  },
  {
    id: 4,
    title: "Escolhe o aditivo",
    description: "Dá o toque final. São vários os aditivos que podes acrescentar à tua fórmula perfeita.",
  },
  {
    id: 5,
    title: "Personaliza a embalagem",
    description: "Grava o teu nome na embalagem e adiciona charms para tornar o teu produto único.",
  },
];

export const toneSlides: Slide[] = [
  {
    id: "vermelho",
    bgColor: "#B93A2B",
    circlesImageSrc: circlesRed,
    collageImageSrc: collageRed,
    activePill: "VERMELHO",
  },
  {
    id: "vibrante",
    bgColor: "#C5556B",
    circlesImageSrc: circlesPink,
    collageImageSrc: collagePink,
    activePill: "VIBRANTE",
  },
  {
    id: "nude",
    bgColor: "#D88A7C",
    circlesImageSrc: circlesNude,
    collageImageSrc: collageNude,
    activePill: "NUDE",
  },
  {
    id: "expressivo",
    bgColor: "#8B3E4E",
    circlesImageSrc: circlesExpressive,
    collageImageSrc: collageExpressive,
    activePill: "EXPRESSIVO",
  },
];
