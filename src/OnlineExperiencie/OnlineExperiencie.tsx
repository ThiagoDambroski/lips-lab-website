
import CreateBatomBox from '../Functions/CreateBatomBox/CreateBatomBox'
import "../scss/OnlineExperiencie.css"
import kiss from "../assets/kissing-batom.png"
import Navbar from '../Navbar/navbar'
import libs from "../assets/libs-display.png"
import CuverdRibbon2 from "../OnlineExperiencie/CuverdRibbon2"

function OnlineExperiencie() {
  
  return (
    <>
      <Navbar css={1}/>
      <CreateBatomBox/>
      <main>
      
        <section className='online-how-it-works-section'>
          <h1>Cria o teu batom personalizado onde quer que estejas!</h1>
          <div className='online-how-it-works-section-div'>
            <img src={kiss} alt="" />
            <ul>
              <h2>COMO FUNCIONA?</h2>
              <li>
                  <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">1</span>
                  </div>
                <span>Escolhe a tua base e acabamento</span>
                <p>Decide se queres um  batom cremoso, mate, liquido ou um gloss labial brilhante</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">2</span>
                  </div>
                <span>Cria a tua cor e o glitter</span>
                <p>Mistura pigmentos e descobre o tom que melhor reflete a tua personalidade</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">3</span>
                  </div>
                <span>Escolhe o teu aroma favorito</span>
                <p> Dá ao teu batom uma assinatura sensorial única, escolhe o aroma que combina contigo</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">4</span>
                  </div>
                <span>Adiciona os teus aditivos</span>
                <p> Personaliza a fórmula do teu batom com os aditivos naturais disponíveis na experiência</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">5</span>
                  </div>
                <span>Personaliza a embalagem</span>
                <p>Grava um nome, uma palavra ou símbolo</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">6</span>
                  </div>
                <span>Escolhe o teu charm</span>
                <p>Dá o toque final perfeito  com os nossos charms  decorativos exclusivos</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">7</span>
                  </div>
                <span>Escolhe o teu aroma favorito</span>
                <p>No final, sais da Lips Lab com o teu batom ou gloss labial personalizado criado por ti</p>
              </li>
            </ul>
          </div>
        </section>
        <CuverdRibbon2/>
        <section className='online-buy-section'>
          <button>
            COMEÇAR!
          </button>
          <p>Experimenta criar o teu batom personalizado sem sair de casa!</p>
          <div>
            <div>

            </div>
            <div>
              
            </div>
          </div>
        </section>
        
    </main>
    </>
    
  )
}

export default OnlineExperiencie