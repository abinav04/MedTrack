import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "./Login.css"
export default function Login({onLogin}) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
      const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
      setError("");
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
        onLogin(res.data);
        console.log(res.data);
        navigate("/home")
        
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    }
    
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Please login to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <a href="/signup" className="auth-link">
          Don’t have an account? Sign Up
        </a>
      </div>
    </div>
  );
}
