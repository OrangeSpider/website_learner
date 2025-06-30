import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCookie, getCookie } from "../cookies";

export default function Home() {
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState(getCookie("openai_key") || "");
  const navigate = useNavigate();

  const handleStart = () => {
    setCookie("openai_key", apiKey, 7);
    navigate("/quiz");
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
      <input
        type="password"
        placeholder="OpenAI API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleStart}>Generate</button>
    </div>
  );
}
