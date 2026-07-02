export type FontOption = {
  id: string;
  label: string;
  cssFamily: string;
};

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "century-gothic",
    label: "Century Gothic",
    cssFamily: '"Century Gothic", Arial, sans-serif',
  },
  {
    id: "candara",
    label: "Candara",
    cssFamily: "Candara, system-ui, sans-serif",
  },
  {
    id: "palatino",
    label: "Palatino Linotype",
    cssFamily: '"Palatino Linotype", "Book Antiqua", serif',
  },
  {
    id: "tahoma",
    label: "Tahoma",
    cssFamily: "Tahoma, system-ui, sans-serif",
  },
  {
    id: "lucida-sans",
    label: "Lucida Sans Unicode",
    cssFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
  },
];
