import React from "react";
import { useTheme } from "../contexts/ThemeContext"; 

const Filters = ({ genres, selectedGenre, onGenreChange, watchProviders, selectedProvider, onProviderChange }) => {
  const { isDarkMode } = useTheme(); 

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className={`p-2 border rounded-lg flex-1 ${
          isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900"
        }`}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        value={selectedProvider}
        onChange={(e) => onProviderChange(e.target.value)}
        className={`p-2 border rounded-lg flex-1 ${
          isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900"
        }`}
      >
        <option value="">All Providers</option>
        {watchProviders.map((provider) => (
          <option key={provider.provider_id} value={provider.provider_id}>
            {provider.provider_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
