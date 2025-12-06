
import libs from "../assets/libs-display.png"

type LibsCardsType = {
  number: number;
};

const arrayInfo = [
  { title: "Escolhe a tua base", desc: "Começa por decidir o “estilo” do teu produto: queres algo cremoso, super mate, líquido ou preferes o brilho irresistível de um gloss?" },
  { title: "Cria a tua cor ", desc: "Liberta o teu lado artístico!\nMistura pigmentos, experimenta combinações e descobre o tom que te representa na perfeição" },
  { title: "Adiciona o aroma e essência", desc: "Torna o teu batom inesquecível escolhendo o aroma e a essência que mais te agrada… \ntu decides o cheiro e sabor do teu batom ou gloss" },
  { title: "Escolhe o aditivo", desc: "Dá um upgrade à fórmula com benefícios extra: mais hidratação, volume, suavização ou proteção.\nEscolhe aquilo que torna o teu batom ainda mais “tu”" },
  { title: "Personaliza a embalagem", desc: "Grava o teu nome ou um símbolo especial e escolhe os charms que melhor te representam. \nO toque final que torna o teu batom único" },
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
