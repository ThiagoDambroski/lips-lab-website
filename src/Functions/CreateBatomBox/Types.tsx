export type ProductType = null | {
  id: number;
  type: TypesOptions;
  color: string | undefined;
  glitter: string;
  base: BaseOptions;
  smell: SmelltOptions;
  aditive: AdditivesOptions[];
  esence: EsenceOptions;
  boxText: string;
  boxFont: string;
  boxImage: string;
  price: number;
  selected_colors_sub?: string;
  final_color_hex?: string;
  charms?: string;
  batomFormat?: string;
};

export type productType = ProductType;

export type Palette = {
  id: string;
  colors: string[];
  primary: string;
};

export type PaletteCombo = {
  id: string;
  top: Palette;
  bottom: Palette;
  rows: [string[], string[]];
  colors: string[];
  primary: string;
};

export type TypesOptions = undefined | "gloss" | "batom" | "oil";

export type GlittersOptions =
  | "none"
  | "rosa"
  | "bronze"
  | "dourado"
  | "preateado"
  | "vermelho"
  | "arco-iris"
  | "brilho-intenso"
  | "po-dourado"
  | "po diamante";

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
  | "brilho intenso"
  | "BÁLSAMO"
  | "polish"
  | "NATURAL"
  | "CLASSICO";

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
  | "sambuca"
  | "Rosa Parisiense"
  | "Pink Champanhe";

export type AdditivesOptions =
  | "none"
  | "HIDRATANTE"
  | "SUAVIZAÇÃO"
  | "PROTEÇÃO SOLAR"
  | "DENSIFICADOR"
  | "ANTI-IDADE & REGENERADOR"
  | "VOLUME LABIAL";

export type EsenceOptions =
  | "none"
  | "Especiarias Exóticas"
  | "Baunilha"
  | "Cappuccino"
  | "LARANJA E FLOR DE MIMOSA"
  | "Chocolate"
  | "Rosa Parisiense";

export type EyeColorOptions =
  | undefined
  | "azul"
  | "verde"
  | "verde-cinza"
  | "castanho"
  | "preto-castanho-escuro";

export type SkinToneOptions =
  | undefined
  | "muito-claro"
  | "rosado"
  | "oliva"
  | "ambar"
  | "escuro"
  | "muito-escuro";

export type HairColorOptions =
  | undefined
  | "preto"
  | "castanho-escuro"
  | "castanho-claro"
  | "cinzento"
  | "loiro"
  | "ruivo";
