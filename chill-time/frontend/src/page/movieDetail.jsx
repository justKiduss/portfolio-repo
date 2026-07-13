import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailService from "../service/movieDetail";
import Streaming from "../components/streaming";
import { addContinueWatchingService } from "../service/continueWatching";

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await MovieDetailService(movieId);
        const normalized = {
          id: data.id,
          title: data.title || data.name,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          rating: data.vote_average,
          overview: data.overview,
        };
        setMovie(normalized);
      } catch (err) {
        setError("failed to load movie");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [movieId]);

  // NEW: mirrors the effect in TvDetail.jsx — this was missing entirely here,
  // which is why only TV shows were ever showing up in Continue Watching.
  // Movies have no season/episode, so this just needs the movie itself to have loaded.
  useEffect(() => {
    if (!movie) return;
    const history = JSON.parse(localStorage.getItem("continue_watching") || "[]");
    const watchHistory = {
      movieId,
      title: movie.title,
      poster: movie.poster_path,
      type: "movie",
      timestamp: Date.now(),
    };
    const updated = [watchHistory, ...history.filter((item) => item.movieId !== movieId)].slice(0, 10);
    localStorage.setItem("continue_watching", JSON.stringify(updated));

    async function syncToBackend() {
      try {
        await addContinueWatchingService(watchHistory);
      } catch (err) {
        // Backend unreachable (logged out, network error) — localStorage
        // write above already succeeded, so this fails silently.
        return "Internal Server error";
      }
    }
    syncToBackend();
  }, [movie, movieId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (!movie) return null;

  return <Streaming movie={movie} movieId={movieId} />;
}