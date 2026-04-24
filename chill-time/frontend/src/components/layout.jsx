import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import Sidebar from "./sidebarMenu";
import { CircleUser, Menu, User } from "lucide-react";

export default function Layout() {
  const [query, setQuery] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  function handleSearch(e) {
    setQuery(e.target.value);
    setDropDown(true);
  }

  // Fixed: Must parse only if 'saved' exists
  function getHistory() {
    const saved = localStorage.getItem("search_history");
    return saved ? JSON.parse(saved) : [];
  }

  const history = getHistory();
  const movies = useMovies(query);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleSaveToHistory = (movie) => {
    const savedData = localStorage.getItem("search_history");
    const existingHistory = savedData ? JSON.parse(savedData) : [];

    const newSearchHistory = {
      id: movie.id,
      poster: movie.poster_path,
      title: movie.title || movie.name,
      date: movie.release_date?.split("-")[0],
      media_type: movie.media_type || "movie", // Added for routing safety
    };

    const filteredHistory = existingHistory.filter((item) => item?.id !== movie.id);
    const updateHistory = [newSearchHistory, ...filteredHistory].slice(0, 4);
    
    localStorage.setItem("search_history", JSON.stringify(updateHistory));
    setDropDown(false);
    setQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {isOpen && <Sidebar onClose={() => setisOpen(false)} />}
      
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <button
          className="block md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setisOpen(!isOpen)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <Link to="/" className="text-xl font-bold">Movix</Link>

        <div className="flex gap-20">
          <Link to="/" className="text-sm font-bold hidden md:block">Home</Link>
          <Link to="/movies" className="text-sm font-bold hidden md:block">Movies</Link>
          <Link to="/series" className="text-sm font-bold hidden md:block">Series</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                className="border p-1 rounded w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                onFocus={() => setDropDown(true)}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-gray-400 hover:text-red-500"
                >✕</button>
              )}
            </form>

            {/* FIXED SECTION: Wrapped ternary in a div with absolute positioning */}
            {dropDown && (
              <div className="absolute top-full left-0 w-full bg-white border mt-1 rounded shadow-2xl z-50 max-h-96 overflow-y-auto">
                {query.trim().length > 0 ? (
                  <>
                    {movies.status === "loading" && (
                      <div className="p-4 text-sm text-gray-500 text-center">Searching...</div>
                    )}
                    {movies.data?.length > 0 ? (
                      movies.data.slice(0, 5).map((movie) => (
                        <Link
                          key={movie.id}
                          to={`/${movie.media_type || "movie"}/${movie.id}`}
                          onClick={() => handleSaveToHistory(movie)}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-0 transition-colors"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                            alt=""
                            className="w-10 h-14 object-cover rounded shadow-sm"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800">
                              {movie.title || movie.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {movie.release_date?.split("-")[0]}
                            </span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      movies.status !== "loading" && (
                        <div className="p-4 text-sm text-gray-400 text-center">No results found</div>
                      )
                    )}
                    <Link to="/search" onClick={() => setDropDown(false)}>
                      <button className="p-3 text-blue-600 hover:bg-gray-50 font-bold w-full text-sm border-t">
                        More Results
                      </button>
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col">
                    {history.length > 0 && (
                      <div className="p-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                        Recent Searches
                      </div>
                    )}
                    {history.length > 0 ? (
                      history.map((item) => (
                        <Link
                          key={item.id}
                          to={`/${item.media_type || "movie"}/${item.id}`}
                          onClick={() => setDropDown(false)}
                          className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors border-b last:border-0"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w92${item.poster}`}
                            className="w-8 h-10 object-cover rounded shadow-sm"
                            alt=""
                          />
                          <span className="text-sm font-medium text-gray-700">{item.title}</span>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-sm text-gray-400 text-center italic">
                        No recent searches
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Link to="/login">
          <CircleUser size={24}/>
        </Link>
      </header>

      <main className="flex-1 p-6" onClick={() => setDropDown(false)}>
        <Outlet context={{ query }} />
      </main>
    </div>
  );
}