import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="p-2 border rounded-lg flex-1"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Search
      </button>
    </form>
  );
};

export default SearchBar;