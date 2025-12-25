import React, { useState } from "react";
import type { BaseOptions } from "./Types";
import { useApp, type GlitterColor } from "../../Contexts/AppProvider";

type GlitterBaseType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  glitterSelected: number | null;
  setGlitterSelected: React.Dispatch<React.SetStateAction<number | null>>;
  type: string;
  baseSelected: BaseOptions;
  setBaseSelected: React.Dispatch<React.SetStateAction<BaseOptions>>;
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

  const categories = Array.from(
    new Set(glitterOptions.map((g) => g.category))
  );

  // --------------------------
  // LIGHTBOX STATE
  // --------------------------
  const [preview, setPreview] = useState<GlitterColor | null>(null);

  const openLightbox = (g: GlitterColor) => setPreview(g);
  const closeLightbox = () => setPreview(null);

  const confirmSelect = () => {
    if (preview) setGlitterSelected(preview.id);
    setPreview(null);
  };

  return (
    <div>
      {step === 3 && (
        <div className="texture-selection-section">
          <p className="texture-selection-p">
            Diferentes texturas de glosses labiais requerem diferentes tipos de
            base. Existem seis opções principais entre as quais podes escolher:
          </p>

          {type === "batom" && (
            <ul>
              {baseBatom.map((b) => (
                <li
                  key={b.id}
                  onClick={
                    baseSelected === b.id
                      ? () => setBaseSelected("none")
                      : () => setBaseSelected(b.id)
                  }
                  style={{
                    backgroundColor: baseSelected === b.id ? "green" : "",
                  }}
                >
                  <strong>{b.name}</strong>
                  <p>{b.description}</p>
                </li>
              ))}
            </ul>
          )}

          {type === "gloss" && (
            <ul>
              {baseGloss.map((b) => (
                <li
                  key={b.id}
                  onClick={
                    baseSelected === b.id
                      ? () => setBaseSelected("none")
                      : () => setBaseSelected(b.id)
                  }
                  style={{
                    backgroundColor: baseSelected === b.id ? "green" : "",
                  }}
                >
                  <strong>{b.name}</strong>
                  <p>{b.description}</p>
                </li>
              ))}
            </ul>
          )}

          <button
            className="texture-selection-section-button"
            onClick={() => setStep(4)}
          >
            CONTINUAR!
          </button>
        </div>
      )}

      {step === 2 && (
        <section className="glitter-section">
          <div className="glitter-intro">
            <h2>
              Um toque de brilho faz
              <br /> toda a diferença.
              <br />
              <br />
              pode optar por
              <br /> adicioná-lo ao seu
              <br /> gloss.
            </h2>
            <button onClick={() => setStep(3)}>Continuar</button>
          </div>

          <div className="gliter-container">
            {categories.map((category) => {
              // Group FOILS + DUSTS into one section
              if (category === "Dusts") return null;

              if (category === "Foils") {
                return (
                  <div key="Foils & Dusts" className="glliter-selection-div">
                    <h2>Foils & Dusts</h2>

                    <h3 className="glitter-subtitle">Foils</h3>
                    <ul>
                      {glitterOptions
                        .filter((g) => g.category === "Foils")
                        .map((g) => (
                          <li
                            key={g.id}
                            onClick={() => openLightbox(g)}
                            style={{
                              backgroundColor:
                                glitterSelected === g.id ? "green" : "",
                              cursor: "pointer",
                              listStyle: "none",
                            }}
                          >
                            <img src={g.img} />
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
                              backgroundColor:
                                glitterSelected === g.id ? "green" : "",
                              cursor: "pointer",
                              listStyle: "none",
                            }}
                          >
                            <img src={g.img} />
                            <p>{g.name}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }

              // Default category rendering (unchanged)
              return (
                <div key={category} className="glliter-selection-div">
                  <h2>{category}</h2>

                  <ul>
                    {glitterOptions
                      .filter((g) => g.category === category)
                      .map((g) => (
                        <li
                          key={g.id}
                          onClick={() => openLightbox(g)}
                          style={{
                            backgroundColor:
                              glitterSelected === g.id ? "green" : "",
                            cursor: "pointer",
                            listStyle: "none",
                          }}
                        >
                          <img src={g.img} />
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

      {preview && (
        <div className="glitter-lightbox-overlay" onClick={closeLightbox}>
          <div
            className="glitter-lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glitter-lightbox-circle">
              <img
                src={preview.img}
                alt={preview.name}
                className="glitter-lightbox-img"
              />
            </div>

            <h3 className="glitter-lightbox-name">{preview.name}</h3>

            <div className="glitter-lightbox-btns">
              <button
                className="glitter-lightbox-btn cancel"
                onClick={closeLightbox}
              >
                Cancelar
              </button>

              <button
                className="glitter-lightbox-btn confirm"
                onClick={confirmSelect}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GlitterBaseSelection;
