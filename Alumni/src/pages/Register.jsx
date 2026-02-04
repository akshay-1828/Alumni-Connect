import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

const API_BASE = "http://localhost:3001"; // Node.js backend

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (data.success) {
        alert("Registration Successful! Please log in.");
        navigate("/");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server offline or network issue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reg-container">
      <div className="reg-box">
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={updateForm}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={updateForm}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={updateForm}
            required
          />

          <select name="role" onChange={updateForm} required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={updateForm}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
