import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h1>📚 Learn from any URL</h1>
      <input
        type="text"
        placeholder="https://example.com/article"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />
      <button onClick={handleStart} style={{ marginTop: 10 }}>
        Generate
      </button>
    </div>
  );
}
