export type FaqItem = {
  question: string;
  answers: string[];
};

export const faqItems: FaqItem[] = [
  {
    question: "É necessário fazer reserva? Qual a duração da experiência?",
    answers: [
      "Sim. As reservas são recomendadas para garantir o teu horário, uma vez que o serviço é personalizado e requer preparação prévia.",
      "A experiência tem uma duração média de 45 minutos.",
    ],
  },
  {
    question: "O pagamento é antecipado?",
    answers: [
      "Sim. O pagamento é antecipado, de forma a garantir a reserva do horário e a preparação da experiência.",
    ],
  },
  {
    question: "Vou criar o meu próprio batom ou gloss labial?",
    answers: [
      "Sim! Aqui, és tu quem faz tudo, com o apoio da nossa equipa ao longo da experiência.",
      "Veste a bata e cria o teu próprio batom ou gloss labial no laboratório Lips Lab.",
    ],
  },
  {
    question: "Posso personalizar a embalagem?",
    answers: [
      "Sim! Podes gravar o teu nome, uma palavra ou um símbolo na embalagem e adicionar charms decorativos, tornando a tua embalagem única.",
      "Frases ou expressões inapropriadas não são permitidas.",
    ],
  },
  {
    question: "Posso reagendar ou alterar a minha reserva?",
    answers: [
      "Sim, é possível reagendar ou alterar a tua reserva. Sabemos que imprevistos acontecem, por isso fazemos o possível para encontrar um novo horário disponível que se ajuste a ti.",
      "Existe uma tolerância máxima de 10 minutos após o horário marcado. Caso chegues depois desse tempo, poderás reagendar para outro momento, podendo não ser possível realizar o serviço no mesmo dia devido à sua duração.",
    ],
  },
  {
    question: "Política de cancelamento e reembolso",
    answers: [
      "As reservas não são canceláveis nem reembolsáveis. É possível reagendar para outro momento, mas não será efetuado qualquer reembolso.",
      "Caso aconteça um imprevisto no próprio dia, a reserva pode ser cancelada, sendo obrigatório o reagendamento, não sendo possível a devolução do valor pago.",
    ],
  },
  {
    question: "Quais são os ingredientes dos produtos?",
    answers: [
      "Os nossos produtos são feitos com ceras vegetais puras e ingredientes botânicos e minerais cuidadosamente selecionados.",
      "As fórmulas incluem óleos de jojoba, macadâmia e abacate, manteiga de karité, aloe vera e vitamina E, ingredientes que ajudam a manter os lábios bonitos, saudáveis e protegidos.",
      "Todas as bases contêm FPS e vitamina E, são vegan, cruelty-free e sem glúten, garantindo qualidade, segurança e cuidado em cada criação.",
    ],
  },
  {
    question: "E se eu não puder ir à loja física?",
    answers: [
      "Podes viver a experiência online, criando o teu batom ou gloss personalizado através do telemóvel ou computador.",
      "Descobre tudo na página “Experiência Online” e leva o laboratório até ti!",
    ],
  },
];
