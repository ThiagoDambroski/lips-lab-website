import { useEffect, useMemo, useRef, useState } from "react";

export type Pill = "VERMELHO" | "VIBRANTE" | "NUDE" | "EXPRESSIVO";

export type Slide = {
  id: string;
  bgColor: string;
  circlesImageSrc: string;
  collageImageSrc: string;
  activePill: Pill;
};

const PILL_ORDER: Pill[] = ["VERMELHO", "VIBRANTE", "NUDE", "EXPRESSIVO"];

type Props = {
  slides: Slide[];
  autoplayMs?: number;
};

function preloadImage(src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const img: HTMLImageElement = document.createElement("img");
    img.src = src;

    if (typeof img.decode === "function") {
      img
        .decode()
        .then(() => resolve())
        .catch(() => resolve());
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }
  });
}


export default function ToneCarousel({ slides, autoplayMs }: Props) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const animatingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    setIndex((prev) => (slides.length === 0 ? 0 : Math.min(prev, slides.length - 1)));
  }, [slides.length]);

  const current = slides[index];

  const pillToIndex = useMemo(() => {
    const map = new Map<Pill, number>();
    slides.forEach((s, i) => map.set(s.activePill, i));
    return map;
  }, [slides]);
  useEffect(() => {
    if (!slides.length) return;

    const all = slides.flatMap((s) => [s.circlesImageSrc, s.collageImageSrc]);
    const run = () => {
      const unique = Array.from(new Set(all));
      unique.forEach((src) => preloadImage(src));
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(run);
    } else {
      setTimeout(run, 0);
    }
  }, [slides]);
  useEffect(() => {
    if (slides.length <= 1) return;

    const prev = slides[(index - 1 + slides.length) % slides.length];
    const next = slides[(index + 1) % slides.length];

    [prev, next].forEach((s) => {
      preloadImage(s.circlesImageSrc);
      preloadImage(s.collageImageSrc);
    });
  }, [index, slides]);

  const lockAnimation = () => {
    animatingRef.current = true;
    setAnimating(true);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      animatingRef.current = false;
      setAnimating(false);
    }, 450);
  };

  const goTo = (target: number) => {
    if (animatingRef.current) return;
    if (target === index) return;

    lockAnimation();
    setIndex(target);
  };

  const next = () => {
    if (slides.length <= 1) return;
    if (animatingRef.current) return;

    lockAnimation();
    setIndex((prev) => (prev + 1) % slides.length);
  };
  useEffect(() => {
    if (!autoplayMs || slides.length <= 1) return;

    const id = window.setInterval(() => {
      next();
    }, autoplayMs);

    return () => window.clearInterval(id);
  }, [autoplayMs, slides.length]);
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!slides.length || !current) return null;

  return (
    <section className="tone-carousel">
      <div className="tone-carousel__slide" style={{ backgroundColor: current.bgColor }}>
        
        <aside className="tone-carousel__left">
          <h2 className="tone-carousel__title">
            UMA TONALIDADE <br /> PARA CADA LADO TEU
          </h2>

          <img
            className="tone-carousel__circles"
            src={current.circlesImageSrc}
            alt={`Paleta de tons ${current.activePill.toLowerCase()} Lips Lab`}
            decoding="async"
            loading="eager"
          />

          <p className="tone-carousel__subtitle">
            A cor é expressiva, tal como tu <br />
            Define o tom e inspira-te para criar a tua <br />
            tonalidade personalizada
          </p>

          <div className="tone-carousel__pills">
            {PILL_ORDER.map((pill) => {
              const pillIndex = pillToIndex.get(pill);
              const isActive = current.activePill === pill;

              return (
                <button
                  key={pill}
                  type="button"
                  className={`tone-carousel__pill ${isActive ? "is-active" : ""}`}
                  onClick={() => pillIndex !== undefined && goTo(pillIndex)}
                  disabled={animating}
                >
                  {pill}
                </button>
              );
            })}
          </div>
        </aside>

        
        <div className="tone-carousel__right">
          <div className={`tone-carousel__collage ${animating ? "is-animating" : ""}`}>
            <img
              src={current.collageImageSrc}
              alt={`Inspiração visual para tons ${current.activePill.toLowerCase()}`}
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
