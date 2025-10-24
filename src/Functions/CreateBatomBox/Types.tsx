export type productType = null | {
  id:number,
  type:TypesOptions,
  color:string | undefined,
  glitter:GlittersOptions,
  base:BaseOptions,
  smell:SmelltOptions,
  aditive:AdditivesOptions,
  format:FormatOptions,
  boxText:string 

}

export type TypesOptions = undefined | "gloss" | "batom"

export type GlittersOptions= "none" |"rosa" | "bronze" | "dourado" | "preateado" | "vermelho" | 
"arco-iris" |"brilho-intenso"|"po-dourado"|"po diamante"

export type BaseOptions = 
  | "none"
  | "cream"
  | "matte"
  | "butter"
  | "vegan"
  | "liquid-matte"
  | "classic"
  | "mirror-shine"
  | "balm"
  | "vinyl"

export type SmelltOptions =
  | "none"
  | "doce-de-cenoura"
  | "cereja-doce"
  | "canela-e-acucar"
  | "caramelo-brulee"
  | "avela-cremosa"
  | "coco-tropical"
  | "flor-de-mimosa"
  | "menta-fresca"
  | "pessego-doce"
  | "champanhe-rose"
  | "framboesa-chocolate"
  | "licor-de-anis";

  export type AdditivesOptions =
  | "none"
  | "brilho-hidratacao"
  | "efeito-volume"
  | "aditivo-hidratante"
  | "complexo-multifloral"
  | "protecao-solar"
  | "textura-sedosa";


  export type FormatOptions = undefined | "classic" | "gotic"


  //choose for u
  export type EyeColorOptions =
  | "azul"
  | "verde"
  | "verde-cinza"
  | "castanho"
  | "preto-castanho-escuro";


  export type SkinToneOptions =
  | "muito-claro"
  | "rosado"
  | "oliva"
  | "ambar"
  | "escuro"
  | "muito-escuro";

  export type HairColorOptions =
  | "preto"
  | "castanho-escuro"
  | "castanho-claro"
  | "cinzento"
  | "loiro"
  | "ruivo";

  export type Palette = { id: string; colors: string[]; primary: string };