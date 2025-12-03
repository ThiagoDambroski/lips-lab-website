import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AdditivesOptions, BaseOptions, EsenceOptions, EyeColorOptions, GlittersOptions, HairColorOptions, SkinToneOptions, SmelltOptions } from '../Functions/CreateBatomBox/Types';
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



type AppContextType = {
    lightBox: boolean;
    toggleLightBox: () => void,
    allColors:string[],
    glitterOptions:  GlitterColor[],
    baseBatom: {id:BaseOptions,name:string,description:string}[],
    baseGloss: {id:BaseOptions,name:string,description:string}[],
    smellOptions: {id:SmelltOptions,name:string,img:string}[],
    additiveOptions: { 
    id: AdditivesOptions; 
    name: string; 
    description: string; 
    img: string;
    }[],
    eyesOptions: { id: EyeColorOptions; name: string }[],
    skinOptions: { id: SkinToneOptions; name: string }[],
    hairOptions: { id: HairColorOptions; name: string }[],
    allEsence:{id:EsenceOptions,name:string,img:string}[];

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


function AppProvider({children}:appProviderProps) {

    const [lightBox,setLightBox] = useState<boolean>(false)
    const allColors: string[] = ['#4D1D25', '#D13C72', '#9B243C', 
        '#6D1718', '#E85D70', '#A42324','#C23210','#DF4728','#E8CA6C','#AA1B11',
        '#6F2C16','#D3571C','#4B301B','#53150B','#4E3320','#130201','#0D2B4A',
        '#C96D10','#B48A22','#0A0A4D','#FCFBF9'];


     const glitterOptions: GlitterColor[] = [
        { id: 1, name: "Antique Gold", img: antiqueGold, category: "Lipstick Frosts" },
        { id: 2, name: "Brass", img: brass, category: "Lipstick Frosts" },
        { id: 3, name: "Bronze", img: bronze, category: "Lipstick Frosts" },
        { id: 4, name: "Champagne", img: champagne, category: "Lipstick Frosts" },

        { id: 5, name: "Copper", img: copper, category: "Lipstick Frosts" },
        { id: 6, name: "Coral", img: coral, category: "Lipstick Frosts" },
        { id: 7, name: "Crystal", img: crystal, category: "Lipstick Frosts" },
        { id: 8, name: "Fuchsia", img: fuchsia, category: "Lipstick Frosts" },

        { id: 9, name: "Garnet", img: garnet, category: "Lipstick Frosts" },
        { id: 10, name: "Gold", img: gold, category: "Lipstick Frosts" },
        { id: 11, name: "Opal", img: opal, category: "Lipstick Frosts" },
        { id: 12, name: "Pink", img: pink, category: "Lipstick Frosts" },

        { id: 13, name: "Pink Gold", img: pinkGold, category: "Lipstick Frosts" },
        { id: 14, name: "Rose Gold", img: roseGold, category: "Lipstick Frosts" },
        { id: 15, name: "Russet", img: russet, category: "Lipstick Frosts" },
        { id: 16, name: "Sand", img: sand, category: "Lipstick Frosts" },

        { id: 17, name: "Sienna", img: sienna, category: "Lipstick Frosts" },
        { id: 18, name: "Silver", img: silver, category: "Lipstick Frosts" },
        { id: 19, name: "Violet", img: violet, category: "Lipstick Frosts" },
        { id: 20, name: "Pink Diamond", img: pinkDiamond, category: "Lipstick Frosts" },

        { id: 21, name: "Fire Opal", img: fireOpal, category: "Lipstick Frosts" },
        { id: 22, name: "Carnelian", img: carnelian, category: "Lipstick Frosts" },
        { id: 23, name: "Star Ruby", img: starRuby, category: "Lipstick Frosts" },
        { id: 24, name: "Gold Dust", img: goldDust, category: "Lipstick Frosts" },

        { id: 25, name: "Diamond Dust", img: diamondDust, category: "Lipstick Frosts" },
        { id: 26, name: "Dazzle Dust", img: dazzleDust, category: "Lipstick Frosts" },
        { id: 27, name: "Alexandrite", img: alexandrite, category: "Iridescent Frosts" },
        { id: 28, name: "Azurite", img: azurite, category: "Iridescent Frosts" },
        { id: 29, name: "Chrysolite", img: chrysolite, category: "Iridescent Frosts" },
        { id: 30, name: "Indigolite", img: indigolite, category: "Iridescent Frosts" },
        { id: 31, name: "Morganite", img: morganite, category: "Iridescent Frosts" },
        { id: 32, name: "Blush", img: blush, category: "Lipstick Foils" },
        { id: 33, name: "Bronzed", img: bronzed, category: "Lipstick Foils" },
        { id: 34, name: "Nugget", img: nugget, category: "Lipstick Foils" },
        { id: 35, name: "Platinum", img: platinum, category: "Lipstick Foils" },
        { id: 36, name: "Ruby", img: ruby, category: "Lipstick Foils" },
        { id: 37, name: "Twinkle", img: twinkle, category: "Lipstick Foils" },
       ];

    
    const baseBatom: {id:BaseOptions,name:string,description:string}[] = [
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

    const baseGloss: {id:BaseOptions,name:string,description:string}[] = [
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
      name: "CREMOSO",
      description:
        "bálsamo & nutritivo",
    },
    {
      id: "vinyl",
      name: "POLIDO",
      description:
        "brilho intenso & sem efeito pegajoso",
    },
    {
      id: "vegan",
      name: "NATURAL",
      description:
        "hidratante & nutritivo",
    },
  ];
  const smellOptions:{id:SmelltOptions,name:string,img:string}[] = [
  
  {
    id: "canela",
    name: "canela",
    img:
      canela,
  },
  {
    id: "cereja",
    name: "cereja jubilee",
    img: cereja,
  },
  {
    id: "trufa",
    name: "trufa de framboesa",
    img:
      trufa,
  },
  {
    id: "champa",
    name: "champanhe rosé",
    img: champa,
  },
  {
    id: "creme",
    name: "crème brûlée",
    img: creme,
  },
  {
    id: "bolo",
    name: "bolo de cenoura",
    img:bolo,
  },
  {
    id: "hortela",
    name: "hortelâ fresca",
    img:
     hortela,
  },
  {
    id: "lima",
    name: "lima com coco",
    img:
      lima,
  },
  {
    id: "avela",
    name: "avelã",
    img:
      avela,
  },
  {
    id: "sorvete",
    name: "sorvete de pêssego",
    img:
      sorvete,
  },
  {
    id: "mimosa",
    name: "mimosa",
    img:
      mimosa,
  },
  {
    id: "sambuca",
    name: "sambuca",
    img:sambuca,
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
      img:hidr
    },
    {
      id: "efeito-volume",
      name: "SUAVIZAÇÃO",
      description:
        "Proporciona um efeito de lábios mais preenchidos e hidratados.",
      img: suav
    },
    {
      id: "aditivo-hidratante",
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
      id: "protecao-solar",
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

    const eyesOptions: { id: EyeColorOptions; name: string }[] = [
      { id: "azul", name: "Azul" },
      { id: "verde", name: "Verde" },
      { id: "verde-cinza", name: "Verde / Cinza" },
      { id: "castanho", name: "Castanho" },
      { id: "preto-castanho-escuro", name: "Preto / Castanho escuro" },
    ];

   const skinOptions: { id: SkinToneOptions; name: string }[] = [
      { id: "muito-claro", name: "Muito claro" },
      { id: "rosado", name: "Rosado" },
      { id: "oliva", name: "Oliva" },
      { id: "ambar", name: "Âmbar" },
      { id: "escuro", name: "Escuro" },
      { id: "muito-escuro", name: "Muito escuro" },
    ];

    const hairOptions: { id: HairColorOptions; name: string }[] = [
    { id: "preto", name: "Preto" },
    { id: "castanho-escuro", name: "Castanho escuro" },
    { id: "castanho-claro", name: "Castanho claro" },
    { id: "cinzento", name: "Cinzento" },
    { id: "loiro", name: "Loiro" },
    { id: "ruivo", name: "Ruivo" },
  ];

  const allEsence:{id:EsenceOptions,name:string,img:string}[] = [
    {id:"Especiarias Exóticas",
      name:"Especiarias Exóticas",
      img:espc
    },
    {id:"Baunilha",
      name:"Baunilha",
      img:bauni},

    {id:"Cappuccino",
      name:"Cappuccino",
      img:cappu},

    {id:"Cítricos",
      name:"Cítricos",
      img:citri}  ,

    {id:"Chocolate",
      name:"Chocolate",
      img:choco},
    {id:"Rosa Parisiense",
      name:"Rosa Parisiense",
      img:rosa},
  ]



    const toggleLightBox = ():void => {
        setLightBox(!lightBox);
    }

  return (
    <AppContext.Provider value={{lightBox,toggleLightBox,allColors,glitterOptions,baseBatom,baseGloss,
    smellOptions,additiveOptions,eyesOptions,skinOptions,hairOptions,allEsence}}>
        {children}
    </AppContext.Provider>
  )
}


export function useApp(): AppContextType{
    const context = useContext(AppContext)
    if(!context) throw new Error("useApp must be used within an AppProvider")
    return context
}

export default AppProvider