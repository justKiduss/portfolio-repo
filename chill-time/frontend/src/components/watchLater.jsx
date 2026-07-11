import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Bookmark } from "lucide-react";
import SectionHeader from "./sectionHeader";

const STORAGE_KEY = "watchLaterList";

export default function WatchLaterPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setItems(saved ? JSON.parse(saved) : []);
  }, []);

  function handleRemove(e, id) {
    e.preventDefault();
    e.stopPropagation();

    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors">
      <div className="p-4 md:p-10 max-w-[1800px] mx-auto">
        <SectionHeader label="Saved" title="Watch Later" />

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <Bookmark className="w-10 h-10 text-gray-400 dark:text-zinc-600" />
            <p className="font-['JetBrains_Mono'] text-sm text-gray-500 dark:text-zinc-500">
              Nothing saved yet.
            </p>
            <p className="text-sm text-gray-400 dark:text-zinc-600 max-w-xs">
              Tap the bookmark icon on any title to add it to your Watch Later list.
            </p>
            <Link
              to="/"
              className="mt-2 text-sm font-semibold text-cyan-600 dark:text-[#2DE2C1] hover:underline"
            >
              Browse titles →
            </Link>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {items.map((item) => {
              const title = item.title || item.name;
              const year = (item.release_date || item.first_air_date)?.split("-")[0];
              const type = item.media_type || "movie";

              return (
                <Link
                  key={item.id}
                  to={`/${type}/${item.id}`}
                  className="group relative flex flex-col"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-none border border-transparent dark:border-zinc-800 group-hover:border-cyan-500/30 dark:group-hover:border-[#2DE2C1]/30 transition-colors">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => handleRemove(e, item.id)}
                      aria-label={`Remove ${title} from Watch Later`}
                      className="absolute top-2 right-2 bg-black/70 backdrop-blur p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-rose-500 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="mt-2 text-sm font-semibold truncate dark:text-zinc-200">
                    {title}
                  </p>
                  {year && (
                    <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
                      {year}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}