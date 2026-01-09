import React, { useEffect, useMemo, useState } from "react";
import type { AdditivesOptions, EsenceOptions, SmelltOptions } from "./Types";
import { useApp } from "../../Contexts/AppProvider";
import monthAditive from "../../assets/monthAditive.png";
import infoCircle from "../../assets/info circle.svg";

type SmellAndAditivePros = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  smell: SmelltOptions;
  setSmell: React.Dispatch<React.SetStateAction<SmelltOptions>>;
  aditive: AdditivesOptions;
  setAditive: React.Dispatch<React.SetStateAction<AdditivesOptions>>;
  esence: EsenceOptions;
  setEsence: React.Dispatch<React.SetStateAction<EsenceOptions>>;
};

type InfoContent = {
  title: string;
  paragraphs: string[];
  noteTitle?: string;
  noteLines?: string[];
};

function SmellAndAditive({
  step,
  setStep,
  smell,
  setSmell,
  aditive,
  setAditive,
  esence,
  setEsence,
}: SmellAndAditivePros) {
  const { smellOptions, additiveOptions, allEsence } = useApp();

  const handleStepAdtive = (adtiveId: AdditivesOptions) => {
    aditive === adtiveId ? setAditive("none") : setAditive(adtiveId);
  };

  // ===========================
  // INFO POPUP KEYS
  // ===========================
  const infoKeyForAdditive = (id: AdditivesOptions) => `additive:${id}`;
  const infoKeyForSmell = (id: SmelltOptions) => `smell:${id}`;
  const infoKeyForEsence = (id: EsenceOptions) => `esence:${id}`;
  const infoKeyForCreative = () => `creative:combos`;

  // ===========================
  // INFO POPUP CONTENT
  // ===========================
  
const infoMap: Record<string, InfoContent> = useMemo(
  () => ({
    // =========================
    // ADDITIVES (already correct)
    // =========================
    [infoKeyForAdditive("HIDRATANTE")]: {
      title: "HIDRATANTE",
      paragraphs: [
        "Mistura de óleos naturais de abacate, grainha de uva e jojoba, enriquecida com óleos botânicos ricos em antioxidantes.",
        "Ajuda a hidratar, nutrir e proteger os lábios, proporcionando conforto e suavidade.",
        "Este componente é essencial em batons com acabamento perolado ou cintilante, garantindo uma aplicação mais uniforme e confortável.",
      ],
    },

    [infoKeyForAdditive("SUAVIZAÇÃO")]: {
      title: "SUAVIZAÇÃO",
      paragraphs: [
        "Aditivo de origem vegetal que confere uma textura sedosa, cremosa e luxuosa ao batom.",
        "Formulado com óleos botânicos naturais, melhora o conforto na aplicação e deixa os lábios visivelmente mais suaves e macios.",
      ],
    },

    [infoKeyForAdditive("PROTEÇÃO SOLAR")]: {
      title: "PROTEÇÃO SOLAR",
      paragraphs: [
        "Formulado com Octylmethoxycinnamate, um filtro solar cosmético que ajuda a reforçar a proteção solar do batom.",
        "Todas as bases de batom e gloss incluem proteção solar de base (FPS 8).",
      ],
    },

    [infoKeyForAdditive("DENSIFICADOR")]: {
      title: "DENSIFICADOR",
      paragraphs: [
        "Aditivo que acrescenta corpo, hidratação e brilho à base do batom personalizado, criando um acabamento mais luxuoso e uniforme.",
        "Pode ser utilizado em fórmulas cremosas, mate ou brilhantes, sem provocar separação da fórmula, garantindo estabilidade e conforto.",
      ],
    },

    [infoKeyForAdditive("VOLUME LABIAL")]: {
      title: "VOLUME LABIAL",
      paragraphs: [
        "Aditivo volumizador com o tripeptídeo patenteado Maxi-Lip™, desenvolvido para:",
        "• Ajudar a aumentar o volume visível",
        "• Hidratar intensamente",
        "• Suavizar linhas finas",
        "• Melhorar o contorno dos lábios",
        "• Funciona estimulando a produção de colagénio nos tecidos conjuntivos",
        "",
        "Resultados de estudos clínicos (aplicado 3x por dia durante 29 dias):",
        "• Aumento de 40% no volume dos lábios",
        "• Melhoria de 60% na hidratação labial",
        "• Aumento de 70% na suavidade dos lábios",
        "• Melhoria de 100% na condição labial",
        "• Redução de 29% nas linhas e rugas superficiais",
      ],
    },

    [infoKeyForAdditive("ANTI-IDADE & REGENERADOR")]: {
      title: "ANTI-IDADE & REGENERADOR",
      paragraphs: [
        "Aditivo antioxidante que ajuda a reforçar a barreira natural da pele, promovendo hidratação e regeneração labial.",
        "Rico em polissacarídeos e minerais naturais como zinco, cálcio, magnésio, ferro e cobre, contribui para reduzir a aparência de linhas finas.",
        "Fórmula anti-envelhecimento, sem parabenos, ideal para cuidado e conforto diário dos lábios.",
      ],
    },

    // =========================
    // AROMAS (SmelltOptions)
    // =========================
    [infoKeyForSmell("Canela")]: {
      title: "CANELA",
      paragraphs: ["Sabor adocicado e intenso, derivado de paus de canela."],
    },

    [infoKeyForSmell("Cereja jubilee")]: {
      title: "CEREJA JUBILEE",
      paragraphs: ["Sabor a cereja madura."],
    },

    [infoKeyForSmell("Trufa de framboesa")]: {
      title: "TRUFA DE FRAMBOESA",
      paragraphs: [
        "Sabor a bolo de mousse de chocolate com cobertura de framboesa.",
      ],
    },

    [infoKeyForSmell("Crème brûlée")]: {
      title: "CRÈME BRÛLÉE",
      paragraphs: [
        "Sabor a creme caramelizado, doce e com um delicado toque tostado.",
      ],
    },

    [infoKeyForSmell("Cenoura")]: {
      title: "CENOURA",
      paragraphs: [
        "Sabor quente e levemente picante, inspirado num bolo de cenoura acabado de fazer.",
      ],
    },

    [infoKeyForSmell("Menta")]: {
      title: "MENTA",
      paragraphs: [
        "Sabor fresco e revigorante de hortelã, semelhante a um mojito ou a uma tarte tropical de lima.",
      ],
    },

    [infoKeyForSmell("Lima com Coco")]: {
      title: "LIMA E COCO",
      paragraphs: [
        "Sabor a lima espremida com coco, inspirado numa sobremesa tropical.",
      ],
    },

    [infoKeyForSmell("avela")]: {
      title: "AVELÃ",
      paragraphs: [
        "Sabor a avelã torrada, ligeiramente adocicada.",
      ],
    },

    [infoKeyForSmell("Pêssego")]: {
      title: "PÊSSEGO",
      paragraphs: [
        "Sabor a pêssego maduro, com notas refrescantes.",
      ],
    },

    [infoKeyForSmell("mimosa")]: {
      title: "MIMOSA",
      paragraphs: [
        "Sabor cítrico e delicado, combinação de laranja e tangerina.",
      ],
    },

    // =========================
    // ESSÊNCIAS (EsenceOptions)
    // =========================
    [infoKeyForEsence("Especiarias Exóticas")]: {
      title: "ESPECIARIAS EXÓTICAS",
      paragraphs: [
        "Mistura quente e envolvente de lavanda, patchouli, coentros, ylang-ylang, rosa e outros botânicos.",
      ],
    },

    [infoKeyForEsence("Baunilha")]: {
      title: "BAUNILHA",
      paragraphs: [
        "Fragrância predominantemente de baunilha, indicada para clientes sensíveis a cheiros fortes.",
      ],
    },

    [infoKeyForEsence("Cappuccino")]: {
      title: "CAPPUCCINO",
      paragraphs: [
        "Aroma rico a café, criado a partir de grãos naturais de café.",
      ],
    },

    [infoKeyForEsence("Cítricos")]: {
      title: "CÍTRICOS",
      paragraphs: [
        "Mistura cítrica de laranja e flor de mimosa, ideal para clientes sensíveis a fragrâncias intensas.",
      ],
    },

    [infoKeyForEsence("Chocolate")]: {
      title: "CHOCOLATE",
      paragraphs: [
        "Aroma a chocolate de leite, delicioso e fácil de combinar com outros aromas.",
      ],
    },

    [infoKeyForEsence("Rosa Parisiense")]: {
      title: "ROSA PARISIENSE",
      paragraphs: [
        "Fragrância suave de rosa parisiense, com uma nota de base exclusiva e subtil.",
      ],
    },

    // =========================
    // CREATIVE COMBOS (already correct)
    // =========================
    ["creative:combos"]: {
      title: "EXEMPLOS DE COMBINAÇÕES CRIATIVAS",
      paragraphs: [
        "• Chocolate + Menta → Girl Scout Thin Mint",
        "• Baunilha + Avelã + Cappuccino → Vanilla Nut Latte",
        "• Cereja (Cherries Jubilee) + Chocolate → Chocolate Covered Cherry",
        "• Avelã + Baunilha + Chocolate → Baby Ruth Bar",
        "• Sorvete de Pêssego + Baunilha → Sherbet",
        "• Canela → contribui para um efeito de volume visível nos lábios",
      ],
    },
  }),
  []
);


  // ===========================
  // POPUP STATE + HELPERS
  // ===========================
  const [infoKey, setInfoKey] = useState<string | null>(null);

  const openInfo = (key: string) => setInfoKey(key);
  const closeInfo = () => setInfoKey(null);

  // Fallback: if smell/esence isn’t in infoMap yet, use its description automatically
  const activeInfo: InfoContent | null = useMemo(() => {
    if (!infoKey) return null;

    const mapped = infoMap[infoKey];
    if (mapped) return mapped;

    // smell fallback
    if (infoKey.startsWith("smell:")) {
      const id = infoKey.replace("smell:", "") as SmelltOptions;
      const s = smellOptions.find((x) => x.id === id);
      if (!s) return null;

      return {
        title: String(s.name ?? id).toUpperCase(),
        paragraphs: [String((s as any).description ?? "")].filter(Boolean),
      };
    }

    // esence fallback
    if (infoKey.startsWith("esence:")) {
      const id = infoKey.replace("esence:", "") as EsenceOptions;
      const e = allEsence.find((x) => x.id === id);
      if (!e) return null;

      return {
        title: String(e.name ?? id).toUpperCase(),
        paragraphs: [String((e as any).description ?? "")].filter(Boolean),
      };
    }

    return null;
  }, [infoKey, infoMap, smellOptions, allEsence]);

  // Close with ESC
  useEffect(() => {
    if (!infoKey) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInfo();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [infoKey]);

  // Lock scroll while modal is open
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

  const nextStep = (to: number) => {
    setStep(to);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleSetEsence = (esenceId:EsenceOptions) => {
    esence == esenceId ? setEsence('none') : setEsence(esenceId)
  }

  const handleSetSmell = (smellId:SmelltOptions) => {
    smell == smellId ? setSmell("none") : setSmell(smellId)
  }

  return (
    <>
      {/* ================= STEP 4 (ADITIVE) ================= */}
      {step === 5 && (
        <section className="adtive-section">
          <img src={monthAditive} alt="" />

          <div className="adtive-container">
            <span className="title-button">escolhe o aditivo</span>
            <p>
              Os aditivos de hidratação e suavização
              <br /> alteram a textura do gloss.
            </p>

            <ul>
              {additiveOptions.map((a) => (
                <li
                  key={a.id}
                  style={{ backgroundColor: a.id === aditive ? "#c41123" : "" }}
                  onClick={() => handleStepAdtive(a.id)}
                >
                  <img src={a.img} alt="" />
                  <p>{a.name}</p>

                  {/* infoCircle for additive */}
                  <img
                    src={infoCircle}
                    alt=""
                    className="abs-img"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openInfo(infoKeyForAdditive(a.id));
                    }}
                  />
                </li>
              ))}
            </ul>

            <button onClick={() => nextStep(6)}>Continuar</button>
          </div>
        </section>
      )}

      {/* ================= STEP 5 (TASTE) ================= */}
      {step === 4 && (
        <div className="taste-section">
          <span className="title-button">ADICIONA O AROMA E a ESSÊNCIA</span>

          <div className="taste-container">
            <h3>AROMAS</h3>
            <ul>
              {smellOptions.map((s) => (
                <li key={s.id} onClick={() => handleSetSmell(s.id)}>
                  <div style={{ backgroundColor: s.id === smell ? "#c41123" : "" }}>
                    <img src={s.img} alt="" />

                    {/* ✅ make the already-added infoCircle WORK */}
                    <img
                      src={infoCircle}
                      alt=""
                      className="abs-img"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // ✅ do not select
                        openInfo(infoKeyForSmell(s.id));
                      }}
                    />
                  </div>

                  <p>{s.name}</p>
                </li>
              ))}
            </ul>

            <h3>ESSÊNCIAS</h3>
            <div className="esence-container">
              {allEsence.map((e) => (
                <button
                  key={e.id}
                  onClick={() => handleSetEsence(e.id)}
                  style={{ backgroundColor: esence === e.id ? "#c41123" : "" }}
                >
                  <img src={e.img} alt={e.name} />
                  <p>{e.name}</p>

                  {/* ✅ make the already-added infoCircle WORK */}
                  <img
                    src={infoCircle}
                    alt=""
                    className="abs-img"
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation(); // ✅ do not select
                      openInfo(infoKeyForEsence(e.id));
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <span className="span-botom">
            Os aromas e essências são usados para personalizar e intensificar
            <br /> o sabor e a experiência dos produtos labiais personalizados.
          </span>

          <div className="aditive-button-container">
            <button
              className="continue-button"
              onClick={() => nextStep(5)}
              
            >
              continuar
            </button>

            <div>
              {/* ✅ open the last-image popup here */}
              <button
                className="creative"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openInfo(infoKeyForCreative());
                }}
              >
                Exemplos de combinações criativas
              </button>

              <p>
                Os aromas e essências podem ser combinados entre si
                <br /> para criar sabores únicos e personalizados.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= INFO POPUP (REUSED CLASSES) ================= */}
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
                <p
                  key={`${activeInfo.title}-n-${idx}`}
                  className="glitter-info-note-line"
                >
                  {t}
                </p>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default SmellAndAditive;
