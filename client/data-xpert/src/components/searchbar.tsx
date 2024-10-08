"use client";
import type React from "react";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define types for search results
interface Company {
  sl_no: number;
  company: string;
  country: string;
  market_cap: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<Company[]>([]);
  const searchRef = useRef<HTMLDivElement | null>(null); // Type the ref correctly
  const router = useRouter();

  // Handle search query input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const BASE_API = process.env.NEXT_PUBLIC_API;

  const handleSearch = async () => {
    try {
      if (searchQuery.length < 1) {
        setFilteredResults([]);
        return;
      }
      const response = await axios.get<Company[]>(
        `${BASE_API}/api/company/search`,
        {
          params: { query: searchQuery },
        }
      );
      setFilteredResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // Handle search when the user presses Enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search when pressing "Enter"
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setFilteredResults([]); // Close the search results
      }
    };

    // Attach the click event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = (result: Company) => {
    const userId = localStorage.getItem("user_id");
    if (userId == null) router.push("/auth/login");
    else router.push(`/dashboard/${userId}/${result.sl_no}`);
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          className="w-full p-4 pl-12 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search companies"
          value={searchQuery}
          onChange={handleInputChange} // Update the search query state
          onKeyPress={handleKeyPress} // Handle search on "Enter" key press
        />
        <div className="absolute top-0 left-0 h-full flex items-center pl-4">
          <SearchIcon />
        </div>
      </div>

      {/* Results */}
      {filteredResults.length > 0 && (
        <div
          ref={searchRef}
          className="mt-4 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 z-10 h-64 overflow-y-auto"
        >
          <ul>
            {filteredResults.map((result) => (
              <li
                key={result.sl_no} // Use a unique identifier for the key
                className="border-b last:border-0 py-2 cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <p className="font-semibold">{result.company}</p>
                <p className="text-sm text-gray-500">
                  {result.country} • market cap {result.market_cap}
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
