import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      {/* Left */}
      <div className="nav-left">
        <img
          className="logo"
          src="https://i.pinimg.com/1200x/f1/42/af/f142afb507415c1c4094bf28e9061a54.jpg"
          alt="logo"
        />
        <div className="brand">Med Track</div>
      </div>

      {/* Center */}
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/records">Records</Link>
      </div>

      {/* Right */}
      <div className="nav-actions">
        <div className="user-name">{user ? user.username : "User"}</div>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
