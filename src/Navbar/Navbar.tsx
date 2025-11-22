import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import "../scss/NavBar.css"
import { useEffect } from "react"
import "../scss/NavBar.css"
import whitePin from "../assets/pinWhite.png"
import whiteShop from "../assets/shopWhite.png"
import whiteUser from "../assets/userWhite.png"

import redPin from "../assets/pinRed.png"
import redShop from "../assets/shopRed.png"
import redUser from "../assets/userRed.png"

type NavbarProps = {
  css?: number;
};

function navbar({css = 0}:NavbarProps) {
  const className = css === 0 ? "nav-1" : "nav-2"
  


  return (
    <nav className={className}>

      <ul>
        <li><NavLink to = "/"><img src={logo} alt="Logo" className="nav-logo" /></NavLink></li>
        <div>
          <li>
            <NavLink
              to="/reserve"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Reserva Agora
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/experiencie"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Experiência e Preços
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/create"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Experiência Online
            </NavLink>
          </li>
        </div>

        <div className={css === 0 ? "" : "icon-nav-2"}>
          <img src={css === 0 ? whitePin : redPin} alt="" className="nav-icon-img"/>
          <img src={css === 0 ? whiteShop: redShop} alt="" className="nav-icon-img"/>
          <img src={css === 0 ? whiteUser : redUser} alt="" className="nav-icon-img"/>
        </div>
      </ul>

    </nav>
  )
}

export default navbar