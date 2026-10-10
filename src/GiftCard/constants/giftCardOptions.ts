export type GiftOption = "single" | "pack" | "experienceGiftBox" | "packGiftBox";

export const VARIANT_BY_GIFT_OPTION: Record<GiftOption, number> = {
  single: 47047067336961,
  pack: 47047067369729,
  experienceGiftBox: 49239901274369,
  packGiftBox: 49242760478977,
};


export const PRICE_BY_GIFT_OPTION: Record<GiftOption, number> = {
  single: 55,
  pack: 99,
  experienceGiftBox: 62.99,
  packGiftBox: 106.99,
};

export function formatGiftPrice(price: number) {
  const fractionDigits = Number.isInteger(price) ? 0 : 2;
  const formattedPrice = new Intl.NumberFormat("pt-PT", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formattedPrice}€`;
}

export const GIFT_OPTION_LABEL_BY_OPTION: Record<GiftOption, string> = {
  single: `CRIA O TEU BATOM OU GLOSS LABIAL (${formatGiftPrice(PRICE_BY_GIFT_OPTION.single)})`,
  experienceGiftBox: `EXPERIÊNCIA + CAIXA PRESENTE (${formatGiftPrice(PRICE_BY_GIFT_OPTION.experienceGiftBox)})`,
  pack: `PACK 2 PRODUTOS (${formatGiftPrice(PRICE_BY_GIFT_OPTION.pack)})`,
  packGiftBox: `PACK 2 PRODUTOS + CAIXA PRESENTE (${formatGiftPrice(PRICE_BY_GIFT_OPTION.packGiftBox)})`,
};

export const giftOptions: GiftOption[] = ["single", "experienceGiftBox", "pack", "packGiftBox"];
