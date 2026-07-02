import fristImage from "../../assets/reserve now frist image.png";
import { openBookingPage } from "../../utils/booking";

export default function ReserveIntroSection() {
  return (
    <section className="reserve-now-intro">
      <img src={fristImage} alt="Produtos personalizados Lips Lab" loading="eager"  decoding="async" />
      <div>
        <h1>
          cria o teu<br />
          batom e GLOSS<br />
          no nosso<br />
          laboratório
        </h1>
        <br />
        <button type="button" onClick={openBookingPage}>
          quero agendar!
        </button>
      </div>
    </section>
  );
}
