import { Navigate, useParams } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { getMirandaProduct } from "../data/mirandaProducts";
import TirondsBatomPage from "./TirondsBatomPage";
import TirondsComboPage from "./TirondsComboPage";
import TirondsGlossPage from "./TirondsGlossPage";
import "../styles/products-page/index.css";

export default function MirandaProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = getMirandaProduct(productId);

  if (!product) {
    return <Navigate to={ROUTES.products} replace />;
  }

  switch (product.id) {
    case "gloss":
      return <TirondsGlossPage />;
    case "batom":
      return <TirondsBatomPage />;
    case "pack":
      return <TirondsComboPage />;
  }
}
