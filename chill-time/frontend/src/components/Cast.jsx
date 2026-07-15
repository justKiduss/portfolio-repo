import { useEffect, useState } from "react";
import { getCredits } from "../service/creditsService";

const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
];

function avatarColor(name = "?") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function Cast({ movieId, type = "movie" }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function load() {
      try {
        setLoading(true);
        setError(false);
        const data = await getCredits(movieId, type);
        setCast(data.slice(0, 12));
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
        Loading cast…
      </p>
    );
  }
  if (error || cast.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-[#6B7280]">
          Cast
        </span>
        <div className="h-px flex-1 bg-[#1E222A]" />
      </div>

      <div className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
        {cast.map((person) => (
          <div key={person.id} className="flex flex-col items-center w-20 shrink-0 text-center">
            {person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                alt={person.name}
                className="w-16 h-16 rounded-full object-cover border border-[#1E222A]"
              />
            ) : (
              <div
                className={`flex w-16 h-16 shrink-0 items-center justify-center rounded-full text-white font-semibold ${avatarColor(
                  person.name
                )}`}
              >
                {person.name?.[0]?.toUpperCase() || "?"}
              </div>
            )}
            <span className="mt-2 text-xs font-['Inter'] font-medium text-[#E8E6E1] truncate w-full">
              {person.name}
            </span>
            <span className="text-[10px] text-[#6B7280] truncate w-full">
              {person.character}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
