import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import mockUp from "../assets/kissing-batom.png"
import "../scss/Faq.css"
import bckLibs from "../assets/libs back.png"
import ribbonImg from "../assets/ribbon fqa.png"

const faqItems = [
  {
    question: 'É necessário fazer reserva? Qual a duração da experiência?',
    answers: [
      'Sim. As reservas são recomendadas para garantir o teu horário, uma vez que o serviço é personalizado e requer preparação prévia.',
      'Aceitamos clientes sem reserva apenas mediante disponibilidade.',
      'A experiência tem uma duração média de 45 minutos, variando conforme o tipo de serviço e número de pessoas.',
    ],
  },
  {
    question: 'O pagamento é antecipado?',
    answers: [
      'Não. O pagamento é feito no final da experiência, após a criação do teu produto.',
    ],
  },
  {
    question: 'Vou realmente criar o meu próprio batom ou lip gloss?',
    answers: [
      'Sim! Na Lips Lab és tu quem cria o teu próprio batom ou lip gloss. És tu que misturas os pigmentos, defines o acabamento e o aroma, tudo feito com as tuas mãos, com o apoio da nossa equipa.',
    ],
  },
  {
    question: 'Posso personalizar a embalagem?',
    answers: [
      'Sim! Podes gravar o teu nome, uma palavra ou um símbolo na embalagem.',
      'Frases ou expressões inapropriadas não são permitidas.',
    ],
  },
  {
    question: 'Posso reagendar ou alterar a minha reserva?',
    answers: [
      'Sim, é possível reagendar ou alterar a reserva. Sabemos que imprevistos acontecem, por isso fazemos o possível para encontrar um novo horário disponível que se ajuste a ti.',
      'Oferecemos uma tolerância máxima de 10 minutos após o horário marcado. Se chegares depois desse tempo, poderás reagendar para outro momento, podendo não ser possível realizar o serviço no mesmo dia devido à sua duração.',
    ],
  },
  {
    question: 'Política de cancelamento e reembolso',
    answers: [
      'As reservas podem ser canceladas e são reembolsáveis.',
      'Caso precises de cancelar, pedimos apenas que nos informes o quanto antes, para podermos disponibilizar o horário a outro cliente.',
    ],
  },
  {
    question: 'Quais são os ingredientes dos produtos?',
    answers: [
      'Os produtos da Lips Lab são criados a partir de ingredientes premium, naturais e seguros, selecionados para garantir qualidade, conforto e hidratação.',
      'Todas as fórmulas são vegan, cruelty-free, sem parabenos, sem glúten e sem talco.',
    ],
  },
  {
    question: 'E se eu não puder ir à loja física?',
    answers: [
      'Podes viver a experiência online, criando o teu batom ou gloss personalizado através do telemóvel ou computador.',
      'Descobre tudo na página "Experiência Online" e leva o laboratório até ti!',
    ],
  },
]

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
            Aqui encontras respostas às perguntas mais frequentes — desde como funciona a personalização até aos prazos de entrega e cuidados com o teu produto. Explora e prepara-te para viver a tua experiência de beleza, sem segredos.
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
