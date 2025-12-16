
import libs from "../assets/libs-display.png"

type LibsCardsType = {
  number: number;
};

const arrayInfo = [
  { title: "Escolhe a tua base", desc: "Descobre as diferentes opções de acabamento e escolhe a que mais gostas." },
  { title: "Cria a tua cor ", desc: "Trabalha com uma especialista em cores para encontrares a cor perfeita para ti." },
  { title: "Adiciona o aroma e essência", desc: "Escolhe o aroma e a essência que dão uma personalidade única à tua criação." },
  { title: "Escolhe o aditivo", desc: "Dá o toque final. São vários os aditivos que podes acrescentar à tua fórmula perfeita." },
  { title: "Personaliza a embalagem", desc: "Grava o teu nome na embalagem e adiciona charms para tornar o teu produto único." },
 
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
