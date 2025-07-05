import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Question } from "../quizData";

export default function Quiz() {
  const { state } = useLocation() as { state: { quiz: Question[] } };
  const quiz = state?.quiz || [];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [choice, setChoice] = useState<number[]>([]);
  const navigate = useNavigate();

  const question = quiz[step];
  const toggleChoice = (idx: number) => {
    setChoice((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleNext = () => {
    const question = quiz[step];
    if (question.multiple) {
      if (choice.length === 0) return;
    } else {
      if (choice.length !== 1) return;
    }

    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    setChoice([]);
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
                type={question.multiple ? "checkbox" : "radio"}
                name="option"
                checked={
                  question.multiple ? choice.includes(idx) : choice[0] === idx
                }
                onChange={() =>
                  question.multiple
                    ? toggleChoice(idx)
                    : setChoice([idx])
                }
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
