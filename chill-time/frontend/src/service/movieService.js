const APIKEY = process.env.REACT_APP_APIKEY;

function buildDiscoverParams({ page = 1, genre, year, country, language, yearParam }) {
  const params = new URLSearchParams({ api_key: APIKEY, page, language: "en-US" });
  if (genre) params.set("with_genres", genre);
  if (year) params.set(yearParam, year);
  if (country) params.set("with_origin_country", country);
  if (language) params.set("with_original_language", language);
  return params;
}

export async function Movie({ page = 1, genre, year, country, language } = {}) {
  try {
    const params = buildDiscoverParams({ page, genre, year, country, language, yearParam: "primary_release_year" });
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?${params}`);
    if (!res.ok) throw new Error("server responded with an error");
    return await res.json();
  } catch {
    throw new Error("Error while fetching");
  }
}

export async function SearchMovie(query, page = 1) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}`
    );
    if (!res.ok) throw new Error("server responded with an error");
    return await res.json();
  } catch {
    throw new Error("error while fetching");
  }
}

export async function trendingMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}`);
    if (!res.ok) throw new Error("failed");
    const data = await res.json();
    return data.results;
  } catch {
    throw new Error("error while fetching");
  }
}

export async function popularMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=en-US&page=1`);
    if (!res.ok) throw new Error("failed");
    const data = await res.json();
    return data.results;
  } catch {
    throw new Error("error while fetching");
  }
}

export async function tvSeries(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${APIKEY}`);
    if (!res.ok) throw new Error("failed");
    return await res.json();
  } catch {
    throw new Error("Error while fetching");
  }
}

export async function tvSeriesEpisodes(tvId, season) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/season/${season}?api_key=${APIKEY}`);
    if (!res.ok) throw new Error("failed");
    const data = await res.json();
    return data.episodes;
  } catch {
    throw new Error("error while fetching");
  }
}

export async function seriesDiscovery({ page = 1, genre, year, country, language } = {}) {
  try {
    const params = buildDiscoverParams({ page, genre, year, country, language, yearParam: "first_air_date_year" });
    params.set("sort_by", "popularity.desc");
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?${params}`);
    if (!res.ok) throw new Error("failed");
    return await res.json();
  } catch {
    throw new Error("error while fetching");
  }
}