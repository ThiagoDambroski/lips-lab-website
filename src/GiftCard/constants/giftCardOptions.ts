export type GiftOption = "single" | "pack" | "experienceGiftBox" | "packGiftBox";

export const VARIANT_BY_GIFT_OPTION: Record<GiftOption, number> = {
  single: 47047067336961,
  pack: 47047067369729,
  experienceGiftBox: 49239901274369,
  packGiftBox: 49242760478977,
};

export const GIFT_OPTION_LABEL_BY_OPTION: Record<GiftOption, string> = {
  single: "CRIA O TEU BATOM OU GLOSS LABIAL (55€)",
  experienceGiftBox: "EXPERIÊNCIA + CAIXA PRESENTE (60€)",
  pack: "PACK 2 PRODUTOS (99€)",
  packGiftBox: "PACK 2 PRODUTOS + CAIXA PRESENTE (104€)",
};

export const giftOptions: GiftOption[] = ["single", "experienceGiftBox", "pack", "packGiftBox"];
