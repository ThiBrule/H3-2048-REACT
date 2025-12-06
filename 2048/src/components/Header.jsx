import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ onPause, onRestart }) {
  const location = useLocation();
  const navigate = useNavigate();

  const showBack = location.pathname !== "/";
  const isGamePage = location.pathname.startsWith("/game");

  // THEME STATE
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <header className="header">

      {/* Bouton retour */}
      {showBack && (
        <button className="styled-btn back-btn" onClick={() => navigate("/")}>
          ← Retour
        </button>
      )}

      <h1 className="title">Fusioncraft</h1>

      {isGamePage && (
        <>
          <button className="styled-btn" onClick={onPause}> Pause</button>

          <button className="styled-btn" onClick={onRestart}>
             Recommencer
          </button>
        </>
      )}

      {/* Theme toggle */}
      <button className="styled-btn theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "Mode Sombre" : "Mode Clair"}
      </button>
    </header>
  );
}
