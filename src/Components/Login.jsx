import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to home after login
    } catch (err) {
      setError("Failed to login. Check credentials.");
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
        <h2 style={{ fontSize: "24px", color: "white", marginBottom: "10px" }}>Login</h2>
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
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            Login
          </button>
        </form>
        <p style={{ color: "white", marginTop: "10px" }}>
          Don't have an account?{" "}
            Sign Up from above top right 
        </p>
      </div>
    </div>
  );
}
