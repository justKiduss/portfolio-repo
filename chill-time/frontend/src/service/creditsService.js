const TMDB_BASE = "https://api.themoviedb.org/3";
// Match whichever pattern your existing movieService.js already uses for auth —
// either a v3 api_key query param, or a v4 Bearer token in headers.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function getCredits(id, type = "movie") {
  const response = await fetch(
    `${TMDB_BASE}/${type}/${id}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to load cast");
  const data = await response.json();
  return data.cast || [];
}

export async function getRecommendations(id, type = "movie") {
  const response = await fetch(
    `${TMDB_BASE}/${type}/${id}/recommendations?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to load recommendations");
  const data = await response.json();
  return data.results || [];
}
