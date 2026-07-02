import { useRef, useState, type SyntheticEvent } from "react";
import libs from "../assets/libs-display.png";
import video from "../assets/experiencie video.mp4";
import { howItWorksSteps } from "../data/experienceContent";

function HowItWorksSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const videoRef = useRef<HTMLVideoElement>(null);

  const blockPlay = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    videoRef.current?.pause();
  };

  return (
    <section className="how-it-works-section">
      <h1>
        LIPS LAB <br /> experiência
      </h1>

      <div className="how-it-works-div">
        <ul className="steps-list">
          {howItWorksSteps.map((step) => {
            const isOpen = openId === step.id;
            const panelId = `step-panel-${step.id}`;

            return (
              <li key={step.id} className={`step-item ${isOpen ? "is-open" : ""}`}>
                <div className="step-badge">
                  <img src={libs} alt="" aria-hidden="true"  decoding="async"  loading="lazy" />
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
                    <span className="toggle-icon" aria-hidden="true">+</span>
                    <span className="sr-only">
                      {isOpen ? "Ocultar detalhes" : "Mostrar detalhes"}
                    </span>
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
          <video
            ref={videoRef}
            src={video}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            onClick={blockPlay}
            onTouchStart={blockPlay}
          />
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
