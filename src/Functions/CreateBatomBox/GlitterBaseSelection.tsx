import React, { useMemo, useState, useEffect } from "react";
import type { BaseOptions } from "./Types";
import { useApp, type GlitterColor } from "../../Contexts/AppProvider";
import monthBase from "../../assets/mouthBase.png";
import infoCircle from "../../assets/info circle.svg";
import "../../scss/CreateBatom.css";

type GlitterBaseType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  glitterSelected: number | null;
  setGlitterSelected: React.Dispatch<React.SetStateAction<number | null>>;
  type: string;
  baseSelected: BaseOptions;
  setBaseSelected: React.Dispatch<React.SetStateAction<BaseOptions>>;
};

type InfoContent = {
  title: string;
  paragraphs: string[];
  noteTitle?: string;
  noteLines?: string[];
};

function GlitterBaseSelection({
  step,
  setStep,
  glitterSelected,
  setGlitterSelected,
  type,
  baseSelected,
  setBaseSelected,
}: GlitterBaseType) {
  const { glitterOptions, baseBatom, baseGloss } = useApp();

  const categories = useMemo(
    () => Array.from(new Set(glitterOptions.map((g) => g.category))),
    [glitterOptions]
  );

  // --------------------------
  // RESPONSIVE (<= 1100px)
  // --------------------------
  const [isMobile1100, setIsMobile1100] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 1100 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile1100(window.innerWidth <= 1100);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // --------------------------
  // GLITTER PREVIEW LIGHTBOX
  // --------------------------
  const [preview, setPreview] = useState<GlitterColor | null>(null);

  useEffect(() => {
    if (!preview) return;

    const body = document.body;
    const html = document.documentElement;

    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [preview]);

  const openLightbox = (g: GlitterColor) => {
    if (glitterSelected === g.id) {
      setGlitterSelected(null);
    } else {
      setPreview(g);
    }
  };

  const closeLightbox = () => setPreview(null);

  const confirmSelect = () => {
    if (preview) setGlitterSelected(preview.id);
    setPreview(null);
  };

  // --------------------------
  // INFO POPUP (SAME UI FOR GLITTER + BASE)
  // --------------------------
  const infoKeyForBase = (id: BaseOptions) => `base:${id}`;
  const infoKeyForGlitterCategory = (category: string) => `glitter:${category}`;

  const infoMap: Record<string, InfoContent> = {
    [infoKeyForGlitterCategory("Frosts")]: {
      title: "FROSTS",
      paragraphs: [
        "Os Frosts são utilizados para adicionar brilho (shimmer) aos batons e glosses, criando um acabamento perolado ou metálico.",
        "Podem introduzir subtons subtis ou mais intensos, dependendo da quantidade aplicada, permitindo ajustar o resultado final de forma delicada ou marcante.",
        "Não contêm corantes tradicionais: os frost incluem mica, que reflete a luz e pode alterar ligeiramente a cor final do batom ou gloss, tornando-a mais luminosa e vibrante.",
      ],
      noteTitle: "NOTA:",
      noteLines: [
        "Os frost Pink e Opal apresentam subtons subtis.",
        "Estes efeitos conferem à cor uma opalescência suave e criam um ligeiro aumento de tom.",
        "Para clarear sem alterar o tom da cor, utilize o Crystal Frost.",
      ],
    },

    [infoKeyForGlitterCategory("Multidimensional Frosts")]: {
      title: "MULTIDIMENSIONAL FROSTS",
      paragraphs: [
        "Os Multidimensional Frosts são altamente concentrados e combinam brilho com mudança de cor, criando um efeito iridescente ou holográfico.",
        "A tonalidade varia consoante a luz e o ângulo de visão, resultando num acabamento dinâmico, moderno e cheio de dimensão.",
        "Ideais para quem procura um visual mais criativo e fora do convencional, estes frosts acrescentam profundidade e reflexos únicos aos produtos.",
      ],
    },

    [infoKeyForGlitterCategory("Foils & Dusts")]: {
      title: "FOILS & DUSTS",
      paragraphs: [
        "Os Foils & Dusts são acabamentos focados exclusivamente no brilho intenso, com um efeito metálico espelhado.",
        "Não alteram a cor base do batom ou gloss, apenas adicionam partículas luminosas que refletem a luz, criando um resultado impactante e glamoroso.",
        "Perfeitos para destacar os lábios com um brilho marcante e sofisticado, ideais para looks mais ousados ou de destaque.",
      ],
    },

    [infoKeyForBase("classic")]: {
      title: "CLÁSSICO",
      paragraphs: [
        "Formulação à base de ceras vegetais naturais (carnaúba e candelila), enriquecida com manteiga de karité e extrato de aloé vera.",
        "Cria um gloss tradicional, de textura mais espessa, com excelente brilho e efeito hidratante.",
        "Pode ser translúcido ou pigmentado, adaptando-se a diferentes preferências.",
      ],
    },

    [infoKeyForBase("mirror-shine")]: {
      title: "BRILHO INTENSO",
      paragraphs: [
        "Mistura rica em óleos de noz (macadâmia), que cria um gloss translúcido com acabamento tipo “verniz”, proporcionando brilho extremo.",
        "Ideal para quem procura um efeito luminoso marcante e sofisticado.",
      ],
    },

    [infoKeyForBase("balm")]: {
      title: "BÁLSAMO",
      paragraphs: [
        "Formulação com ceras vegetais naturais, incluindo ozocerite (uma cera mais macia), enriquecida com chá verde e vitamina E.",
        "Cria um gloss com textura de bálsamo, enquanto ajuda a reparar, nutrir e proteger os lábios.",
      ],
    },

    [infoKeyForBase("vinyl")]: {
      title: "POLISH",
      paragraphs: [
        "Mistura suave de cera microcristalina, óleo de jojoba, vitamina E e extrato de figo-da-índia.",
        "Condiciona e ajuda a restaurar a pele dos lábios, criando um brilho intenso sem sensação pegajosa.",
        "Altamente resistente à água.",
      ],
    },

    [infoKeyForBase("vegan")]: {
      title: "NATURAL",
      paragraphs: [
        "Formulação com ceras vegetais naturais e manteiga de karité (carnaúba e candelila), enriquecida com extrato de lírio-branco e óleo de onagra.",
        "Ajuda a proteger, hidratar, nutrir e regenerar os lábios, para um cuidado diário natural.",
      ],
    },

    [infoKeyForBase("matte")]: {
      title: "MATTE",
      paragraphs: [
        "Formulação à base de ceras vegetais naturais (carnaúba, candelila e parafina).",
        "Proporciona um batom mate de longa duração, com acabamento uniforme e confortável.",
        "A parafina ajuda a reter a hidratação, evitando a sensação de secura excessiva.",
      ],
    },

    [infoKeyForBase("matte liquido")]: {
      title: "MATTE LÍQUIDO",
      paragraphs: [
        "Batom líquido mate de longa duração, com textura leve, cremosa e confortável.",
        "A fórmula desliza suavemente, seca gradualmente e garante uma aplicação precisa, com hidratação extra que ajuda a evitar gretas.",
        "Não é totalmente à prova de beijos — mas é irresistivelmente sedutor.",
      ],
    },

    [infoKeyForBase("cremoso")]: {
      title: "CREMOSO",
      paragraphs: [
        "Formulação com ceras vegetais naturais (carnaúba e candelila).",
        "Cria um batom cremoso e hidratante, com acabamento confortável, podendo variar entre translúcido e cobertura total, consoante a pigmentação escolhida.",
      ],
    },

    [infoKeyForBase("amanteigado")]: {
      title: "AMANTEIGADO",
      paragraphs: [
        "Ceras vegetais naturais (carnaúba e candelila) enriquecidas com óleo de jojoba.",
        "Cria um batom de textura suave e brilhante, proporcionando conforto imediato.",
        "O óleo de jojoba contribui para a hidratação, luminosidade e maciez dos lábios.",
      ],
    },

    [infoKeyForBase("natural")]: {
      title: "NATURAL",
      paragraphs: [
        "Formulação com ceras vegetais naturais (carnaúba e candelila), manteiga de karité e óleos orgânicos.",
        "Cria um batom cremoso e hidratante, com cobertura leve ou total, ideal para quem procura conforto e cuidado diário.",
      ],
    },
  };

  const [infoKey, setInfoKey] = useState<string | null>(null);

  const openInfo = (key: string) => {
    setInfoKey(key);
  };
  const closeInfo = () => setInfoKey(null);

  const activeInfo: InfoContent | null = infoKey ? infoMap[infoKey] ?? null : null;

  useEffect(() => {
    if (!infoKey) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInfo();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [infoKey]);

  useEffect(() => {
    if (!infoKey) return;

    const body = document.body;
    const html = document.documentElement;

    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [infoKey]);

  const nextStep = (step: number) => {
    setStep(step);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ================= STEP 0 (BASE) ================= */}
      {step === 0 && (
        <section className="texture-selection-section">
          <img src={monthBase} alt="" />

          <div>
            <span className="title-button">escolhe a BASE</span>

            {type === "batom" && (
              <ul>
                {baseBatom.map((b) => (
                  <li
                    key={b.id}
                    className={`base-option-li ${baseSelected === b.id ? "is-active" : ""}`}
                    onClick={() => {
                      setBaseSelected((prev) => (prev === b.id ? "none" : b.id));
                    }}
                  >
                    <strong>{b.name}</strong>
                    <p>{b.description}</p>

                    <button
                      type="button"
                      className="base-info-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openInfo(infoKeyForBase(b.id));
                      }}
                      aria-label={`Info about ${b.name}`}
                    >
                      <img src={infoCircle} alt="" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {type === "gloss" && (
              <ul>
                {baseGloss.map((b) => (
                  <li
                    key={b.id}
                    onClick={() => {
                      setBaseSelected((prev) => (prev === b.id ? "none" : b.id));
                    }}
                    style={{
                      backgroundColor: baseSelected === b.id ? "#c41123" : "",
                    }}
                    className="base-option-li"
                  >
                    <div className="base-option-text">
                      <strong>{b.name}</strong>
                      <p>{b.description}</p>
                    </div>

                    <button
                      type="button"
                      className="glitter-info-btn base-info-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openInfo(infoKeyForBase(b.id));
                      }}
                      aria-label={`Info about ${b.name}`}
                    >
                      <img src={infoCircle} alt="" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button className="texture-selection-section-button" onClick={() => nextStep(1)}>
              CONTINUAR!
            </button>
          </div>
        </section>
      )}

      {/* ================= STEP 3 (GLITTER) ================= */}
      {step === 3 && (
        <section className="glitter-section">
          <div className="glitter-intro">
            <h2>
              {isMobile1100 ? (
                <>
                  Um toque de brilho faz toda a diferença. Pode optar por adicioná-lo ao seu gloss.
                </>
              ) : (
                <>
                  Um toque de brilho faz
                  <br /> toda a diferença.
                  <br />
                  <br />
                  pode optar por
                  <br /> adicioná-lo ao seu
                  <br /> gloss.
                </>
              )}
            </h2>

            <button onClick={() => nextStep(4)}>Continuar</button>
          </div>

          <div className="gliter-container">
            {categories.map((category) => {
              if (category === "Dusts") return null;

              if (category === "Foils") {
                const mergedCategory = "Foils & Dusts";

                return (
                  <div key={mergedCategory} className="glliter-selection-div">
                    <h2 className="glitter-title">
                      {mergedCategory}
                      <button
                        type="button"
                        className="glitter-info-btn"
                        onClick={() => openInfo(infoKeyForGlitterCategory(mergedCategory))}
                        aria-label={`Info about ${mergedCategory}`}
                      >
                        <img src={infoCircle} alt="" />
                      </button>
                    </h2>

                    <h3 className="glitter-subtitle">Foils</h3>
                    <ul>
                      {glitterOptions
                        .filter((g) => g.category === "Foils")
                        .map((g) => (
                          <li
                            key={g.id}
                            onClick={() => openLightbox(g)}
                            style={{
                              border: glitterSelected === g.id ? "2px solid red" : "",
                              cursor: "pointer",
                              listStyle: "none",
                            }}
                          >
                            <img src={g.img} alt={g.name} />
                            <p>{g.name}</p>
                          </li>
                        ))}
                    </ul>

                    <h3 className="glitter-subtitle">Dusts</h3>
                    <ul>
                      {glitterOptions
                        .filter((g) => g.category === "Dusts")
                        .map((g) => (
                          <li
                            key={g.id}
                            onClick={() => openLightbox(g)}
                            style={{
                              border: glitterSelected === g.id ? "2px solid red" : "",
                              cursor: "pointer",
                              listStyle: "none",
                            }}
                          >
                            <img src={g.img} alt={g.name} />
                            <p>{g.name}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }

              return (
                <div key={category} className="glliter-selection-div">
                  <h2 className="glitter-title">
                    {category}
                    <button
                      type="button"
                      className="glitter-info-btn"
                      onClick={() => openInfo(infoKeyForGlitterCategory(category))}
                      aria-label={`Info about ${category}`}
                    >
                      <img src={infoCircle} alt="" />
                    </button>
                  </h2>

                  <ul>
                    {glitterOptions
                      .filter((g) => g.category === category)
                      .map((g) => (
                        <li
                          key={g.id}
                          onClick={() => openLightbox(g)}
                          style={{
                            border: glitterSelected === g.id ? "2px solid red" : "",
                            cursor: "pointer",
                            listStyle: "none",
                          }}
                        >
                          <img src={g.img} alt={g.name} />
                          <p>{g.name}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= LEFT INFO POPUP (SAME CLASSES) ================= */}
      {activeInfo && (
        <div className="glitter-info-overlay" onClick={closeInfo}>
          <aside
            className="glitter-info-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeInfo.title} info`}
          >
            <button
              type="button"
              className="glitter-info-close"
              onClick={closeInfo}
              aria-label="Close info"
            >
              ×
            </button>

            <h3 className="glitter-info-title">{activeInfo.title}</h3>

            <div className="glitter-info-body">
              {activeInfo.paragraphs.map((t, idx) => (
                <p key={`${activeInfo.title}-p-${idx}`}>{t}</p>
              ))}

              {activeInfo.noteTitle && (
                <h4 className="glitter-info-note-title">{activeInfo.noteTitle}</h4>
              )}

              {activeInfo.noteLines?.map((t, idx) => (
                <p key={`${activeInfo.title}-n-${idx}`} className="glitter-info-note-line">
                  {t}
                </p>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* ================= GLITTER PREVIEW LIGHTBOX ================= */}
      {preview && (
        <div className="glitter-lightbox-overlay" onClick={closeLightbox}>
          <div className="glitter-lightbox" onClick={(e) => e.stopPropagation()}>
            <div className="glitter-lightbox-circle">
              <img src={preview.img} alt={preview.name} className="glitter-lightbox-img" />
            </div>

            <h3 className="glitter-lightbox-name">{preview.name}</h3>

            <div className="glitter-lightbox-btns">
              <button className="glitter-lightbox-btn cancel" onClick={closeLightbox}>
                Cancelar
              </button>

              <button className="glitter-lightbox-btn confirm" onClick={confirmSelect}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GlitterBaseSelection;
