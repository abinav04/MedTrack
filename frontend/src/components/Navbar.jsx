import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar({ user, onSearch, onLogout }) {
  const [query, setQuery] = useState("");

  return (
    <nav className="navbar">
      <div className="brand">Med Track</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/records">Records</Link>
      </div>
      <div className="nav-actions">
        <div className="user-name">{user ? user.username : "User"}</div>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
