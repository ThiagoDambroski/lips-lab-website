import type { FaqItem } from "../../data/faqItems";

type FaqQuestionItemProps = {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
};

export default function FaqQuestionItem({ item, index, isOpen, onToggle }: FaqQuestionItemProps) {
  const answerId = `faq-answer-${index}`;

  return (
    <li className={`faq-item ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="faq-question-header"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => onToggle(index)}
      >
        <p>{item.question}</p>
        <span className="faq-toggle" aria-hidden="true">
          +
        </span>
      </button>

      <div id={answerId} className={`faq-answer ${isOpen ? "is-open" : ""}`}>
        <ol>
          {item.answers.map((answer) => (
            <li key={answer}>{answer}</li>
          ))}
        </ol>
      </div>
    </li>
  );
}
