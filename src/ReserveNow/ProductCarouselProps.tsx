import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../scss/Carrousel.css";

export type ProductItem = {
  id: string | number;
  title: string;
  price: number | string;
  imageUrl: string;
  alt?: string;
};

type ProductCarouselProps = {
  items: ProductItem[];
  initialIndex?: number;
  autoplayMs?: number;
  cardRatio?: number;
  onIndexChange?: (idx: number) => void;
  className?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(n, max));

/**
 * Keep this in sync with your CSS breakpoint.
 * If <= 600px => 1 per view, else 2 per view (your original behavior).
 */
const MOBILE_MAX = 600;

function getCardsPerView(): number {
  if (typeof window === "undefined") return 2;
  return window.innerWidth <= MOBILE_MAX ? 1 : 2;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  items,
  initialIndex = 0,
  autoplayMs = 0,
  cardRatio = 1.05,
  onIndexChange,
  className,
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);

  const [cardsPerView, setCardsPerView] = useState<number>(() => getCardsPerView());

  // Update cardsPerView on resize
  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const stepPct = useMemo(() => 100 / cardsPerView, [cardsPerView]);

  const maxIndex = useMemo(() => {
    return Math.max(0, items.length - cardsPerView);
  }, [items.length, cardsPerView]);

  const [index, setIndex] = useState(() => clamp(initialIndex, 0, maxIndex));

  // Keep index valid if items length or cardsPerView changes
  useEffect(() => {
    setIndex((curr) => clamp(curr, 0, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, maxIndex);
      setIndex(clamped);
      onIndexChange?.(clamped);
    },
    [maxIndex, onIndexChange]
  );

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const prev = useCallback(() => {
    if (canPrev) goTo(index - 1);
  }, [canPrev, goTo, index]);

  const next = useCallback(() => {
    if (canNext) goTo(index + 1);
  }, [canNext, goTo, index]);

  // Keyboard arrows when focused
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!wrapRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Autoplay (loops back to 0)
  useEffect(() => {
    if (!autoplayMs || autoplayMs < 600) return;

    if (autoplayRef.current) window.clearInterval(autoplayRef.current);

    autoplayRef.current = window.setInterval(() => {
      setIndex((curr) => (curr >= maxIndex ? 0 : curr + 1));
    }, autoplayMs);

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [autoplayMs, maxIndex]);

  // Translate by 1 "slot" where slot size depends on cardsPerView
  const translatePct = useMemo(() => -(index * stepPct), [index, stepPct]);

  return (
    <div
      className={["pc-carousel", className].filter(Boolean).join(" ")}
      ref={wrapRef}
      role="region"
      aria-label="Products carousel"
      tabIndex={0}
      data-cards-per-view={cardsPerView}
    >
      <button
        className="pc-nav"
        aria-label="Previous"
        onClick={prev}
        disabled={!canPrev}
        type="button"
      >
        <span aria-hidden>‹</span>
      </button>

      <div className="pc-viewport">
        <ul
          className="pc-track"
          style={{
            transform: `translateX(${translatePct}%)`,
            transition: "transform 320ms ease",
          }}
        >
          {items.map((it) => (
            <li
              key={it.id}
              className="pc-card"
              style={{
                aspectRatio: `${cardRatio}`,
                flex: `0 0 ${100 / cardsPerView}%`,
              }}
            >
              <article className="pc-cardInner">
                <div className="pc-imageWrap">
                  <img loading="lazy" src={it.imageUrl} alt={it.alt ?? it.title} />
                </div>

                <div className="pc-meta">
                  <h3 className="pc-title">{it.title}</h3>
                  <span className="pc-price">
                    {typeof it.price === "number" ? `${it.price.toFixed(0)}€` : it.price}
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="pc-nav"
        aria-label="Next"
        onClick={next}
        disabled={!canNext}
        type="button"
      >
        <span aria-hidden>›</span>
      </button>
    </div>
  );
};

export default ProductCarousel;
