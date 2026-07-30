import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { mainNavigationLinks, ROUTES } from "../config/routes";
import "../styles/NavBar.css";

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
          <NavLink
            to={ROUTES.cart}
            onClick={closeMenu}
            className={({ isActive }) => `nav-cart-link${isActive ? " active" : ""}`}
            aria-label="Abrir carrinho"
          >
            <svg
              className="nav-cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 4H5L7.2 14.2C7.3 14.7 7.8 15 8.3 15H17.2C17.7 15 18.1 14.7 18.3 14.2L20 8H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="19" r="1.4" fill="currentColor" />
              <circle cx="17" cy="19" r="1.4" fill="currentColor" />
            </svg>
          </NavLink>

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
