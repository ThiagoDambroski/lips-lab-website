import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AdditivesOptions, BaseOptions, EsenceOptions, EyeColorOptions, HairColorOptions, SkinToneOptions, SmelltOptions } from '../Functions/CreateBatomBox/Types';
import hidr from "../assets/hidr.png"
import suav from "../assets/sua.png"
import prot from "../assets/prot.png"
import dens from "../assets/dens.png"
import vol from "../assets/vol.png"
import anti from "../assets/anti.png"

import canela from "../assets/canela.png"
import cereja from "../assets/cereja.png"
import trufa from "../assets/trufa.png"
import champa from "../assets/champa.png"
import creme from "../assets/creme.png"
import bolo from "../assets/bolo.png"
import hortela from "../assets/hortela.png"
import lima from "../assets/lima.png"
import avela from "../assets/avelea.png"
import sorvete from "../assets/sorvete.png"
import mimosa from "../assets/mimosa.png"
import sambuca from "../assets/sambuca.png"

import espc from "../assets/espec.png"
import bauni from "../assets/bauni.png"
import cappu from "../assets/cappu.png"
import citri from "../assets/citricos.png"
import choco from "../assets/chocolate.png"
import rosa from "../assets/rosa.png"


//glitter
import antiqueGold from "../assets/glitter/antique gold.png";
import brass from "../assets/glitter/brass.png";
import bronze from "../assets/glitter/bronze.png";
import champagne from "../assets/glitter/champagne.png";

import copper from "../assets/glitter/copper.png";
import coral from "../assets/glitter/coral.png";
import crystal from "../assets/glitter/crystal.png";
import fuchsia from "../assets/glitter/fuchsia.png";

import garnet from "../assets/glitter/garnet.png";
import gold from "../assets/glitter/gold.png";
import opal from "../assets/glitter/opal.png";
import pink from "../assets/glitter/pink.png";

import pinkGold from "../assets/glitter/pink gold.png";
import roseGold from "../assets/glitter/rose gold.png";
import russet from "../assets/glitter/russet.png";
import sand from "../assets/glitter/sand.png";

import sienna from "../assets/glitter/sienna.png";
import silver from "../assets/glitter/silver.png";
import violet from "../assets/glitter/violet.png";
import pinkDiamond from "../assets/glitter/pink diamond.png";

import fireOpal from "../assets/glitter/fire opal.png";
import carnelian from "../assets/glitter/carnelian.png";
import starRuby from "../assets/glitter/star ruby.png";
import goldDust from "../assets/glitter/gold dust.png";

import diamondDust from "../assets/glitter/diamond dust.png";
import dazzleDust from "../assets/glitter/dazzle dust.png";

import alexandrite from "../assets/glitter/alexandrite.png";
import azurite from "../assets/glitter/azurite.png";
import chrysolite from "../assets/glitter/chrysolite.png";
import indigolite from "../assets/glitter/indigolite.png";
import morganite from "../assets/glitter/morganite.png";

import blush from "../assets/glitter/blush.png";
import bronzed from "../assets/glitter/bronzed.png";
import nugget from "../assets/glitter/nugget.png";
import platinum from "../assets/glitter/platinum.png";
import ruby from "../assets/glitter/ruby.png";
import twinkle from "../assets/glitter/twinkle.png";

import muitoClara from "../assets/pele muito clara.svg"
import clara from "../assets/pele clara.svg"
import morenaClara from "../assets/morena clara.svg"
import morena from "../assets/morena.svg"
import morenaEscura from "../assets/morena escura.svg"
import escura from "../assets/escura.svg"

import olhoAzul from "../assets/olhos azul.svg"
import olhoVerde from "../assets/olhos verdes.svg"
import olhoCinza from "../assets/olhos cinza.svg"
import olhoCastanho from "../assets/olhos castanhos.svg"
import olhoEscuro from "../assets/olhos escuros.svg"

import cabeloPreto from "../assets/cabelo preto.svg"
import cabeloCastanhoEsc from "../assets/cabelo castanho escuro.svg"
import cabeloCastanhoCla from "../assets/cabelo castanho claro.svg"
import cabeloCinza from "../assets/cabelo cinza.svg"
import cabeloLoiro from "../assets/cabelo loiro.svg"
import cabeloRuvido from "../assets/cabelo ruivo.svg"


type ColorOption = {
  hex: string;
  sub: string;
};

type AppContextType = {
  lightBox: boolean;
  toggleLightBox: () => void,
  allColors: ColorOption[],
  glitterOptions: GlitterColor[],
  baseBatom: { id: BaseOptions, name: string, description: string }[],
  baseGloss: { id: BaseOptions, name: string, description: string }[],
  smellOptions: { id: SmelltOptions, name: string, img: string }[],
  additiveOptions: {
    id: AdditivesOptions;
    name: string;
    description: string;
    img: string;
  }[],
  eyesOptions: { id: EyeColorOptions; img: string }[],
  skinOptions: { id: SkinToneOptions; img: string }[],
  hairOptions: { id: HairColorOptions; img: string }[],
  allEsence: { id: EsenceOptions, name: string, img: string }[];

}

type appProviderProps = {
  children: ReactNode;
}
export interface GlitterColor {
  id: number;
  name: string;
  img: string;
  category: string;
}


const AppContext = createContext<AppContextType | undefined>(undefined);


function AppProvider({ children }: appProviderProps) {

  const [lightBox, setLightBox] = useState<boolean>(false)



  const allColors: ColorOption[] = [
    { hex: '#4D1D25', sub: 'BLACKBERRY' },
    { hex: '#D13C72', sub: 'MAGENTA' },
    { hex: '#9B243C', sub: 'RUBY RED' },
    { hex: '#6D1718', sub: 'WINEBERRY' },
    { hex: '#E85D70', sub: 'CORAL' },
    { hex: '#A42324', sub: 'CRIMSON' },
    { hex: '#C23210', sub: 'FLAME' },

    { hex: '#DF4728', sub: 'PAPRIKA' },
    { hex: '#E8CA6C', sub: 'PEACH' },
    { hex: '#AA1B11', sub: 'RED' },
    { hex: '#6F2C16', sub: 'RUSSET' },
    { hex: '#D3571C', sub: 'TANGERINE' },
    { hex: '#4B301B', sub: 'BROWN' },
    { hex: '#53150B', sub: 'MAHOGANY' },

    { hex: '#4E3320', sub: 'COCOA' },
    { hex: '#130201', sub: 'BLACK' },
    { hex: '#0D2B4A', sub: 'BLUEBERRY' },
    { hex: '#C96D10', sub: 'MARIGOLD' },
    { hex: '#B48A22', sub: 'OCHRE' },
    { hex: '#0A0A4D', sub: 'SAPPHIRE' },
    { hex: '#FCFBF9', sub: 'WHITE' },
  ];



  const glitterOptions: GlitterColor[] = [
    // ======================
    // FROSTS
    // ======================
    { id: 1, name: "Crystal", img: crystal, category: "Frosts" },
    { id: 2, name: "Bronze", img: bronze, category: "Frosts" },
    { id: 3, name: "Fuchsia", img: fuchsia, category: "Frosts" },
    { id: 4, name: "Garnet", img: garnet, category: "Frosts" },
    { id: 5, name: "Opal", img: opal, category: "Frosts" },
    { id: 6, name: "Pink", img: pink, category: "Frosts" },
    { id: 7, name: "Pink Diamond", img: pinkDiamond, category: "Frosts" },
    { id: 8, name: "Russet", img: russet, category: "Frosts" },
    { id: 9, name: "Silver", img: silver, category: "Frosts" },
    { id: 10, name: "Star Ruby", img: starRuby, category: "Frosts" },
    { id: 11, name: "Violet", img: violet, category: "Frosts" },
    { id: 12, name: "Antique Gold", img: antiqueGold, category: "Frosts" },
    { id: 13, name: "Brass", img: brass, category: "Frosts" },
    { id: 14, name: "Copper", img: copper, category: "Frosts" },
    { id: 15, name: "Coral", img: coral, category: "Frosts" },
    { id: 16, name: "Fire Opal", img: fireOpal, category: "Frosts" },
    { id: 17, name: "Gold", img: gold, category: "Frosts" },
    { id: 18, name: "Sienna", img: sienna, category: "Frosts" },
    { id: 19, name: "Sand", img: sand, category: "Frosts" },
    { id: 20, name: "Carnelian", img: carnelian, category: "Frosts" },
    { id: 21, name: "Champagne", img: champagne, category: "Frosts" },
    { id: 22, name: "Pink Gold", img: pinkGold, category: "Frosts" },
    { id: 23, name: "Rose Gold", img: roseGold, category: "Frosts" },

    // ======================
    // MULTIDIMENSIONAL FROSTS
    // ======================
    { id: 24, name: "Alexandrite", img: alexandrite, category: "Multidimensional Frosts" },
    { id: 25, name: "Azurite", img: azurite, category: "Multidimensional Frosts" },
    { id: 26, name: "Chrysolite", img: chrysolite, category: "Multidimensional Frosts" },
    { id: 27, name: "Morganite", img: morganite, category: "Multidimensional Frosts" },
    { id: 28, name: "Indigolite", img: indigolite, category: "Multidimensional Frosts" },

    // ======================
    // FOILS
    // ======================
    { id: 29, name: "Pink", img: blush, category: "Foils" },
    { id: 30, name: "Bronze", img: bronzed, category: "Foils" },
    { id: 31, name: "Gold", img: nugget, category: "Foils" },
    { id: 32, name: "Silver", img: platinum, category: "Foils" },
    { id: 33, name: "Red", img: ruby, category: "Foils" },
    { id: 34, name: "Rainbow", img: twinkle, category: "Foils" },

    // ======================
    // DUSTS
    // ======================
    { id: 35, name: "Dazzle Dust", img: dazzleDust, category: "Dusts" },
    { id: 36, name: "Gold Dust", img: goldDust, category: "Dusts" },
    { id: 37, name: "Diamond Dust", img: diamondDust, category: "Dusts" },

  ];


  const baseBatom: { id: BaseOptions, name: string, description: string }[] = [
    {
      id: "matte",
      name: "MATTE",
      description:
        "duradouro & aveludado",
    },
    {
      id: "matte liquido",
      name: "matte liquido",
      description:
        "alta fixação & confortável",
    },
    {
      id: "cream",
      name: "CREMOSO",
      description:
        "hidratante & suave",
    },
    {
      id: "amanteigado",
      name: "AMANTEIGADO",
      description:
        "brilhante & suave",
    },
    {
      id: "natural",
      name: "NATURAL",
      description:
        "hidratante & cremoso",
    },
  ];

  const baseGloss: { id: BaseOptions, name: string, description: string }[] = [
    {
      id: "classic",
      name: "clássico",
      description:
        "brilhante & hidratante",
    },
    {
      id: "mirror-shine",
      name: "brilho intenso",
      description:
        "translúcido & alto brilho",
    },
    {
      id: "balm",
      name: "BÁLSAMO",
      description:
        "suave & nutritivo",
    },
    {
      id: "vinyl",
      name: "polish",
      description:
        "translúcido & reparador",
    },
    {
      id: "vegan",
      name: "NATURAL",
      description:
        "hidratante & nutritivo",
    },
  ];
  const smellOptions: { id: SmelltOptions, name: string, img: string }[] = [

    {
      id: "canela",
      name: "Canela",
      img:
        canela,
    },
    {
      id: "cereja",
      name: "Cereja jubilee",
      img: cereja,
    },
    {
      id: "trufa",
      name: "Trufa de framboesa",
      img:
        trufa,
    },
    {
      id: "creme",
      name: "Crème brûlée",
      img: creme,
    },
    {
      id: "bolo",
      name: "Cenoura",
      img: bolo,
    },
    {
      id: "hortela",
      name: "Menta",
      img:
        hortela,
    },
    {
      id: "lima",
      name: "Lima com Coco",
      img:
        lima,
    },
    {
      id: "avela",
      name: "Avelã",
      img:
        avela,
    },
    {
      id: "sorvete",
      name: "Pêssego",
      img:
        sorvete,
    },
    {
      id: "mimosa",
      name: "Mimosa",
      img:
        mimosa,
    },
  
  ]
  const additiveOptions: {
    id: AdditivesOptions;
    name: string;
    description: string;
    img: string;
  }[] = [

      {
        id: "brilho-hidratacao",
        name: "HIDRATANTE",
        description:
          "Melhora a textura do batom ou gloss, tornando-o mais cremoso, luminoso e confortável nos lábios.",
        img: hidr
      },
      {
        id: "efeito-volume",
        name: "SUAVIZAÇÃO",
        description:
          "Proporciona um efeito de lábios mais preenchidos e hidratados.",
        img: suav
      },
      {
        id: "protecao-solar",
        name: "PROTEÇÃO SOLAR",
        description:
          "Rico em antioxidantes, aumenta a hidratação e deixa os lábios suaves e nutridos.",
        img: prot
      },
      {
        id: "complexo-multifloral",
        name: "DENSIFICADOR",
        description:
          "Suaviza a pele, estimula o colágeno e ajuda a combater o envelhecimento.",
        img: dens
      },
      {
        id: "aditivo-hidratante",
        name: "VOLUME LABIAL",
        description:
          "Adiciona fator de proteção solar, ajudando a proteger os lábios da exposição ao sol.",
        img: vol
      },
      {
        id: "textura-sedosa",
        name: "ANTI-IDADE & REGENERADOR",
        description:
          "Cria um acabamento mais macio, leve e aveludado.",
        img: anti
      },
    ];

  const eyesOptions: { id: EyeColorOptions; img: string }[] = [
    { id: "azul", img: olhoAzul },
    { id: "verde", img: olhoVerde },
    { id: "verde-cinza", img: olhoCinza },
    { id: "castanho", img: olhoCastanho },
    { id: "preto-castanho-escuro", img: olhoEscuro },
  ];

  const skinOptions: { id: SkinToneOptions; img: string }[] = [
    { id: "muito-claro", img: muitoClara },
    { id: "rosado", img: clara },
    { id: "oliva", img: morenaClara },
    { id: "ambar", img: morena },
    { id: "escuro", img: morenaEscura },
    { id: "muito-escuro", img: escura },
  ];

  const hairOptions: { id: HairColorOptions; img: string }[] = [
    { id: "preto", img: cabeloPreto },
    { id: "castanho-escuro", img: cabeloCastanhoEsc },
    { id: "castanho-claro", img: cabeloCastanhoCla },
    { id: "cinzento", img: cabeloCinza },
    { id: "loiro", img: cabeloLoiro },
    { id: "ruivo", img: cabeloRuvido },
  ];

  const allEsence: { id: EsenceOptions, name: string, img: string }[] = [
    {
      id: "Especiarias Exóticas",
      name: "Especiarias Exóticas",
      img: espc
    },
    {
      id: "Baunilha",
      name: "Baunilha",
      img: bauni
    },

    {
      id: "Cappuccino",
      name: "Cappuccino",
      img: cappu
    },

    {
      id: "Cítricos",
      name: "Cítricos",
      img: citri
    },

    {
      id: "Chocolate",
      name: "Chocolate",
      img: choco
    },
    {
      id: "Rosa Parisiense",
      name: "Rosa Parisiense",
      img: rosa
    },
  ]



  const toggleLightBox = (): void => {
    setLightBox(!lightBox);
  }

  return (
    <AppContext.Provider value={{
      lightBox, toggleLightBox, allColors, glitterOptions, baseBatom, baseGloss,
      smellOptions, additiveOptions, eyesOptions, skinOptions, hairOptions, allEsence
    }}>
      {children}
    </AppContext.Provider>
  )
}


export function useApp(): AppContextType {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within an AppProvider")
  return context
}

export default AppProvider
