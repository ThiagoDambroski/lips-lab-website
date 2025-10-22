import { NavLink } from "react-router-dom"

function navbar() {
  return (
    <nav>
        <div>
            <ul>
                <li><NavLink to = "/">logo</NavLink></li>
                <li><NavLink to = "/reserve">Reserva Agora</NavLink></li>
                <li><NavLink to = "/">Experiência e Preços</NavLink></li>
                <li><NavLink to = "/create">Experiência Online</NavLink></li>
                <li><NavLink to = "/faq">Perguntas Frequentes</NavLink></li>
            </ul>
        </div>
    </nav>
  )
}

export default navbar