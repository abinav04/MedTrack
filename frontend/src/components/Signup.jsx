// src/components/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://medtrack-8oj5.onrender.com/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      onSignup(res.data);
      console.log("✅ Signup success:", res.data);
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account ✨</h2>
        <p>Join us and manage your medical details</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <a href="/login" className="auth-link">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
}

export default Signup;
