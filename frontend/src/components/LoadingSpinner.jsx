import React from "react";
import { useTheme } from "../contexts/ThemeContext.jsx"; 

const LoadingSpinner = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? "border-white" : "border-gray-900"}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
