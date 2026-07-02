import type { ProductKey } from "./productConfig";

export type FormulaItem = {
  id: string;
  question: string;
  answers: string;
  type: ProductKey;
};

export const FORMULA_ITEMS: FormulaItem[] = [
  {
    id: "CLÁSSICO",
    question: "CLÁSSICO",
    answers:
      "Lanolin Oil, Hydroxylated Lanolin, Hydrogenated Polybutene, Cera Microcristallina (Micro- crystalline Wax), Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Ozokerite Wax, Euphorbia Cerifera (Candelilla) Wax, Copernicia Cerifera (Car- nauba) Wax, Butyrospermum Parkii (Shea Butter), Simmondsia Chinensis (Jojoba) Seed Oil, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Caprylyl Glycol, Tocopherol (Vitamin E), Ascorbyl Palmitate (Vitamin C), Glycine Soja (Soybe- an) Oil, Aloe Barbadensis Leaf Extract.",
    type: "gloss",
  },
  {
    id: "BRILHO INTENSO",
    question: "BRILHO INTENSO",
    answers:
      "Copernicia Cerifera (Carnauba) Wax, Euphorbia Cerifera (Candelilla) Wax, Organic Butyros- permum Parkii (Shea Butter), Organic Ricinus Communis (Castor) Seed Oil, Lilium Candidum Flower Extract (White Lily), Oenothera Biennis (Evening Primrose) Oil Organic, Tocopherol (Vitamin E).",
    type: "gloss",
  },
  {
    id: "BRILHO INTENSO",
    question: "BRILHO INTENSO",
    answers:
      "Copernicia Cerifera (Carnauba) Wax, Euphorbia Cerifera (Candelilla) Wax, Organic Butyros- permum Parkii (Shea Butter), Organic Ricinus Communis (Castor) Seed Oil, Lilium Candidum Flower Extract (White Lily), Oenothera Biennis (Evening Primrose) Oil Organic, Tocopherol (Vitamin E).",
    type: "oil",
  },
  {
    id: "BÁLSAMO",
    question: "BÁLSAMO",
    answers:
      "Hydrogenated Polybutene, Caprylic/Capric Triglyceride, Vitis Vinifera (Grape) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Macadamia Ternifolia (Macadamia) Seed Oil, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysu- ckle) Extract, Tocopherol (Vitamin E).",
    type: "gloss",
  },
  {
    id: "polish",
    question: "polish",
    answers:
      "Hydrogenated Polybutene, Octyldodecyl Stearoyl Stearate, Ricinus Communis (Castor) Seed Oil, Cera Microcristallina (Microcrystalline Wax), Myristyl Lactate, Polyethylene, Ozokerite Wax, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Ho- neysuckle) Extract, Tocopherol (Vitamin E), Camellia Sinensis Leaf Extract.",
    type: "gloss",
  },
  {
    id: "NATURAL",
    question: "NATURAL",
    answers:
      "Diisostearyl Malate, Polybutene, Cera Microcristallina (Microcrystalline Wax), Bis-Diglyceryl Polyacyladipate-1, Tocopherol (Vitamin E), Caprylyl Glycol, Lonicera Caprifolium (Honeysu- ckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).",
    type: "gloss",
  },
  {
    id: "Crème Lipstick",
    question: "Crème Lipstick",
    answers:
      "Lanolin Oil, Cetyl Acetate, Acetylated Lanolin Alcohol, Cetyl Ricinolate, Euphorbia Cerifera (Candelilla) Wax, Propylene Glycol Dicaprylate/Dicaprate, Ethylhexyl Palmitate, Ozokerite Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Copernicia Cerifera (Carnauba) Wax, Cera Microcristallina (Microcrystalline) Wax, Paraffin Wax, VP/Hexadecene Copolymer, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).",
    type: "batom",
  },
  {
    id: "Long Last Matte Lipstick",
    question: "Long Last Matte Lipstick",
    answers:
      "Cetyl Acetate, Acetylated Lanolin Alcohol, Lanolin Oil, Euphorbia Cerifera (Candelilla) Wax, Ethylhexyl Palmitate, Ozokerite Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Cetyl Ricinolate, Caprylic/Capric Triglyceride, Silica, Polymethyl Methacrylate, Copernicia Cerifera (Carnauba) Wax, Lanolin, Cera Microcristallina (Microcrystalline) Wax, Propylene Glycol Dicaprylate/Dicaprate, Paraffin Wax, Myristyl Lactate, Polyethylene, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).",
    type: "batom",
  },
  {
    id: "Butter Base Lipstick",
    question: "Butter Base Lipstick",
    answers:
      "Lanolin Oil, Hydrogenated Polybutene, Cetyl Ricinoleate, Lanolin, Octyldodecyl Stearoyl Stearate, Euphorbia Cerifera (Candelilla) Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Simmondsia Chinensis (Jojoba) Seed Oil, Cetyl Acetate, Acetylated Lanolin Alcohol, Copernicia Cerifera (Carnauba) Wax, Ethylhexyl Palmitate, Myristyl Lactate, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).",
    type: "batom",
  },
  {
    id: "Natural Lipstick",
    question: "Natural Lipstick",
    answers:
      "Copernicia Cerifera (Carnauba) Wax, Euphorbia Cerifera (Candelilla) Wax, Organic Butyrospermum Parkii (Shea Butter), Organic Ricinus Communis (Castor) Seed Oil, Simmondsia Chinensis (Organic Jojoba) Seed Oil, Organic Vitis Vinifera (Grape) Seed Oil, Lonicera Japonica (Japanese Honeysuckle), Lonicera Caprifolium (Honeysuckle Flower Extract), Tocopherol (Vitamin E).",
    type: "batom",
  },
  {
    id: "Liquid Matte Lipstick",
    question: "Liquid Matte Lipstick",
    answers:
      "Dimethicone Crosspolymer, Oryza Sativa (Rice) Bran Extract, Ricinus Communis (Castor) Seed Oil, Isododecane, Cyclopentasiloxane, Hydrogenated Polyisobutene, Rosmarinus Officinalis (Rosemary) Extract, Trimethylsiloxysilicate, Helianthus Annuus (Sunflower) Seed Extract, Silica, Aluminum Silicate, Beeswax, Polymethylsilsesquioxane, Disteardimonium Hectorite, Tocopherol (Vitamin E), Propylene Carbonate.",
    type: "batom",
  },
];
