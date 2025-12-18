import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import mockUp from "../assets/fqaImage.svg"
import "../scss/Faq.css"
import bckLibs from "../assets/libs back.png"
import ribbonImg from "../assets/perguntasFrequentes.svg"

const faqItems = [
  {
    question: 'É necessário fazer reserva? Qual a duração da experiência?',
    answers: [
      'Sim. As reservas são recomendadas para garantir o teu horário, uma vez que o serviço é personalizado e requer preparação prévia.',
      'A experiência tem uma duração média de 45 minutos.',
    ],
  },
  {
    question: 'O pagamento é antecipado?',
    answers: [
      'Sim. O pagamento é antecipado, de forma a garantir a reserva do horário e a preparação da experiência.',
    ],
  },
  {
    question: 'Vou criar o meu próprio batom ou gloss labial?',
    answers: [
      'Sim! Aqui, és tu quem faz tudo, com o apoio da nossa equipa ao longo da experiência.',
      'Veste a bata e cria o teu próprio batom ou gloss labial no laboratório Lips Lab.',
    ],
  },
  {
    question: 'Posso personalizar a embalagem?',
    answers: [
      'Sim! Podes gravar o teu nome, uma palavra ou um símbolo na embalagem e adicionar charms decorativos, tornando a tua embalagem única.',
      'Frases ou expressões inapropriadas não são permitidas.',
    ],
  },
  {
    question: 'Posso reagendar ou alterar a minha reserva?',
    answers: [
      'Sim, é possível reagendar ou alterar a tua reserva. Sabemos que imprevistos acontecem, por isso fazemos o possível para encontrar um novo horário disponível que se ajuste a ti.',
      'Existe uma tolerância máxima de 10 minutos após o horário marcado. Caso chegues depois desse tempo, poderás reagendar para outro momento, podendo não ser possível realizar o serviço no mesmo dia devido à sua duração.',
    ],
  },
  {
    question: 'Política de cancelamento e reembolso',
    answers: [
      'As reservas não são canceláveis nem reembolsáveis. É possível reagendar para outro momento, mas não será efetuado qualquer reembolso.',
      'Caso aconteça um imprevisto no próprio dia, a reserva pode ser cancelada, sendo obrigatório o reagendamento, não sendo possível a devolução do valor pago.',
    ],
  },
  {
    question: 'Quais são os ingredientes dos produtos?',
    answers: [
      'Os nossos produtos são feitos com ceras vegetais puras e ingredientes botânicos e minerais cuidadosamente selecionados.',
      'As fórmulas incluem óleos de jojoba, macadâmia e abacate, manteiga de karité, aloe vera e vitamina E, ingredientes que ajudam a manter os lábios bonitos, saudáveis e protegidos.',
      'Todas as bases contêm FPS e vitamina E, são vegan, cruelty-free e sem glúten, garantindo qualidade, segurança e cuidado em cada criação.',
    ],
  },
  {
    question: 'E se eu não puder ir à loja física?',
    answers: [
      'Podes viver a experiência online, criando o teu batom ou gloss personalizado através do telemóvel ou computador.',
      'Descobre tudo na página “Experiência Online” e leva o laboratório até ti!',
    ],
  },
];


function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <>
      <Navbar css={1} />

      <main className="faq">
        <section className="faq-intro">
          <h1>Tens dúvidas?</h1>
          <p>
            Aqui encontras respostas às perguntas<br/> mais frequentes.<br/>
Desde como funciona a personalização até<br/> aos prazos de entrega e aos cuidados com<br/> o teu produto.<br/><br/>

 Explora e prepara-te para viver a tua<br/> experiência, sem segredos
          </p>
        </section>
        <img src={ribbonImg} alt=""  className='ribbon-image'/>
        <section className="faq-question">
          <img src={mockUp} alt="" />
          <div className='faq-question-container'>
            <h3>faq</h3>

            <ul>
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index

                return (
                  <li key={index} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-header"
                      onClick={() => toggleItem(index)}
                    >
                      <p>{item.question}</p>
                      <span className="faq-toggle">+</span>
                    </button>

                    <div className={`faq-answer ${isOpen ? 'is-open' : ''}`}>
                      <ol>
                        {item.answers.map((answer, i) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ol>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          
        </section>
        <section className='faq-still-questions' style={{ backgroundImage: `url(${bckLibs})` }}>
            <div>
              <h1>A TUA DÚVIDA NÃO FOI RESPONDIDA?</h1>
              <button onClick={() => window.location.href = "mailto:lipslab.co@gmail.com"}>
                <p>ENVIA-NOS UM EMAIL COM A TUA PERGUNTA E NÓS TE AJUDAMOS!</p>
                <span>lipslab.co@gmail.com</span>
              </button>
            </div>  
        </section>
      </main>
    </>
  )
}

export default Faq
