import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecommendations } from "../service/creditsService";

export default function Recommendations({ movieId, type = "movie" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-[#6B7280]">
          You may also like
        </span>
        <div className="h-px flex-1 bg-[#1E222A]" />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/${item.media_type || type}/${item.id}`}
            className="group w-[140px] shrink-0 flex flex-col"
          >
            <div className="overflow-hidden rounded-lg border border-[#1E222A] group-hover:border-[#2DE2C1]/40 transition-colors">
              <img
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-2 text-xs font-['Inter'] font-medium text-[#E8E6E1] truncate">
              {item.title || item.name}
            </p>
            <p className="text-[10px] font-['JetBrains_Mono'] text-[#6B7280]">
              {(item.release_date || item.first_air_date)?.split("-")[0]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
