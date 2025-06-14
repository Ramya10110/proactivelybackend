import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-title">RAMYA'S FORMS</div>
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/register">Register</NavLink>}
        {user && user.role === "admin" && <NavLink to="/create">Create Form</NavLink>}
        {user && user.role === "user" && <NavLink to="/join">Join Form</NavLink>}
        {user && <NavLink to="/collab">Collaborative Form</NavLink>}
        {user && <button className="logout-btn" onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default NavBar;
