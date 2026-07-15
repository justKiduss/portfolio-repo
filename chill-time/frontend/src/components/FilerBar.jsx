const MOVIE_GENRES = [
  { id: "", name: "All" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

const TV_GENRES = [
  { id: "", name: "All" },
  { id: 10759, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 9648, name: "Mystery" },
  { id: 10768, name: "War & Politics" },
  { id: 99, name: "Documentary" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1979 }, (_, i) => CURRENT_YEAR - i);

const COUNTRIES = [
  { code: "", name: "All Countries" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "CA", name: "Canada" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "BR", name: "Brazil" },
];

const LANGUAGES = [
  { code: "", name: "All Languages" },
  { code: "en", name: "English" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
];

const selectClass =
  "px-3 py-2 rounded-md text-sm font-['Inter'] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-[#2DE2C1] transition-colors";

export default function FilterBar({ mediaType = "movie", values, onChange, onReset }) {
  const genres = mediaType === "tv" ? TV_GENRES : MOVIE_GENRES;
  const hasActiveFilters = values.genre || values.year || values.country || values.language;

  return (
    <div className="mb-8 space-y-4">
      {/* Genre pills */}
      <div className="flex gap-2 pb-1 -mx-1 px-1">
        {genres.map((genre) => {
          const isActive = String(values.genre) === String(genre.id);
          return (
            <button
              key={genre.id || "all"}
              type="button"
              onClick={() => onChange("genre", genre.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-['Inter'] border whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-cyan-600 dark:bg-[#2DE2C1] border-cyan-600 dark:border-[#2DE2C1] text-white dark:text-black font-medium"
                  : "bg-transparent border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:border-cyan-500/40 dark:hover:border-[#2DE2C1]/40 hover:text-cyan-700 dark:hover:text-[#2DE2C1]"
              }`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      {/* Year / Country / Language selects */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={values.year}
          onChange={(e) => onChange("year", e.target.value)}
          className={selectClass}
        >
          <option value="">All Years</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={values.country}
          onChange={(e) => onChange("country", e.target.value)}
          className={selectClass}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code || "all"} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={values.language}
          onChange={(e) => onChange("language", e.target.value)}
          className={selectClass}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code || "all"} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500 hover:text-rose-500 dark:hover:text-[#FF3E7F] transition-colors underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}