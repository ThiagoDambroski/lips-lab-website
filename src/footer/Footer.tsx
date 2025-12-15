
import "../scss/NavBar.css"
import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <div className='footer-div'>
            <img src={logo} alt="logo" />
            
                <ul>
                    <li><NavLink to = "/reserve">reserva agora</NavLink></li>
                    <li><NavLink to = "/create">experiência online</NavLink></li>
                    <li><NavLink to = "/faq">perguntas frequentes</NavLink></li>
                </ul>
                <div className='footer-social'>
                    <span>SOCIAL</span>
                    <a href="">@lipslab.pt</a>
                    <span>CONTACTO</span>
                    <a href="">lipslab.co@gmail.com</a>
                </div>
            
        </div>
        <p>© 2025 lips lab. All rights reserverd.</p>
    </footer>
  )
}

export default Footer