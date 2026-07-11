import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { popularMovies } from "../service/movieService";
import SectionHeader from "./sectionHeader";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const data = await popularMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load popular titles.");
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
          Loading popular…
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
    <div className="p-4 md:p-10 max-w-[1440px] mx-auto">
      <SectionHeader label="Most watched" title="Popular" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/${movie.media_type || "movie"}/${movie.id}`}
            className="group flex flex-col"
          >
            <div className="overflow-hidden rounded-lg shadow-md dark:shadow-none border border-transparent dark:border-zinc-800 group-hover:border-cyan-500/30 dark:group-hover:border-[#2DE2C1]/30 transition-colors">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-2 text-sm font-semibold truncate dark:text-zinc-200">
              {movie.title || movie.name}
            </p>
            <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
              {(movie.release_date || movie.first_air_date)?.split("-")[0]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}