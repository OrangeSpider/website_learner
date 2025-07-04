import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "";

  const handleStart = async () => {
    setError("");
    try {
      const response = await fetch(`${API_BASE}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
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
      <button onClick={handleStart} disabled={!url}>
        Generate
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
