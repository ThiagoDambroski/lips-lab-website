
import "../scss/NavBar.css"
import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <div className='footer-div'>
            <img src={logo} alt="logo" />
                <div className="footer-sub-div">
                    <ul>
                    <li><NavLink to = "/reserve">reserva agora</NavLink></li>
                    <li><NavLink to = "/create">experiência online</NavLink></li>
                    <li><NavLink to = "/faq">perguntas frequentes</NavLink></li>
                    </ul>
                    <ul className="footer-legal">
                        <li><NavLink to="/payment-methods">meios de pagamento</NavLink></li>
                        <li><NavLink to="/terms">termos & condições</NavLink></li>
                        <li><NavLink to="/privacy">política de privacidade</NavLink></li>
                        <li><a href="https://www.livroreclamacoes.pt/Inicio/">livros de reclamações</a></li>
                    </ul>

                    <div className='footer-social'>
                        <span>SOCIAL</span>
                        <a href="https://www.instagram.com/lipslab.co/">@lipslab.pt</a>
                        <span>CONTACTO</span>
                        <a onClick={() => window.location.href = "mailto:lipslab.co@gmail.com"}>lipslab.co@gmail.com</a>
                        <a href="">+351 933 554 001</a>
                    </div>
                </div>
                
            
        </div>
        <p>© 2025 lips lab. All rights reserverd.</p>
    </footer>
  )
}

export default Footer