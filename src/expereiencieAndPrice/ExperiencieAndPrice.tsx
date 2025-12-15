import { useState } from "react";

import Navbar from "../Navbar/Navbar";
import ProductCarousel from "../ReserveNow/ProductCarouselProps";

import libsIncluso from "../assets/incuido-libs.svg";
import ribbonImg from "../assets/ribbon experiencie.svg";
import libsBackground from "../assets/libs back.png";


import normalGloss from "../assets/gloss final.svg";
import normalBatom from "../assets/batom final.svg";
import lipCombo from "../assets/lipCombo.png";
import glossCombo from "../assets/glossCombo.png";
import batomCombo from "../assets/batomCombo.png";


import holdingGloss from "../assets/dani holding gloss.svg"

import "../scss/ExperiencieAndPrice.css"; // keep as you already have
import HowItWorksSection from "./HowItWorksSection";

export type ProductItem = {
  id: string | number;
  title: string;
  price: number | string;
  imageUrl: string;
  alt?: string;
};

const products: ProductItem[] = [
  { id: 1, title: "GLOSS LABIAL", price: "55€", imageUrl: normalGloss, alt: "Gloss labial rosa" },
  { id: 2, title: "BATOM", price: "55€", imageUrl: normalBatom, alt: "Batom branco com tampa rosa" },
  { id: 3, title: "LIP COMBO", price: "99€", imageUrl: lipCombo, alt: "Lip combo" },
  { id: 4, title: "GLOSS COMBO", price: "99€", imageUrl: glossCombo, alt: "Gloss combo" },
  { id: 5, title: "BATOM COMBO", price: "99€", imageUrl: batomCombo, alt: "Batom combo" },
];



type IncludeItem = {
  id: number;
  title: string;
  description: string;
};

const includedItems: IncludeItem[] = [
  {
    id: 1,
    title: "CRIAÇÃO NO LABORATÓRIO LIPS LAB",
    description: "Recebe uma bebida de boas-vindas para começar a tua experiência da melhor forma",
  },
  {
    id: 2,
    title: "BEBIDA DE BOAS-VINDAS",
    description:
      "Descobre os tons que mais valorizam a tua cor de pele, cabelo e olhos, para criares uma cor que te favorece verdadeiramente",
  },
  {
    id: 3,
    title: "COLORAÇÃO PESSOAL",
    description: "para desfrutares durante a experiência",
  },
  {
    id: 4,
    title: "Embalagem personalizada",
    description:
      "Veste a bata, entra no laboratório e cria o teu próprio produto, desde a escolha da base até à mistura de pigmentos, aromas, essência e aditivos",
  },
  {
    id: 5,
    title: "CHARMS DECORATIVOS",
    description:
      "Veste a bata, entra no laboratório e cria o teu próprio produto, desde a escolha da base até à mistura de pigmentos, aromas, essência e aditivos",
  },
  {
    id: 6,
    title: "OFERTA MISTÉRIO",
    description: "Grava o teu nome, símbolo ou palavra favorita na embalagem do produto",
  },
];

function ExperiencieAndPrice() {

  // NEW: accordion for "incluído"
  const [openIncludeId, setOpenIncludeId] = useState<number | null>(null);
  const toggleInclude = (id: number) => setOpenIncludeId((prev) => (prev === id ? null : id));

  return (
    <>
      <Navbar css={1} />

      <main className="price-main">
        {/* HOW IT WORKS */}
        <HowItWorksSection/>

        <img src={ribbonImg} alt="" className="ribbon-img" />

        {/* INCLUDED */}
        <section className="whats-include-section">
          <div className="whats-include-background" style={{ backgroundImage: `url(${libsBackground})` }}>
            <div className="whats-include-div">
              <img className="img-include" src={libsIncluso} alt="" />

              <ul className="include-list">
                {includedItems.map((item) => {
                  const isOpen = openIncludeId === item.id;
                  const panelId = `include-panel-${item.id}`;

                  return (
                    <li key={item.id} className={`include-item ${isOpen ? "is-open" : ""}`}>
                      <button
                        type="button"
                        className="include-pill"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleInclude(item.id)}
                      >
                        <span className="include-title">{item.title}</span>
                        <span className="include-plus" aria-hidden="true">
                          +
                        </span>
                      </button>

                      <div id={panelId} className="include-panel">
                        <p>{item.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <ProductCarousel items={products} initialIndex={0} autoplayMs={0} onIndexChange={(i) => console.log("slide:", i)} />
        <section className="reserve-now-section-experiencie" style={{ backgroundImage: `url(${libsBackground})` }}>
              <button>RESERVA AGORA</button>
              <img src={holdingGloss} alt="" />
        </section>
      </main>
    </>
  );
}

export default ExperiencieAndPrice;
