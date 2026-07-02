import { NavLink } from "react-router-dom";
import LibsCards from "../LibsCards";
import { ROUTES } from "../../config/routes";
import backLibs from "../../assets/libs back.png";
import { homeSteps } from "../../data/homeContent";

export default function HomeExperienceSection() {
  return (
    <section className="experiencie-libs" style={{ backgroundImage: `url(${backLibs})` }}>
      <div className="experiencie-libs-intro">
        <h2>EXPERIÊNCIA LIPS LAB</h2>
        <NavLink className="home-step-link" to={ROUTES.experience}>
          passo a passo
        </NavLink>
        <div className="experiencie-libs-cards-container">
          {homeSteps.map((step) => (
            <LibsCards key={step.id} number={step.id} />
          ))}
        </div>
        <h3>feito por ti, para ti!</h3>
      </div>
    </section>
  );
}
