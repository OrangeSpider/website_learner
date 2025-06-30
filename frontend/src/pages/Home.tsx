import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCookie, getCookie } from "../cookies";

export default function Home() {
  const storedKey = getCookie("openai_key") || "";
  const [step, setStep] = useState(storedKey ? 2 : 1);
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState(storedKey);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSaveKey = () => {
    if (!apiKey) return;
    setCookie("openai_key", apiKey, 7);
    setStep(2);
  };

  const API_BASE = import.meta.env.VITE_API_URL || "";

  const handleStart = async () => {
    setError("");
    try {
      const response = await fetch(`${API_BASE}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, url }),
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
      {step === 1 && (
        <>
          <h1>Enter OpenAI API Key</h1>
          <input
            type="password"
            placeholder="OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button onClick={handleSaveKey} disabled={!apiKey}>
            Continue
          </button>
        </>
      )}
      {step === 2 && (
        <>
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
        </>
      )}
    </div>
  );
}
