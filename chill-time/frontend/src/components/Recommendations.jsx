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
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-[#6B7280]">
              You may also like
            </span>
            <div className="h-px flex-1 bg-[#1E222A]" />
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/${item.media_type || type}/${item.id}`}
                className="group flex items-center gap-4 p-2 rounded-lg hover:bg-[#12151B] transition-colors border border-transparent hover:border-[#1E222A]"
              >
                {/* Thumbnails are smaller in a vertical list */}
                <div className="w-16 h-24 overflow-hidden rounded shadow shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Text Info */}
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-['Inter'] font-medium text-[#E8E6E1]">
                    {item.title || item.name}
                  </p>
                  <p className="text-[10px] font-['JetBrains_Mono'] text-[#6B7280]">
                    {(item.release_date || item.first_air_date)?.split("-")[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
}
