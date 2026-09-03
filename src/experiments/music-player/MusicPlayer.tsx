import { useEffect, useRef, useState } from "react";

type Song = {
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName: string;
    artworkUrl100: string;
    previewUrl: string;
};

type LyricLine = {
    time: number;
    text: string;
};

type LyricsResult = {
    syncedLyrics?: string | null;
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
    const [lyrics, setLyrics] = useState<LyricLine[]>([]);
    const [lyricsLoading, setLyricsLoading] = useState(false);
    const [lyricsOffset, setLyricsOffset] = useState(0);

    const searchSongs = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search = query.trim();
        if (!search) return;
        try {
            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(search)}&media=music&entity=song&limit=8`);
            const data = await response.json();
            const results = (data.results as Song[]).filter((song) => song.previewUrl);
            setSongs(results);
            if (results.length) setCurrentSong(results[0]);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    const playSong = (song: Song) => {
        setCurrentSong(song);
        requestAnimationFrame(async () => {
            try {
                await audioRef.current?.play();
            } catch (error) {
                console.error("Playback failed:", error);
            }
        });
    };

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;
        try {
            if (audio.paused) await audio.play();
            else audio.pause();
        } catch (error) {
            console.error("Playback failed:", error);
        }
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

    const parseLyrics = (lrc: string): LyricLine[] =>
        lrc
            .split("\n")
            .map((line) => {
                const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\]\s?(.*)/);
                if (!match) return null;
                return { time: Number(match[1]) * 60 + Number(match[2]), text: match[3].trim() };
            })
            .filter((line): line is LyricLine => Boolean(line?.text));

    const artwork = currentSong?.artworkUrl100.replace("100x100", "1200x1200") ?? "";
    const lyricTime = currentTime + lyricsOffset;
    const activeLyricIndex = lyrics.reduce((last, line, index) => lyricTime >= line.time ? index : last, -1);
    const lyricStart = Math.max(activeLyricIndex - 1, 0);
    const visibleLyrics = lyrics.slice(lyricStart, lyricStart + 3);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        setCurrentTime(0);
        setDuration(0);
        setLyricsOffset(0);
    }, [currentSong]);

    useEffect(() => {
        if (!currentSong) {
            setLyrics([]);
            return;
        }
        const controller = new AbortController();
        const loadLyrics = async () => {
            setLyricsLoading(true);
            setLyrics([]);
            try {
                const cleanTitle = currentSong.trackName
                    .replace(/\([^)]*\)/g, "")
                    .replace(/\[[^\]]*\]/g, "")
                    .replace(/-\s*(slowed|sped up|reverb|remix|cover).*$/i, "")
                    .trim();
                const searches = [
                    { track_name: currentSong.trackName, artist_name: currentSong.artistName },
                    { track_name: cleanTitle, artist_name: currentSong.artistName },
                    { track_name: cleanTitle },
                ];
                let foundLyrics: string | null = null;
                for (const search of searches) {
                    const params = new URLSearchParams(Object.entries(search).filter((entry): entry is [string, string] => entry[1] !== undefined));
                    const response = await fetch(`https://lrclib.net/api/search?${params.toString()}`, { signal: controller.signal });
                    if (!response.ok) continue;
                    const data = (await response.json()) as LyricsResult[];
                    const match = data.find((item) => item.syncedLyrics);
                    if (match?.syncedLyrics) {
                        foundLyrics = match.syncedLyrics;
                        break;
                    }
                }
                setLyrics(foundLyrics ? parseLyrics(foundLyrics) : []);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;
                console.error("Lyrics failed:", error);
                setLyrics([]);
            } finally {
                if (!controller.signal.aborted) setLyricsLoading(false);
            }
        };
        loadLyrics();
        return () => controller.abort();
    }, [currentSong]);

    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 text-white">
            <div className="w-full max-w-[900px]">
                <form onSubmit={searchSongs} className="mb-4">
                    <div className="flex h-12 items-center gap-3 border-b border-white/10 px-1 transition-colors duration-300 focus-within:border-white/30">
                        <svg viewBox="0 0 24 24" className="size-[18px] shrink-0 fill-none stroke-white/35 stroke-[1.8]">
                            <circle cx="11" cy="11" r="6.5" />
                            <path d="m16 16 4 4" />
                        </svg>
                        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tracks or artists" className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/25" />
                    </div>
                </form>

                <div className="grid overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#101010] lg:grid-cols-[1fr_290px]">
                    <section className="relative min-h-[540px] overflow-hidden bg-black">
                        {artwork ? (
                            <img src={artwork} alt={currentSong?.trackName ?? ""} className="absolute inset-0 size-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/90" />

                        <div className="absolute inset-x-0 top-0 flex items-center justify-end gap-2 p-4">
                            <button type="button" onClick={() => setLiked(!liked)} className="grid size-10 place-items-center rounded-full bg-black/35 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/55 active:scale-95 focus:outline-none">
                                <svg viewBox="0 0 24 24" className={`size-[18px] stroke-2 transition-all duration-300 ${liked ? "fill-white stroke-white" : "fill-none stroke-white/70"}`}>
                                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
                                </svg>
                            </button>
                            <button type="button" className="grid size-10 place-items-center rounded-full bg-black/35 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/55 active:scale-95 focus:outline-none">
                                <svg viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current stroke-2">
                                    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                                    <path d="M5 13v6h14v-6" />
                                </svg>
                            </button>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-5">
                                <p className="mb-1 text-sm text-white/50">{currentSong?.artistName ?? "No artist"}</p>
                                <h1 className="truncate text-[28px] font-semibold leading-tight tracking-tight">{currentSong?.trackName ?? "Nothing playing"}</h1>
                                <p className="mt-1 truncate text-xs text-white/30">{currentSong?.collectionName}</p>
                            </div>

                            <div onClick={seek} className="group relative h-5 cursor-pointer">
                                <div className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-white/20">
                                    <div className="relative h-full rounded-full bg-white transition-[width] duration-100 ease-linear" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}>
                                        <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 translate-x-1/2 scale-75 rounded-full bg-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between text-[11px] tabular-nums text-white/35">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>

                            <div className="relative mt-5 h-16">
                                <button type="button" onClick={() => setShuffle(!shuffle)} className={`absolute left-0 top-1/2 grid size-9 -translate-y-1/2 place-items-center transition-colors duration-300 focus:outline-none ${shuffle ? "text-white" : "text-white/30 hover:text-white"}`}>
                                    <svg viewBox="0 0 24 24" className="size-[17px] fill-none stroke-current stroke-2">
                                        <path d="M4 7h3c5 0 5 10 10 10h3" />
                                        <path d="m17 14 3 3-3 3" />
                                        <path d="M4 17h3c2 0 3-.8 4-2" />
                                        <path d="M14 7h6" />
                                        <path d="m17 4 3 3-3 3" />
                                    </svg>
                                </button>

                                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-5">
                                    <button type="button" onClick={previousSong} className="grid size-10 place-items-center text-white/45 transition-all duration-300 hover:scale-110 hover:text-white active:scale-90 focus:outline-none">
                                        <svg viewBox="0 0 24 24" className="size-5 fill-current">
                                            <path d="M6 5h2v14H6V5Zm3 7 9-7v14l-9-7Z" />
                                        </svg>
                                    </button>

                                    <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="group relative grid size-[72px] place-items-center rounded-full focus:outline-none">
                                        <span className={`absolute inset-0 rounded-full border border-white/25 bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),inset_0_-3px_5px_rgba(0,0,0,0.28),0_5px_16px_rgba(0,0,0,0.35)] ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}>
                                            {Array.from({ length: 16 }).map((_, i) => (
                                                <span key={i} className="absolute left-1/2 top-1/2 size-[2px] rounded-full bg-black/35" style={{ transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-27px)` }} />
                                            ))}
                                            <span className="absolute left-1/2 top-[5px] h-1.5 w-[2px] -translate-x-1/2 rounded-full bg-black/50" />
                                        </span>
                                        <span className="absolute inset-[8px] rounded-full border border-black/15 bg-gradient-to-br from-[#f7f7f7] to-[#c7c7c7] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)] transition-transform duration-300 group-hover:scale-[0.97] group-active:scale-90" />
                                        <span className="relative z-10 grid place-items-center text-black">
                                            {isPlaying ? (
                                                <svg viewBox="0 0 24 24" className="size-6 fill-current"><path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" /></svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" className="ml-0.5 size-6 fill-current"><path d="M8 5v14l11-7Z" /></svg>
                                            )}
                                        </span>
                                    </button>

                                    <button type="button" onClick={nextSong} className="grid size-10 place-items-center text-white/45 transition-all duration-300 hover:scale-110 hover:text-white active:scale-90 focus:outline-none">
                                        <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M16 5h2v14h-2V5ZM6 5l9 7-9 7V5Z" /></svg>
                                    </button>
                                </div>

                                <div className="absolute right-0 top-1/2 flex w-[190px] -translate-y-1/2 items-center justify-end gap-1">
                                    <div className="group flex items-center justify-end">
                                        <div className="max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity] duration-500 ease-out group-hover:max-w-[122px] group-hover:opacity-100">
                                            <div className="mr-1.5 flex h-7 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.07] px-2 backdrop-blur-lg">
                                                <button type="button" onClick={() => setVolume(Math.max(0, volume - 0.1))} className="text-sm leading-none text-white/35 transition hover:text-white focus:outline-none">−</button>
                                                <div className="relative h-4 w-14">
                                                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/20" />
                                                    <div className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-white/75" style={{ width: `${volume * 100}%` }} />
                                                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-pointer opacity-0 outline-none" />
                                                </div>
                                                <button type="button" onClick={() => setVolume(Math.min(1, volume + 0.1))} className="text-sm leading-none text-white/35 transition hover:text-white focus:outline-none">+</button>
                                            </div>
                                        </div>

                                        <button type="button" className="grid size-9 shrink-0 place-items-center text-white/35 transition-colors duration-300 hover:text-white focus:outline-none">
                                            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.7]">
                                                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                                                <path d="M15 9a4 4 0 0 1 0 6" />
                                            </svg>
                                        </button>
                                    </div>

                                    <button type="button" onClick={() => setRepeat(!repeat)} className={`grid size-9 shrink-0 place-items-center transition-colors duration-300 focus:outline-none ${repeat ? "text-white" : "text-white/30 hover:text-white"}`}>
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

                    <aside className="relative overflow-hidden rounded-r-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_30%_15%,#2a2a2a_0%,#171717_35%,#0c0c0c_72%,#050505_100%)] p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.10),inset_0_-2px_8px_rgba(0,0,0,0.8)] lg:border-l lg:border-t-0">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,transparent_24%,transparent_70%,rgba(255,255,255,0.025)_100%)]" />
                        <div className="relative z-10">
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
                                        <button key={song.trackId} type="button" onClick={() => playSong(song)} className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-all duration-300 focus:outline-none ${active ? "bg-gradient-to-b from-white/[0.10] to-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_14px_rgba(0,0,0,0.25)]" : "hover:bg-white/[0.045]"}`}>
                                            <div className="relative shrink-0">
                                                <img src={song.artworkUrl100} alt="" className="size-10 rounded-lg object-cover" />
                                                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">{song.trackName}</p>
                                                <p className="truncate text-xs text-white/30">{song.artistName}</p>
                                            </div>
                                            <span className="text-[10px] tabular-nums text-white/15">{String(index + 1).padStart(2, "0")}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                </div>

                <section className="mt-4 h-[145px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-[radial-gradient(circle_at_30%_10%,#1c1c1c_0%,#101010_45%,#080808_100%)] px-6 py-4">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="min-w-0">
                            <p className="text-sm font-medium">Lyrics</p>
                            <p className="truncate text-xs text-white/25">{currentSong?.trackName ?? "Nothing playing"}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {lyrics.length > 0 && (
                                <div className="flex items-center gap-2 text-[10px] text-white/30">
                                    <button type="button" onClick={() => setLyricsOffset((v) => v - 5)} className="transition hover:text-white focus:outline-none">−5s</button>
                                    <span className="min-w-8 text-center tabular-nums">{lyricsOffset > 0 ? "+" : ""}{lyricsOffset}s</span>
                                    <button type="button" onClick={() => setLyricsOffset((v) => v + 5)} className="transition hover:text-white focus:outline-none">+5s</button>
                                </div>
                            )}

                            <div className="flex items-center gap-1.5">
                                {isPlaying && lyrics.length > 0 && <span className="size-1 animate-pulse rounded-full bg-white/50" />}
                                <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">Live</span>
                            </div>
                        </div>
                    </div>

                    {lyricsLoading ? (
                        <p className="text-sm text-white/30">Finding synced lyrics...</p>
                    ) : lyrics.length ? (
                        <div className="space-y-1.5">
                            {visibleLyrics.map((line) => {
                                const index = lyrics.indexOf(line);
                                const active = index === activeLyricIndex;
                                const passed = index < activeLyricIndex;
                                return (
                                    <p key={`${line.time}-${index}`} className={`truncate transition-all duration-300 ${active ? "text-lg font-semibold text-white" : passed ? "text-sm text-white/15" : "text-sm text-white/35"}`}>
                                        {line.text}
                                    </p>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-white/30">No synced lyrics found for this track.</p>
                    )}
                </section>

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