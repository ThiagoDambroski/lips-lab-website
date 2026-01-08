import { useState } from "react";

import Navbar from "../Navbar/Navbar";
import ProductCarousel from "../ReserveNow/ProductCarouselProps";

import libsIncluso from "../assets/incuido-libs.svg";
import ribbonImg from "../assets/ribbon experiencie.svg";
import libsBackground from "../assets/libs back.png";


import normalGloss from "../assets/gloss final.svg";
import normalBatom from "../assets/batom final.svg";
import lipCombo from "../assets/lip combo.svg";
import glossCombo from "../assets/gloss combo.svg";
import batomCombo from "../assets/batom combo.svg";


import holdingGloss from "../assets/dani holding gloss.png"

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
    description: "Veste a bata e entra no nosso laboratório.Escolhe a base, cria a cor, adiciona o aroma, a essência e o aditivo.és tu quem decide tudo!",
  },
  {
    id: 2,
    title: "BEBIDA DE BOAS-VINDAS",
    description:
      "Uma bebida especial para desfrutares enquanto vives a experiência lips lab.",
  },
  {
    id: 3,
    title: "COLORAÇÃO PESSOAL",
    description: "Descobre a cartela de tons que realça a tua beleza natural e valoriza os teus traços",
  },
  {
    id: 4,
    title: "Embalagem personalizada",
    description:
      "Grava o teu nome, símbolo ou palavra na embalagem do teu produto",
  },
  {
    id: 5,
    title: "CHARMS DECORATIVOS",
    description:
      "Pequenos detalhes únicos que tornama tua criação ainda mais especial",
  },
  {
    id: 6,
    title: "OFERTA MISTÉRIO",
    description: "Uma OFERTA MISTÉRIO PARA Acrescentar À TUA experiência ",
  },
];

const handleBookExperience = () => {
  window.open(
    "https://buk.pt/lips-lab?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn5mJhfUsPGn92pJAimmxm--R-onXAbGOX5VwddnzjEfnFWVkKwG-gPLPAD-E_aem_XHGDeIg6Y0ZWcSNuV0Useg",
    "_blank",
    "noopener,noreferrer"
  );
}

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
              <button onClick={handleBookExperience}>RESERVA AGORA</button>
              <img src={holdingGloss} alt="" />
        </section>
      </main>
    </>
  );
}

export default ExperiencieAndPrice;
