import { useEffect, useState } from "react";
import { trendingMovies } from "../service/movieService";
import { Link } from "react-router-dom";
import SectionHeader from "./sectionHeader";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [watchLaterList, setWatchLaterList] = useState(() => {
    const saved = localStorage.getItem("watchLaterList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchLaterList", JSON.stringify(watchLaterList));
  }, [watchLaterList]);

  const savingForWatchLater = (movie) => {
    setWatchLaterList((prev) => {
      const exists = prev.some((item) => item.id === movie.id);

      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      }

      return [...prev, movie];
    });
  };

  // O(1) lookup instead of calling .some() on every render for every card
  const watchLaterIds = new Set(watchLaterList.map((item) => item.id));

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const data = await trendingMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load trending titles.");
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-['JetBrains_Mono'] text-sm text-gray-500 dark:text-zinc-500 animate-pulse tracking-wide">
          Loading trending…
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-['JetBrains_Mono'] text-sm text-rose-500 dark:text-[#FF3E7F]">{error}</p>
      </div>
    );
  }
  if (!movies?.length) return null;

  return (
    <div className="p-4 md:p-10 max-w-[1800px] mx-auto">
      <SectionHeader label="Right now" title="Trending" />
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
      >
        {movies.map((movie) => {
          const isSaved = watchLaterIds.has(movie.id);

          return (
            <Link
              key={movie.id}
              to={`/${movie.media_type || "movie"}/${movie.id}`}
              className="group flex flex-col"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-none border border-transparent dark:border-zinc-800 group-hover:border-cyan-500/30 dark:group-hover:border-[#2DE2C1]/30 transition-colors">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    savingForWatchLater(movie);
                  }}
                  aria-label={isSaved ? "Remove from Watch Later" : "Add to Watch Later"}
                  className={`absolute top-3 right-3 z-20
                        p-2 rounded-full
                        backdrop-blur-md
                        transition-all duration-300
                        ${
                          isSaved
                            ? // Saved: always visible, cyan tint, filled icon —
                              // no need to hover just to confirm something's saved
                              "opacity-100 translate-y-0 bg-cyan-500 text-white"
                            : // Not saved: same hover-reveal behavior as before
                              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-black/60 text-white hover:bg-cyan-500"
                        }`}
                >
                  {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>
              <p className="mt-2 text-sm font-semibold truncate dark:text-zinc-200">
                {movie.title || movie.name}
              </p>
              <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
                {(movie.release_date || movie.first_air_date)?.split("-")[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}