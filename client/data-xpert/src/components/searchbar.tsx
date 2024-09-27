"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const movies = [
    { title: "Hello!", type: "TV", year: "2022" },
    { title: "Hello", type: "Movie", year: "2022" },
    { title: "Hello, Me!", type: "TV", year: "2021" },
    { title: "Hello Brother", type: "Movie", year: "2005" },
    { title: "Hello, Bookstore", type: "Documentary", year: "2021" },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          className="w-full p-4 pl-12 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search movies, TV shows, and more..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="absolute top-0 left-0 h-full flex items-center pl-4">
          <SearchIcon />
        </div>
      </div>

      {/* Results */}
      {filteredResults.length > 0 && (
        <div className="mt-4 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 z-10">
          <ul>
            {filteredResults.map((result, index) => (
              <li key={index} className="border-b last:border-0 py-2">
                <p className="font-semibold">{result.title}</p>
                <p className="text-sm text-gray-500">
                  {result.year} • {result.type}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
