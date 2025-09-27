import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import "../styles/styles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:2501/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <div className="input-icon">
            <FaEnvelope />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="input-group">
          <label>Password</label>
          <div className="input-icon">
            <FaLock />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button type="submit" className="primary">Login</button>
        <button type="button" className="secondary" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
