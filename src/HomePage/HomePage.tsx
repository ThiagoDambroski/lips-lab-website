import Marquee from "react-fast-marquee";
import ToneCarousel from "./ToneCarousel";
import Navbar from "../Navbar/Navbar";
import HomeBookingSection from "./components/HomeBookingSection";
import HomeExperienceSection from "./components/HomeExperienceSection";
import HomeOnlineSection from "./components/HomeOnlineSection";
import HomeProductsBanner from "./components/HomeProductsBanner";
import { toneSlides } from "../data/homeContent";
import "../scss/HomePage.css";

function HomePage() {
  return (
    <>
      <Navbar css={1} />
      <main id="main-content">
        <Marquee gradient={false} speed={100} pauseOnHover={false} className="rolling-card">
          PELA PRIMEIRA VEZ EM PORTUGAL &nbsp; PELA PRIMEIRA VEZ EM PORTUGAL &nbsp; PELA PRIMEIRA VEZ EM PORTUGAL &nbsp; PELA PRIMEIRA VEZ EM PORTUGAL &nbsp; PELA PRIMEIRA VEZ EM PORTUGAL &nbsp;
        </Marquee>

        <HomeExperienceSection />
        <HomeProductsBanner />
        <HomeBookingSection />
        <ToneCarousel slides={toneSlides} />
        <HomeOnlineSection />
      </main>
    </>
  );
}

export default HomePage;
