export type ColorOption = {
  hex: string;
  sub: string;
};

export function resolveSelectedSubLabels(
  selectedHexColors: string[],
  allColors: ColorOption[]
): string[] {
  const colorsByHex = new Map(
    allColors.map((color) => [color.hex.toLowerCase(), color.sub.toUpperCase()])
  );

  return selectedHexColors
    .map((hex) => colorsByHex.get(hex.toLowerCase()))
    .filter((label): label is string => Boolean(label));
}
