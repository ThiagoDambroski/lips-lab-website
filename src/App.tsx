import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppProvider from "./Contexts/AppProvider";
import Footer from "./footer/Footer";
import ScrollToTop from "./ScrollToTop";
import PageSeo from "./components/PageSeo";
import SiteLoader from "./components/SiteLoader";
import { ROUTES } from "./config/routes";

const HomePage = lazy(() => import("./HomePage/HomePage"));
const ReserveNow = lazy(() => import("./ReserveNow/ReserveNow"));
const OnlineExperiencie = lazy(() => import("./OnlineExperiencie/OnlineExperiencie"));
const ExperiencieAndPrice = lazy(() => import("./expereiencieAndPrice/ExperiencieAndPrice"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const Faq = lazy(() => import("./Faq/Faq"));
const GiftCard = lazy(() => import("./GiftCard/GiftCard"));
const CartPage = lazy(() => import("./Cart/CartPage"));
const PaymentMethodsPage = lazy(() => import("./InfoPage/PaymentMethodsPage"));
const TermsPage = lazy(() => import("./InfoPage/TermsPage"));
const PrivacyPage = lazy(() => import("./InfoPage/PrivacyPage"));

function App() {
  return (
    <AppProvider>
      <PageSeo />
      <ScrollToTop />
      <a className="skip-link" href="#main-content">
        Saltar para o conteúdo principal
      </a>
      <Suspense fallback={<SiteLoader variant="route" label="A preparar a página..." />}>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.reserve} element={<ReserveNow />} />
          <Route path={ROUTES.onlineExperience} element={<OnlineExperiencie />} />
          <Route path={ROUTES.experience} element={<ExperiencieAndPrice />} />
          <Route path={ROUTES.products} element={<ProductsPage />} />
          <Route path={ROUTES.faq} element={<Faq />} />
          <Route path={ROUTES.giftCard} element={<GiftCard />} />
          <Route path={ROUTES.cart} element={<CartPage />} />
          <Route path={ROUTES.paymentMethods} element={<PaymentMethodsPage />} />
          <Route path={ROUTES.terms} element={<TermsPage />} />
          <Route path={ROUTES.privacy} element={<PrivacyPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </AppProvider>
  );
}

export default App;
