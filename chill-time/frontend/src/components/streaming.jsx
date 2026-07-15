import { useState } from "react";
import Comment from "./comment";

const SERVERS = [
  {
    id: "vidlink",
    name: "VidLink",
    type: "SUB",
    getMovieUrl: (id) =>
      `https://vidlink.pro/movie/${id}?autoplay=true&title=false`,
    getTvUrl: (id, season, episode) =>
      `https://vidlink.pro/tv/${id}/${season}/${episode}?autoplay=true&title=false`,
  },

  {
    id: "2embed",
    name: "2Embed",
    type: "SUB",
    getMovieUrl: (id) =>
      `https://www.2embed.cc/embed/${id}`,
    getTvUrl: (id, season, episode) =>
      `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
  },

  {
    id: "autoembed",
    name: "AutoEmbed",
    type: "SUB",
    getMovieUrl: (id) =>
      `https://autoembed.co/movie/tmdb/${id}`,
    getTvUrl: (id, season, episode) =>
      `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
  },

  {
    id: "superembed",
    name: "SuperEmbed",
    type: "SUB",
    getMovieUrl: (id) =>
      `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    getTvUrl: (id, season, episode) =>
      `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
  },

  {
    id: "vidsrc",
    name: "VidSrc",
    type: "SUB",
    getMovieUrl: (id) =>
      `https://vidsrc.fyi/embed/movie/${id}`,
    getTvUrl: (id, season, episode) =>
      `https://vidsrc.fyi/embed/tv/${id}/${season}/${episode}`,
  },

  {
    id: "smashy",
    name: "Smashy",
    type: "SUB",
    getMovieUrl: (id) =>
      `https://embed.smashystream.com/playere.php?tmdb=${id}`,
    getTvUrl: (id, season, episode) =>
      `https://embed.smashystream.com/playertv.php?tmdb=${id}&season=${season}&episode=${episode}`,
  },

  {
    id: "ope",
    name: "Ope Ope",
    type: "SUB",
    getMovieUrl: (id) => "",
    getTvUrl: (id, season, episode) => "",
  },

  {
    id: "nikyu",
    name: "Nikyu Nikyu",
    type: "SUB",
    getMovieUrl: (id) => "",
    getTvUrl: (id, season, episode) => "",
  },
];

export default function Streaming({movie,movieId}) {
  const [comment, setComment] = useState(false);
  const [activeServer, setActiveServer] = useState(SERVERS[4]);
  const [switching, setSwitching] = useState(false);

  const src = activeServer.getMovieUrl(
    movieId,
  );

  if (!movie || !movieId) return null;
  const title = movie.title || movie.name;

  const handleSelect = (server) => {
    if (server.id === activeServer.id) return;
    setSwitching(true);
    setActiveServer(server);
    setTimeout(() => setSwitching(false), 500);
  };


  console.log("movie from streaming ",movie)
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6 bg-[#0A0C10] text-[#E8E6E1]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap');

        @keyframes eqbar {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0.6; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .eq-bar { animation: eqbar 0.9s ease-in-out infinite; transform-origin: bottom; }
        .scanline-effect { animation: scanline 0.5s linear; }
        .rec-dot { animation: pulse-dot 1.2s ease-in-out infinite; }
      `}</style>

      {/* Video Section */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_0_1px_rgba(45,226,193,0.15)]">
        <iframe
          key={activeServer.id}
          src={src}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          title="TV Player"
          className="w-full h-full"
          allowFullScreen
        />
        {switching && (
          <div className="scanline-effect absolute inset-0 bg-gradient-to-b from-transparent via-[#2DE2C1]/20 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Frequency Strip — server selector */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-[#6B7280]">
            Frequency
          </span>
          <div className="h-px flex-1 bg-[#1E222A]" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
          {SERVERS.map((server) => {
            const isActive = server.id === activeServer.id;
            return (
              <button
                key={server.id}
                type="button"
                onClick={() => handleSelect(server)}
                className={`flex items-center gap-2.5 shrink-0 px-3.5 py-2.5 rounded-md border transition-colors font-['Inter'] text-sm ${
                  isActive
                    ? "bg-[#12151B] border-[#2DE2C1]/50 text-[#E8E6E1]"
                    : "bg-transparent border-[#1E222A] text-[#6B7280] hover:border-[#2DE2C1]/25 hover:text-[#E8E6E1]"
                }`}
              >
                <span className="flex items-end gap-[2px] h-3.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`w-[3px] rounded-sm eq-bar ${
                        isActive ? "bg-[#2DE2C1]" : "bg-[#3A3F49]"
                      }`}
                      style={{
                        height: "100%",
                        animationPlayState: isActive ? "running" : "paused",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </span>
                <span className="font-medium whitespace-nowrap">{server.name}</span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#6B7280] tracking-wider">
                  {server.type}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transmission Log (comments) */}
      <div className="border-t border-[#1E222A] pt-4">
        <button
          type="button"
          onClick={() => setComment((t) => !t)}
          className="flex items-center gap-2 font-['Barlow_Condensed'] font-semibold tracking-[0.15em] uppercase text-sm text-[#E8E6E1] hover:text-[#2DE2C1] transition-colors"
        >
          <span className={`transition-transform duration-200 ${comment ? "rotate-90" : ""}`}>▸</span>
          Transmission Log
        </button>
        {comment && (
          <div className="mt-3 animate-[fadeIn_0.2s_ease]">
            <Comment movieId={movieId} moviename={title}/>
          </div>
        )}
      </div>

      {/* Movie Info — dossier style */}
      <div className="flex flex-col md:flex-row gap-6 bg-[#12151B] rounded-lg p-5 border border-[#1E222A]">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder-poster.png"
          }
          alt={title}
          className="w-40 md:w-48 rounded shadow shrink-0"
        />

        <div className="space-y-3 flex-1">
          <h1 className="font-['Barlow_Condensed'] font-bold text-3xl tracking-wide uppercase">
            {title}
          </h1>
          <p className="text-[#9CA3AF] leading-relaxed text-sm">{movie.overview}</p>
          <div className="font-['JetBrains_Mono'] text-xs text-[#2DE2C1] tracking-wide">
                RATING {movie.vote_average?.toFixed(1) ?? "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}