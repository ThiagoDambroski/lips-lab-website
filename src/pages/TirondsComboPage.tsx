import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PageSeo from "../components/PageSeo";
import { addCartItem } from "../Cart/utils/cartStorage";
import { buildCartDescription } from "../Cart/utils/cartItems";
import { getTirondsShopifyCartTarget } from "../config/productsShopify";
import { ROUTES, getMirandaProductPath } from "../config/routes";
import { TIRONDS_BATOM_DETAILS, TIRONDS_GLOSS_DETAILS, type TirondsProductDetails } from "../data/tirondsProductDetails";
import tirondsLogo from "../assets/lipslab-x-tironds-logo.png";
import gallery6382 from "../assets/tironds-campaign/tironds-6382.webp";
import gallery6409 from "../assets/tironds-campaign/tironds-6409.webp";
import gallery6213 from "../assets/tironds-campaign/tironds-6213.webp";
import gallery6268 from "../assets/tironds-campaign/tironds-6268.webp";
import gallery6451 from "../assets/tironds-campaign/tironds-6451.webp";
import gallery6414 from "../assets/tironds-campaign/tironds-6414.webp";
import gallery6323 from "../assets/tironds-campaign/tironds-6323.webp";
import comboVideo from "../assets/tironds-campaign/tironds-combo-video.mp4";
import "../styles/TirondsGlossPage.css";

const BASE_PRICE = 35;
const CHARMS_PRICE = 2;

const gallery = [
  { type: "image", src: gallery6382, alt: "Tiironds apresenta o combo Lips Lab x Tiironds" },
  { type: "image", src: gallery6409, alt: "Batom Nude Perseguição e Lip Gloss Beijinhos à Prima sobre fundo rosa" },
  { type: "image", src: gallery6213, alt: "Preparação da edição limitada Lips Lab x Tiironds no laboratório" },
  { type: "image", src: gallery6268, alt: "Lip Gloss Beijinhos à Prima apresentado no laboratório Lips Lab" },
  { type: "image", src: gallery6451, alt: "Batom Nude Perseguição aberto ao lado da embalagem" },
  { type: "image", src: gallery6414, alt: "Detalhe das embalagens da edição limitada Lips Lab x Tiironds" },
  { type: "image", src: gallery6323, alt: "Tiironds apresenta os produtos da edição limitada Lips Lab x Tiironds" },
  { type: "video", src: comboVideo, alt: "Vídeo do combo da edição limitada Lips Lab x Tiironds" },
] as const;

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}€`;
}

function ProductDetailsPanel({ details, id }: { details: TirondsProductDetails; id: string }) {
  return (
    <article id={id} className="tironds-combo-detail">
      <h2 className="tironds-combo-detail__product">{details.label}:</h2>

      <section className="tironds-combo-detail__section">
        <h3>Descrição</h3>
        <div className="tironds-combo-detail__description">
          {details.fullDescription.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="tironds-combo-detail__section tironds-combo-detail__section--divided">
        <h3>Instruções de segurança</h3>
        <p>{details.safety}</p>
      </section>

      <section className="tironds-combo-detail__section tironds-combo-detail__section--divided">
        <h3>Dicas de utilização</h3>
        <ul>
          {details.usage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{details.usageFooter}</p>
      </section>

      <section className="tironds-combo-detail__section tironds-combo-detail__section--divided">
        <h3>Ingredientes:</h3>
        <p className="tironds-combo-detail__ingredients">{details.ingredients}</p>
      </section>
    </article>
  );
}

export default function TirondsComboPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isVideoPlaybackBlocked, setIsVideoPlaybackBlocked] = useState(false);
  const [hasCharms, setHasCharms] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isBatomExpanded, setIsBatomExpanded] = useState(false);
  const [isGlossExpanded, setIsGlossExpanded] = useState(false);
  const [detailToScroll, setDetailToScroll] = useState<"batom" | "gloss" | null>(null);

  const totalPrice = useMemo(() => BASE_PRICE + (hasCharms ? CHARMS_PRICE : 0), [hasCharms]);

  useEffect(() => {
    if (isCarouselPaused || gallery.length < 2 || gallery[activeImageIndex].type === "video") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveImageIndex((current) => (current + 1) % gallery.length);
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [activeImageIndex, isCarouselPaused]);

  useEffect(() => {
    const nextIndex = (activeImageIndex + 1) % gallery.length;
    const nextMedia = gallery[nextIndex];

    if (nextMedia.type !== "image") return;

    const image = new Image();
    image.src = nextMedia.src;
  }, [activeImageIndex]);

  useEffect(() => {
    if (gallery[activeImageIndex].type !== "video") {
      setIsVideoPlaybackBlocked(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    void video
      .play()
      .then(() => setIsVideoPlaybackBlocked(false))
      .catch(() => setIsVideoPlaybackBlocked(true));
  }, [activeImageIndex]);

  useEffect(() => {
    if (!detailToScroll) return;

    const elementId = detailToScroll === "batom"
      ? "tironds-combo-batom-details"
      : "tironds-combo-gloss-details";

    const frame = window.requestAnimationFrame(() => {
      const element = document.getElementById(elementId);
      if (!element) return;

      element.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      setDetailToScroll(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [detailToScroll]);

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

  const toggleBatomDetails = () => {
    const shouldOpen = !isBatomExpanded;
    setIsBatomExpanded(shouldOpen);
    if (shouldOpen) setDetailToScroll("batom");
  };

  const toggleGlossDetails = () => {
    const shouldOpen = !isGlossExpanded;
    setIsGlossExpanded(shouldOpen);
    if (shouldOpen) setDetailToScroll("gloss");
  };

  const handleAddToCart = () => {
    const shopifyTarget = getTirondsShopifyCartTarget("pack", hasCharms);
    const details = [
      { label: "Edição", value: "Lips Lab x Tiironds" },
      { label: "Produto", value: "Combo Batom & Lip Gloss" },
      { label: "Batom", value: "Nude Perseguição" },
      { label: "Lip Gloss", value: "Beijinhos à Prima" },
      { label: "Charms no Lip Gloss", value: hasCharms ? "Sim (+2€)" : "Não" },
    ];

    addCartItem({
      source: "products",
      name: "Combo Nude Perseguição + Beijinhos à Prima",
      quantity,
      unitPrice: totalPrice,
      ...shopifyTarget,
      details,
      description: buildCartDescription(details),
    });

    navigate(ROUTES.cart);
  };

  const hasExpandedDetails = isBatomExpanded || isGlossExpanded;

  return (
    <>
      <PageSeo
        config={{
          title: "Combo Batom & Lip Gloss | Lips Lab x Tiironds",
          description:
            "Combo da edição limitada Lips Lab x Tiironds com o batom Nude Perseguição e o Lip Gloss Beijinhos à Prima.",
          path: getMirandaProductPath("pack"),
        }}
      />
      <Navbar css={1} />

      <main id="main-content" className="tironds-gloss-page tironds-combo-page">
        <div className="tironds-product-back-row">
          <button type="button" className="tironds-product-back" onClick={() => navigate(ROUTES.products)}>
            <span aria-hidden="true">←</span>
            Voltar aos produtos
          </button>
        </div>

        <section className="tironds-gloss-hero" aria-labelledby="tironds-combo-title">
          <div
            className="tironds-gloss-carousel"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="tironds-gloss-carousel__viewport">
              {gallery[activeImageIndex].type === "video" ? (
                <video
                  ref={videoRef}
                  key={gallery[activeImageIndex].src}
                  className="tironds-gloss-carousel__video"
                  src={gallery[activeImageIndex].src}
                  aria-label={gallery[activeImageIndex].alt}
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  key={gallery[activeImageIndex].src}
                  className="tironds-gloss-carousel__image"
                  src={gallery[activeImageIndex].src}
                  alt={gallery[activeImageIndex].alt}
                  loading={activeImageIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              )}

              {gallery[activeImageIndex].type === "video" && isVideoPlaybackBlocked && (
                <button
                  type="button"
                  className="tironds-gloss-carousel__sound-button"
                  onClick={() => {
                    const video = videoRef.current;
                    if (!video) return;

                    video.muted = false;
                    void video
                      .play()
                      .then(() => setIsVideoPlaybackBlocked(false))
                      .catch(() => setIsVideoPlaybackBlocked(true));
                  }}
                >
                  REPRODUZIR COM SOM
                </button>
              )}

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
                  aria-label={`Mostrar ${image.type === "video" ? "vídeo" : "fotografia"} ${index + 1}`}
                  aria-current={index === activeImageIndex ? "true" : undefined}
                />
              ))}
            </div>
          </div>

          <div className="tironds-gloss-hero__content tironds-combo-hero__content">
            <img className="tironds-gloss-hero__logo" src={tirondsLogo} alt="Lips Lab x Tiironds" />
            <h1 id="tironds-combo-title" className="tironds-gloss-hero__title">
              Combo Batom e Lip Gloss
            </h1>

            <div className="tironds-combo-options" aria-label="Informação dos produtos do combo">
              <button
                type="button"
                className={`tironds-combo-option${isBatomExpanded ? " is-open" : ""}`}
                onClick={toggleBatomDetails}
                aria-expanded={isBatomExpanded}
                aria-controls="tironds-combo-batom-details"
              >
                <span>BATOM: “NUDE PERSEGUIÇÃO”</span>
                <span className="tironds-combo-option__arrow" aria-hidden="true">↓</span>
              </button>

              <button
                type="button"
                className={`tironds-combo-option${isGlossExpanded ? " is-open" : ""}`}
                onClick={toggleGlossDetails}
                aria-expanded={isGlossExpanded}
                aria-controls="tironds-combo-gloss-details"
              >
                <span>LIP GLOSS: “BEIJINHOS À PRIMA”</span>
                <span className="tironds-combo-option__arrow" aria-hidden="true">↓</span>
              </button>
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

        {hasExpandedDetails && (
          <section className="tironds-combo-details" aria-label="Detalhes dos produtos do combo">
            <div className={`tironds-combo-details__grid${isBatomExpanded && isGlossExpanded ? " is-double" : ""}`}>
              {isBatomExpanded && <ProductDetailsPanel details={TIRONDS_BATOM_DETAILS} id="tironds-combo-batom-details" />}
              {isGlossExpanded && <ProductDetailsPanel details={TIRONDS_GLOSS_DETAILS} id="tironds-combo-gloss-details" />}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
