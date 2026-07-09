import { useMemo, useState, useCallback } from "react";
import { Server, CheckCircle2, PlayCircle, LoaderCircle, AlertCircle } from "lucide-react";

export default function Streaming({ movie, movieId }) {
    const providers = [
        { name: "VidSrc", url: "https://vsembed.ru/embed/movie/{id}", quality: "1080p", speed: "Fast" },
        { name: "VidLink", url: "https://vidlink.pro/movie/{id}?autoplay=true&title=false", quality: "1080p", speed: "Backup" },
        { name: "2Embed", url: "https://www.2embed.cc/embed/{id}", quality: "1080p", speed: "Backup" },
        { name: "AutoEmbed", url: "https://autoembed.co/movie/tmdb/{id}", quality: "HD", speed: "Backup" },
        { name: "SuperEmbed", url: "https://multiembed.mov/?video_id={id}&tmdb=1", quality: "HD", speed: "Backup" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [failedServers, setFailedServers] = useState([]);
    const [autoSwitching, setAutoSwitching] = useState(false);

    const currentServer = providers[currentIndex];

    const iframeSrc = useMemo(() => {
        return currentServer.url.replace("{id}", movieId);
    }, [currentServer, movieId]);

    const switchToNext = useCallback(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < providers.length) {
            setFailedServers(prev => [...prev, currentServer.name]);
            setAutoSwitching(true);
            setLoading(true);
            setTimeout(() => {
                setCurrentIndex(nextIndex);
                setAutoSwitching(false);
            }, 1000);
        }
    }, [currentIndex, currentServer]);

    const handleServerChange = (index) => {
        if (index === currentIndex) return;
        setLoading(true);
        setCurrentIndex(index);
    };

    const handleIframeError = () => {
        switchToNext();
    };

    const handleIframeLoad = () => {
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

            {/* Title */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <PlayCircle size={15} />
                        Playing from <span className="font-semibold text-blue-500">{currentServer.name}</span>
                        {autoSwitching && <span className="text-yellow-500 animate-pulse">— switching server...</span>}
                    </p>
                </div>
                <span className="rounded-full bg-gray-100 dark:bg-zinc-800 px-4 py-2 text-sm">
                    {providers.length} Servers
                </span>
            </div>

            {/* Player */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl border border-gray-800">
                {loading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/80 backdrop-blur-sm">
                        <LoaderCircle size={38} className="animate-spin text-white" />
                        <p className="text-white text-lg">
                            {autoSwitching ? `Switching to next server...` : `Loading ${currentServer.name}...`}
                        </p>
                    </div>
                )}

                <iframe
                    key={iframeSrc}
                    src={iframeSrc}
                    title={movie.title}
                    className="w-full h-full"
                    allowFullScreen
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                />

                <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 rounded-full bg-black/70 backdrop-blur px-4 py-2 text-white text-sm">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        {currentServer.name}
                    </div>
                </div>
            </div>

            {/* Server List */}
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg p-6">
                <div className="flex items-center gap-2 mb-5">
                    <Server size={20} />
                    <div>
                        <h2 className="font-bold text-lg">Streaming Servers</h2>
                        <p className="text-gray-500 text-xs">Switch server if playback fails</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                    {providers.map((provider, index) => {
                        const active = index === currentIndex;
                        const failed = failedServers.includes(provider.name);

                        return (
                            <button
                                key={provider.name}
                                onClick={() => handleServerChange(index)}
                                className={`
                                    relative rounded-xl border p-4 text-left transition-all duration-200
                                    ${active ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-[1.03]"
                                    : failed ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 opacity-60"
                                    : "border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 hover:border-blue-400 hover:-translate-y-0.5"}
                                `}
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-sm">{provider.name}</h3>
                                    {active && <CheckCircle2 size={16} />}
                                    {failed && !active && <AlertCircle size={16} className="text-red-400" />}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${active ? "bg-white/20" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                                        {provider.quality}
                                    </span>
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${active ? "bg-white/20" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                                        {provider.speed}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Movie Info */}
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full lg:w-64 object-cover"
                    />
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-bold">{movie.title}</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-medium">
                                ⭐ {movie.rating || movie.vote_average}
                            </span>
                            {movie.release_date && (
                                <span className="rounded-full bg-gray-100 dark:bg-zinc-800 px-3 py-1 text-sm">
                                    {movie.release_date}
                                </span>
                            )}
                        </div>
                        <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300 text-sm">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}