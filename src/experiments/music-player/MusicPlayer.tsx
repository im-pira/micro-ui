import { FormEvent, useEffect, useRef, useState } from "react";

type Song = {
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName: string;
    artworkUrl100: string;
    previewUrl: string;
};

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const searchSongs = async (e: FormEvent) => {
        e.preventDefault();

        const search = query.trim();
        if (!search) return;

        try {
            setIsSearching(true);

            const response = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(
                    search
                )}&media=music&entity=song&limit=8`
            );

            const data = await response.json();

            const results = (data.results as Song[]).filter(
                (song) => song.previewUrl
            );

            setSongs(results);

            if (results.length && !currentSong) {
                setCurrentSong(results[0]);
            }
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const playSong = async (song: Song) => {
        setCurrentSong(song);
        setCurrentTime(0);

        setTimeout(async () => {
            const audio = audioRef.current;
            if (!audio) return;

            try {
                await audio.play();
            } catch (error) {
                console.error(error);
            }
        }, 0);
    };

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;

        if (audio.paused) {
            await audio.play();
        } else {
            audio.pause();
        }
    };

    const nextSong = () => {
        if (!currentSong || !songs.length) return;

        const index = songs.findIndex(
            (song) => song.trackId === currentSong.trackId
        );

        const next = songs[(index + 1) % songs.length];
        playSong(next);
    };

    const previousSong = () => {
        if (!currentSong || !songs.length) return;

        const index = songs.findIndex(
            (song) => song.trackId === currentSong.trackId
        );

        const previous =
            songs[(index - 1 + songs.length) % songs.length];

        playSong(previous);
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percentage = Math.min(
            Math.max((e.clientX - rect.left) / rect.width, 0),
            1
        );

        audio.currentTime = percentage * duration;
    };

    const formatTime = (seconds: number) => {
        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const artwork =
        currentSong?.artworkUrl100.replace("100x100", "600x600") ?? "";

    useEffect(() => {
        setCurrentTime(0);
        setDuration(0);
    }, [currentSong]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#090909] p-5">
            <div className="w-full max-w-md">
                {/* Search */}
                <form onSubmit={searchSongs} className="mb-4 flex items-center gap-3 rounded-full bg-[#181818] px-5 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/5">
                    <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-none stroke-white/60 stroke-2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/30"
                    />
                </form>

                {/* Player */}
                <div className="relative aspect-square overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900 shadow-2xl">
                    {artwork ? (
                        <img
                            src={artwork}
                            alt={currentSong?.trackName}
                            className="absolute inset-0 size-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-950" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/90" />

                    {/* Top */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                        <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/80 backdrop-blur-xl">
                            Internet Radio
                        </div>

                        <button className="grid size-10 place-items-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-xl">
                            <svg
                                viewBox="0 0 24 24"
                                className="size-5 fill-none stroke-current stroke-2"
                            >
                                <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                                <path d="M5 13v6h14v-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Song info */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="mb-6">
                            <p className="mb-1 truncate text-sm text-white/55">
                                {currentSong?.artistName ??
                                    "Search for a song"}
                            </p>

                            <h2 className="truncate text-2xl font-semibold tracking-tight text-white">
                                {currentSong?.trackName ??
                                    "Nothing playing"}
                            </h2>

                            {currentSong && (
                                <p className="mt-1 truncate text-xs text-white/35">
                                    {currentSong.collectionName}
                                </p>
                            )}
                        </div>

                        {/* Progress */}
                        <div
                            onClick={seek}
                            className="relative h-5 cursor-pointer"
                        >
                            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/20">
                                <div
                                    className="h-full rounded-full bg-white"
                                    style={{
                                        width: `${duration
                                                ? (currentTime /
                                                    duration) *
                                                100
                                                : 0
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between text-xs tabular-nums text-white/45">
                            <span>{formatTime(currentTime)}</span>
                            <span>
                                -
                                {formatTime(
                                    Math.max(
                                        duration - currentTime,
                                        0
                                    )
                                )}
                            </span>
                        </div>

                        {/* Controls */}
                        <div className="mt-6 flex items-center justify-center gap-5">
                            <button
                                onClick={previousSong}
                                disabled={!currentSong}
                                className="grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-30"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="size-6 fill-current"
                                >
                                    <path d="M6 5h2v14H6V5Zm3 7 9-7v14l-9-7Z" />
                                </svg>
                            </button>

                            <button
                                onClick={togglePlay}
                                disabled={!currentSong}
                                className="grid size-16 place-items-center rounded-full bg-white text-black shadow-xl transition hover:scale-105 active:scale-95 disabled:opacity-40"
                            >
                                {isPlaying ? (
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="size-7 fill-current"
                                    >
                                        <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" />
                                    </svg>
                                ) : (
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="ml-1 size-8 fill-current"
                                    >
                                        <path d="M8 5v14l11-7Z" />
                                    </svg>
                                )}
                            </button>

                            <button
                                onClick={nextSong}
                                disabled={!currentSong}
                                className="grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-30"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="size-6 fill-current"
                                >
                                    <path d="M16 5h2v14h-2V5ZM6 5l9 7-9 7V5Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Results */}
                {songs.length > 0 && (
                    <div className="mt-4 space-y-1">
                        {songs.map((song) => {
                            const active =
                                song.trackId === currentSong?.trackId;

                            return (
                                <button
                                    key={song.trackId}
                                    onClick={() => playSong(song)}
                                    className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition ${active
                                            ? "bg-white/10"
                                            : "hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <img
                                        src={song.artworkUrl100}
                                        alt=""
                                        className="size-12 rounded-xl object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-white">
                                            {song.trackName}
                                        </p>

                                        <p className="truncate text-xs text-white/40">
                                            {song.artistName}
                                        </p>
                                    </div>

                                    {active && isPlaying && (
                                        <div className="flex h-5 items-end gap-0.5">
                                            <span className="h-2 w-0.5 rounded-full bg-white" />
                                            <span className="h-4 w-0.5 rounded-full bg-white" />
                                            <span className="h-3 w-0.5 rounded-full bg-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                <audio
                    ref={audioRef}
                    src={currentSong?.previewUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                        setIsPlaying(false);
                        nextSong();
                    }}
                    onTimeUpdate={(e) =>
                        setCurrentTime(e.currentTarget.currentTime)
                    }
                    onLoadedMetadata={(e) =>
                        setDuration(e.currentTarget.duration)
                    }
                />
            </div>
        </div>
    );
}