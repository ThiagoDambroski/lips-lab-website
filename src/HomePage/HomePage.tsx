

import logo from "../assets/logo.png"
import homePageImage from "../assets/homePageImage.png"
import "../scss/HomePage.css"

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
        
    </main>
   
  )
}

export default HomePage