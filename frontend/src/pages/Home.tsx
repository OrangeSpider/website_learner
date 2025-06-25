import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
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
      <button onClick={handleStart}>Generate</button>
    </div>
  );
}
