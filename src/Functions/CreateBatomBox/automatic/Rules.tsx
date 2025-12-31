import type { EyeColorOptions, HairColorOptions, SkinToneOptions } from "../Types";
import type { PaletteCombo, Palette } from "../Types";
import { PAL_A, PAL_B, PAL_C, PAL_D, PAL_E, PAL_F, PAL_G, PAL_H } from "../automatic/Pallete";

function combo(top: Palette, bottom: Palette): PaletteCombo {
  return {
    id: `${top.id}+${bottom.id}`,
    top,
    bottom,
    rows: [top.colors, bottom.colors],
    colors: [...top.colors, ...bottom.colors],
    primary: top.primary,
  };
}

/**
 * Returns 12 colors (two rows of 6) = the stacked result you see in the PDF UI.
 * Keep your “characteristics logic” here, but now you return two palettes.
 */
export function getPaletteComboFor(
  hair: HairColorOptions,
  skin: SkinToneOptions,
  eyes: EyeColorOptions
): PaletteCombo {
  const coldEyes = eyes === "azul" || eyes === "verde" || eyes === "verde-cinza";
  const lightSkin = skin === "muito-claro" || skin === "rosado";
  const deepSkin = skin === "escuro" || skin === "muito-escuro";

  switch (hair) {
    case "preto":
    case "castanho-escuro":
      // Example: the screenshot you showed looks exactly like A (top) + B (bottom)
      // If you want to flip order based on eyes:
      return coldEyes ? combo(PAL_A, PAL_B) : combo(PAL_B, PAL_A);

    case "castanho-claro":
      return coldEyes ? combo(PAL_C, PAL_D) : combo(PAL_D, PAL_C);

    case "loiro":
      // If the PDF always uses D + C (example), do that:
      return coldEyes ? combo(PAL_D, PAL_C) : combo(PAL_D, PAL_C);

    case "ruivo":
      return lightSkin ? combo(PAL_E, PAL_F) : combo(PAL_F, PAL_E);

    case "cinzento":
      return deepSkin ? combo(PAL_H, PAL_G) : combo(PAL_G, PAL_H);

    default:
      return combo(PAL_A, PAL_B);
  }
}
