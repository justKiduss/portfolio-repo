import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { usePostHog } from "posthog-js/react";
import useMovies from "../hooks/useMovies";
import Sidebar from "./sidebarMenu";
import { CircleUser, Menu, Search } from "lucide-react";
import ThemeToggle from "./themeToggle";
import useDebounce from "../hooks/useDebounce";
import Footer from "./Footer";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "Series" },
  { to: "/watchlist", label: "Watch-List" },
];

export default function Layout() {
  const [query, setQuery] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const posthog = usePostHog();

  const isHome = location.pathname === "/";

  // Client-side route changes don't trigger a real page load, so PostHog's
  // default pageview capture never fires on in-app navigation without this.
  useEffect(() => {
    posthog?.capture("$pageview");
  }, [location.pathname, location.search, posthog]);

  function handleSearch(e) {
    setQuery(e.target.value);
    setDropDown(true);
  }

  function getHistory() {
    const saved = localStorage.getItem("search_history");
    return saved ? JSON.parse(saved) : [];
  }

  const history = getHistory();
  const debounceQuery = useDebounce(query, 500);
  const { movies, isLoading } = useMovies({ query: debounceQuery});

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
      media_type: movie.media_type || "movie",
    };

    const filteredHistory = existingHistory.filter((item) => item?.id !== movie.id);
    const updateHistory = [newSearchHistory, ...filteredHistory].slice(0, 4);

    localStorage.setItem("search_history", JSON.stringify(updateHistory));
    setDropDown(false);
    setQuery("");
  };

  return (
    // FIX: base = gray-100 (light), dark: = black — matches every other page.
    // Previously both were light shades, so toggling did nothing here.
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black transition-colors duration-300">
      {isOpen && <Sidebar onClose={() => setisOpen(false)} />}

      <header
        className={`fixed top-0 inset-x-0 z-50 px-6 py-4 transition-colors duration-300 ${
          isHome
            ? "bg-gradient-to-b from-black/60 to-transparent"
            : // FIX: was "bg-bg-zinc-950/90" (typo, invalid class — never applied)
              // and had base/dark: reversed. Correct: white by default, zinc-950 in dark mode.
              "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b dark:border-zinc-800"
        }`}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="block md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setisOpen(!isOpen)}
            >
              {/* FIX: was inverted — showed gray on the transparent hero header (low
                  contrast against a dark image) and white on the solid light header
                  (invisible against a white background). isHome should be white. */}
              <Menu className={`w-6 h-6 ${isHome ? "text-white" : "text-gray-700 dark:text-gray-300"}`} />
            </button>

            <Link to="/" className={`text-xl font-bold ${isHome ? "text-white" : "dark:text-white"}`}>
              Movix
            </Link>

            <nav
              className={`hidden md:flex items-center gap-1 rounded-full p-1 ${
                isHome ? "bg-white/10 backdrop-blur-md border border-white/10" : ""
              }`}
            >
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                      active
                        ? isHome
                          ? "bg-white text-black"
                          : "bg-gray-900 text-white dark:bg-white dark:text-black"
                        : isHome
                        ? "text-white/80 hover:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <Search
                  size={16}
                  className={`absolute left-3 pointer-events-none ${
                    isHome ? "text-white/50" : "text-gray-400"
                  }`}
                />
                <input
                  className={`pl-9 pr-8 py-2 rounded-full w-56 md:w-64 text-sm outline-none transition-colors ${
                    isHome
                      ? "bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder:text-white/50 focus:bg-white/20"
                      : "bg-gray-100 dark:bg-zinc-900 border dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                  }`}
                  placeholder="Search..."
                  value={query}
                  onChange={handleSearch}
                  onFocus={() => setDropDown(true)}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className={`absolute right-3 text-xs ${
                      isHome ? "text-white/50 hover:text-white" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    ✕
                  </button>
                )}
              </form>

              {dropDown && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border dark:border-zinc-800 mt-2 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {query.trim().length > 0 ? (
                    <>
                      {isLoading && (
                        <div className="p-4 text-sm text-gray-500 text-center">Searching...</div>
                      )}
                      {movies.length > 0 ? (
                        movies.slice(0, 5).map((movie) => (
                          <Link
                            key={movie.id}
                            to={`/${movie.media_type || "movie"}/${movie.id}`}
                            onClick={() => handleSaveToHistory(movie)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 border-b dark:border-zinc-800 last:border-0 transition-colors"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt=""
                              className="w-10 h-14 object-cover rounded shadow-sm"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                {movie.title || movie.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {movie.release_date?.split("-")[0]}
                              </span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        !isLoading && (
                          <div className="p-4 text-sm text-gray-400 text-center">No results found</div>
                        )
                      )}
                      <Link to="/search" onClick={() => setDropDown(false)}>
                        <button className="p-3 text-cyan-600 dark:text-cyan-400 hover:bg-gray-50 dark:hover:bg-zinc-800 font-bold w-full text-sm border-t dark:border-zinc-800">
                          More Results
                        </button>
                      </Link>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      {history.length > 0 && (
                        <div className="p-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-zinc-950">
                          Recent Searches
                        </div>
                      )}
                      {history.length > 0 ? (
                        history.map((item) => (
                          <Link
                            key={item.id}
                            to={`/${item.media_type || "movie"}/${item.id}`}
                            onClick={() => setDropDown(false)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors border-b dark:border-zinc-800 last:border-0"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${item.poster}`}
                              className="w-8 h-10 object-cover rounded shadow-sm"
                              alt=""
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.title}
                            </span>
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

            <ThemeToggle />
            <Link to="/login" className="hidden md:block">
              <CircleUser size={24} className={isHome ? "text-white" : "dark:text-white"} />
            </Link>
          </div>
        </div>
      </header>

      <main className={`flex-1 ${isHome ? "" : "pt-20"}`} onClick={() => setDropDown(false)}>
        <Outlet context={{ query }} />
      </main>
      <Footer/>
    </div>
  );
}