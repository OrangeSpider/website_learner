import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Question } from "../quizData";

export default function Quiz() {
  const { state } = useLocation() as { state: { quiz: Question[] } };
  const quiz = state?.quiz || [];
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
      navigate("/result", { state: { answers: newAnswers, quiz } });
    }
  };

  return (
    <div className="container">
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
