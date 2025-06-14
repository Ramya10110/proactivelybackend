import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminFormBuilder from "./components/AdminFormBuilder";
import JoinForm from "./components/JoinForm";
import CollaborativeForm from "./components/CollaborativeForm";
import NavBar from "./components/NavBar";
import CenterVideo from "./components/CenterVideo";
import './app.css';

function AppWrapper() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (tok, usr) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem("token", tok);
    localStorage.setItem("user", JSON.stringify(usr));
    // Redirect after login based on role
    if (usr.role === "admin") {
      navigate("/create");
    } else {
      navigate("/join");
    }
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    setForm(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <div className="app-bg" style={{paddingTop: "5.5rem"}}>
        <div className="form-container">
          <Routes>
            <Route path="/" element={<CenterVideo />} />
            <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register onRegister={() => {}} /> : <Navigate to="/" />} />
            <Route path="/create" element={user && user.role === "admin" ? <AdminFormBuilder token={token} /> : <Navigate to="/" />} />
            <Route path="/join" element={user && user.role === "user" ? <JoinForm token={token} onJoin={setForm} /> : <Navigate to="/" />} />
            <Route path="/collab" element={user && form ? <CollaborativeForm form={form} user={user} token={token} /> : <Navigate to="/" />} />
            <Route path="*" element={<CenterVideo />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
