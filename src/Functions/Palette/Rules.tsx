
import type { EyeColorOptions, HairColorOptions, SkinToneOptions, Palette } from "../CreateBatomBox/Types";
import { PAL_A, PAL_B, PAL_C, PAL_D, PAL_E, PAL_F, PAL_G, PAL_H } from "./Pallete";

/**
 * Regras consolidadas do PDF:
 * - Cabelos escuros (preto/castanho-escuro) alternam A/B conforme olho mais frio (azul/verde) ou mais quente (castanho/escuro).
 * - Castanho-claro cai em C (rosados) ou D (coral/rosa) dependendo de pele/olhos.
 * - Loiro tende a D; pode ir para A com olhos frios (variações no PDF).
 * - Ruivo usa E (rosado) ou F (alaranjados).
 * - Cinzento usa G (terrosos quentes) ou H (terrosos alaranjados) conforme pele/olhos.
 * As paletas são as mesmas repetidas no documento, só muda o destaque (primary). :contentReference[oaicite:9]{index=9}
 */
export function getPaletteFor(
  hair: HairColorOptions,
  skin: SkinToneOptions,
  eyes: EyeColorOptions
): Palette {
  // helpers
  const coldEyes = eyes === "azul" || eyes === "verde" || eyes === "verde-cinza";
  const lightSkin = skin === "muito-claro" || skin === "rosado";
  const deepSkin = skin === "escuro" || skin === "muito-escuro";

  switch (hair) {
    case "preto":
    case "castanho-escuro":
      return coldEyes ? PAL_A : PAL_B;

    case "castanho-claro":
      // olhos frios → C; olhos quentes → D
      return coldEyes ? PAL_C : PAL_D;

    case "loiro":
      // loiro aparece muito com D; olhos bem frios podem puxar A (PDF mostra A/D repetindo). :contentReference[oaicite:10]{index=10}
      return coldEyes ? PAL_D : PAL_D;

    case "ruivo":
      // peles claras/rosadas → E; peles mais quentes/oliva/âmbar → F
      return lightSkin ? PAL_E : PAL_F;

    case "cinzento":
      // pele âmbar/oliva → G; peles mais profundas → H
      return deepSkin ? PAL_H : PAL_G;

    default:
      return PAL_A;
  }
}
//
/* No seu componente onde controla a cor selecionada:
import { useEffect } from "react";
import { getPaletteFor } from "./rules";
import type { HairColorOptions, SkinToneOptions, EyeColorOptions } from "./types";

function useLockedSelectedColor(
  hair: HairColorOptions | undefined,
  skin: SkinToneOptions | undefined,
  eyes: EyeColorOptions | undefined,
  selectedColor: string | undefined,
  setSelectedColor: (c: string) => void
) {
  useEffect(() => {
    if (!hair || !skin || !eyes) return;
    const { colors, primary } = getPaletteFor(hair, skin, eyes);

    // se não houver cor ou se a atual não pertence à paleta nova → força primary
    if (!selectedColor || !colors.includes(selectedColor)) {
      setSelectedColor(primary);
    }
  }, [hair, skin, eyes, selectedColor, setSelectedColor]);
}



useLockedSelectedColor(hair, skin, eyes, selectedColor, (c) => setSelectedColor(c));
*/
