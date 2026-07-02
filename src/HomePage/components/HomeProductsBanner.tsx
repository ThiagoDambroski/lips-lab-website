import ourProductsBanner from "../../assets/ourProducts.svg";

export default function HomeProductsBanner() {
  return (
    <section className="home-banner" aria-labelledby="home-products-title">
      <h2 id="home-products-title">OS NOSSOS PRODUTOS SÃO</h2>
      <p>feitos com ceras vegetais puras, ingredientes botânicos e minerais</p>
      <img
        src={ourProductsBanner}
        className="home-banner-icons"
        alt="Ícones dos principais benefícios dos produtos Lips Lab"
        loading="lazy"
       decoding="async" />
    </section>
  );
}
