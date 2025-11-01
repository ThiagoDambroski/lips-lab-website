import React from "react";
import libs from "../assets/libs-display.png"

type LibsCardsType = {
  number: number;
};

const arrayInfo = [
  { title: "Escolhe a tua base e acabamento", desc: "Decide se queres um batom cremoso, mate, líquido ou um gloss labial brilhante" },
  { title: "Cria a tua cor e o glitter", desc: "Mistura pigmentos e descobre o tom que melhor reflete a tua personalidade" },
  { title: "Escolhe o teu aroma favorito", desc: "Dá ao teu batom uma assinatura sensorial única, escolhendo o aroma que combina contigo" },
  { title: "Adiciona os teus aditivos", desc: "Personaliza a fórmula do teu batom com os aditivos naturais disponíveis na experiência." },
  { title: "Personaliza a embalagem", desc: "Grava um nome, uma palavra ou símbolo —  Transforma o teu batom num objeto de expressão pessoal e elegância" },
  { title: "Escolhe o teu charm", desc: "Dá o toque final perfeito com os nossos charms decorativos exclusivos. Podes escolher entre diferentes estilos e símbolos" },
  { title: "Leva o teu batom contigo", desc: "No final, sais da Lips Lab com o teu batom ou gloss labial personalizado criado por ti, para ti, e com o teu toque final" },
];

export default function LibsCards({ number }: LibsCardsType) {
  
  const step = arrayInfo[number - 1] ?? { title: "Passo", desc: "" };

  return (
    <article className="libs-card" role="listitem" aria-label={`Passo ${number}`}>
       <div className="libs-badge">
        <img src={libs} alt="" aria-hidden="true" />
        <span className="libs-card__badge">{number}</span>
      </div>
      
      
      <h3 className="libs-card__title">{step.title}</h3>
      <p className="libs-card__text">{step.desc}</p>
    </article>
  );
}
