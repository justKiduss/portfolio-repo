import { useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import SectionHeader from "../components/sectionHeader";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function Movie() {
  const [page, setPage] = useState(1);
  const { movies, isLoading, error } = useMovies(null, page);

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

  const watchLaterIds = new Set(watchLaterList.map((item) => item.id));

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader label="Browse" title="All Movies" />

      {error && (
        <p className="font-['JetBrains_Mono'] text-sm text-rose-500 dark:text-[#FF3E7F] mb-6">
          Failed to load movies.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 min-h-[600px]">
        {isLoading ? (
          <div className="col-span-full text-center py-20 font-['JetBrains_Mono'] text-gray-400 dark:text-zinc-500 animate-pulse">
            Loading…
          </div>
        ) : (
          movies?.map((movie) => {
            const isSaved = watchLaterIds.has(movie.id);
            console.log(movie);
            return (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
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
                              ? "opacity-100 translate-y-0 bg-cyan-500 text-white"
                              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-black/60 text-white hover:bg-cyan-500"
                          }`}
                  >
                    {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </button>
                </div>
                <h2 className="mt-2 text-sm font-bold truncate dark:text-zinc-200 group-hover:text-cyan-600 dark:group-hover:text-[#2DE2C1] transition-colors">
                  {movie.title}
                </h2>
                <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
                  {(movie.release_date || movie.first_air_date)?.split("-")[0]}
                </p>
              </Link>
            );
          })
        )}
      </div>

      <Pagination page={page} onPageChange={handlePageChange} />
    </div>
  );
}