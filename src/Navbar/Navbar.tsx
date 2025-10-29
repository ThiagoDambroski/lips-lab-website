import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import "../scss/NavBar.css"

function navbar() {
  return (
    <nav>

      <ul>
        <li><NavLink to = "/"><img src={logo} alt="Logo" /></NavLink></li>
        <div>
          <li><NavLink to = "/reserve">Reserva Agora</NavLink></li>
          <li><NavLink to = "/">Experiência e Preços</NavLink></li>
          <li><NavLink to = "/create">Experiência Online</NavLink></li>
          {/*<li><NavLink to = "/faq">Perguntas Frequentes</NavLink></li>*/}
        </div>
        <div>
          <span>1</span>
          <span>1</span>
          <span>1</span>
        </div>
      </ul>

    </nav>
  )
}

export default navbar