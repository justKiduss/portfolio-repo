const TMDB_BASE = "https://api.themoviedb.org/3"; // Added /3/
const API_KEY = process.env.REACT_APP_APIKEY; // Fixed variable name

export async function getCredits(id, type = "movie") {
  // Fixed double slash by removing / before ${type}
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