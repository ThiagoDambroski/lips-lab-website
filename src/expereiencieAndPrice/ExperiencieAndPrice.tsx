import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import ProductCarousel from "../ReserveNow/ProductCarouselProps";
import HowItWorksSection from "./HowItWorksSection";
import IncludedItems from "./components/IncludedItems";
import { experienceProducts, includedItems } from "../data/experienceContent";
import { openBookingPage } from "../utils/booking";
import libsIncluso from "../assets/incuido-libs.svg";
import ribbonImg from "../assets/ribbon experiencie.png";
import libsBackground from "../assets/libs back.png";
import holdingGloss from "../assets/dani holding gloss.png";
import "../scss/ExperiencieAndPrice.css";

function ExperiencieAndPrice() {
  const [openIncludeId, setOpenIncludeId] = useState<number | null>(null);
  const toggleInclude = (id: number) => setOpenIncludeId((prev) => (prev === id ? null : id));

  return (
    <>
      <Navbar css={1} />
      <main id="main-content" className="price-main">
        <HowItWorksSection />
        <img src={ribbonImg} alt="Experiência Lips Lab" className="ribbon-img" loading="lazy"  decoding="async" />

        <section className="whats-include-section" aria-labelledby="included-title">
          <div className="whats-include-background" style={{ backgroundImage: `url(${libsBackground})` }}>
            <div className="whats-include-div">
              <img className="img-include" src={libsIncluso} alt="Incluído na experiência Lips Lab" loading="lazy"  decoding="async" />
              <IncludedItems items={includedItems} openId={openIncludeId} onToggle={toggleInclude} />
            </div>
          </div>
        </section>

        <ProductCarousel items={experienceProducts} initialIndex={0} autoplayMs={0} />

        <section className="reserve-now-section-experiencie" style={{ backgroundImage: `url(${libsBackground})` }}>
          <button type="button" onClick={openBookingPage}>RESERVA AGORA</button>
          <img src={holdingGloss} alt="Cliente a segurar um gloss Lips Lab" loading="lazy"  decoding="async" />
        </section>
      </main>
    </>
  );
}

export default ExperiencieAndPrice;
