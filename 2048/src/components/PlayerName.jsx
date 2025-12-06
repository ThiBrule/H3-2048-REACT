import { useState } from "react";

export default function PlayerName({ onSave }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    localStorage.setItem("playerName", name);
    onSave(name);
  }

  return (
    <div className="name-overlay">
      <div className="name-box">
        <h3>Entre ton pseudo</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ton pseudo"
          />

          <button type="submit" className="styled-btn">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
