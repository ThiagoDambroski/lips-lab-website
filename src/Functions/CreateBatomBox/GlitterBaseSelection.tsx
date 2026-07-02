import React, { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { BaseOptions } from "./Types";
import { baseBatom, baseGloss, glitterOptions, type GlitterColor } from "./data/builderOptions";
import monthBase from "../../assets/mouthBase.png";
import infoCircle from "../../assets/info circle.svg";
import "../../scss/CreateBatom.css";
import { useFocusTrap } from "../../hooks/useFocusTrap";

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
  const categories = useMemo(() => Array.from(new Set(glitterOptions.map((g) => g.category))), []);
  const [isMobile1100, setIsMobile1100] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 1100 : false
  );
  const [preview, setPreview] = useState<GlitterColor | null>(null);
  const [infoKey, setInfoKey] = useState<string | null>(null);
  const infoTitleId = useId();
  const lightboxTitleId = useId();
  const infoDialogRef = useRef<HTMLElement | null>(null);
  const lightboxDialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile1100(window.innerWidth <= 1100);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  const openLightbox = (g: GlitterColor) => {
    if (glitterSelected === g.id) {
      setGlitterSelected(null);
      return;
    }

    setPreview(g);
  };

  const closeLightbox = () => setPreview(null);

  const confirmSelect = () => {
    if (preview) setGlitterSelected(preview.id);
    setPreview(null);
  };

  const infoKeyForBase = (id: BaseOptions) => `base:${id}`;
  const infoKeyForGlitterCategory = (category: string) => `glitter:${category}`;

  const normalizeBaseId = (id: BaseOptions): BaseOptions => {
    const raw = String(id).trim();
    const cleaned = raw
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (cleaned === "brilho intenso") return "mirror-shine" as BaseOptions;
    if (cleaned === "balsamo") return "balm" as BaseOptions;
    if (cleaned === "polish") return "vinyl" as BaseOptions;
    if (cleaned === "natural") return "vegan" as BaseOptions;

    return id;
  };

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
    [infoKeyForGlitterCategory("Foils")]: {
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
    [infoKeyForBase("CLASSICO")]: {
      title: "CLÁSSICO",
      paragraphs: [
        "Cria um gloss tradicional, mais espesso, com ótimo brilho e efeito hidratante.",
        "Com ceras vegetais naturais (carnaúba e candelila) com manteiga de karité e extrato de aloé vera.",
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

  const openInfo = (key: string) => setInfoKey(key);
  const closeInfo = () => setInfoKey(null);
  const activeInfo: InfoContent | null = infoKey ? infoMap[infoKey] ?? null : null;

  useFocusTrap(infoDialogRef, Boolean(activeInfo), closeInfo);
  useFocusTrap(lightboxDialogRef, Boolean(preview), closeLightbox);

  const nextStep = (stepValue: number) => {
    setStep(stepValue);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleKeyboardSelect = (event: ReactKeyboardEvent, action: () => void) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    action();
  };

  const handleToggleBase = (id: BaseOptions) => {
    setBaseSelected((prev) => (prev === id ? "none" : id));
  };

  const renderBaseOption = (base: (typeof baseBatom | typeof baseGloss)[number], variant: "batom" | "gloss") => {
    const isSelected = baseSelected === base.id;

    return (
      <li
        key={base.id}
        className={`base-option-li ${isSelected ? "is-active" : ""}`}
        onClick={() => handleToggleBase(base.id)}
        onKeyDown={(event) => handleKeyboardSelect(event, () => handleToggleBase(base.id))}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        aria-label={`Selecionar base ${base.name}`}
        style={variant === "gloss" ? { backgroundColor: isSelected ? "#c41123" : "" } : undefined}
      >
        {variant === "gloss" ? (
          <div className="base-option-text">
            <strong>{base.name}</strong>
            <p>{base.description}</p>
          </div>
        ) : (
          <>
            <strong>{base.name}</strong>
            <p>{base.description}</p>
          </>
        )}

        <button
          type="button"
          className={variant === "gloss" ? "glitter-info-btn base-info-btn" : "base-info-btn"}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            openInfo(infoKeyForBase(normalizeBaseId(base.id)));
          }}
          aria-label={`Ver informação sobre ${base.name}`}
        >
          <img src={infoCircle} alt="" decoding="async" loading="lazy" aria-hidden="true" />
        </button>
      </li>
    );
  };

  const renderGlitterOption = (glitter: GlitterColor) => {
    const isSelected = glitterSelected === glitter.id;

    return (
      <li
        key={glitter.id}
        onClick={() => openLightbox(glitter)}
        onKeyDown={(event) => handleKeyboardSelect(event, () => openLightbox(glitter))}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        aria-label={`Selecionar pigmento ${glitter.name}`}
        style={{
          border: isSelected ? "2px solid red" : "",
          cursor: "pointer",
          listStyle: "none",
        }}
      >
        <img src={glitter.img} alt={glitter.name} decoding="async" loading="lazy" />
        <p>{glitter.name}</p>
      </li>
    );
  };

  return (
    <>
      {step === 0 && (
        <section className="texture-selection-section">
          <img src={monthBase} alt="" decoding="async" loading="lazy" aria-hidden="true" />

          <div>
            <span className="title-button">escolhe a BASE</span>

            {type === "batom" && <ul>{baseBatom.map((base) => renderBaseOption(base, "batom"))}</ul>}

            {type === "gloss" && <ul>{baseGloss.map((base) => renderBaseOption(base, "gloss"))}</ul>}

            <button type="button" className="texture-selection-section-button" onClick={() => nextStep(1)}>
              CONTINUAR!
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="glitter-section">
          <div className="glitter-intro">
            <h2>
              {isMobile1100 ? (
                <>Um toque de brilho faz toda a diferença. Pode optar por adicioná-lo ao seu {type}.</>
              ) : (
                <>
                  Um toque de brilho faz
                  <br /> toda a diferença.
                  <br />
                  <br />
                  pode optar por
                  <br /> adicioná-lo ao seu
                  <br /> {type}.
                </>
              )}
            </h2>

            <button type="button" onClick={() => nextStep(4)}>
              Continuar
            </button>
          </div>

          <div className="gliter-container">
            {categories.map((category) => {
              if (category === "Dusts") return null;

              if (category === "Foils") {
                const mergedCategory = "Foils";

                return (
                  <div key={mergedCategory} className="glliter-selection-div">
                    <h2 className="glitter-title">
                      {mergedCategory}
                      <button
                        type="button"
                        className="glitter-info-btn"
                        onClick={() => openInfo(infoKeyForGlitterCategory(mergedCategory))}
                        aria-label={`Ver informação sobre ${mergedCategory}`}
                      >
                        <img src={infoCircle} alt="" decoding="async" loading="lazy" aria-hidden="true" />
                      </button>
                    </h2>

                    <h3 className="glitter-subtitle">Foils</h3>
                    <ul>{glitterOptions.filter((g) => g.category === "Foils").map(renderGlitterOption)}</ul>
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
                      aria-label={`Ver informação sobre ${category}`}
                    >
                      <img src={infoCircle} alt="" decoding="async" loading="lazy" aria-hidden="true" />
                    </button>
                  </h2>

                  <ul>{glitterOptions.filter((g) => g.category === category).map(renderGlitterOption)}</ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {activeInfo && (
        <div
          className="glitter-info-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeInfo();
          }}
        >
          <aside
            ref={infoDialogRef}
            tabIndex={-1}
            className="glitter-info-card"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={infoTitleId}
          >
            <button type="button" className="glitter-info-close" onClick={closeInfo} aria-label="Fechar informação">
              ×
            </button>

            <h3 id={infoTitleId} className="glitter-info-title">
              {activeInfo.title}
            </h3>

            <div className="glitter-info-body">
              {activeInfo.paragraphs.map((text, index) => (
                <p key={`${activeInfo.title}-p-${index}`}>{text}</p>
              ))}

              {activeInfo.noteTitle && <h4 className="glitter-info-note-title">{activeInfo.noteTitle}</h4>}

              {activeInfo.noteLines?.map((text, index) => (
                <p key={`${activeInfo.title}-n-${index}`} className="glitter-info-note-line">
                  {text}
                </p>
              ))}
            </div>
          </aside>
        </div>
      )}

      {preview && (
        <div
          className="glitter-lightbox-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div
            ref={lightboxDialogRef}
            tabIndex={-1}
            className="glitter-lightbox"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={lightboxTitleId}
          >
            <div className="glitter-lightbox-circle">
              <img src={preview.img} alt={preview.name} className="glitter-lightbox-img" decoding="async" loading="lazy" />
            </div>

            <h3 id={lightboxTitleId} className="glitter-lightbox-name">
              {preview.name}
            </h3>

            <div className="glitter-lightbox-btns">
              <button type="button" className="glitter-lightbox-btn cancel" onClick={closeLightbox}>
                Cancelar
              </button>

              <button type="button" className="glitter-lightbox-btn confirm" onClick={confirmSelect}>
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
