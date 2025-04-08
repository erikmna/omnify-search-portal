
import React, { useState } from "react";
import { Search, Mic, Camera } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would redirect to search results
    console.log("Search query:", query);
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3 px-12 border border-gray-200 rounded-full shadow-sm hover:shadow-md focus:outline-none focus:shadow-md transition-shadow duration-200"
            placeholder="Search Google or type a URL"
          />
          <div className="absolute right-4 flex items-center space-x-3">
            <button type="button" className="text-blue-500 focus:outline-none">
              <Mic size={20} />
            </button>
            <button type="button" className="text-blue-500 focus:outline-none">
              <Camera size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
