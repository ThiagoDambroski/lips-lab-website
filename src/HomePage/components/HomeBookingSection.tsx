import daniAndFriend from "../../assets/dani e friend.jpg";
import { openBookingPage } from "../../utils/booking";

export default function HomeBookingSection() {
  return (
    <section className="home-marca-ex" aria-label="Reserva da experiência Lips Lab">
      <div style={{ backgroundImage: `url(${daniAndFriend})` }}>
        <button type="button" onClick={openBookingPage}>
          MARCA JÁ A TUA EXPERIÊNCIA
        </button>
      </div>
    </section>
  );
}
