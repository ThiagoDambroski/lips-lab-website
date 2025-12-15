import React, { useState } from 'react'
import libs from "../assets/libs-display.png";

import video from "../assets/experiencie video.mp4";

function HowItWorksSection() {
    
    type Step = {
    id: number;
    title: string;
    description: string;
    };

    const steps: Step[] = [
    { id: 1, title: "ESCOLHE A BASE", description: "Decide se queres um batom cremoso, mate, líquido ou um gloss labial brilhante" },
    { id: 2, title: "CRIA A COR", description: "Mistura pigmentos e descobre o tom que melhor reflete a tua personalidade" },
    { id: 3, title: "ADICIONA O AROMA E A ESSÊNCIA", description: "Dá ao teu batom uma assinatura sensorial única, escolhe o aroma que combina contigo" },
    { id: 4, title: "ESCOLHE O ADITIVO", description: "Personaliza a fórmula do teu batom com os aditivos naturais disponíveis na experiência" },
    { id: 5, title: "PERSONALIZA A EMBALAGEM", description: "Grava um nome, uma palavra ou símbolo" },
    ];
      const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (

    
    <section className="how-it-works-section">
          <h1>
            LIPS LAB <br /> experiência
          </h1>

          <div className="how-it-works-div">
            <ul className="steps-list">
              {steps.map((step) => {
                const isOpen = openId === step.id;
                const panelId = `step-panel-${step.id}`;

                return (
                  <li key={step.id} className={`step-item ${isOpen ? "is-open" : ""}`}>
                    <div className="step-badge">
                      <img src={libs} alt="" aria-hidden="true" />
                      <span className="step-number">{step.id}</span>
                    </div>

                    <div className="step-header">
                      <div className="step-text">
                        <h3 className="step-title">{step.title}</h3>
                      </div>

                      <button
                        type="button"
                        className="step-toggle"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(step.id)}
                      >
                        <span className="toggle-icon" aria-hidden="true">
                          +
                        </span>
                        <span className="sr-only">{isOpen ? "Hide details" : "Show details"}</span>
                      </button>
                    </div>

                    <div id={panelId} className="step-panel">
                      <p>{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="how-it-works-video">
              <video src={video} autoPlay loop muted />
            </div>
          </div>
        </section>
  )
}

export default HowItWorksSection