import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quiz } from "../quizData";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const navigate = useNavigate();

  const question = quiz[step];

  const handleNext = () => {
    if (choice === null) return;
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    setChoice(null);
    if (step + 1 < quiz.length) {
      setStep(step + 1);
    } else {
      navigate("/result", { state: { answers: newAnswers } });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>
        Question {step + 1} of {quiz.length}
      </h2>
      <p>{question.question}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {question.options.map((opt, idx) => (
          <li key={idx} style={{ marginBottom: "8px" }}>
            <label>
              <input
                type="radio"
                name="option"
                checked={choice === idx}
                onChange={() => setChoice(idx)}
                style={{ marginRight: "4px" }}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>Next →</button>
    </div>
  );
}
