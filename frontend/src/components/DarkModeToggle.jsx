import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;