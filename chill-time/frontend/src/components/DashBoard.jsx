import TrendingMovies from "./trendingMovies";
import PopularMovies from "./popularMovies";
import ContinueWatching from "./continueWatching";
import Hero from "./Hero";

export default function DashBoard() {
  return (
    // Matches Movie.jsx / Series.jsx / WatchLaterPage's convention:
    // base (light) = gray-100, dark: = black. Previously this was flipped
    // (bg-black dark:bg-gray-100), which made toggling contradict every other page.
    <div className="bg-gray-100 dark:bg-black min-h-screen transition-colors">
      <Hero />
      <ContinueWatching />
      <TrendingMovies />
      <PopularMovies />
    </div>
  );
}