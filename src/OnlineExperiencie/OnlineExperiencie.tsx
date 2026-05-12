import CreateBatomBox from "../Functions/CreateBatomBox/CreateBatomBox";
import "../scss/OnlineExperiencie.css";
import libsBackground from "../assets/libs back.png";
import Navbar from "../Navbar/Navbar";

import gloss from "../assets/gloss final.svg";
import batom from "../assets/batom final.svg";
import oil from "../assets/lipOil.png";
import agoraImg from "../assets/agora ribbon.png";
import { useState } from "react";
import type { TypesOptions } from "../Functions/CreateBatomBox/Types";
import HowItWorksSection from "../expereiencieAndPrice/HowItWorksSection";
import libsSite from "../assets/libsDisplaySite.svg";

function OnlineExperiencie() {
  const [createActive, setCreateActive] = useState(false);
  const [type, setType] = useState<TypesOptions>(undefined);

  const handleSetCreativeActive = (state: boolean, typeinput: TypesOptions) => {
    setCreateActive(state);
    setType(typeinput);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar css={1} />

      <main>
        {!createActive && (
          <>
            <HowItWorksSection />

            <div
              className="online-experience-back-main"
              style={{ backgroundImage: `url(${libsBackground})` }}
            >
              <div className="now-img-container">
                <img src={agoraImg} className="now-img" alt="" />
              </div>

              <section className="online-buy-section">
                <button
                  className="frist-button-online"
                  onClick={() => handleSetCreativeActive(true, undefined)}
                >
                  Experiência online
                </button>

                <p className="online-buy-p">
                  cria o teu batom, gloss labial ou lip oil
                  <br />
                  personalizado diretamente de casa
                </p>

                <img className="img-site" src={libsSite} alt="" />

                <div className="online-buy-container" onClick={() => setCreateActive(true)}>
                  <div
                    className="online-buy-card"
                    onClick={() => handleSetCreativeActive(true, "gloss")}
                  >
                    <div className="online-buy-card-img-wrapper">
                      <img src={gloss} alt="libs labs gloss" />
                    </div>

                    <h3>GLOSS LABIAL</h3>

                    <span>Cria o teu gloss labial / 35€</span>
                  </div>

                  <div
                    className="online-buy-card"
                    onClick={() => handleSetCreativeActive(true, "batom")}
                  >
                    <div className="online-buy-card-img-wrapper">
                      <img src={batom} alt="libs labs batom" />
                    </div>

                    <h3>BATOM</h3>

                    <span>Cria o teu batom / 35€</span>
                  </div>

                  <div
                    className="online-buy-card online-buy-card-oil"
                    onClick={() => handleSetCreativeActive(true, "oil")}
                  >
                    <div className="online-buy-card-img-wrapper">
                      <img src={oil} alt="libs labs lip oil" />
                    </div>

                    <h3>LIP OIL</h3>

                    <span>Cria o teu lip oil / 35€</span>
                  </div>
                </div>

                <button
                  className="second-button-online"
                  onClick={() => handleSetCreativeActive(true, undefined)}
                >
                  COMEÇAR a experiência
                </button>
              </section>
            </div>
          </>
        )}

        {createActive && (
          <CreateBatomBox setCreateActive={setCreateActive} typeInput={type} />
        )}
      </main>
    </>
  );
}

export default OnlineExperiencie;