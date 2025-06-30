import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCookie, getCookie } from "../cookies";

export default function Home() {
  const storedKey = getCookie("openai_key") || "";
  const [step, setStep] = useState(storedKey ? 2 : 1);
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState(storedKey);
  const navigate = useNavigate();

  const handleSaveKey = () => {
    if (!apiKey) return;
    setCookie("openai_key", apiKey, 7);
    setStep(2);
  };

  const handleStart = async () => {
    const response = await fetch("http://localhost:8000/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, url }),
    });
    const data = await response.json();
    navigate("/quiz", { state: { quiz: data.questions } });
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
        </>
      )}
    </div>
  );
}
