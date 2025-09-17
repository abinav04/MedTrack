import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {

  return (
    <nav className="navbar">
      <img className="logo" src="https://i.pinimg.com/1200x/f1/42/af/f142afb507415c1c4094bf28e9061a54.jpg" />
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
