import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "./App.css";
import Records from "./components/Records";

function App() {
  const token = Cookies.get("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((res) => setUser(res.data.user))
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        });
    }
  }, [token]);

  function onLogin({ token, user }) {
    Cookies.set("token", token);
    setUser(user);
  }

  function onLogout() {
    Cookies.remove("token");
    setUser(null);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Home token={token} user={user} onLogout={onLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login onLogin={onLogin} />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup onSignup={onLogin} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home token={token} user={user} onLogout={onLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="/records" element={token ? <Records user={user}/> : <Navigate to="/login"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
