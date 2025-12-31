export type productType = null | {
  id:number,
  type:TypesOptions,
  color:string | undefined,
  glitter:string,
  base:BaseOptions,
  smell:SmelltOptions,
  aditive:AdditivesOptions,
  esence:EsenceOptions,
  boxText:string 

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
  | "cream"
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
  | "canela"
  | "cereja"
  | "trufa"
  | "champa"
  | "creme"
  | "bolo"
  | "hortela"
  | "lima"
  | "avela"
  | "sorvete"
  | "mimosa"
  | "sambuca";

  export type AdditivesOptions =
  | "none"
  | "brilho-hidratacao"
  | "efeito-volume"
  | "aditivo-hidratante"
  | "complexo-multifloral"
  | "protecao-solar"
  | "textura-sedosa";


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

