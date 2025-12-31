import { useEffect, useMemo, useState } from "react";

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

export default function ToneCarousel({ slides, autoplayMs }: Props) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Defensive: if slides length changes, keep index valid.
  useEffect(() => {
    setIndex((prev) => (slides.length === 0 ? 0 : Math.min(prev, slides.length - 1)));
  }, [slides.length]);

  const current = slides[index];

  const pillToIndex = useMemo(() => {
    const map = new Map<Pill, number>();
    slides.forEach((s, i) => map.set(s.activePill, i));
    return map;
  }, [slides]);

  const goTo = (target: number) => {
    if (animating) return;

    setIndex((prev) => {
      if (target === prev) return prev;
      setAnimating(true);
      return target;
    });
  };

  const next = () => {
    if (slides.length <= 1) return;

    setIndex((prev) => {
      if (animating) return prev;
      setAnimating(true);
      return (prev + 1) % slides.length;
    });
  };

  // Autoplay: create ONE interval per autoplayMs change (and slides length)
  useEffect(() => {
    if (!autoplayMs || slides.length <= 1) return;

    const id = window.setInterval(() => {
      next();
    }, autoplayMs);

    return () => window.clearInterval(id);
    // important: DO NOT depend on `index`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayMs, slides.length, animating]);

  // End animation lock
  useEffect(() => {
    if (!animating) return;
    const t = window.setTimeout(() => setAnimating(false), 450);
    return () => window.clearTimeout(t);
  }, [animating]);

  // If slides is empty, render nothing safely
  if (!slides.length || !current) return null;

  return (
    <section className="tone-carousel">
      <div
        className="tone-carousel__slide"
        style={{ backgroundColor: current.bgColor }}
      >
        {/* LEFT */}
        <aside className="tone-carousel__left">
          <h2 className="tone-carousel__title">
            UMA TONALIDADE <br /> PARA CADA LADO TEU
          </h2>

          <img
            className="tone-carousel__circles"
            src={current.circlesImageSrc}
            alt=""
            loading="eager"
            decoding="async"
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

        {/* RIGHT */}
        <div className="tone-carousel__right">
          <div className={`tone-carousel__collage ${animating ? "is-animating" : ""}`}>
            <img src={current.collageImageSrc} alt="Collage" loading="eager" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
