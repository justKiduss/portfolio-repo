import TrendingMovies from "./trendingMovies";
import PopularMovies from "./popularMovies";
import ContinueWatching from "./continueWatching";
import Hero from "./Hero";

export default function DashBoard() {
  return (
    <div className="bg-black dark:bg-gray-100 min-h-screen transition-colors">
      <Hero />
      <ContinueWatching />
      <TrendingMovies />
      <PopularMovies />
    </div>
  );
}