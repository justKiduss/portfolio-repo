import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./sectionHeader";

const CARD_WIDTH = 200;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;

export default function ContinueWatching() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const watching = localStorage.getItem("continue_watching");
    setData(JSON.parse(watching) || []);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  if (data.length === 0) return null;

  return (
    // max-w matches TrendingMovies/PopularMovies so all three sections' edges align
    <div className="relative group mt-10 p-4 md:p-10 max-w-[1800px] mx-auto">
      <SectionHeader label="Resume" title="Continue Watching" />

      {/*
        Cards here are fixed-width flex items (w-[200px] flex-shrink-0), not a grid,
        so they never stretch to fill the row — a short list correctly stays a short
        row of 200px cards rather than distorting. Nothing to fix on that front.
      */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out gap-4"
          style={{ transform: `translateX(-${currentIndex * STEP}px)` }}
        >
          {data.map((movie) => (
            <div key={movie.movieId} className="w-[200px] flex-shrink-0 flex flex-col">
              <Link to={`/${movie.type || "movie"}/${movie.movieId}`}>
                <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-none border border-transparent dark:border-zinc-800">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {movie.type === "tv" && movie.season && movie.episode && (
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] text-cyan-300 dark:text-[#2DE2C1]">
                      S{String(movie.season).padStart(2, "0")} · EP
                      {String(movie.episode).padStart(2, "0")}
                    </span>
                  )}
                </div>
              </Link>
              <p className="mt-2 text-sm font-semibold truncate dark:text-zinc-200">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {data.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/80 dark:bg-zinc-900/80 p-2 rounded-full text-black dark:text-white shadow-lg hover:bg-white dark:hover:bg-zinc-800 transition-all z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/80 dark:bg-zinc-900/80 p-2 rounded-full text-black dark:text-white shadow-lg hover:bg-white dark:hover:bg-zinc-800 transition-all z-10"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}