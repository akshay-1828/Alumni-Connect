import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const API_BASE = "http://localhost:3001"; // Node backend

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server offline or network issue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={updateForm}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={updateForm}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
