export type productType = null | {
  id:number,
  type:TypesOptions,
  color:string | undefined,
  glitter:string,
  base:BaseOptions,
  smell:SmelltOptions,
  aditive:AdditivesOptions,
  esence:EsenceOptions,
  boxText:string ,
  boxImage:string,
  price:number

}

export type Palette = {
  id: string;        // "A".."H"
  colors: string[];  // exactly 6
  primary: string;
};

export type PaletteCombo = {
  id: string;                 // e.g. "A+B"
  top: Palette;               // row 1
  bottom: Palette;            // row 2
  rows: [string[], string[]]; // [top.colors, bottom.colors]
  colors: string[];           // flattened 12
  primary: string;            // usually top.primary
};


export type TypesOptions = undefined | "gloss" | "batom"

export type GlittersOptions= "none" |"rosa" | "bronze" | "dourado" | "preateado" | "vermelho" | 
"arco-iris" |"brilho-intenso"|"po-dourado"|"po diamante"

export type BaseOptions = 
  | "none"
  | "cremoso"
  | "matte"
  | "amanteigado"
  | "natural"
  | "matte liquido"
  | "vegan"
  | "liquid-matte"
  | "classic"
  | "mirror-shine"
  | "balm"
  | "vinyl"

export type SmelltOptions =
  | "none"
  | "Canela"
  | "Cereja jubilee"
  | "Trufa de framboesa"
  | "Crème brûlée"
  | "creme"
  | "Cenoura"
  | "Menta"
  | "Lima com Coco"
  | "avela"
  | "Pêssego"
  | "mimosa"
  | "sambuca";

  export type AdditivesOptions =
  | "none"
  | "HIDRATANTE"
  | "SUAVIZAÇÃO"
  | "PROTEÇÃO SOLAR"
  | "DENSIFICADOR"
  | "ANTI-IDADE & REGENERADOR"
  | "VOLUME LABIAL";


  export type EsenceOptions = 'none' | "Especiarias Exóticas" | "Baunilha" | "Cappuccino" | "Cítricos" | "Chocolate" | "Rosa Parisiense"


  //choose for u
  export type EyeColorOptions =
  undefined
  | "azul"
  | "verde"
  | "verde-cinza"
  | "castanho"
  | "preto-castanho-escuro";


  export type SkinToneOptions =
  undefined
  | "muito-claro"
  | "rosado"
  | "oliva"
  | "ambar"
  | "escuro"
  | "muito-escuro";

  export type HairColorOptions =
  undefined
  | "preto"
  | "castanho-escuro"
  | "castanho-claro"
  | "cinzento"
  | "loiro"
  | "ruivo";

