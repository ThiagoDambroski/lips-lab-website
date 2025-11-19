import React from 'react'
import "../scss/NavBar.css"
import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <div className='footer-div'>
            <img src={logo} alt="logo" />
            
                <ul>
                    <li>reserva agora</li>
                    <li>experiência online</li>
                    <li><NavLink to = "/faq">perquntas frequentes</NavLink></li>
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