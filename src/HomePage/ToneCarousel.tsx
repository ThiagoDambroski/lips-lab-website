import{ useEffect, useState } from "react";


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

  const current = slides[index];

  const goTo = (i: number) => {
    if (i === index || animating) return;
    setAnimating(true);
    setIndex(i);
  };

  const next = () => goTo((index + 1) % slides.length);
  //const prev = () => goTo((index - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!autoplayMs) return;
    const t = setInterval(next, autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, index]);

  useEffect(() => {
    if (!animating) return;
    const t = setTimeout(() => setAnimating(false), 450);
    return () => clearTimeout(t);
  }, [animating]);

  return (
    <section className="tone-carousel">
      <div className="tone-carousel__slide" style={{ backgroundColor: current.bgColor }}>
        {/* LEFT */}
        <aside className="tone-carousel__left">
          <h2 className="tone-carousel__title">
            UMA TONALIDADE <br /> PARA CADA LADO TEU
          </h2>

          <img
            className="tone-carousel__circles"
            src={current.circlesImageSrc}
            alt=""
          />

          <p className="tone-carousel__subtitle">
            A cor é expressiva, tal como tu <br />
            Define o tom e inspira-te para criar a tua <br />
            tonalidade personalizada
          </p>

          <div className="tone-carousel__pills">
            {PILL_ORDER.map((pill) => {
              const pillIndex = slides.findIndex((s) => s.activePill === pill);
              return (
                <button
                  key={pill}
                  className={`tone-carousel__pill ${
                    current.activePill === pill ? "is-active" : ""
                  }`}
                  onClick={() => pillIndex >= 0 && goTo(pillIndex)}
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
            <img src={current.collageImageSrc} alt="Collage" />
          </div>
        </div>
      </div>
    </section>
  );
}
