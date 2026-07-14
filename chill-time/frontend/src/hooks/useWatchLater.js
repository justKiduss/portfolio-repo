import { useEffect, useState, useCallback } from "react";
import { addWatchLaterService } from "../service/watchLater";

const STORAGE_KEY = "watchLaterList";

function readLocal() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// One hook, used by every grid component (PopularMovies, TrendingMovies,
// Movie, Series, WatchLaterPage...) instead of each one reimplementing
// its own copy of this state + persistence + backend-sync logic.
export default function useWatchLater() {
  const [list, setList] = useState(readLocal);

  // Keep localStorage in sync whenever the list changes, from any component.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  const isSaved = useCallback(
    (id) => list.some((item) => item.id === id),
    [list]
  );

  const toggle = useCallback((movie) => {
    setList((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      return exists ? prev.filter((item) => item.id !== movie.id) : [...prev, movie];
    });

    // Sync to backend at the moment of the actual click — not deferred
    // to some other component/page that may or may not ever mount.
    addWatchLaterService({
      movieId: movie.id,
      title: movie.title || movie.name,
      poster: movie.poster_path,
      type: movie.media_type || "movie",
      timestamp: Date.now(),
    }).catch(() => {
      // Backend unreachable (logged out, network error) — local state
      // above already updated, so the toggle still works for the user.
    });
  }, []);

  return { list, isSaved, toggle };
}