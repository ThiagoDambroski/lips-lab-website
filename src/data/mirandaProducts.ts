import batomImage from "../assets/tironds-campaign/tironds-6323.webp";
import glossImage from "../assets/tironds-campaign/tironds-6260.webp";
import packImage from "../assets/tironds-campaign/tironds-6382.webp";

export type MirandaProductId = "gloss" | "batom" | "pack";

export type MirandaProduct = {
  id: MirandaProductId;
  title: string;
  collectionName: string;
  price: number;
  image: string;
  imageAlt: string;
  description: string;
};

export const mirandaProducts: MirandaProduct[] = [
  {
    id: "batom",
    title: "Batom",
    collectionName: "“Nude Perseguição”",
    price: 22,
    image: batomImage,
    imageAlt: "Batom Nude Perseguição da edição Lips Lab x Tiironds",
    description: "Batom Nude Perseguição da edição especial Lips Lab x Tiironds.",
  },
  {
    id: "gloss",
    title: "Lip Gloss",
    collectionName: "“Beijinhos à Prima”",
    price: 19,
    image: glossImage,
    imageAlt: "Lip Gloss Beijinhos à Prima da edição Lips Lab x Tiironds",
    description: "Lip Gloss Beijinhos à Prima da edição especial Lips Lab x Tiironds.",
  },
  {
    id: "pack",
    title: "Batom & Lip Gloss",
    collectionName: "Combo",
    price: 35,
    image: packImage,
    imageAlt: "Combo Batom e Lip Gloss da edição Lips Lab x Tiironds",
    description: "Combo com Batom e Lip Gloss da edição especial Lips Lab x Tiironds.",
  },
];

export function getMirandaProduct(productId: string | undefined) {
  return mirandaProducts.find((product) => product.id === productId);
}
