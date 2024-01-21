import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { isDarkMode } = useTheme(); 
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded disabled:opacity-50 ${
          isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200"
        }`}
      >
        Previous
      </button>
      <span className={`px-4 py-2 mx-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded disabled:opacity-50 ${
          isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
