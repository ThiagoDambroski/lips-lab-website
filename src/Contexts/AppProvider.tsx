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


type AppContextType = {
    lightBox: boolean;
    toggleLightBox: () => void,
    allColors:string[],
    glitterOptions: GlittersOptions[],
    dustOptions: GlittersOptions[],
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

const AppContext = createContext<AppContextType | undefined>(undefined);


function AppProvider({children}:appProviderProps) {

    const [lightBox,setLightBox] = useState<boolean>(false)
    const allColors: string[] = ['#4D1D25', '#D13C72', '#9B243C', 
        '#6D1718', '#E85D70', '#A42324','#C23210','#DF4728','#E8CA6C','#AA1B11',
        '#6F2C16','#D3571C','#4B301B','#53150B','#4E3320','#130201','#0D2B4A',
        '#C96D10','#B48A22','#0A0A4D','#FCFBF9'];
    const glitterOptions: GlittersOptions[] = [
        "rosa",
        "bronze",
        "dourado",
        "preateado",
        "vermelho",
        "arco-iris",
      ];
    const dustOptions: GlittersOptions[] = [
        "brilho-intenso",
        "po-dourado",
        "po diamante",
    ];
    const baseBatom: {id:BaseOptions,name:string,description:string}[] = [
    {
      id: "cream",
      name: "Base Cremosa (Cream Base)",
      description:
        "Textura suave e hidratante. Ideal para quem gosta de um acabamento cremoso e confortável.",
    },
    {
      id: "matte",
      name: "Base Mate de Longa Duração (Long Last Matte)",
      description:
        "Efeito mate elegante com maior durabilidade e resistência.",
    },
    {
      id: "butter",
      name: "Base Manteiga (Butter Base)",
      description:
        "Acabamento ligeiramente brilhante e textura sedosa.",
    },
    {
      id: "vegan",
      name: "Base Orgânica Natural (Organic Natural Lipstick Base)",
      description:
        "Fórmula natural e cremosa, rica em ingredientes orgânicos e hidratantes.",
    },
    {
      id: "liquid-matte",
      name: "Base Mate Líquida (Liquid Matte Base)",
      description:
        "Textura cremosa de alta cobertura, com acabamento mate e moderno.",
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
    <AppContext.Provider value={{lightBox,toggleLightBox,allColors,glitterOptions,dustOptions,baseBatom,baseGloss,
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