import { useState } from "react";
import { Link } from "react-router-dom";
import useSeries from "../hooks/useSeries";
import Pagination from "../components/pagination";
import SectionHeader from "../components/sectionHeader";

export default function Series() {
  const [page, setPage] = useState(1);
  const { data, status } = useSeries(page);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader label="Browse" title="All Series" />

      {status === "error" && (
        <p className="font-['JetBrains_Mono'] text-sm text-rose-500 dark:text-[#FF3E7F] mb-6">
          Failed to load series.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 min-h-[600px]">
        {status === "loading" ? (
          <div className="col-span-full text-center py-20 font-['JetBrains_Mono'] text-gray-400 dark:text-zinc-500 animate-pulse">
            Loading…
          </div>
        ) : (
          data?.map((show) => (
            <Link key={show.id} to={`/tv/${show.id}`} className="group">
              <div className="overflow-hidden rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-zinc-800 group-hover:border-cyan-500/30 dark:group-hover:border-[#2DE2C1]/30 transition-colors">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  className="group-hover:scale-105 transition duration-300"
                  alt={show.name}
                />
              </div>
              <h2 className="mt-2 text-sm font-bold truncate dark:text-zinc-200 group-hover:text-cyan-600 dark:group-hover:text-[#2DE2C1] transition-colors">
                {show.name}
              </h2>
              <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
                {(show.release_date || show.first_air_date)?.split("-")[0]}
              </p>
            </Link>
          ))
        )}
      </div>

      <Pagination page={page} onPageChange={handlePageChange} />
    </div>
  );
}