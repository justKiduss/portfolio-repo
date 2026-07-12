import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { tvSeries, tvSeriesEpisodes } from "../service/movieService";
import StreamingTv from "../components/streamingTv";

function getSavedProgress(movieId) {
  const history = JSON.parse(localStorage.getItem("continue_watching") || "[]");
  const saved = history.find((item) => item.movieId === movieId);
  return saved ? { season: saved.season, episode: saved.episode } : { season: 1, episode: 1 };
}

export default function TvDetail() {
  const { movieId } = useParams();

  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [episodesError, setEpisodesError] = useState(false);

  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [tv, setTv] = useState(null);

  const initial = getSavedProgress(movieId);
  const [selectedSeason, setSelectedSeason] = useState(initial.season);
  const [selectedEpisode, setSelectedEpisode] = useState(initial.episode);

  const didMountRef = useRef(false);

  // Re-sync selected season/episode if the user navigates to a different show
  // without a full remount (skip on first mount — lazy init already handled it).
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const restored = getSavedProgress(movieId);
    setSelectedSeason(restored.season);
    setSelectedEpisode(restored.episode);
  }, [movieId]);

  useEffect(() => {
    async function load() {
      try {
        setPageLoading(true);
        setPageError(false);
        const data = await tvSeries(movieId);
        setTv({
          id: data.id,
          title: data.title || data.name,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          rating: data.vote_average,
          overview: data.overview,
        });
        setSeasons(data.seasons || []);
      } catch (err) {
        setPageError("Failed to load this series.");
      } finally {
        setPageLoading(false);
      }
    }
    load();
  }, [movieId]);

  useEffect(() => {
    if (!selectedSeason) return;
    async function loadEpisodes() {
      try {
        setEpisodesLoading(true);
        setEpisodesError(false);
        const data = await tvSeriesEpisodes(movieId, selectedSeason);
        setEpisodes(data);
      } catch (err) {
        setEpisodesError("Failed to load episodes for this season.");
      } finally {
        setEpisodesLoading(false);
      }
    }
    loadEpisodes();
  }, [movieId, selectedSeason]);

  useEffect(() => {
    if (!tv || !selectedSeason || !selectedEpisode) return;
    const history = JSON.parse(localStorage.getItem("continue_watching") || "[]");
    const watchHistory = {
      movieId,
      title: tv.title,
      season: selectedSeason,
      episode: selectedEpisode,
      poster: tv.poster_path,
      type: "tv",
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
          }
    }
    syncToBackend();
  }, [selectedSeason, selectedEpisode, tv, movieId]);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0C10]">
        <p className="font-['JetBrains_Mono'] text-[#2DE2C1] text-sm tracking-widest uppercase">
          Acquiring signal…
        </p>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0C10]">
        <p className="font-['JetBrains_Mono'] text-[#FF3E7F] text-sm tracking-wide">{pageError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E8E6E1]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap');
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .rec-dot { animation: pulse-dot 1.2s ease-in-out infinite; }
      `}</style>

      <StreamingTv
        selectedEpisode={selectedEpisode}
        movieId={movieId}
        selectedNum={selectedSeason}
        movie={tv}
      />

      <div className="max-w-5xl mx-auto px-4 pb-10 space-y-6">
        {/* Seasons — channel presets */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-[#6B7280]">
              Seasons
            </span>
            <div className="h-px flex-1 bg-[#1E222A]" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {seasons.map((season) => {
              const isActive = selectedSeason === season.season_number;
              return (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => {
                    setSelectedSeason(season.season_number);
                    setSelectedEpisode(1);
                  }}
                  className={`flex items-center gap-2 shrink-0 px-3.5 py-2 rounded-md border whitespace-nowrap transition-colors font-['Inter'] text-sm ${
                    isActive
                      ? "bg-[#12151B] border-[#2DE2C1]/50 text-[#E8E6E1]"
                      : "bg-transparent border-[#1E222A] text-[#6B7280] hover:border-[#2DE2C1]/25 hover:text-[#E8E6E1]"
                  }`}
                >
                  <span
                    className={`font-['JetBrains_Mono'] text-[10px] ${
                      isActive ? "text-[#2DE2C1]" : "text-[#6B7280]"
                    }`}
                  >
                    S{String(season.season_number).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{season.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Episodes — log entries */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-[#6B7280]">
              Episodes
            </span>
            <div className="h-px flex-1 bg-[#1E222A]" />
          </div>

          {episodesError && (
            <p className="font-['JetBrains_Mono'] text-xs text-[#FF3E7F] mb-3">{episodesError}</p>
          )}

          {episodesLoading ? (
            <p className="font-['JetBrains_Mono'] text-xs text-[#6B7280] tracking-wide">
              Loading episode list…
            </p>
          ) : episodes.length === 0 ? (
            <p className="font-['JetBrains_Mono'] text-xs text-[#6B7280] tracking-wide">
              No episodes indexed for this season yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {episodes.map((ep) => {
                const isActive = selectedEpisode === ep.episode_number;
                return (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => setSelectedEpisode(ep.episode_number)}
                    className={`flex items-start gap-3 p-3 rounded-lg text-left border transition-colors ${
                      isActive
                        ? "border-[#2DE2C1]/50 bg-[#12151B]"
                        : "border-[#1E222A] bg-[#0E1116] hover:border-[#2DE2C1]/20"
                    }`}
                  >
                    <span
                      className={`font-['JetBrains_Mono'] text-xs mt-0.5 shrink-0 ${
                        isActive ? "text-[#2DE2C1]" : "text-[#6B7280]"
                      }`}
                    >
                      EP{String(ep.episode_number).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-['Inter'] font-medium text-sm block truncate">
                        {ep.name}
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-1.5 mt-1 font-['JetBrains_Mono'] text-[10px] text-[#FF3E7F] tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E7F] rec-dot" />
                          NOW PLAYING
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}