import React from 'react'
import Navbar from '../Navbar/navbar'
import logo from "../assets/logo.png"
import "../scss/ExperiencieAndPrice.css"
import CurvedRibbon from '../ReserveNow/CurvedRibbon'

function ExperiencieAndPrice() {
  return (
    <>
     <Navbar css={1}/>
     <main className='price-main'>
        <section className='how-it-works-section'>
          <h1>COMO FUNCIONA?</h1>
          <div className='how-it-works-div'>
            <ul>
              <li>
                <span>logo</span>
                <span>Escolhe a tua base e acabamento</span>
                <p>Decide se queres um  batom cremoso, mate, liquido ou um gloss labial brilhante</p>
              </li>
              <li>
                <span>logo</span>
                <span>Cria a tua cor e o glitter</span>
                <p>Mistura pigmentos e descobre o tom que melhor reflete a tua personalidade</p>
              </li>
              <li>
                <span>Escolhe o teu aroma favorito</span>
                <p> Dá ao teu batom uma assinatura sensorial única, escolhe o aroma que combina contigo</p>
              </li>
              <li>
                <span>logo</span>
                <span>Adiciona os teus aditivos</span>
                <p> Personaliza a fórmula do teu batom com os aditivos naturais disponíveis na experiência</p>
              </li>
              <li>
                <span>logo</span>
                <span>Personaliza a embalagem</span>
                <p>Grava um nome, uma palavra ou símbolo</p>
              </li>
              <li>
                <span>logo</span>
                <span>Escolhe o teu charm</span>
                <p>Dá o toque final perfeito  com os nossos charms  decorativos exclusivos</p>
              </li>
              <li>
                <span>logo</span>
                <span>Escolhe o teu aroma favorito</span>
                <p>No final, sais da Lips Lab com o teu batom ou gloss labial personalizado criado por ti</p>
              </li>
            </ul>
            <div>
              <img src={logo} alt="Logo lips labs" />
              <p>
                {`Vive uma experiência única onde a beleza se transforma em ciência e criatividade
                  Na Lips Lab, és convidada a vestir a bata e entrar no laboratório, um espaço inspirador 
                  onde vais misturar pigmentos, escolher aromas e transformar ideias em cor.
                  Cria o teu próprio batom ou gloss labial, totalmente à tua medida, 
                  com a orientação de uma profissional dedicada`}
              </p>
            </div>
          </div>
        </section>
        <CurvedRibbon/>
     </main>
    </>
  )
}

export default ExperiencieAndPrice