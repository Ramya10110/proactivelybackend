import React, { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await login({ username, password });
      onLogin(res.data.token, res.data.user);
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
