import React from 'react'
import Navbar from '../Navbar/navbar'
import logo from "../assets/logo.png"
import "../scss/ExperiencieAndPrice.css"
import CurvedRibbon from '../ReserveNow/CurvedRibbon'
import ProductCarousel from '../ReserveNow/ProductCarouselProps'

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
  // add as many as you need...
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
        <ProductCarousel
          items={products}
          initialIndex={0}
          autoplayMs={0} // set e.g. 4000 to enable autoplay
          onIndexChange={(i) => console.log("slide:", i)}
        />
        <section className='whats-include-section'>
            <h1>O QUE ESTÁ INCLUSO?</h1>
            <div className='whats-include-div'>
                  <ul>
                    <li>
                      <h3>Criação personalizada de batom ou gloss labial </h3>
                      <p>Define o acabamento, o aroma e a cor perfeita, com a orientação de uma especialista </p>
                    </li>
                    <li>
                      <h3>Criação no laboratório Lips Lab </h3>
                      <p>veste a bata e torna-te criadora do teu próprio batom ou gloss labial
                        no laboratório lips lab, és tu quem faz tudo
                      </p>
                    </li>
                    <li>
                      <h3>Bebida de boas-vindas </h3>
                      <p>para desfrutares durante a experiência </p>
                    </li>
                    <li>
                      <h3>Personalização exclusiva </h3>
                      <p>grava o teu nome, símbolo ou palavra favorita na embalagem do produto </p>
                    </li>
                    <li>
                      <h3>Charms decorativos </h3>
                      <p>pequenos detalhes que tornam a tua criação ainda mais especial </p>
                    </li>
                    <li>
                      <h3>Oferta especial (mistério) </h3>
                      <p>uma surpresa preparada pela nossa equipa para tornar o momento inesquecível</p>
                    </li>
                    <li>
                      <h3>Introdução à coloração pessoal</h3>
                      <p>Descobre, com base na tua cor de pele, cabelo e olhos, 
                        a cartela de tons que mais harmoniza com a tua beleza natural e valoriza os teus traços</p>
                    </li>
                  </ul>
                  <h1>logo</h1>
                  <h1>img1</h1>
                  <h1>img2</h1>
            </div>

          <button>RESERVA AGORA!</button>
        </section>
     </main>
    </>
  )
}

export default ExperiencieAndPrice