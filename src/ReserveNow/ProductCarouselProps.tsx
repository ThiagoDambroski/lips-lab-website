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

const CARDS_PER_VIEW = 2;
const STEP_PCT = 100 / CARDS_PER_VIEW;

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

  // Last valid index when showing 2 cards per view:
  // Example: 7 items -> maxIndex = 5 (shows items 6 & 7 in the last view)
  const maxIndex = useMemo(
    () => Math.max(0, items.length - CARDS_PER_VIEW),
    [items.length]
  );

  const [index, setIndex] = useState(() => clamp(initialIndex, 0, maxIndex));

  // Keep index valid if items length changes
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

  // Move by half of the viewport each index (2 cards per view)
  const translatePct = useMemo(() => -(index * STEP_PCT), [index]);

  return (
    <div
      className={["pc-carousel", className].filter(Boolean).join(" ")}
      ref={wrapRef}
      role="region"
      aria-label="Products carousel"
      tabIndex={0}
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
              style={{ aspectRatio: `${cardRatio}` }}
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
