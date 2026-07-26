import { useOutletContext } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePostHog } from "posthog-js/react";

export default function Search() {
  const { query } = useOutletContext();
  const [pageNo, setPageNo] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const { movies, isLoading, error } = useMovies({query, page:pageNo});
  const posthog = usePostHog();

  useEffect(() => {
    setAllMovies([]);
    setPageNo(1);
  }, [query]);

  useEffect(() => {
    if (movies?.length) {
      setAllMovies((prev) => [...prev, ...movies]);
    }
  }, [movies]);

  const showEmpty = !isLoading && !error && query?.trim() && allMovies.length === 0;

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto">
      {error && (
        <p className="font-['JetBrains_Mono'] text-sm text-rose-500 dark:text-[#FF3E7F] mb-6">
          Failed to load results.
        </p>
      )}

      {showEmpty && (
        <p className="font-['JetBrains_Mono'] text-sm text-gray-500 dark:text-zinc-500 mt-10">
          No results for "{query}".
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
        {allMovies.map((movie, i) => (
          <Link
            key={`${movie.id}-${i}`}
            to={`/${movie.media_type || "movie"}/${movie.id}`}
            onClick={() => posthog?.capture("search_result_selected", { media_id: movie.id, query })}
            className="group flex flex-col"
          >
            <div className="overflow-hidden rounded-lg shadow-md dark:shadow-none border border-transparent dark:border-zinc-800 group-hover:border-cyan-500/30 dark:group-hover:border-[#2DE2C1]/30 transition-colors">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-2 text-sm font-semibold truncate dark:text-zinc-200">
              {movie.title || movie.name}
            </p>
          </Link>
        ))}
      </div>

      {allMovies.length > 0 && (
        <button
          onClick={() => setPageNo((prev) => prev + 1)}
          disabled={isLoading}
          className="mt-8 px-6 py-2 rounded-full font-['Inter'] text-sm font-medium bg-cyan-600 dark:bg-[#2DE2C1] text-white dark:text-black hover:opacity-90 disabled:opacity-50 transition"
        >
          {isLoading ? "Loading…" : "More Results"}
        </button>
      )}
    </div>
  );
}