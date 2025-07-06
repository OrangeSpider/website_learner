import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
        <Link to="/register" style={{ color: "#fff" }}>
          Register
        </Link>
      </div>
    </div>
  );
}
