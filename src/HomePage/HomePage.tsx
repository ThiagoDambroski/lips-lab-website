

import "../scss/HomePage.css"

import Marquee from "react-fast-marquee"
import LibsCards from "./LibsCards"

import ourProductsBanner from "../assets/ourProducts.svg"
import daniAndFriend from "../assets/dani e friend.jpg"
import  Navbar from "../Navbar/Navbar"
import backLibs from "../assets/libs back.png"
import backEnd from "../assets/home-end-backg.png"
//import { NavLink } from "react-router-dom"
import ToneCarousel, { type Slide }  from "./ToneCarousel"

// replace these paths with your real assets
import circlesRed from "../assets/colorsVer.svg";
import circlesPink from "../assets/colorsVib.svg";
import circlesNude from "../assets/colorsNude.svg";
import circlesExpressive from "../assets/colorsExp.svg";

import collageRed from "../assets/colageVer.jpg";
import collagePink from "../assets/collageVib.png";
import collageNude from "../assets/colageNude.svg";
import collageExpressive from "../assets/colageExp.png";
import {  NavLink } from "react-router-dom"

const slides: Slide[] = [
  {
    id: "vermelho",
    bgColor: "#B93A2B",
    circlesImageSrc: circlesRed,
    collageImageSrc: collageRed,
    activePill: "VERMELHO",
  },
  {
    id: "vibrante",
    bgColor: "#C5556B",
    circlesImageSrc: circlesPink,
    collageImageSrc: collagePink,
    activePill: "VIBRANTE",
  },
  {
    id: "nude",
    bgColor: "#D88A7C",
    circlesImageSrc: circlesNude,
    collageImageSrc: collageNude,
    activePill: "NUDE",
  },
  {
    id: "expressivo",
    bgColor: "#8B3E4E",
    circlesImageSrc: circlesExpressive,
    collageImageSrc: collageExpressive,
    activePill: "EXPRESSIVO",
  },
];

function HomePage() {

const handleBookExperience = () => {
  window.open(
    "https://www.fresha.com/pt/a/lips-lab-lisboa-rua-amelia-rey-colaco-hi2k5yys?pId=2713715&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAPTCcBleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAaeHFhnat8kKfi-i-n8WDMvU7PddxtY6LU5NeMMt0K9RkFqP6EpYv_U3Ccx6OA_aem_epo4Y4C1kOem4xqOGqNnNw",
    "_blank",
    "noopener,noreferrer"
  );
};

    
  return (
    <>
      <Navbar css={1}/>
      <main>

        <Marquee
          gradient={false}       // remove fade nas bordas
          speed={100}             // controla a velocidade
          pauseOnHover={false}    // pausa com o rato em cima
          className="rolling-card"
        >
          PELA PRIMEIRA VEZ EM PORTUGAl &nbsp; PELA PRIMEIRA VEZ EM PORTUGAl &nbsp;  PELA PRIMEIRA VEZ EM PORTUGAl &nbsp; PELA PRIMEIRA VEZ EM PORTUGAl &nbsp; PELA PRIMEIRA VEZ EM PORTUGAl &nbsp;
        </Marquee>
        <section className="experiencie-libs" style={{ backgroundImage: `url(${backLibs})` }}>
          <div className="experiencie-libs-intro">
            <h2>EXPERIÊNCIA LIPS LAB</h2>
            <button>passo a passo</button>
            <div className="experiencie-libs-cards-container">
                {[...Array(5)].map((_, index) => (
                  <LibsCards key={index} number={index + 1} />
                ))}
                
            </div>
            <h3>feito por ti, para ti!</h3>
          </div>
        </section>
        <section className="home-banner">
              <h2>OS NOSSOS PRODUTOS SÃO</h2>
              <p className="">{`feitos com ceras vegetais puras,
                ingredientes botânicos e minerais`}</p>
              <img src={ourProductsBanner} className="home-banner-icons"/>
                
              
        </section>
        <section className="home-marca-ex">
            <div style={{backgroundImage:`url(${daniAndFriend})`}}>
              <button type="button" onClick={handleBookExperience}>MARCA JÁ A TUA EXPERIÊNCIA</button>
            </div>
        </section>
        
        <ToneCarousel slides={slides} />
        <section className="home-end" style={{ backgroundImage: `url(${backEnd})` }}>
          <div>
            <h1>Não consegues <br/>vir  à Lips Lab?</h1>
            <button>
              <NavLink to="/create">experiência ONLINE!</NavLink></button>
          </div>
          
        </section>
      </main>
    </>
    
   
  )
}

export default HomePage