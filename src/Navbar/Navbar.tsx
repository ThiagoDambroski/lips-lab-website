import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import "../scss/NavBar.css"
import { useEffect } from "react"
import "../scss/NavBar.css"
type NavbarProps = {
  css?: number;
};

function navbar({css = 0}:NavbarProps) {
  const className = css === 0 ? "nav-1" : "nav-2"
  


  return (
    <nav className={className}>

      <ul>
        <li><NavLink to = "/"><img src={logo} alt="Logo" /></NavLink></li>
        <div>
          <li><NavLink to = "/reserve">Reserva Agora</NavLink></li>
          <li><NavLink to = "/experiencie">Experiência e Preços</NavLink></li>
          <li><NavLink to = "/create">Experiência Online</NavLink></li>
          {/*<li><NavLink to = "/faq">Perguntas Frequentes</NavLink></li>*/}
        </div>
        <div className={css === 0 ? "" : "icon-nav-2"}>
          <span>1</span>
          <span>1</span>
          <span>1</span>
        </div>
      </ul>

    </nav>
  )
}

export default navbar