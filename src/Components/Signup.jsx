import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/"); // Redirect after signup
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#1a1a1a"
    }}>
      <div style={{
        width: "350px",
        padding: "20px",
        backgroundColor: "#2c2c2c",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "24px", color: "white", marginBottom: "10px" }}>Sign Up</h2>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#3b3b3b",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#3b3b3b",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          />
          <button
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
          >
            Sign Up
          </button>
        </form>
        <p style={{ color: "white", marginTop: "10px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#1e90ff", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
