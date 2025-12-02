//Frecha
import Navbar from "../Navbar/navbar"
import "../scss/reserverNow.css"
import background_woman from "../assets/image-woman.png"
import background_colors from "../assets/background-colors.png"
import gloss from "../assets/gloss-2-image.png"
import { NavLink } from "react-router-dom"

function ReserveNow() {
  return (
    <>
      <Navbar css={1}/>
      <main className="reserve-now">
        <section className="reserve-now-intro" style={{
          backgroundImage: `url(${background_woman})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <div>
            <h2>QUERES VESTIR A BATA?</h2>
            <button>QUERO AGENDAR!</button>
          </div>
        </section>
        <section className="reserve-now-display">
          <div className="reserve-now-display-flex">
            <div className="reserve-now-display-div">
              <h3>IMPORTANTE SABERES!</h3>
              <p>{`As reservas são recomendadas 
                  Sem reserva, não garantimos o atendimento

                  Sugerimos agendar com antecedência 
                  para garantir disponibilidade

                  Oferecemos uma tolerância máxima de 10 minutos após o horário marcado
                  Após esse tempo, a sessão poderá ser reagendada, 
                  mas não poderá ser realizada no mesmo dia devido ao tempo limitado`}
              </p>
              <button><NavLink to="/experiencie">experiência e preços</NavLink></button>
            </div>
            <img src={gloss} alt="2 gloss da libs-lab" />
          </div>
          
          <div>
              <img src={background_colors} alt="colors" className="img-bck-colors"/>
          </div>
        </section>

      </main>
    </>
  )
}

export default ReserveNow