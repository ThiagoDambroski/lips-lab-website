import { NavLink } from "react-router-dom";
import backEnd from "../../assets/home-end-backg.png";
import { ROUTES } from "../../config/routes";

export default function HomeOnlineSection() {
  return (
    <section className="home-end" style={{ backgroundImage: `url(${backEnd})` }}>
      <div>
        <h1>
          Não consegues <br />vir à Lips Lab?
        </h1>
        <NavLink className="home-end-button" to={ROUTES.onlineExperience}>
          experiência ONLINE!
        </NavLink>
      </div>
    </section>
  );
}
