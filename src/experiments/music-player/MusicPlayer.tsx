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
                `https://itunes.apple.com/search?term=${encodeURIComponent(search)}&media=music&entity=song&limit=8`
            );

            const data = await response.json();
            const results = (data.results as Song[]).filter((song) => song.previewUrl);

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

        if (audio.paused) await audio.play();
        else audio.pause();
    };

    const nextSong = () => {
        if (!songs.length || !currentSong) return;

        if (shuffle) {
            playSong(songs[Math.floor(Math.random() * songs.length)]);
            return;
        }

        const index = songs.findIndex((song) => song.trackId === currentSong.trackId);
        playSong(songs[(index + 1) % songs.length]);
    };

    const previousSong = () => {
        if (!songs.length || !currentSong) return;

        const index = songs.findIndex((song) => song.trackId === currentSong.trackId);
        playSong(songs[(index - 1 + songs.length) % songs.length]);
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);

        audio.currentTime = percent * duration;
    };

    const formatTime = (seconds: number) => {
        if (!Number.isFinite(seconds)) return "0:00";

        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);

        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const artwork = currentSong?.artworkUrl100.replace("100x100", "1200x1200") ?? "";

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 text-white">
            <div className="w-full max-w-[900px]">

                {/* Search */}
                <form onSubmit={searchSongs} className="mb-4 flex items-center gap-3 px-1">
                    <div className="flex h-11 flex-1 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.045] px-4 transition-all duration-300 ease-out focus-within:border-white/15 focus-within:bg-white/[0.065]">
                        <svg viewBox="0 0 24 24" className="size-[18px] shrink-0 fill-none stroke-white/35 stroke-[1.8]">
                            <circle cx="11" cy="11" r="6.5" />
                            <path d="m16 16 4 4" />
                        </svg>

                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search tracks or artists"
                            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                        />
                    </div>

                    <button
                        type="submit"
                        className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-black transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-zinc-100 active:scale-95"
                    >
                        <svg viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current stroke-2">
                            <path d="m9 6 6 6-6 6" />
                        </svg>
                    </button>
                </form>

                {/* Console */}
                <div className="grid overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#101010] lg:grid-cols-[1fr_290px]">

                    {/* Player */}
                    <section className="relative min-h-[540px] overflow-hidden bg-black">
                        {artwork ? (
                            <img
                                src={artwork}
                                alt={currentSong?.trackName ?? ""}
                                className="absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90" />

                        {/* Top */}
                        <div className="absolute inset-x-0 top-0 flex items-center justify-end gap-2 p-4">
                            <button
                                type="button"
                                onClick={() => setLiked(!liked)}
                                className="grid size-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition-all duration-300 ease-out hover:bg-black/55 hover:scale-105 active:scale-95"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className={`size-[18px] stroke-2 transition-all duration-300 ${liked ? "fill-white stroke-white scale-110" : "fill-none stroke-white/70"}`}
                                >
                                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                className="grid size-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition-all duration-300 ease-out hover:bg-black/55 hover:scale-105 active:scale-95"
                            >
                                <svg viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current stroke-2">
                                    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                                    <path d="M5 13v6h14v-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Bottom */}
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-5">
                                <p className="mb-1 text-sm text-white/50">{currentSong?.artistName ?? "No artist"}</p>

                                <h1 className="truncate text-[28px] font-semibold leading-tight tracking-tight">
                                    {currentSong?.trackName ?? "Nothing playing"}
                                </h1>

                                <p className="mt-1 truncate text-xs text-white/30">{currentSong?.collectionName}</p>
                            </div>

                            {/* Progress */}
                            <div onClick={seek} className="group relative h-5 cursor-pointer">
                                <div className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-white/20">
                                    <div
                                        className="relative h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
                                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    >
                                        <span className="absolute right-0 top-1/2 size-2.5 -translate-y-1/2 translate-x-1/2 scale-75 rounded-full bg-gradient-to-br from-white via-zinc-300 to-zinc-500 opacity-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between text-[11px] tabular-nums text-white/35">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>

                            {/* Controls */}
                            <div className="relative mt-5 flex h-16 items-center">
                                {/* Left */}
                                <div className="absolute left-0 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShuffle(!shuffle)}
                                        className={`grid size-9 place-items-center rounded-full transition-colors duration-300 ${shuffle ? "text-white" : "text-white/30 hover:text-white"
                                            }`}
                                    >
                                        <svg viewBox="0 0 24 24" className="size-[17px] fill-none stroke-current stroke-2">
                                            <path d="M4 7h3c5 0 5 10 10 10h3" />
                                            <path d="m17 14 3 3-3 3" />
                                            <path d="M4 17h3c2 0 3-.8 4-2" />
                                            <path d="M14 7h6" />
                                            <path d="m17 4 3 3-3 3" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Center transport - never moves */}
                                <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={previousSong}
                                        className="grid size-10 place-items-center rounded-full text-white/65 transition duration-300 hover:bg-white/10 hover:text-white active:scale-95"
                                    >
                                        <svg viewBox="0 0 24 24" className="size-5 fill-current">
                                            <path d="M6 5h2v14H6V5Zm3 7 9-7v14l-9-7Z" />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={togglePlay}
                                        className="grid size-[62px] place-items-center rounded-full bg-white text-black shadow-lg transition duration-300 hover:scale-105 active:scale-95"
                                    >
                                        {isPlaying ? (
                                            <svg viewBox="0 0 24 24" className="size-7 fill-current">
                                                <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-current">
                                                <path d="M8 5v14l11-7Z" />
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={nextSong}
                                        className="grid size-10 place-items-center rounded-full text-white/65 transition duration-300 hover:bg-white/10 hover:text-white active:scale-95"
                                    >
                                        <svg viewBox="0 0 24 24" className="size-5 fill-current">
                                            <path d="M16 5h2v14h-2V5ZM6 5l9 7-9 7V5Z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Right controls - reserved area */}
                                <div className="absolute right-0 flex min-w-[190px] items-center justify-end gap-2">
                                    <div className="group relative flex items-center">
                                        <button
                                            type="button"
                                            className="grid size-9 place-items-center text-white/30 transition-colors duration-300 hover:text-white"
                                        >
                                            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.7]">
                                                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                                                <path d="M15 9a4 4 0 0 1 0 6" />
                                            </svg>
                                        </button>

                                        {/* Opens to the RIGHT */}
                                        <div className="pointer-events-none absolute left-9 z-20 translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100">
                                            <div className="flex h-8 items-center gap-2 rounded-full border border-white/10 bg-black/55 px-2 backdrop-blur-md">
                                                <button
                                                    type="button"
                                                    onClick={() => setVolume(Math.max(0, volume - 0.1))}
                                                    className="grid size-5 place-items-center text-sm text-white/35 transition hover:text-white focus:outline-none"
                                                >
                                                    −
                                                </button>

                                                <div className="relative h-4 w-16">
                                                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 rounded-full bg-white/15" />

                                                    <div
                                                        className="absolute left-0 top-1/2 h-px -translate-y-1/2 rounded-full bg-white/70"
                                                        style={{ width: `${volume * 100}%` }}
                                                    />

                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={volume}
                                                        onChange={(e) => setVolume(Number(e.target.value))}
                                                        className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setVolume(Math.min(1, volume + 0.1))}
                                                    className="grid size-5 place-items-center text-sm text-white/35 transition hover:text-white focus:outline-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setRepeat(!repeat)}
                                        className={`grid size-9 place-items-center rounded-full transition-colors duration-300 ${repeat ? "text-white" : "text-white/30 hover:text-white"
                                            }`}
                                    >
                                        <svg viewBox="0 0 24 24" className="size-[17px] fill-none stroke-current stroke-2">
                                            <path d="M17 2l3 3-3 3" />
                                            <path d="M3 11V9a4 4 0 0 1 4-4h13" />
                                            <path d="m7 22-3-3 3-3" />
                                            <path d="M21 13v2a4 4 0 0 1-4 4H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Results */}
                    <aside className="border-t border-white/[0.07] bg-[#111] p-3 lg:border-l lg:border-t-0">
                        <div className="flex items-center justify-between px-2 py-2">
                            <div>
                                <p className="text-sm font-medium">Results</p>
                                <p className="text-[11px] text-white/30">{songs.length} tracks</p>
                            </div>

                            <span className="text-[10px] uppercase tracking-wider text-white/20">Queue</span>
                        </div>

                        <div className="mt-1 space-y-1">
                            {songs.map((song, index) => {
                                const active = song.trackId === currentSong?.trackId;

                                return (
                                    <button
                                        key={song.trackId}
                                        type="button"
                                        onClick={() => playSong(song)}
                                        className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-all duration-300 ease-out ${active ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}
                                    >
                                        <img
                                            src={song.artworkUrl100}
                                            alt=""
                                            className="size-10 shrink-0 rounded-lg object-cover transition-transform duration-300 ease-out hover:scale-105"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{song.trackName}</p>
                                            <p className="truncate text-xs text-white/30">{song.artistName}</p>
                                        </div>

                                        <span className="text-[10px] tabular-nums text-white/15">
                                            {String(index + 1).padStart(2, "0")}
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
                        if (!repeat) nextSong();
                    }}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                />
            </div>
        </div>
    );
}