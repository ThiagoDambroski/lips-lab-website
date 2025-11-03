

import logo from "../assets/logo.png"
import homePageImage from "../assets/homePageImage.png"
import "../scss/HomePage.css"
import glossBackground from "../assets/gloss-background.png"
import Marquee from "react-fast-marquee"
import LibsCards from "./LibsCards"
import portugal_icon from "../assets/portugal.svg"
import eco_icon from "../assets/eco.svg"
import cruel_icon from "../assets/cruel.svg"
import toxico_icon from "../assets/toxico.svg"
import artesanal_icon from "../assets/artesenal.svg"
import paraba_icon from "../assets/paraba.svg"

import background_venha_ate_nos from "../assets/background-venha-ate-nos.png"
import image_woman from "../assets/image-woman-home-page.png"
import  Navbar from "../Navbar/navbar"


function HomePage() {

    
  return (
    <>
      <Navbar/>
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
            <div className="experiencie-libs-cards-container">
                {[...Array(7)].map((_, index) => (
                  <LibsCards key={index} number={index + 1} />
                ))}
                
            </div>
          </div>
        </section>
        <section className="home-banner">
              <h2>NOSSOS PRODUTOS SÃO</h2>
              <div className="home-banner-icons">
                <div>
                  <img src={portugal_icon} alt="portugal"/>
                  <p>DESENVOLVIDO EM PORTUGAL</p>
                </div>
                <div>
                  <img src={eco_icon} alt="eco" />
                  <p>eco-friendly</p>
                </div>
                <div>
                  <img src={cruel_icon} alt="animal lover" />
                  <p>Cruelty-Free</p>
                </div>
                <div>
                  <img src={toxico_icon} alt="nao toxico" />
                  <p>não tóxico</p>
                </div>
                <div>
                  <img src={artesanal_icon} alt="artesanal" />
                  <p>PRODUTO ARTESANAL</p>
                </div>
                <div>
                  <img src={paraba_icon} alt="sem parabenos" />
                  <p>SEM PARABENOS</p>
                </div>
              </div>
        </section>

        <section className="home-venha-ate"  style={{
          backgroundImage: `url(${background_venha_ate_nos})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <h2>NÃO PODES VIR ATÉ NÓS?</h2>
          <button>EXPERIÊNCIA ONLINE!</button>

        </section>
        <section className="home-about-us">
          <div className="home-about-us-about">
            <button>SOBRE NÓS</button>
            <p> {`A Lips Lab é a primeira loja em Portugal dedicada à criação personalizada de batons e glosses labiais.
                Um conceito pioneiro que combina inovação, personalização e exclusividade.

                Tudo o que criamos é vegan, não testado em animais e livre de parabenos,porque acreditamos numa beleza responsável e consciente.
                Na Lips Lab, cada cor conta uma história — a tua`}
            </p>
          </div>
          <div className="home-about-us-explore">
              <img src={image_woman} alt="image woman" />
              <div>
                <h3>EXPLORA A LIPS LAB</h3>
                <p>Na Lips Lab, és convidada a vestir a bata 
                e entrar no laboratório, um espaço inspirador 
                onde vais misturar pigmentos, escolher aromas 
                e transformar ideias em cor
                </p>
                <button>veja os nossos produtos!</button>
              </div>
          </div>
        </section>
          
      </main>
    </>
    
   
  )
}

export default HomePage