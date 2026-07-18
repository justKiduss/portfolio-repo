import { useState } from "react";
import { Flag } from "lucide-react";
import { buildMailtoUrl } from "../utils/mailto";

const FEEDBACK_EMAIL = "YOUR_EMAIL@example.com";

// Drop this next to your server selector strip in Streaming.jsx / StreamingTv.jsx:
// <ReportBrokenLink title={title} movieId={movieId} mediaType="movie" serverName={activeServer.name} />
export default function ReportBrokenLink({ title, movieId, mediaType = "movie", serverName }) {
  const [sent, setSent] = useState(false);

  function handleReport() {
    const body = [
      `Title: ${title}`,
      `Type: ${mediaType}`,
      `TMDB ID: ${movieId}`,
      `Server: ${serverName || "unknown"}`,
      `Page: ${window.location.href}`,
      `Time: ${new Date().toLocaleString()}`,
    ].join("\n");

    const mailtoUrl = buildMailtoUrl({
      to: FEEDBACK_EMAIL,
      subject: `Broken stream: ${title} (${serverName || "unknown server"})`,
      body,
    });

    window.location.href = mailtoUrl;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <button
      onClick={handleReport}
      className="flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] text-[#6B7280] hover:text-[#FF3E7F] transition-colors"
    >
      <Flag size={12} />
      {sent ? "Opening your email client…" : "Report broken link"}
    </button>
  );
}