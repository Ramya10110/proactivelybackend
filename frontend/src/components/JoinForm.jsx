import React, { useState } from "react";
import { joinForm } from "../api";

export default function JoinForm({ token, onJoin }) {
  const [inviteCode, setInviteCode] = useState("");
  const [err, setErr] = useState("");

  const handleJoin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await joinForm(inviteCode, token);
      onJoin(res.data.form);
    } catch (e) {
      setErr(e.response?.data?.message || "Join failed");
    }
  };

  return (
    <form onSubmit={handleJoin}>
      <h2>Join Form</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <input placeholder="Invite Code" value={inviteCode} onChange={e=>setInviteCode(e.target.value)} required />
      <button type="submit">Join</button>
    </form>
  );
}
