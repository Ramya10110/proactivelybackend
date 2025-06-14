import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import { getFormResponse } from "../api";

export default function CollaborativeForm({ form, user, token }) {
  const [values, setValues] = useState({});
  const [locked, setLocked] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.connect();
    socket.emit("joinForm", { formId: form.id, userId: user.id });

    socket.on("initForm", (vals) => setValues(vals || {}));
    socket.on("fieldUpdated", ({ fieldName, value, userId: uid }) => {
      setValues(v => ({ ...v, [fieldName]: value }));
      setLocked(l => ({ ...l, [fieldName]: uid }));
    });
    socket.on("fieldUnlocked", ({ fieldName }) => {
      setLocked(l => {
        const copy = { ...l };
        delete copy[fieldName];
        return copy;
      });
    });
    socket.on("lockError", ({ fieldName }) => {
      setMsg(`Field "${fieldName}" is locked by another user.`);
      setTimeout(() => setMsg(""), 2000);
    });

    return () => {
      socket.disconnect();
      socket.off("initForm");
      socket.off("fieldUpdated");
      socket.off("fieldUnlocked");
      socket.off("lockError");
    };
  }, [form, user]);

  const handleChange = (field, value) => {
    socket.emit("editField", { formId: form.id, fieldName: field.name, value, userId: user.id });
  };

  const handleBlur = (field) => {
    socket.emit("unlockField", { formId: form.id, fieldName: field.name, userId: user.id });
  };

  return (
    <div>
      <h2>Collaborative Form: {form.name}</h2>
      {msg && <div style={{ color: "red" }}>{msg}</div>}
      <form>
        {form.fields.map((field, i) => (
          <div key={i}>
            <label>{field.label}:</label>
            {field.type === "dropdown" ? (
              <select
                value={values[field.name] || ""}
                disabled={locked[field.name] && locked[field.name] !== user.id}
                onChange={e => handleChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
              >
                <option value="">Select</option>
                {field.options.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={values[field.name] || ""}
                disabled={locked[field.name] && locked[field.name] !== user.id}
                onChange={e => handleChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
              />
            )}
            {locked[field.name] && locked[field.name] !== user.id && (
              <span style={{ color: "orange" }}>Locked by another user</span>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
