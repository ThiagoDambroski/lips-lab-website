import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  onIndexChange?: (index: number) => void;
  className?: string;
};

const MOBILE_MAX = 767;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

function getCardsPerView(): number {
  if (typeof window === "undefined") return 2;
  return window.innerWidth <= MOBILE_MAX ? 1 : 2;
}

export default function ProductCarousel({
  items,
  initialIndex = 0,
  autoplayMs = 0,
  cardRatio = 1.05,
  onIndexChange,
  className,
}: ProductCarouselProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const [cardsPerView, setCardsPerView] = useState<number>(() => getCardsPerView());

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stepPct = useMemo(() => 100 / cardsPerView, [cardsPerView]);
  const maxIndex = useMemo(() => Math.max(0, items.length - cardsPerView), [items.length, cardsPerView]);
  const [index, setIndex] = useState(() => clamp(initialIndex, 0, maxIndex));

  useEffect(() => {
    setIndex((current) => clamp(current, 0, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = clamp(nextIndex, 0, maxIndex);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!wrapRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  useEffect(() => {
    if (!autoplayMs || autoplayMs < 600) return;

    if (autoplayRef.current) window.clearInterval(autoplayRef.current);

    autoplayRef.current = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, autoplayMs);

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [autoplayMs, maxIndex]);

  const translatePct = useMemo(() => -(index * stepPct), [index, stepPct]);

  return (
    <div
      className={["pc-carousel", className].filter(Boolean).join(" ")}
      ref={wrapRef}
      role="region"
      aria-label="Carrossel de produtos"
      tabIndex={0}
      data-cards-per-view={cardsPerView}
    >
      <button className="pc-nav" aria-label="Produto anterior" onClick={prev} disabled={!canPrev} type="button">
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
          {items.map((item) => (
            <li
              key={item.id}
              className="pc-card"
              style={{
                aspectRatio: `${cardRatio}`,
                flex: `0 0 ${100 / cardsPerView}%`,
              }}
            >
              <article className="pc-cardInner">
                <div className="pc-imageWrap">
                  <img loading="lazy" src={item.imageUrl} alt={item.alt ?? item.title}  decoding="async" />
                </div>

                <div className="pc-meta">
                  <h3 className="pc-title">{item.title}</h3>
                  <span className="pc-price">
                    {typeof item.price === "number" ? `${item.price.toFixed(0)}€` : item.price}
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <button className="pc-nav" aria-label="Produto seguinte" onClick={next} disabled={!canNext} type="button">
        <span aria-hidden>›</span>
      </button>
    </div>
  );
}
