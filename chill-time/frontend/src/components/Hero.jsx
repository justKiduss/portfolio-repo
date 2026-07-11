import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Info, Star, Calendar } from "lucide-react";
import { trendingMovies } from "../service/movieService";

const AUTO_ROTATE_MS = 7000;

export default function Hero() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await trendingMovies();
        // Only keep entries that actually have a backdrop to show
        const withBackdrop = (data || []).filter((m) => m.backdrop_path).slice(0, 6);
        setItems(withBackdrop);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [items.length]);

  if (loading) {
    return <div className="w-full h-[85vh] bg-zinc-950 animate-pulse" />;
  }
  if (!items.length) return null;

  const movie = items[index];
  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date)?.split("-")[0];
  const type = movie.media_type || "movie";

  return (
    <div className="relative w-full h-[85vh] min-h-[520px] overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <img
          key={movie.id}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover animate-[fadeIn_0.6s_ease-out]"
        />
        {/* Gradients: bottom-up for text legibility, side gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 max-w-[1800px] mx-auto">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4 leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-4 mb-4 font-['JetBrains_Mono'] text-sm text-zinc-300">
            {movie.vote_average > 0 && (
              <span className="flex items-center gap-1 text-amber-400">
                <Star size={14} fill="currentColor" />
                {movie.vote_average.toFixed(1)}
              </span>
            )}
            {year && (
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {year}
              </span>
            )}
            <span className="uppercase tracking-wide px-2 py-0.5 rounded border border-zinc-600 text-zinc-300 text-xs">
              {type}
            </span>
          </div>

          {movie.overview && (
            <p className="text-zinc-300 text-sm md:text-base line-clamp-3 mb-6">
              {movie.overview}
            </p>
          )}

          <div className="flex items-center gap-3">
            <Link
              to={`/${type}/${movie.id}`}
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
            >
              <Play size={18} fill="currentColor" />
              Play
            </Link>
            <Link
              to={`/${type}/${movie.id}`}
              className="flex items-center gap-2 bg-white/10 backdrop-blur text-white font-semibold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Info size={18} />
              More Info
            </Link>
          </div>
        </div>

        {/* Dots / progress indicators */}
        {items.length > 1 && (
          <div className="flex items-center gap-2 mt-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-cyan-400 dark:bg-[#2DE2C1]" : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
