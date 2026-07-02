import { lazy, Suspense, useCallback, useState } from "react";
import Navbar from "../Navbar/Navbar";
import HowItWorksSection from "../expereiencieAndPrice/HowItWorksSection";
import OnlineProductCard from "./components/OnlineProductCard";
import { onlineExperienceProducts } from "../data/onlineExperienceProducts";
import type { TypesOptions } from "../Functions/CreateBatomBox/Types";
import libsBackground from "../assets/libs back.png";
import agoraImg from "../assets/agora ribbon.png";
import libsSite from "../assets/libsDisplaySite.svg";
import "../styles/OnlineExperiencie.css";

const CreateBatomBox = lazy(() => import("../Functions/CreateBatomBox/CreateBatomBox"));

function OnlineExperiencie() {
  const [createActive, setCreateActive] = useState(false);
  const [type, setType] = useState<TypesOptions>(undefined);

  const handleSetCreativeActive = useCallback((state: boolean, typeinput: TypesOptions) => {
    setCreateActive(state);
    setType(typeinput);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Navbar css={1} />

      <main id="main-content" className="online-experience-page">
        {!createActive && (
          <>
            <HowItWorksSection />

            <div className="online-experience-back-main" style={{ backgroundImage: `url(${libsBackground})` }}>
              <div className="now-img-container">
                <img src={agoraImg} className="now-img" alt="Agora" loading="lazy"  decoding="async" />
              </div>

              <section className="online-buy-section">
                <button
                  type="button"
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

                <img className="img-site" src={libsSite} alt="Expositor Lips Lab" loading="lazy"  decoding="async" />

                <div className="online-buy-container">
                  {onlineExperienceProducts.map((product) => (
                    <OnlineProductCard
                      key={product.id}
                      product={product}
                      onSelect={(selectedType) => handleSetCreativeActive(true, selectedType)}
                    />
                  ))}
                </div>

                <button
                  type="button"
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
          <Suspense fallback={<div className="online-experience-builder-loader">A carregar experiência...</div>}>
            <CreateBatomBox setCreateActive={setCreateActive} typeInput={type} />
          </Suspense>
        )}
      </main>
    </>
  );
}

export default OnlineExperiencie;
