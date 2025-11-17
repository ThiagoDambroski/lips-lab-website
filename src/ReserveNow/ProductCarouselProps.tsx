import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../scss/Carrousel.css";

export type ProductItem = {
  id: string | number;
  title: string;
  price: number | string; // accepts "55€" or 55
  imageUrl: string;
  alt?: string;
};

type ProductCarouselProps = {
  items: ProductItem[];
  initialIndex?: number;   // 0-based
  autoplayMs?: number;     // 0 disables
  cardRatio?: number;      // width/height ratio (≈1.05 by default)
  onIndexChange?: (idx: number) => void;
  className?: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  items,
  initialIndex = 0,
  autoplayMs = 0,
  cardRatio = 1.05,
  onIndexChange,
  className,
}) => {
  const [index, setIndex] = useState(clamp(initialIndex, 0, Math.max(0, items.length - 1)));
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    const clamped = clamp(next, 0, items.length - 1);
    setIndex(clamped);
    onIndexChange?.(clamped);
  }, [items.length, onIndexChange]);

  const canPrev = index > 0;
  const canNext = index < items.length - 1;
  const prev = useCallback(() => { if (canPrev) goTo(index - 1); }, [canPrev, goTo, index]);
  const next = useCallback(() => { if (canNext) goTo(index + 1); }, [canNext, goTo, index]);

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

  // Autoplay
  useEffect(() => {
    if (!autoplayMs || autoplayMs < 600) return;
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(() => {
      setIndex(curr => (curr >= items.length - 1 ? 0 : curr + 1));
    }, autoplayMs);
    return () => { if (autoplayRef.current) window.clearInterval(autoplayRef.current); };
  }, [autoplayMs, items.length]);

  // Drag (mouse + touch)
  const startDrag = useCallback((clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    lastXRef.current = clientX;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    lastXRef.current = clientX;
    if (!isDragging) return;
    rafRef.current = requestAnimationFrame(() => {
      setDragX(clientX - startXRef.current);
    });
  }, [isDragging]);

  const endDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = lastXRef.current - startXRef.current;
    const threshold = (wrapRef.current?.clientWidth || 1) * 0.12; // 12%
    if (delta > threshold) prev();
    else if (delta < -threshold) next();
    setDragX(0);
  }, [isDragging, next, prev]);

  // Translate %
  const translatePct = useMemo(() => {
    if (!wrapRef.current) return -index * 100;
    const w = wrapRef.current.clientWidth || 1;
    return -(index * 100) + (dragX / w) * 100;
  }, [index, dragX]);

  // Progress
  const progress = useMemo(() => {
    if (items.length <= 1) return 100;
    return (index / (items.length - 1)) * 100;
  }, [index, items.length]);

  return (
    <div
      className={["pc-carousel", className].filter(Boolean).join(" ")}
      ref={wrapRef}
      role="region"
      aria-label="Products carousel"
      tabIndex={0}
      onMouseLeave={() => (isDragging ? endDrag() : undefined)}
    >
      <button
        className="pc-nav"
        aria-label="Previous"
        onClick={prev}
        disabled={!canPrev}
      >
        <span aria-hidden>‹</span>
      </button>

      <div
        className="pc-viewport"
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => isDragging && moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
        onTouchCancel={endDrag}
      >
        <ul
          className="pc-track"
          style={{
            transform: `translateX(${translatePct}%)`,
            transition: isDragging ? "none" : "transform 320ms ease",
          }}
        >
          {items.map((it) => (
            <li key={it.id} className="pc-card" style={{ aspectRatio: `${cardRatio}` }}>
              <article className="pc-cardInner" aria-label={`${it.title} card`}>
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
      >
        <span aria-hidden>›</span>
      </button>

      <div className="pc-progress" aria-hidden>
        <div className="pc-progressBar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProductCarousel;
