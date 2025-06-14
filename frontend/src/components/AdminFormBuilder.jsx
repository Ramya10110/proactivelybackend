import React, { useState } from "react";
import { createForm, getAdminForms } from "../api";

export default function AdminFormBuilder({ token }) {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [field, setField] = useState({ label: "", name: "", type: "text", options: "" });
  const [forms, setForms] = useState([]);
  const [msg, setMsg] = useState("");

  const addField = () => {
    if (!field.label || !field.name) return;
    setFields([...fields, { ...field, options: field.options ? field.options.split(",") : undefined }]);
    setField({ label: "", name: "", type: "text", options: "" });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await createForm({ name, fields }, token);
      setMsg(`Form created! Invite code: ${res.data.form.inviteCode}`);
      setFields([]);
      setName("");
      loadForms();
    } catch (e) {
      setMsg(e.response?.data?.message || "Error creating form");
    }
  };

  const loadForms = async () => {
    const res = await getAdminForms(token);
    setForms(res.data.forms);
  };

  React.useEffect(() => { loadForms(); }, [token]);

  return (
    <div>
      <h2>Create Form</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Form Name" value={name} onChange={e=>setName(e.target.value)} required />
        <h4>Add Field</h4>
        <input placeholder="Label" value={field.label} onChange={e=>setField(f=>({...f, label: e.target.value}))} required />
        <input placeholder="Name" value={field.name} onChange={e=>setField(f=>({...f, name: e.target.value}))} required />
        <select value={field.type} onChange={e=>setField(f=>({...f, type: e.target.value}))}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="dropdown">Dropdown</option>
        </select>
        {field.type === "dropdown" && (
          <input placeholder="Options (comma separated)" value={field.options} onChange={e=>setField(f=>({...f, options: e.target.value}))} />
        )}
        <button type="button" onClick={addField}>Add Field</button>
        <div>
          {fields.map((f, i) => <div key={i}>{f.label} ({f.type})</div>)}
        </div>
        <button type="submit">Create Form</button>
      </form>
      <div>
        {msg && <div>{msg}</div>}
        <h3>Your Forms</h3>
        <ul>
          {forms.map(f => <li key={f.id}>{f.name} - Invite code: {f.inviteCode}</li>)}
        </ul>
      </div>
    </div>
  );
}
