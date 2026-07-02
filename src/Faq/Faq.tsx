import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import FaqQuestionItem from "./components/FaqQuestionItem";
import { faqItems } from "../data/faqItems";
import mockUp from "../assets/fqaImage.jpg";
import bckLibs from "../assets/libs back.png";
import ribbonImg from "../assets/perguntasFrequentes.svg";
import { CONTACT_EMAIL } from "../config/site";
import "../scss/faq/index.css";

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleItem = (index: number) => setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <>
      <Navbar css={1} />

      <main id="main-content" className="faq">
        <section className="faq-intro">
          <h1>Tens dúvidas?</h1>
          <p>
            Aqui encontras respostas às perguntas<br /> mais frequentes.<br />
            Desde como funciona a personalização até<br /> aos prazos de entrega e aos cuidados com<br /> o teu produto.<br /><br />
            Explora e prepara-te para viver a tua<br /> experiência, sem segredos
          </p>
        </section>

        <img src={ribbonImg} alt="Perguntas frequentes" className="ribbon-image" loading="lazy"  decoding="async" />

        <section className="faq-question">
          <img src={mockUp} alt="Produto Lips Lab personalizado" loading="lazy"  decoding="async" />
          <div className="faq-question-container">
            <h3>faq</h3>

            <ul>
              {faqItems.map((item, index) => (
                <FaqQuestionItem
                  key={item.question}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={toggleItem}
                />
              ))}
            </ul>
          </div>
        </section>

        <section className="faq-still-questions" style={{ backgroundImage: `url(${bckLibs})` }}>
          <div>
            <h1>A TUA DÚVIDA NÃO FOI RESPONDIDA?</h1>
            <button type="button" onClick={() => window.location.assign(`mailto:${CONTACT_EMAIL}`)}>
              <p>ENVIA-NOS UM EMAIL COM A TUA PERGUNTA E NÓS TE AJUDAMOS!</p>
              <span>{CONTACT_EMAIL}</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Faq;
