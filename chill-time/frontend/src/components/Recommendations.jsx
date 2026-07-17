import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { getRecommendations } from "../service/creditsService";
import useWatchLater from "../hooks/useWatchLater";

export default function Recommendations({ movieId, type = "movie" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { isSaved, toggle } = useWatchLater();

  useEffect(() => {
    if (!movieId) return;

    async function load() {
      try {
        setLoading(true);
        setError(false);

        const data = await getRecommendations(movieId, type);
        setItems(data.slice(0, 12));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [movieId, type]);

  if (loading) {
    return (
      <p className="font-['JetBrains_Mono'] text-xs text-[#6B7280] tracking-wide">
        Loading recommendations…
      </p>
    );
  }

  if (error || items.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-[#6B7280] whitespace-nowrap">
          You may also like
        </span>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {items.map((item) => {
          const saved = isSaved(item.id);

          return (
            <Link
              key={item.id}
              to={`/${item.media_type || type}/${item.id}`}
              className="group flex flex-col"
            >
              <div className="relative overflow-hidden rounded-lg border border-transparent dark:border-zinc-800 shadow-md dark:shadow-none transition-colors group-hover:border-cyan-500/30">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    toggle({
                      movieId: item.id,
                      title: item.title || item.name,
                      poster: item.poster_path,
                      type: item.media_type || type,
                      timestamp: Date.now(),
                    });
                  }}
                  aria-label={
                    saved
                      ? "Remove from Watch Later"
                      : "Add to Watch Later"
                  }
                  className={`absolute top-3 right-3 z-20 rounded-full p-2 backdrop-blur-md transition-all duration-300 ${
                    saved
                      ? "bg-cyan-500 text-white opacity-100"
                      : "bg-black/60 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-cyan-500"
                  }`}
                >
                  {saved ? (
                    <BookmarkCheck size={18} />
                  ) : (
                    <Bookmark size={18} />
                  )}
                </button>
              </div>

              <p className="mt-2 line-clamp-2 text-sm font-semibold dark:text-zinc-200">
                {item.title || item.name}
              </p>

              <p className="mt-1 text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
                {(item.release_date || item.first_air_date)?.split("-")[0] ||
                  "—"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}