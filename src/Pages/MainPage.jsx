import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage.js";
// Add keyframes for animations
import "./animations.css";

function MainPage() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
  const url = `https://rickandmortyapi.com/api/character?page=${page}`;
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", { hour12: true });
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      setTotalPages(data.info.pages);
      console.log(totalPages);
      setDetails(data.results);
    } catch (error) {
      console.log("error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [loading, page]);

  // Filter and sort characters
  useEffect(() => {
    if (details.length > 0) {
      let result = [...details];

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(
          (character) =>
            character.name.toLowerCase().includes(searchLower) ||
            character.species.toLowerCase().includes(searchLower) ||
            character.status.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      result.sort((a, b) => {
        let valueA, valueB;

        // Determine which property to sort by
        switch (sortBy) {
          case "name":
            valueA = a.name;
            valueB = b.name;
            break;
          case "species":
            valueA = a.species;
            valueB = b.species;
            break;
          case "status":
            valueA = a.status;
            valueB = b.status;
            break;
          default:
            valueA = a.name;
            valueB = b.name;
        }

        // Compare the values
        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });

      setFilteredDetails(result);
    }
  }, [details, search, sortBy, sortOrder]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle sort selection change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="flex flex-col items-center portal-loader">
          <div className="w-20 h-20 border-8 border-green-500 border-t-blue-500 border-r-purple-500 border-b-yellow-500 rounded-full animate-spin mb-4 shadow-lg"></div>
          <p
            className={`text-lg font-semibold loading-text ${
              theme === "dark" ? "text-green-400" : "text-green-600"
            }`}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-gray-100 to-green-50 text-gray-800"
      }`}
    >
      <header
        className={`w-full text-white text-center py-5 shadow-lg animate-fadeIn transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-900 via-gray-800 to-blue-900"
            : "bg-gradient-to-r from-blue-600 via-green-600 to-blue-600"
        }`}
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 animate-pulse">
          Rick and Morty Characters
        </h1>
        <p className="text-sm mt-2 italic animate-fadeIn">
          Explore the multiverse one character at a time
        </p>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`mt-2 px-4 py-2 rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-glow ${
            theme === "dark"
              ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-800 hover:from-yellow-400 hover:to-orange-400"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500"
          }`}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Search and Sort Controls */}
        <div
          className={`mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 ${
            theme === "dark" ? "text-gray-200" : "text-white"
          } animate-slideDown`}
        >
          <div className="flex items-center shadow-lg">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search characters..."
              className={`px-4 py-2 rounded-l-lg outline-none transition-all duration-300 focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500 border-2 border-gray-700"
                  : "bg-white text-gray-800 placeholder-gray-500 focus:ring-green-400 border-2 border-blue-300"
              }`}
            />
            <button
              onClick={() => setSearch("")}
              className={`px-3 py-2 transition-all duration-300 transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-green-600 hover:bg-green-500"
              } rounded-r-lg`}
            >
              {search ? "✖" : "🔍"}
            </button>
          </div>

          <div className="flex items-center shadow-lg">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className={`px-4 py-2 rounded-l-lg outline-none transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-2 border-gray-700 focus:ring-2 focus:ring-purple-500"
                  : "bg-white text-gray-800 border-2 border-blue-300 focus:ring-2 focus:ring-green-400"
              }`}
            >
              <option value="name">Name</option>
              <option value="species">Species</option>
              <option value="status">Status</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className={`px-3 py-2 transition-all duration-300 transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-purple-700 hover:bg-purple-600"
                  : "bg-green-600 hover:bg-green-500"
              } rounded-r-lg`}
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center align-baseline p-4 m-3 animate-fadeIn">
        {filteredDetails.length > 0 ? (
          filteredDetails.map((data) => (
            <Link to={`character/${data.id}`} key={data.id}>
              <div
                className={`border-4 flex flex-col justify-center items-center p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 animate-fadeIn ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 border-purple-700 hover:shadow-glow-purple"
                    : "bg-gradient-to-b from-green-50 to-blue-100 text-gray-800 border-green-400 hover:shadow-glow-green"
                }`}
              >
                <img
                  src={data.image}
                  alt={data.name}
                  className={`rounded-full w-32 h-32 object-cover mb-3 border-4 shadow-lg transform transition-all duration-500 hover:scale-110 filter hover:saturate-150 hover:brightness-110 animate-float ${
                    theme === "dark" ? "border-purple-600" : "border-green-500"
                  }`}
                />
                <div className="font-bold text-lg mt-2 hover:underline transition-all">
                  {data.name}
                </div>
                <div
                  className={`mt-1 px-3 py-1 rounded-full text-sm ${
                    theme === "dark" ? "bg-gray-700" : "bg-blue-100"
                  }`}
                >
                  {data.species}
                </div>
                <div
                  className={`mt-2 px-3 py-1 rounded-full text-sm font-medium animate-pulse ${
                    data.status === "Alive"
                      ? "bg-green-500 text-white"
                      : data.status === "Dead"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-gray-900"
                  }`}
                >
                  {data.status}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div
            className={`col-span-full text-center py-12 animate-fadeIn ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <div className="transform animate-bounce mb-6">
              <span className="text-5xl">🔍</span>
            </div>
            <p className="text-2xl font-bold">No characters found</p>
            <p className="mt-3 text-lg opacity-80">
              Try adjusting your search or filters
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className={`mt-6 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
                    : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white"
                }`}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        <div className="col-span-full flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`
              px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-x-1
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500"
                  : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-400 hover:to-green-400 disabled:opacity-50 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500"
              }
              disabled:cursor-not-allowed disabled:transform-none
            `}
          >
            ← Previous
          </button>

          <span
            className={`flex items-center px-4 py-2 font-bold rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className={`
              px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:from-gray-800 disabled:to-gray-700 disabled:text-gray-500"
                  : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-400 hover:to-blue-400 disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-300 disabled:text-gray-500"
              }
              disabled:cursor-not-allowed disabled:transform-none
            `}
          >
            Next →
          </button>
        </div>

        <div
          className={`col-span-full bottom-0 w-full text-center py-5 mt-8 transition-all duration-500 animate-fadeIn ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-900 via-gray-900 to-blue-900 text-gray-100"
              : "bg-gradient-to-r from-green-600 via-blue-600 to-green-600 text-white"
          } shadow-lg rounded-t-lg`}
        >
          <p className="text-xl font-bold animate-pulse">{formattedTime}</p>
          <p className="text-sm mt-1 opacity-90">{formattedDate}</p>
          <p className="mt-3 text-xs opacity-70">Rick and Morty API Explorer</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
