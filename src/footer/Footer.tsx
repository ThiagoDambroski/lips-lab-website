import React from 'react'
import "../scss/NavBar.css"
import logo from "../assets/logo.png"

function Footer() {
  return (
    <footer>
        <div className='footer-div'>
            <img src={logo} alt="logo" />
            
                <ul>
                    <li>reserva agora</li>
                    <li>experiência online</li>
                    <li>perquntas frequentes</li>
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