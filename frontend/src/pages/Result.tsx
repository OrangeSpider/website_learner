import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "../quizData";

interface LocationState {
  answers: number[][];
  quiz: Question[];
}

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };
  const answers = state?.answers || [];
  const quiz = state?.quiz || [];

  const score = answers.reduce((acc, ans, idx) => {
    const correct = quiz[idx].answers;
    const isCorrect =
      ans.length === correct.length && ans.every((i) => correct.includes(i));
    return isCorrect ? acc + 1 : acc;
  }, 0);

  return (
    <div className="container">
      <h1>
        🎉 You scored {score} out of {quiz.length}!
      </h1>
      <ul>
        {quiz.map((q, idx) => {
          const userAns = answers[idx] || [];
          const isCorrect =
            userAns.length === q.answers.length &&
            userAns.every((i) => q.answers.includes(i));
          return (
            <li key={idx} style={{ marginBottom: "12px" }}>
              <p>{q.question}</p>
              <p>
                {isCorrect ? "✔️" : "❌"} Correct: {q.answers.map((i) => q.options[i]).join(", ")} —
                Your answer: {userAns.length ? userAns.map((i) => q.options[i]).join(", ") : "N/A"}
              </p>
            </li>
          );
        })}
      </ul>
      <button onClick={() => navigate("/")}>Try Another URL</button>
    </div>
  );
}
