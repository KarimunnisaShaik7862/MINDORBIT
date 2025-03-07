import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Topbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="topbar">
      <h2 className="topbar-title">Hey Student, Ready to Conquer Today? 🚀</h2>
      <div className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? (
          <FaMoon className="theme-icon moon-icon" />
        ) : (
          <FaSun className="theme-icon sun-icon" />
        )}
      </div>
    </div>
  );
};

export default Topbar;