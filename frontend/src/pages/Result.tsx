import { useLocation, useNavigate } from "react-router-dom";
import { quiz } from "../quizData";

interface LocationState {
  answers: number[];
}

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };
  const answers = state?.answers || [];

  const score = answers.reduce(
    (acc, ans, idx) => (ans === quiz[idx].answer ? acc + 1 : acc),
    0,
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>
        🎉 You scored {score} out of {quiz.length}!
      </h1>
      <ul>
        {quiz.map((q, idx) => (
          <li key={idx} style={{ marginBottom: "12px" }}>
            <p>{q.question}</p>
            <p>
              {answers[idx] === q.answer ? "✔️" : "❌"} Correct:{" "}
              {q.options[q.answer]} — Your answer:{" "}
              {answers[idx] !== undefined ? q.options[answers[idx]] : "N/A"}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Try Another URL</button>
    </div>
  );
}
