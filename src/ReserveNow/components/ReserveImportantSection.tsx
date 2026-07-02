import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import secondImage from "../../assets/friends reserve now.png";
import { reserveImportantItems, reserveToleranceDetail, reserveToleranceText } from "../../data/reserveContent";

export default function ReserveImportantSection() {
  return (
    <section className="reserve-now-end">
      <div className="important-saberes">
        <h2>IMPORTANTE SABERES!</h2>
        <ul>
          {reserveImportantItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>
            {reserveToleranceText}
            <br />
            {reserveToleranceDetail}
          </li>
        </ul>
        <NavLink className="reserve-now-price-link" to={ROUTES.experience}>
          EXPERIÊNCIA E PREÇOS
        </NavLink>
      </div>
      <img src={secondImage} alt="Amigas durante a experiência Lips Lab" loading="lazy"  decoding="async" />
    </section>
  );
}
