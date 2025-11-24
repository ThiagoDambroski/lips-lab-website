import React from 'react'
import Navbar from '../Navbar/navbar'
import logo from "../assets/logo.png"
import "../scss/ExperiencieAndPrice.css"
import CurvedRibbon from '../ReserveNow/CurvedRibbon'
import ProductCarousel from '../ReserveNow/ProductCarouselProps'
import libsBackground from "../assets/libs back.png"
import upGloss from "../assets/up-gloss.png"
import donwGloss from '../assets/down-gloss.png'
import libs from "../assets/libs-display.png"


export type ProductItem = {
  id: string | number;
  title: string;
  price: number | string; 
  imageUrl: string;
  alt?: string;
};

const products: ProductItem[] = [
  {
    id: 1,
    title: "GLOSS LABIAL",
    price: "55€",
    imageUrl: "/images/gloss.png",
    alt: "Gloss labial rosa",
  },
  {
    id: 2,
    title: "BATOM",
    price: "55€",
    imageUrl: "/images/batom.png",
    alt: "Batom branco com tampa rosa",
  },
  
];


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
            <div className='how-it-works-section-div'>
              <img src={logo} alt="Logo lips labs" />
              <p>
                {`Cria o teu próprio batom ou gloss labial, totalmente à tua medida, com a orientação dedicada de uma profissional que te acompanha em cada passo da experiência.

                  Na Lips Lab, és convidada a vestir a bata e a entrar no nosso laboratório, um espaço inspirador onde misturas pigmentos, escolhes aromas e transformas ideias em cor.

                  Vive uma experiência única, onde a beleza se encontra com a ciência e a criatividade.`}
              </p>
            </div>
          </div>
        </section>
        <CurvedRibbon/>
        <ProductCarousel
          items={products}
          initialIndex={0}
          autoplayMs={0} // set e.g. 4000 to enable autoplay
          onIndexChange={(i) => console.log("slide:", i)}
        />
        <section className='whats-include-section'>
            <h1>O QUE ESTÁ INCLUSO?</h1>
            <div className='whats-include-background'  style={{ backgroundImage: `url(${libsBackground})` }}>
              <div className='whats-include-div'>
                  <ul>
                    <li>
                      <h3>Bebida de boas-vindas </h3>
                      <p>Recebe uma bebida de boas-vindas para começar a tua experiência da melhor forma </p>
                    </li>
                    <li>
                      <h3>Coloração Pessoal</h3>
                      <p>Descobre os tons que mais valorizam a tua cor de pele, cabelo e olhos, para criares uma cor que te favorece verdadeiramente
                      </p>
                    </li>
                    <li>
                      <h3>A tua criação no nosso laboratório </h3>
                      <p>para desfrutares durante a experiência </p>
                    </li>
                    <li>
                      <h3>Todos os Aditivos Incluídos </h3>
                      <p>Veste a bata, entra no laboratório e cria o teu próprio produto, desde a escolha da base até à mistura de pigmentos, aromas, essência e aditivos</p>
                    </li>
                    <li>
                      <h3>Personalização Exclusiva</h3>
                      <p>Grava o teu nome, símbolo ou palavra favorita na embalagem do produto </p>
                    </li>
                    <li>
                      <h3>Charms Decorativos </h3>
                      <p>Escolhe charms especiais para tornar a tua criação ainda mais única e personalizada</p>
                    </li>
           
                  </ul>
                  <img src={logo} alt="Libs lab logo" />
                  
            </div>
            <img src={upGloss} alt="" className='up-gloss'/>
            <img src={donwGloss} alt="" className='down-gloss'/>
            <button>RESERVA AGORA!</button>
          </div>
            
        </section>
     </main>
    </>
  )
}

export default ExperiencieAndPrice