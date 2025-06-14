import React, { useState } from "react";
import { register } from "../api";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await register({ username, password, role });
      setMsg("Registration successful! Please login.");
    } catch (e) {
      setErr(e.response?.data?.message || "Register failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
