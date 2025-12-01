
import CreateBatomBox from '../Functions/CreateBatomBox/CreateBatomBox'
import "../scss/OnlineExperiencie.css"
import kiss from "../assets/kissing-batom.png"
import Navbar from '../Navbar/navbar'
import libs from "../assets/libs-display.png"
import CuverdRibbon2 from "../OnlineExperiencie/CuverdRibbon2"
import gloss from "../assets/gloss.png"
import batom from "../assets/batom.png"
import agoraImg from "../assets/agora ribbon.png"
import { useState } from 'react'

function OnlineExperiencie() {

  const [createActive,setCreateActive] = useState(false)
  
  return (
    <>
      <Navbar css={1}/>
      
      <main>
        {!createActive && 
        <>
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
                <span>ESCOLHE A BASE</span>
                <p>Começa por decidir o “estilo” do teu produto: queres algo cremoso, super mate, líquido ou preferes o brilho irresistível de um gloss?</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">2</span>
                  </div>
                <span>CRIA A TUA COR</span>
                <p>Liberta o teu lado artístico! Mistura pigmentos, experimenta combinações e descobre o tom que te representa na perfeição.</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">3</span>
                  </div>
                <span>ADICIONA AROMA & ESSÊNCIA</span>
                <p> Torna o teu batom inesquecível escolhendo o aroma e a essência que mais te conquistam… tu decides o ambiente da experiência!</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">4</span>
                  </div>
                <span>ESCOLHE O ADITIVO</span>
                <p> Dá um upgrade à fórmula com benefícios extra: mais hidratação, volume, suavização ou proteção. Escolhe aquilo que torna o teu batom ainda mais “tu”.</p>
              </li>
              <li>
                 <div className="step-badge">
                    <img src={libs} alt="" aria-hidden="true" />
                    <span className="step-number">5</span>
                  </div>
                <span>PERSONALIZA A EMBALAGEM</span>
                <p>Grava o teu nome ou um símbolo especial e escolhe os charms que melhor te representam. O toque final que torna o teu batom único.</p>
              </li>
              {/* <li>
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
              </li>*/}
              
            </ul>
          </div>
        </section>
        <div className='now-img-container'>
          <img src={agoraImg} className='now-img'/>
        </div>
        
        <section className='online-buy-section'>
          <button onClick={() => setCreateActive(true)}>
            COMEÇAR!
          </button>
          <p className='online-buy-p'>Experimenta criar o teu batom personalizado sem sair de casa!</p>
          <div className='online-buy-container'>
            <div className='online-buy-card'>
              <img src={gloss} alt="libs labs gloss" />
              <h3>GLOSS LABIAL</h3>
              <p>cria teu gloss lábial do zero!</p>
              <span>29€</span>
            </div>
            <div className='online-buy-card'>
              <img src={batom} alt="libs labs batom" />
              <h3>BATOM</h3>
              <p>cria teu batom do zero!</p>
              <span>29€</span>
            </div>
          </div>
        </section>
        </>}
      {createActive && 
      <>  
        <CreateBatomBox/>
      </>}
        
    </main>
    </>
    
  )
}

export default OnlineExperiencie