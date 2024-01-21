import React from "react";

const Filters = ({ genres, selectedGenre, onGenreChange, watchProviders, selectedProvider, onProviderChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="p-2 border rounded-lg flex-1"
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
        className="p-2 border rounded-lg flex-1"
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