import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { CLAIMS_BOOK_URL, CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL } from "../config/site";
import { footerNavigationLinks, legalNavigationLinks } from "../config/routes";
import "../scss/NavBar.css";

function Footer() {
  return (
    <footer>
      <div className="footer-div">
        <img src={logo} alt="Lips Lab" loading="lazy"  decoding="async" />
        <div className="footer-sub-div">
          <nav aria-label="Links rápidos">
            <ul>
              {footerNavigationLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informação legal">
            <ul className="footer-legal">
              {legalNavigationLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path}>{link.label}</NavLink>
                </li>
              ))}
              <li>
                <a href={CLAIMS_BOOK_URL} target="_blank" rel="noreferrer">
                  livro de reclamações
                </a>
              </li>
            </ul>
          </nav>

          <address className="footer-social">
            <span>SOCIAL</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@lipslab.pt</a>
            <span>CONTACTO</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}>{CONTACT_PHONE}</a>
          </address>
        </div>
      </div>
      <p>© 2025 Lips Lab. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
