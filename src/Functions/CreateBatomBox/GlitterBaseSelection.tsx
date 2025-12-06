import React, { useState } from "react";
import type { BaseOptions } from "./Types";
import { useApp, type GlitterColor } from "../../Contexts/AppProvider";

type GlitterBaseType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  glitterSelected: string;
  setGlitterSelected: React.Dispatch<React.SetStateAction<string>>;
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
    if (preview) setGlitterSelected(preview.name);
    setPreview(null);
  };

  return (
    <div>

      {step === 2 && (
        <div className="texture-selection-section">
          <p className="texture-selection-p">
            Diferentes texturas de glosses labiais requerem diferentes tipos de base.
            Existem seis opções principais entre as quais podes escolher:
          </p>

          {type === "batom" && (
            <ul>
              {baseBatom.map((b) => (
                <li
                  key={b.id}
                  onClick={baseSelected === b.id ? () => setBaseSelected("none") : () => setBaseSelected(b.id)}
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
                  onClick={baseSelected === b.id ? () => setBaseSelected("none") : () => setBaseSelected(b.id)}
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
            onClick={() => setStep(3)}
            
          >
            CONTINUAR!
          </button>
        </div>
      )}

      {step === 4 && (
        <section className="glitter-section">
          <div className="glitter-intro">
            <h2>Sabemos que tudo fica melhor com brilho, 
            por isso, podes escolher se queres
            adicionar algum! </h2>
            <button onClick={() => setStep(5)}>Continuar</button>
          </div>
          <div>
            {categories.map((category) => (
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
                            glitterSelected === g.name ? "green" : "",
                          cursor: "pointer",
                          listStyle: "none",
                        }}
                      >
                        <img src={g.img} />
                      </li>
                    ))}
                </ul>
              </div>
             ))}
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
