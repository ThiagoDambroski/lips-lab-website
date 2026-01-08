import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../scss/NavBar.css";



type NavbarProps = {
  css?: number;
};

function Navbar({ css = 0 }: NavbarProps) {
  const className = css === 0 ? "nav-1" : "nav-2";
  const isNav2 = css !== 0;

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <nav className={`${className} ${isNav2 && isOpen ? "is-open" : ""}`}>
      <ul>
        {/* LOGO */}
        <li>
          <NavLink to="/" onClick={closeMenu}>
            <img src={logo} alt="Logo" className="nav-logo" />
          </NavLink>
        </li>

        {/* LINKS (hidden on mobile via CSS) */}
        <div className="nav-links">
          <li>
            <NavLink
              to="/reserve"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reserva Agora
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/experiencie"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Experiência e Preços
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/create"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Experiência Online
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/giftCard"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Gift Card
            </NavLink>
          </li>
        </div>

        {/* RIGHT SIDE: HAMBURGER + CART */}
        <div className={css === 0 ? "" : "icon-nav-2"}>
          {isNav2 && (
            <button
              type="button"
              className="nav-toggle"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
          )}
          {/* <NavLink
          to="/cart"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img
            src={css === 0 ? whiteShop : redShop}
            alt="Cart"
            className="nav-icon-img"
          />
        </NavLink>*/}
          


        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
