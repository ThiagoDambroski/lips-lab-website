import {
  PRODUCTS_SHOPIFY_CART_BASE_URL,
  PRODUCTS_VARIANT_IDS,
  type ProductExtraCount,
} from "../config/productsShopify";

export type ProductType = keyof typeof PRODUCTS_VARIANT_IDS;

export type ProductsCartInput = {
  productType: ProductType;
  selectedColors: string[];
  selectedColorHexes: string[];
  glitter?: string;
  aroma?: string;
  essence?: string;
  additive?: string;
  engravingText?: string;
  engravingSymbol?: string;
  hasCharms: boolean;
  totalPrice: number;
};

const productLabels: Record<ProductType, string> = {
  gloss: "Lip Gloss",
  batom: "Batom",
};

const emptyValues = new Set([
  "",
  "none",
  "sem glitter",
  "sem aroma",
  "sem essência",
  "sem essencia",
  "sem aditivo",
  "pré-opção",
  "pre-opção",
  "pre-opcao",
]);

const hasRealValue = (value?: string) => {
  if (!value) return false;

  return !emptyValues.has(value.trim().toLowerCase());
};

const countSelectedExtras = ({
  glitter,
  aroma,
  essence,
  additive,
  engravingText,
  engravingSymbol,
  hasCharms,
}: ProductsCartInput): ProductExtraCount => {
  let count = 0;

  if (hasRealValue(glitter)) count += 1;
  if (hasRealValue(aroma) || hasRealValue(essence)) count += 1;
  if (hasRealValue(additive)) count += 1;
  if (engravingText?.trim() || hasRealValue(engravingSymbol)) count += 1;
  if (hasCharms) count += 1;

  return Math.min(count, 5) as ProductExtraCount;
};

const encodeBase64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const encodeProperties = (properties: Record<string, string>) => {
  return encodeBase64Url(JSON.stringify(properties));
};

export const buildProductsCartUrl = (input: ProductsCartInput) => {
  const extraCount = countSelectedExtras(input);
  const variantId = PRODUCTS_VARIANT_IDS[input.productType][extraCount];

  const properties = encodeProperties({
    produto: productLabels[input.productType],
    extras: String(extraCount),
    cores: input.selectedColors.join(", ") || "Sem cor selecionada",
    cores_hex: input.selectedColorHexes.join(", ") || "Sem cor selecionada",
    glitter: input.glitter || "Sem glitter",
    aroma: input.aroma || "Sem aroma",
    essencia: input.essence || "Sem essência",
    aditivo: input.additive || "Pré-opção",
    gravacao: input.engravingText?.trim() || "Sem gravação",
    simbolo_gravacao: input.engravingSymbol || "Sem símbolo",
    charms: input.hasCharms ? "Sim" : "Não",
    total_esperado: `${input.totalPrice.toFixed(2)}€`,
    origem: "Página Produtos Lips Lab",
  });

  return `${PRODUCTS_SHOPIFY_CART_BASE_URL}/${variantId}:1?properties=${properties}`;
};
