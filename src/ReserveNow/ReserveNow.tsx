import Navbar from "../Navbar/Navbar";
import ReserveImportantSection from "./components/ReserveImportantSection";
import ReserveIntroSection from "./components/ReserveIntroSection";
import back from "../assets/libs back.png";
import "../styles/reserverNow.css";

function ReserveNow() {
  return (
    <>
      <Navbar css={1} />
      <main id="main-content" className="reserve-now" style={{ backgroundImage: `url(${back})` }}>
        <ReserveIntroSection />
        <ReserveImportantSection />
      </main>
    </>
  );
}

export default ReserveNow;
