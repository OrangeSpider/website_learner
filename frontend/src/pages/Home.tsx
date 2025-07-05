import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "/api";

  const handleStart = async () => {
    setError("");
    try {
      const response = await fetch(`${API_BASE}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          num_questions: numQuestions,
          allow_multiple: allowMultiple,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        setError(`Error ${response.status}: ${text}`);
        return;
      }
      const data = await response.json();
      navigate("/quiz", { state: { quiz: data.questions } });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="container">
      <h1>📚 Learn from any URL</h1>
      <input
        type="text"
        placeholder="https://example.com/article"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <label>
        Number of questions:
        <input
          type="number"
          min={3}
          max={6}
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={allowMultiple}
          onChange={(e) => setAllowMultiple(e.target.checked)}
        />
        Allow multiple answers
      </label>
      <button onClick={handleStart} disabled={!url}>
        Generate
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
