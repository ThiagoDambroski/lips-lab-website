import libs from "../assets/libs-display.png";
import { homeSteps } from "../data/homeContent";

type LibsCardsType = {
  number: number;
};

export default function LibsCards({ number }: LibsCardsType) {
  const step = homeSteps.find((item) => item.id === number) ?? { title: "Passo", description: "" };

  return (
    <article className="libs-card" role="listitem" aria-label={`Passo ${number}`}>
      <div className="libs-badge">
        <img src={libs} alt="" aria-hidden="true"  decoding="async"  loading="lazy" />
        <span className="libs-card__badge">{number}</span>
      </div>

      <h3 className="libs-card__title">{step.title}</h3>
      <p className="libs-card__text">{step.description}</p>
    </article>
  );
}
