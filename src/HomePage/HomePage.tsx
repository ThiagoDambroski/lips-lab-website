

import logo from "../assets/logo.png"
import homePageImage from "../assets/homePageImage.png"
import "../scss/HomePage.css"
import glossBackground from "../assets/gloss-background.png"
import Marquee from "react-fast-marquee"

function HomePage() {

    
  return (
    <main>
      <section className="open-page-section">
          <div>
            <img src={homePageImage} alt="Garota sorrindo"/>
          </div>
          <div className="open-page-info">
            <button>MARCA JÁ TUA EXPERIÊNCIA!</button>
            <div>
              <p>A experiência convida-te a entrar no laboratório e viver 
              todo o processo de criação, desde a cor até à embalagem
              </p>
              <p>
                Na Lips Lab, crias o teu próprio batom, 
                de forma única e totalmente personalizada
              </p>
            </div>
            
            <img src={logo} alt="Logo" />
          </div>
          
      </section>
      <Marquee
        gradient={false}       // remove fade nas bordas
        speed={100}             // controla a velocidade
        pauseOnHover={false}    // pausa com o rato em cima
        className="rolling-card"
      >
        ENTREGAMOS PARA TODO O PAÍS! &nbsp; ENTREGAMOS PARA TODO O PAÍS! &nbsp;  ENTREGAMOS PARA TODO O PAÍS! &nbsp; ENTREGAMOS PARA TODO O PAÍS! &nbsp; ENTREGAMOS PARA TODO O PAÍS! &nbsp;
      </Marquee>
      <img className="gloss-bakcground" src={glossBackground} alt="gloss background" />
      <section className="experiencie-libs">
        <div className="experiencie-libs-intro">
          <h2>EXPERIÊNCIA LIPS LAB</h2>
          <button>passo a passo</button>
        </div>
       
      </section>
        
    </main>
   
  )
}

export default HomePage