import { useMemo, useState, type Dispatch, type KeyboardEvent, type MouseEvent, type SetStateAction } from "react";
import type {
  AdditivesOptions,
  EsenceOptions,
  SmelltOptions,
  TypesOptions,
} from "./Types";
import monthAditive from "../../assets/monthAditive.png";
import InfoPanel from "./components/InfoPanel";
import { createInfoKey, getFallbackInfo, TASTE_INFO, type InfoContent } from "./constants/tasteInfo";
import { resolveEssenceIcon, resolveSmellIcon } from "./constants/tasteAssets";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { additiveOptions, allEsence, smellOptions } from "./data/builderOptions";


function InfoButton({ label, onClick }: { label: string; onClick: (event: MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button type="button" className="abs-img taste-info-button" onClick={onClick} aria-label={label}>
      <span aria-hidden="true" className="taste-info-symbol">
        i
      </span>
    </button>
  );
}

function InfoInlineButton({
  label,
  onClick,
  onKeyDown,
}: {
  label: string;
  onClick: (event: MouseEvent<HTMLSpanElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLSpanElement>) => void;
}) {
  return (
    <span
      className="abs-img taste-info-button"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={label}
    >
      <span aria-hidden="true" className="taste-info-symbol">
        i
      </span>
    </span>
  );
}

type SmellAndAditiveProps = {
  type: TypesOptions;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  smell: SmelltOptions;
  setSmell: Dispatch<SetStateAction<SmelltOptions>>;
  aditive: AdditivesOptions[];
  setAditive: Dispatch<SetStateAction<AdditivesOptions[]>>;
  esence: EsenceOptions;
  setEsence: Dispatch<SetStateAction<EsenceOptions>>;
};

function SmellAndAditive({
  type,
  step,
  setStep,
  smell,
  setSmell,
  aditive,
  setAditive,
  esence,
  setEsence,
}: SmellAndAditiveProps) {
  const [infoKey, setInfoKey] = useState<string | null>(null);

  const openInfo = (key: string) => setInfoKey(key);
  const closeInfo = () => setInfoKey(null);

  const activeInfo: InfoContent | null = useMemo(() => {
    if (!infoKey) return null;

    const mapped = TASTE_INFO[infoKey];
    if (mapped) return mapped;

    if (infoKey.startsWith("smell:")) {
      const id = infoKey.replace("smell:", "") as SmelltOptions;
      const option = smellOptions.find((item) => item.id === id);

      return getFallbackInfo(id, option?.name, (option as { description?: string } | undefined)?.description);
    }

    if (infoKey.startsWith("esence:")) {
      const id = infoKey.replace("esence:", "") as EsenceOptions;
      const option = allEsence.find((item) => item.id === id);

      return getFallbackInfo(id, option?.name, (option as { description?: string } | undefined)?.description);
    }

    if (infoKey.startsWith("additive:")) {
      const id = infoKey.replace("additive:", "") as AdditivesOptions;
      const option = additiveOptions.find((item) => item.id === id);

      return getFallbackInfo(id, option?.name, option?.description);
    }

    return null;
  }, [additiveOptions, allEsence, infoKey, smellOptions]);

  useBodyScrollLock(Boolean(infoKey));

  const nextStep = (nextStepValue: number) => {
    setStep(nextStepValue);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleToggleAdditive = (additiveId: AdditivesOptions) => {
    setAditive((previousAdditives) => (previousAdditives.includes(additiveId) ? [] : [additiveId]));
  };

  const handleSetEsence = (esenceId: EsenceOptions) => {
    const nextEsence = esence === esenceId ? "none" : esenceId;

    setEsence(nextEsence);

    if (type === "oil" && nextEsence !== "none") {
      setSmell("none");
    }
  };

  const handleSetSmell = (smellId: SmelltOptions) => {
    const nextSmell = smell === smellId ? "none" : smellId;

    setSmell(nextSmell);

    if (type === "oil" && nextSmell !== "none") {
      setEsence("none");
    }
  };

  const handleKeyboardSelect = (event: KeyboardEvent, action: () => void) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    action();
  };

  const openInfoFromClick = (event: MouseEvent, key: string) => {
    event.preventDefault();
    event.stopPropagation();
    openInfo(key);
  };

  return (
    <>
      {step === 4 && (
        <div className="create-batom-taste taste-section">
          <span className="title-button">ADICIONA O AROMA E a ESSÊNCIA</span>

          <div className="create-batom-taste__panel taste-container">
            <h3>AROMAS</h3>

            <ul className="create-batom-taste__smell-list taste-options taste-options-smell">
              {smellOptions.map((option) => {
                const isActive = option.id === smell;
                const smellIcon = resolveSmellIcon(option.id, option.img);

                return (
                  <li
                    key={option.id}
                    className={`taste-card taste-card-smell ${isActive ? "taste-card-active" : ""}`}
                    onClick={() => handleSetSmell(option.id)}
                    onKeyDown={(event) => handleKeyboardSelect(event, () => handleSetSmell(option.id))}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`Selecionar aroma ${option.name}`}
                  >
                    <div
                      className="taste-card-icon-shell taste-smell-icon-shell"
                      style={{ backgroundColor: isActive ? "#c41123" : "" }}
                    >
                      {smellIcon && (
                        <img
                          src={smellIcon}
                          alt=""
                          className="taste-icon taste-smell-icon"
                          draggable={false}
                          aria-hidden="true" decoding="async" loading="lazy" />
                      )}

                      <InfoButton
                        label={`Ver informação sobre ${option.name}`}
                        onClick={(event) => openInfoFromClick(event, createInfoKey("smell", option.id))}
                      />
                    </div>

                    <p>{option.name}</p>
                  </li>
                );
              })}
            </ul>

            <h3>ESSÊNCIAS</h3>

            <div className="create-batom-taste__essence-grid esence-container">
              {allEsence.map((option) => {
                const isActive = esence === option.id;
                const essenceIcon = resolveEssenceIcon(option.id, option.img);

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`essence-option-button ${isActive ? "essence-option-button-active" : ""}`}
                    onClick={() => handleSetEsence(option.id)}
                    style={{ backgroundColor: isActive ? "#c41123" : "" }}
                    aria-pressed={isActive}
                  >
                    {essenceIcon && (
                      <img src={essenceIcon} alt="" className="taste-icon taste-essence-icon" draggable={false} decoding="async" loading="lazy" />
                    )}
                    <p>{option.name}</p>

                    <InfoInlineButton
                      label={`Ver informação sobre ${option.name}`}
                      onClick={(event) => openInfoFromClick(event, createInfoKey("esence", option.id))}
                      onKeyDown={(event) => handleKeyboardSelect(event, () => openInfo(createInfoKey("esence", option.id)))}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <span className="span-botom">
            Os aromas e essências são usados para personalizar e intensificar
            <br /> o sabor e a experiência dos produtos labiais personalizados.
          </span>

          <div className="create-batom-taste__actions aditive-button-container">
            <button type="button" className="continue-button" onClick={() => nextStep(5)}>
              continuar
            </button>

            <div>
              <button
                type="button"
                className="create-batom-taste__creative-link creative"
                onClick={(event) => openInfoFromClick(event, createInfoKey("creative", "combos"))}
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

      {step === 5 && (
        <section className="create-batom-additives adtive-section">
          <img src={monthAditive} alt="Lábios vermelhos com mensagem sobre aditivos especiais." className="create-batom-additives__image adtive-hero-image" loading="lazy" decoding="async" />

          <div className="create-batom-additives__content adtive-container">
            <span className="title-button">escolhe o aditivo</span>

            <p>
              Os aditivos de hidratação e suavização
              <br /> alteram a textura do gloss.
            </p>

            <ul>
              {additiveOptions.map((option) => {
                const isActive = aditive.includes(option.id);

                return (
                  <li
                    key={option.id}
                    style={{ backgroundColor: isActive ? "#c41123" : "" }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleToggleAdditive(option.id);
                    }}
                    onKeyDown={(event) => handleKeyboardSelect(event, () => handleToggleAdditive(option.id))}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`Selecionar aditivo ${option.name}`}
                  >
                    <img src={option.img} alt="" decoding="async" loading="lazy" aria-hidden="true" />
                    <p>{option.name}</p>

                    <InfoButton
                      label={`Ver informação sobre ${option.name}`}
                      onClick={(event) => openInfoFromClick(event, createInfoKey("additive", option.id))}
                    />
                  </li>
                );
              })}
            </ul>

            <button type="button" onClick={() => nextStep(6)}>
              Continuar
            </button>
          </div>
        </section>
      )}

      {activeInfo && <InfoPanel info={activeInfo} onClose={closeInfo} />}
    </>
  );
}

export default SmellAndAditive;
