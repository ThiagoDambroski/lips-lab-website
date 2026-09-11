import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PageSeo from "../components/PageSeo";
import { addCartItem } from "../Cart/utils/cartStorage";
import { buildCartDescription } from "../Cart/utils/cartItems";
import { getTirondsShopifyCartTarget } from "../config/productsShopify";
import { ROUTES, getMirandaProductPath } from "../config/routes";
import tirondsLogo from "../assets/lipslab-x-tironds-logo.png";
import gallery6323 from "../assets/tironds-campaign/tironds-6323.webp";
import gallery6451 from "../assets/tironds-campaign/tironds-6451.webp";
import gallery6439 from "../assets/tironds-campaign/tironds-6439.webp";
import gallery6459 from "../assets/tironds-campaign/tironds-6459.webp";
import gallery6147 from "../assets/tironds-campaign/tironds-6147.webp";
import gallery6213 from "../assets/tironds-campaign/tironds-6213.webp";
import "../styles/TirondsGlossPage.css";

const BASE_PRICE = 22;

const gallery = [
  { type: "image", src: gallery6323, alt: "Tiironds apresenta o batom Nude Perseguição da edição Lips Lab x Tiironds" },
  { type: "image", src: gallery6451, alt: "Batom Nude Perseguição aberto ao lado da embalagem" },
  { type: "image", src: gallery6439, alt: "Embalagem do batom Nude Perseguição sobre fundo rosa" },
  { type: "image", src: gallery6459, alt: "Batom Nude Perseguição fechado sobre fundo rosa" },
  { type: "image", src: gallery6147, alt: "Tiironds aplica o batom Nude Perseguição" },
  { type: "image", src: gallery6213, alt: "Preparação do batom Nude Perseguição no laboratório Lips Lab" },
] as const;

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}€`;
}

export default function TirondsBatomPage() {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isCarouselPaused || gallery.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveImageIndex((current) => (current + 1) % gallery.length);
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [activeImageIndex, isCarouselPaused]);

  useEffect(() => {
    const nextIndex = (activeImageIndex + 1) % gallery.length;
    const nextMedia = gallery[nextIndex];


    const image = new Image();
    image.src = nextMedia.src;
  }, [activeImageIndex]);


  const showPreviousImage = () => {
    setActiveImageIndex((current) => (current - 1 + gallery.length) % gallery.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % gallery.length);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    const shopifyTarget = getTirondsShopifyCartTarget("batom");
    const details = [
      { label: "Edição", value: "Lips Lab x Tiironds" },
      { label: "Produto", value: "Nude Perseguição" },
      { label: "Tom", value: "Nude rosado" },
      { label: "Aroma", value: "Crème Brûlée" },
    ];

    addCartItem({
      source: "products",
      name: "Nude Perseguição — Batom",
      quantity,
      unitPrice: BASE_PRICE,
      ...shopifyTarget,
      details,
      description: buildCartDescription(details),
    });

    navigate(ROUTES.cart);
  };

  return (
    <>
      <PageSeo
        config={{
          title: "Nude Perseguição | Lips Lab x Tiironds",
          description:
            "Batom nude rosado da edição limitada Lips Lab x Tiironds, com textura cremosa, ceras vegetais, carnaúba, calêndula e aroma a Crème Brûlée.",
          path: getMirandaProductPath("batom"),
        }}
      />
      <Navbar css={1} />

      <main id="main-content" className="tironds-gloss-page">
        <div className="tironds-product-back-row">
          <button type="button" className="tironds-product-back" onClick={() => navigate(ROUTES.products)}>
            <span aria-hidden="true">←</span>
            Voltar aos produtos
          </button>
        </div>
        <section className="tironds-gloss-hero" aria-labelledby="tironds-batom-title">
          <div
            className="tironds-gloss-carousel"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="tironds-gloss-carousel__viewport">
              <img
                key={gallery[activeImageIndex].src}
                className="tironds-gloss-carousel__image"
                src={gallery[activeImageIndex].src}
                alt={gallery[activeImageIndex].alt}
                loading={activeImageIndex === 0 ? "eager" : "lazy"}
                decoding="async"
              />

              <button
                type="button"
                className="tironds-gloss-carousel__control tironds-gloss-carousel__control--previous"
                onClick={showPreviousImage}
                aria-label="Fotografia anterior"
              >
                ‹
              </button>
              <button
                type="button"
                className="tironds-gloss-carousel__control tironds-gloss-carousel__control--next"
                onClick={showNextImage}
                aria-label="Fotografia seguinte"
              >
                ›
              </button>
            </div>

            <div className="tironds-gloss-carousel__dots" aria-label="Selecionar fotografia">
              {gallery.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`tironds-gloss-carousel__dot${index === activeImageIndex ? " is-active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Mostrar fotografia ${index + 1}`}
                  aria-current={index === activeImageIndex ? "true" : undefined}
                />
              ))}
            </div>
          </div>

          <div className="tironds-gloss-hero__content">
            <img className="tironds-gloss-hero__logo" src={tirondsLogo} alt="Lips Lab x Tiironds" />
            <h1 id="tironds-batom-title" className="tironds-gloss-hero__title">
              Nude Perseguição
            </h1>

            <div className="tironds-gloss-hero__copy">
              <p>
                <strong>“Nude Perseguição” é o batom nude rosado</strong> perfeito para quem procura um resultado elegante e natural. Com uma textura cremosa, suave e hidratante, desliza facilmente nos lábios, proporcionando conforto e um acabamento com brilho delicado.
              </p>
              <p>
                A sua fórmula contém ceras vegetais, carnaúba e calêndula, combinadas com um aditivo de suavização que ajuda a manter os lábios macios e confortáveis. Para completar, tem um irresistível aroma a Crème Brûlée.
              </p>
            </div>

            <p className="tironds-gloss-hero__price">{formatPrice(BASE_PRICE)}</p>

            <div className="tironds-gloss-hero__purchase">
              <button type="button" className="tironds-gloss-hero__cart" onClick={handleAddToCart}>
                ADICIONAR AO CARRINHO
              </button>

              <div className="tironds-gloss-quantity" aria-label="Quantidade">
                <button type="button" onClick={decreaseQuantity} disabled={quantity === 1} aria-label="Diminuir quantidade">
                  −
                </button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" onClick={increaseQuantity} aria-label="Aumentar quantidade">
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="products-info tironds-gloss-info" aria-labelledby="tironds-batom-description-title">
          <h2 id="tironds-batom-description-title" className="products-info__title">
            Descrição
          </h2>

          <p className="products-info__description">
            Bálsamo labial com cor, hidratante e nutritivo, com acabamento brilhante, que hidrata, suaviza e protege os lábios de forma imediata.
          </p>

          <details className="products-info__more">
            <summary className="products-info__learn-more">Saber mais</summary>
            <div className="products-info__more-content tironds-gloss-info__description-more">
              <p>
                O “Nude Perseguição” é um batom nude rosado elegante e versátil, criado para realçar a cor natural dos lábios e proporcionar um resultado sofisticado, perfeito para qualquer ocasião.
              </p>
              <p>
                A sua base cremosa e hidratante é formulada com ceras vegetais de carnaúba e calêndula, proporcionando uma textura suave que desliza facilmente sobre os lábios. O resultado é uma aplicação confortável e cremosa, com um brilho suave e delicado.
              </p>
              <p>
                A fórmula é enriquecida com um aditivo de suavização, de origem botânica e com óleos naturais, que ajuda a conferir aos lábios uma sensação ainda mais sedosa, cremosa e suave.
              </p>
              <p>
                Para completar a experiência, o Nude Perseguição apresenta um irresistível aroma a Crème Brûlée, com um toque doce e envolvente que torna cada aplicação ainda mais especial.
              </p>
            </div>
          </details>

          <div className="products-info__accordion">
            <details className="products-info__details">
              <summary className="products-info__summary">
                <span>Instruções de segurança</span>
                <span className="products-info__arrow" aria-hidden="true">›</span>
              </summary>
              <div className="products-info__content">
                <p>AVISO: APENAS PARA USO EXTERNO.</p>
              </div>
            </details>

            <details className="products-info__details">
              <summary className="products-info__summary">
                <span>Dicas de utilização</span>
                <span className="products-info__arrow" aria-hidden="true">›</span>
              </summary>
              <div className="products-info__content">
                <ul>
                  <li>Aplicar generosamente nos lábios limpos e secos, sempre que necessário;</li>
                  <li>Pode ser utilizado sozinho para um efeito nutritivo e acabamento natural.</li>
                  <li>Pode ser aplicado antes do batom para suavizar e proteger os lábios.</li>
                </ul>
                <p>
                  Para um efeito reparador intensivo e conforto prolongado, aplicar uma camada mais espessa à noite antes de deitar.
                </p>
              </div>
            </details>

            <details className="products-info__details">
              <summary className="products-info__summary">
                <span>Ingredientes</span>
                <span className="products-info__arrow" aria-hidden="true">›</span>
              </summary>
              <div className="products-info__content">
                <p>
                  Composition: Lanolin Oil, Cetyl Acetate, Acetylated Lanolin Alcohol, Cetyl Ricinoleate, Euphorbia Cerifera (Candelilla) Wax, Propylene Glycol Dicaprylate/Dicaprate, Ethylhexyl Palmitate, Ozokerite Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Copernicia Cerifera (Carnauba) Wax, Cera Microcristallina (Microcrystalline) Wax, Paraffin Wax, VP/Hexadecene Copolymer, Caprylyl Glycol, Natural Fragrance, Tocopherol (Vitamin E), Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Tocopherol (Vitamin E), Ascorbyl Palmitate (Vitamin C), Triacetin, Crème Brûlée Flavor.
                </p>
              </div>
            </details>
          </div>
        </section>
      </main>
    </>
  );
}
