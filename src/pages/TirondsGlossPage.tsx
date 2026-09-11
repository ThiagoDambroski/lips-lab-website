import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PageSeo from "../components/PageSeo";
import { addCartItem } from "../Cart/utils/cartStorage";
import { buildCartDescription } from "../Cart/utils/cartItems";
import { getTirondsShopifyCartTarget } from "../config/productsShopify";
import { ROUTES, getMirandaProductPath } from "../config/routes";
import tirondsLogo from "../assets/lipslab-x-tironds-logo.png";
import gallery6260 from "../assets/tironds-campaign/tironds-6260.webp";
import gallery6422 from "../assets/tironds-campaign/tironds-6422.webp";
import gallery6472 from "../assets/tironds-campaign/tironds-6472.webp";
import gallery6323 from "../assets/tironds-campaign/tironds-6323.webp";
import gallery6196 from "../assets/tironds-campaign/tironds-6196.webp";
import gallery6382 from "../assets/tironds-campaign/tironds-6382.webp";
import "../styles/TirondsGlossPage.css";

const BASE_PRICE = 19;
const CHARMS_PRICE = 2;

const gallery = [
  { type: "image", src: gallery6260, alt: "Tiironds apresenta o Lip Gloss Beijinhos à Prima no laboratório Lips Lab" },
  { type: "image", src: gallery6422, alt: "Lip Gloss Beijinhos à Prima com charms sobre fundo rosa" },
  { type: "image", src: gallery6472, alt: "Lip Gloss Beijinhos à Prima fotografado sobre fundo rosa" },
  { type: "image", src: gallery6323, alt: "Tiironds apresenta a edição limitada Lips Lab x Tiironds" },
  { type: "image", src: gallery6196, alt: "Preparação da edição limitada Lips Lab x Tiironds no laboratório" },
  { type: "image", src: gallery6382, alt: "Tiironds com os produtos da edição limitada Lips Lab x Tiironds" },
] as const;

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}€`;
}

export default function TirondsGlossPage() {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [hasCharms, setHasCharms] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => BASE_PRICE + (hasCharms ? CHARMS_PRICE : 0), [hasCharms]);

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
    const shopifyTarget = getTirondsShopifyCartTarget("gloss", hasCharms);
    const details = [
      { label: "Edição", value: "Lips Lab x Tiironds" },
      { label: "Produto", value: "Beijinhos à Prima" },
      { label: "Tom", value: "Nude rosado" },
      { label: "Glitter", value: "Rosa" },
      { label: "Aroma", value: "Crème Brûlée" },
      { label: "Charms", value: hasCharms ? "Sim (+2€)" : "Não" },
    ];

    addCartItem({
      source: "products",
      name: "Beijinhos à Prima — Lip Gloss",
      quantity,
      unitPrice: totalPrice,
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
          title: "Beijinhos à Prima | Lips Lab x Tiironds",
          description:
            "Gloss nude rosado da edição limitada Lips Lab x Tiironds, com brilho intenso, óleo de jojoba, vitamina E e aroma a Crème Brûlée.",
          path: getMirandaProductPath("gloss"),
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
        <section className="tironds-gloss-hero" aria-labelledby="tironds-gloss-title">
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
            <h1 id="tironds-gloss-title" className="tironds-gloss-hero__title">
              Beijinhos à Prima
            </h1>

            <div className="tironds-gloss-hero__copy">
              <p>
                <strong>“Beijinhos à Prima” é o gloss perfeito</strong> para uns lábios luminosos e irresistíveis. Num tom nude rosado, apresenta uma textura sedosa e confortável, com um acabamento de brilho intenso sem sensação pegajosa.
              </p>
              <p>
                A fórmula combina óleo de jojoba e vitamina E, ajudando a hidratar e a cuidar dos lábios, enquanto o aditivo de suavização deixa uma sensação ainda mais macia. Para completar, um delicioso aroma a Crème Brûlée.
              </p>
            </div>

            <p className="tironds-gloss-hero__price" aria-live="polite">
              {formatPrice(totalPrice)}
            </p>

            <button
              type="button"
              className={`tironds-gloss-hero__charms${hasCharms ? " is-selected" : ""}`}
              onClick={() => setHasCharms((current) => !current)}
              aria-pressed={hasCharms}
            >
              ADICIONAR CHARMS: LIP GLOSS (+2€)
            </button>

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

        <section className="products-info tironds-gloss-info" aria-labelledby="tironds-gloss-description-title">
          <h2 id="tironds-gloss-description-title" className="products-info__title">
            Descrição
          </h2>

          <p className="products-info__description">
            O “Beijinhos à Prima” é um gloss nude rosado criado para deixar os lábios luminosos, cuidados e irresistíveis. A sua tonalidade delicada combina com qualquer ocasião, realçando naturalmente os lábios com um acabamento elegante e sofisticado.
          </p>

          <details className="products-info__more">
            <summary className="products-info__learn-more">Saber mais</summary>
            <div className="products-info__more-content tironds-gloss-info__description-more">
              <p>
                A sua fórmula utiliza uma base, com uma textura sedosa e densa, desenvolvida para proporcionar um brilho intenso sem sensação pegajosa.
              </p>
              <p>
                A combinação de ceras, óleo de jojoba e vitamina E ajuda a hidratar, nutrir e cuidar dos lábios, deixando-os com uma sensação confortável e macia. A fórmula é ainda enriquecida com um aditivo de suavização, que contribui para uma textura ainda mais sedosa e agradável nos lábios.
              </p>
              <p>
                Para dar um toque especial, o Beijinhos à Prima contém um ligeiro glitter rosa, que capta subtilmente a luz e acrescenta luminosidade sem retirar a naturalidade do tom nude rosado.
              </p>
              <p>
                Para completar, apresenta um irresistível aroma a Crème Brûlée, doce e envolvente, tornando cada aplicação ainda mais especial.
              </p>
              <p>
                O resultado é um gloss luminoso, confortável e não pegajoso, com um delicado reflexo rosa e um acabamento de brilho intenso.
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
                  Composition: Hydrogenated Polybutene, Octyldodecyl Stearoyl Stearate, Ricinus Communis (Castor) Seed Oil, Cera Microcristallina (Microcrystalline Wax), Myristyl Lactate, Polyethylene, Ozokerite Wax, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E), Camellia Sinensis Leaf Extract, Triacetin, Crème Brûlée Flavor, Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Ascorbyl Palmitate (Vitamin C).
                </p>
              </div>
            </details>
          </div>
        </section>
      </main>
    </>
  );
}
