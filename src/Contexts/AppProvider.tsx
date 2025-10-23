import { createContext, useContext, useState, type ReactNode } from 'react'
import type { GlittersOptions, SmelltOptions } from '../Functions/CreateBatomBox/Types';



type AppContextType = {
    lightBox: boolean;
    toggleLightBox: () => void,
    allColors:string[],
    glitterOptions: GlittersOptions[],
    dustOptions: GlittersOptions[],
    baseBatom: {id:string,name:string,description:string}[],
    baseGloss: {id:string,name:string,description:string}[],
    smellOptions: {id:SmelltOptions,name:string,description:string}[];
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
        "brilho intenso",
        "po dourado",
        "po diamante",
    ];
    const baseBatom = [
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

    const baseGloss = [
    {
      id: "classic",
      name: "Lip Gloss (Clássico)",
      description:
        "Brilho intenso e textura envolvente. Proporciona um acabamento luminoso e hidratante.",
    },
    {
      id: "mirror-shine",
      name: "Lip Glacé (Efeito Espelhado)",
      description:
        "Brilho leve e efeito espelhado, com um toque suave e elegante nos lábios.",
    },
    {
      id: "balm",
      name: "Lip Smoothie (Efeito Bálsamo)",
      description:
        "Textura macia e confortável, com acabamento natural e não pegajoso.",
    },
    {
      id: "vinyl",
      name: "Lip Polish (Efeito Verniz)",
      description:
        "Brilho intenso e acabamento uniforme, com ingredientes reparadores e nutritivos.",
    },
    {
      id: "vegan",
      name: "Base Natural de Lip Gloss (Vegan Friendly)",
      description:
        "Fórmula vegana e leve, ideal para um brilho natural e confortável.",
    },
  ];
  const smellOptions:{id:SmelltOptions,name:string,description:string}[] = [
  {
    id: "none",
    name: "Sem fragrância",
    description: "Versão neutra, sem adição de aroma.",
  },
  {
    id: "doce-de-cenoura",
    name: "Doce de Cenoura",
    description:
      "Aroma quente e reconfortante, com notas suaves de especiarias e baunilha.",
  },
  {
    id: "cereja-doce",
    name: "Cereja Doce",
    description: "Frutado e vibrante, com toque gourmand e feminino.",
  },
  {
    id: "canela-e-acucar",
    name: "Canela e Açúcar",
    description:
      "Doce e envolvente, com aquele aroma acolhedor típico de inverno.",
  },
  {
    id: "caramelo-brulee",
    name: "Caramelo Brûlée",
    description: "Cremoso e sofisticado — mistura de baunilha e açúcar tostado.",
  },
  {
    id: "avela-cremosa",
    name: "Avelã Cremosa",
    description: "Notas suaves e doces, com toque amendoados irresistível.",
  },
  {
    id: "coco-tropical",
    name: "Coco Tropical",
    description:
      "Fresco e exótico, com um leve toque cítrico de lima.",
  },
  {
    id: "flor-de-mimosa",
    name: "Flor de Mimosa",
    description:
      "Floral, delicado e elegante — uma fragrância leve e feminina.",
  },
  {
    id: "menta-fresca",
    name: "Menta Fresca",
    description:
      "Refrescante e limpa, ideal para quem adora sensação de frescor nos lábios.",
  },
  {
    id: "pessego-doce",
    name: "Pêssego Doce",
    description:
      "Frutado e suave, com aquele toque de verão e leveza.",
  },
  {
    id: "champanhe-rose",
    name: "Champanhe Rosé",
    description:
      "Elegante e festivo, com notas frutadas e cintilantes.",
  },
  {
    id: "framboesa-chocolate",
    name: "Framboesa & Chocolate",
    description:
      "Irresistivelmente doce e sensual — mistura perfeita entre fruta e tentação.",
  },
  {
    id: "licor-de-anis",
    name: "Licor de Anis",
    description:
      "Aroma marcante e sofisticado, levemente doce e exótico.",
  },
  ]



    const toggleLightBox = ():void => {
        setLightBox(!lightBox);
    }

  return (
    <AppContext.Provider value={{lightBox,toggleLightBox,allColors,glitterOptions,dustOptions,baseBatom,baseGloss,smellOptions}}>
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