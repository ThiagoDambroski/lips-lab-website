//Frecha
import Navbar from "../Navbar/Navbar"
import "../scss/reserverNow.css"
import back from "../assets/libs back.png"
import fristImage from "../assets/reserve now frist image.png"
import secondImage from "../assets/friends reserve now.png"
import { NavLink } from "react-router-dom"
//import { NavLink } from "react-router-dom"

function ReserveNow() {

  const handleBookExperience = () => {
  window.open(
    "https://buk.pt/lips-lab?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn5mJhfUsPGn92pJAimmxm--R-onXAbGOX5VwddnzjEfnFWVkKwG-gPLPAD-E_aem_XHGDeIg6Y0ZWcSNuV0Useg",
    "_blank",
    "noopener,noreferrer"
  );
};
  return (
    <>
      <Navbar css={1}/>
      <main className="reserve-now" style={{backgroundImage:`url(${back})`}}>
        <section className="reserve-now-intro">
          <img src={fristImage} alt="" />
          <div>
            <h1>cria o teu<br/>
            batom e GLOSS<br/>
            no nosso<br/>
            laboratório</h1><br/>
            <button onClick={handleBookExperience}>quero agendar!</button>
          </div>
          
        </section>
        <section className="reserve-now-end">
          <div className="important-saberes">
            <h2>IMPORTANTE SABERES!</h2>

            <ul>
              <li>As reservas são recomendadas;</li>
              <li>Sem reserva, não garantimos o atendimento;</li>
              <li>
                Sugerimos agendar com antecedência para garantir disponibilidade;
              </li>
              <li>
                Oferecemos uma tolerância máxima de 10 minutos após o horário marcado:
                <br />
                Após esse tempo, o agendamento poderá ser reagendado conforme a
                disponibilidade.
              </li>
            </ul>

            <button><NavLink to="/experiencie">EXPERIÊNCIA E PREÇOS</NavLink></button>
          </div>
          <img src={secondImage} alt="" />
        </section>

      </main>
    </>
  )
}

export default ReserveNow