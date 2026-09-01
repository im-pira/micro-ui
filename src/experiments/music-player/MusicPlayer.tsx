import { useEffect, useRef, useState } from "react";

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
    const [liked, setLiked] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const [volume, setVolume] = useState(0.8);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const searchSongs = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const search = query.trim();
        if (!search) return;

        try {
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

            if (results.length) {
                setCurrentSong(results[0]);
            }
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    const playSong = async (song: Song) => {
        setCurrentSong(song);

        requestAnimationFrame(async () => {
            const audio = audioRef.current;
            if (!audio) return;

            try {
                await audio.play();
            } catch (error) {
                console.error(error);
            }
        });
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
        if (!songs.length || !currentSong) return;

        if (shuffle) {
            const random =
                songs[Math.floor(Math.random() * songs.length)];

            playSong(random);
            return;
        }

        const index = songs.findIndex(
            (song) => song.trackId === currentSong.trackId
        );

        playSong(songs[(index + 1) % songs.length]);
    };

    const previousSong = () => {
        if (!songs.length || !currentSong) return;

        const index = songs.findIndex(
            (song) => song.trackId === currentSong.trackId
        );

        playSong(
            songs[(index - 1 + songs.length) % songs.length]
        );
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;

        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();

        const percent = Math.min(
            Math.max((e.clientX - rect.left) / rect.width, 0),
            1
        );

        audio.currentTime = percent * duration;
    };

    const formatTime = (seconds: number) => {
        if (!Number.isFinite(seconds)) return "0:00";

        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);

        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const artwork =
        currentSong?.artworkUrl100.replace(
            "100x100",
            "1200x1200"
        ) ?? "";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <div className="min-h-screen bg-[#070707] flex items-center justify-center px-4 py-8 text-white">
            <div className="w-full max-w-[920px]">

                {/* Search */}
                <form
                    onSubmit={searchSongs}
                    className="mb-5 flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-b from-[#202020] to-[#111] px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.4)]"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="size-5 shrink-0 fill-none stroke-white/50 stroke-2"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search songs, artists..."
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/25"
                    />

                    <kbd className="hidden rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/30 sm:block">
                        ENTER
                    </kbd>
                </form>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,560px)_300px] lg:justify-center">

                    {/* Player */}
                    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#2a2a2a] via-[#141414] to-[#090909] p-px">
                        <div className="relative aspect-square overflow-hidden rounded-[27px] bg-black">

                            {artwork ? (
                                <img
                                    src={artwork}
                                    alt={currentSong?.trackName ?? ""}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-black" />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

                            {/* Top controls */}
                            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                                <div className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[11px] font-medium tracking-wide backdrop-blur-xl">
                                    NOW PLAYING
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setLiked(!liked)}
                                        className="grid size-10 place-items-center rounded-full border border-white/10 bg-black/35 backdrop-blur-xl transition hover:bg-white/10"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className={`size-5 stroke-2 ${
                                                liked
                                                    ? "fill-white stroke-white"
                                                    : "fill-none stroke-white/75"
                                            }`}
                                        >
                                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        className="grid size-10 place-items-center rounded-full border border-white/10 bg-black/35 backdrop-blur-xl transition hover:bg-white/10"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="size-5 fill-none stroke-white stroke-2"
                                        >
                                            <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                                            <path d="M5 13v6h14v-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Bottom content */}
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <div className="mb-4">
                                    <p className="text-sm text-white/55">
                                        {currentSong?.artistName ??
                                            "Search for a track"}
                                    </p>

                                    <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight">
                                        {currentSong?.trackName ??
                                            "Nothing playing"}
                                    </h1>

                                    <p className="mt-1 truncate text-xs text-white/35">
                                        {currentSong?.collectionName}
                                    </p>
                                </div>

                                {/* Progress */}
                                <div
                                    onClick={seek}
                                    className="relative h-5 cursor-pointer"
                                >
                                    <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white/20">
                                        <div
                                            className="h-full rounded-full bg-white"
                                            style={{
                                                width: `${
                                                    duration
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
                                    <span>
                                        {formatTime(currentTime)}
                                    </span>

                                    <span>
                                        {formatTime(duration)}
                                    </span>
                                </div>

                                {/* Main controls */}
                                <div className="mt-5 flex items-center justify-between">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShuffle(!shuffle)
                                        }
                                        className={`grid size-9 place-items-center rounded-full transition ${
                                            shuffle
                                                ? "bg-white text-black"
                                                : "text-white/40 hover:text-white"
                                        }`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="size-[18px] fill-none stroke-current stroke-2"
                                        >
                                            <path d="M4 7h3c5 0 5 10 10 10h3" />
                                            <path d="m17 14 3 3-3 3" />
                                            <path d="M4 17h3c2 0 3-.8 4-2" />
                                            <path d="M14 7h6" />
                                            <path d="m17 4 3 3-3 3" />
                                        </svg>
                                    </button>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={previousSong}
                                            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl transition hover:bg-white/15"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="size-5 fill-current"
                                            >
                                                <path d="M6 5h2v14H6V5Zm3 7 9-7v14l-9-7Z" />
                                            </svg>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={togglePlay}
                                            className="grid size-16 place-items-center rounded-full bg-gradient-to-b from-white to-[#d8d8d8] text-black shadow-lg transition hover:scale-105 active:scale-95"
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
                                                    className="ml-1 size-7 fill-current"
                                                >
                                                    <path d="M8 5v14l11-7Z" />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={nextSong}
                                            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl transition hover:bg-white/15"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="size-5 fill-current"
                                            >
                                                <path d="M16 5h2v14h-2V5ZM6 5l9 7-9 7V5Z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setRepeat(!repeat)
                                        }
                                        className={`grid size-9 place-items-center rounded-full transition ${
                                            repeat
                                                ? "bg-white text-black"
                                                : "text-white/40 hover:text-white"
                                        }`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="size-[18px] fill-none stroke-current stroke-2"
                                        >
                                            <path d="M17 2l3 3-3 3" />
                                            <path d="M3 11V9a4 4 0 0 1 4-4h13" />
                                            <path d="m7 22-3-3 3-3" />
                                            <path d="M21 13v2a4 4 0 0 1-4 4H4" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Volume */}
                                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-2.5 backdrop-blur-xl">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="size-4 fill-none stroke-white/50 stroke-2"
                                    >
                                        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                                        <path d="M15 9a4 4 0 0 1 0 6" />
                                    </svg>

                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) =>
                                            setVolume(
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="w-full accent-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <aside className="rounded-[26px] border border-white/10 bg-gradient-to-b from-[#181818] to-[#0d0d0d] p-2.5">
                        <div className="flex items-end justify-between px-2 pb-3 pt-2">
                            <div>
                                <p className="text-sm font-semibold">
                                    Search results
                                </p>

                                <p className="text-xs text-white/35">
                                    {songs.length} tracks
                                </p>
                            </div>

                            <span className="text-[11px] text-white/25">
                                Queue
                            </span>
                        </div>

                        <div className="space-y-1">
                            {songs.map((song, index) => {
                                const active =
                                    song.trackId ===
                                    currentSong?.trackId;

                                return (
                                    <button
                                        key={song.trackId}
                                        type="button"
                                        onClick={() =>
                                            playSong(song)
                                        }
                                        className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition ${
                                            active
                                                ? "border-white/10 bg-white/10"
                                                : "border-transparent hover:bg-white/[0.05]"
                                        }`}
                                    >
                                        <img
                                            src={song.artworkUrl100}
                                            alt=""
                                            className="size-10 shrink-0 rounded-lg object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                {song.trackName}
                                            </p>

                                            <p className="truncate text-xs text-white/35">
                                                {song.artistName}
                                            </p>
                                        </div>

                                        <span className="text-[10px] text-white/20">
                                            {String(
                                                index + 1
                                            ).padStart(2, "0")}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>
                </div>

                <audio
                    ref={audioRef}
                    src={currentSong?.previewUrl}
                    loop={repeat}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                        setIsPlaying(false);

                        if (!repeat) {
                            nextSong();
                        }
                    }}
                    onTimeUpdate={(e) =>
                        setCurrentTime(
                            e.currentTarget.currentTime
                        )
                    }
                    onLoadedMetadata={(e) =>
                        setDuration(e.currentTarget.duration)
                    }
                />
            </div>
        </div>
    );
}