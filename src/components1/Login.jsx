import { useState } from "react";
import "./Style.css"; // Importing CSS for styling

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.token);
      } else {
        setError("Invalid credentials! Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please check your internet connection.");
      console.error("Login failed", error);
    }
  };

  return (
    <div className="cyberpunk-container">
    <div className="login-card">
      <h2 className="neon-text">Login</h2>
      <input
        type="email"
        className="neon-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="neon-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="glitch-button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  </div>
  );
};

export default Login;
