import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import lipsPattern from "../../assets/libs back light.png";
import tirondsMain from "../../assets/tironds-campaign/tironds-6366.webp";
import tirondsLab from "../../assets/tironds-campaign/tironds-6268.webp";
import collaborationLogo from "../../assets/lipslab-tironds-logo.png";

export default function HomeLimitedEditionSection() {
  return (
    <section className="home-limited-edition" aria-label="Edição limitada Lips Lab x Tironds">
      <div
        className="home-limited-edition__pattern"
        style={{ backgroundImage: `url(${lipsPattern})` }}
        aria-hidden="true"
      />

      <div className="home-limited-edition__content">
        <div className="home-limited-edition__brand">
          <img
            className="home-limited-edition__logo"
            src={collaborationLogo}
            alt="Lips Lab x Tironds"
            loading="lazy"
            decoding="async"
          />
          <NavLink className="home-limited-edition__button" to={`${ROUTES.products}#tironds-products`}>
            GARANTIR EDIÇÃO LIMITADA
          </NavLink>
        </div>

        <div className="home-limited-edition__photo home-limited-edition__photo--main">
          <img
            src={tirondsMain}
            alt="Participante da edição limitada na Lips Lab"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="home-limited-edition__photo home-limited-edition__photo--lab">
          <img
            src={tirondsLab}
            alt="Criação da edição limitada na Lips Lab"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
