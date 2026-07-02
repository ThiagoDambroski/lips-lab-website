import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { mainNavigationLinks, ROUTES } from "../config/routes";
import "../scss/NavBar.css";

type NavbarProps = {
  css?: number;
};

function Navbar({ css = 0 }: NavbarProps) {
  const className = css === 0 ? "nav-1" : "nav-2";
  const isNav2 = css !== 0;
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((value) => !value);

  return (
    <nav className={`${className} ${isNav2 && isOpen ? "is-open" : ""}`} aria-label="Navegação principal">
      <ul className="nav-list">
        <li className="nav-logo-item">
          <NavLink to={ROUTES.home} onClick={closeMenu} aria-label="Ir para a página inicial Lips Lab">
            <img src={logo} alt="Lips Lab" className="nav-logo"  decoding="async"  loading="eager" />
          </NavLink>
        </li>

        <li className="nav-links-container">
          <ul id="main-navigation-menu" className="nav-links">
            {mainNavigationLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>

        <li className={css === 0 ? "nav-actions" : "nav-actions icon-nav-2"}>
          {isNav2 && (
            <button
              type="button"
              className="nav-toggle"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
              aria-controls="main-navigation-menu"
              onClick={toggleMenu}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
