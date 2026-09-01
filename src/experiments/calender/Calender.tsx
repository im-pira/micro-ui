import { useMemo, useState } from "react";
import Wheel from "./Wheel";

export default function Calender() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const years = Array.from({ length: 31 }, (_, i) => 2020 + i);
    const today = new Date();
    const todayMonth = today.getMonth(), todayYear = today.getFullYear();
    const defaultYearIndex = Math.max(0, years.indexOf(todayYear));

    const [month, setMonth] = useState(todayMonth);
    const [yearIndex, setYearIndex] = useState(defaultYearIndex);
    const [selected, setSelected] = useState<number | null>(today.getDate());
    const year = years[yearIndex];

    const days = useMemo(() => {
        const first = new Date(year, month, 1).getDay(), total = new Date(year, month + 1, 0).getDate();
        const arr = [...Array(first).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
        return [...arr, ...Array(42 - arr.length).fill(null)];
    }, [month, year]);

    const move = (n: number) => {
        let m = month + n, y = yearIndex;
        if (m < 0) { m = 11; y = Math.max(0, y - 1) }
        if (m > 11) { m = 0; y = Math.min(years.length - 1, y + 1) }
        setMonth(m); setYearIndex(y); setSelected(null);
    };

    const reset = () => {
        setMonth(todayMonth);
        setYearIndex(defaultYearIndex);
        setSelected(today.getDate());
    };

    return (
        <main className="grid min-h-screen place-items-center bg-[#111] p-5">
            <div className="flex h-[520px] w-[380px] flex-col rounded-xl border border-white/5 bg-[#080808] p-4 text-white shadow-[10px_12px_12px_rgba(0,0,0,.7)]">

                <div className="mb-4 overflow-hidden rounded-lg border border-white/15">
                    <video src="/calender/calendar-video.mov" autoPlay muted loop playsInline className="h-[130px] w-full object-cover" />
                </div>

                <div className="relative mb-2">
                    <svg
                        className="pointer-events-none absolute left-0 top-[-6px] z-0 h-[88px] w-full overflow-visible"
                        viewBox="0 0 348 88"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="waveFade" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0" />
                                <stop offset="7%" stopColor="#ff6b6b" stopOpacity="1" />
                                <stop offset="93%" stopColor="#ff6b6b" stopOpacity="1" />
                                <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0" />
                            </linearGradient>

                            <filter id="hardGlow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="2.2" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <path
                            d="M0 55
                            C18 62 35 65 47 60
                            C55 56 55 37 61 23
                            C67 10 77 6 89 8
                            C103 10 116 21 131 33
                            C150 47 169 60 188 68
                            C204 75 218 78 229 76
                            C239 74 246 65 253 54
                            C260 43 268 38 279 37
                            C292 36 301 39 313 36
                            C324 33 332 29 342 31
                            C350 33 356 38 364 43
                            "
                            fill="none"
                            stroke="url(#waveFade)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#hardGlow)"
                        />
                    </svg>

                    <div className="relative z-10 mb-3 flex h-8 items-center justify-between">
                        <button
                            onClick={() => move(-1)}
                            className="h-8 w-8 rounded-md border border-white/15 bg-[#0d0d0d] text-white/60 outline-none hover:bg-white/[.06] focus:outline-none focus-visible:ring-0"
                        >
                            ‹
                        </button>

                        <div className="flex h-8 items-center rounded-md border border-white/10 bg-[#0d0d0d] shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
                            <div className="px-3">
                                <Wheel items={months} value={month} setValue={v => { setMonth(v); setSelected(null) }} />
                            </div>

                            <div className="h-4 w-px bg-white/10" />

                            <div className="px-3">
                                <Wheel items={years} value={yearIndex} setValue={v => { setYearIndex(v); setSelected(null) }} />
                            </div>
                        </div>

                        <button
                            onClick={() => move(1)}
                            className="h-8 w-8 rounded-md border border-white/15 bg-[#0d0d0d] text-white/60 outline-none hover:bg-white/[.06] focus:outline-none focus-visible:ring-0"
                        >
                            ›
                        </button>
                    </div>

                    <div className="relative z-10 grid grid-cols-7 text-center text-[9px] tracking-wider text-white/30">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}
                    </div>
                </div>

                <div className="grid h-[235px] grid-cols-7 grid-rows-6 gap-1.5">
                    {days.map((d, i) => d ? (
                        <button
                            key={i}
                            onClick={() => setSelected(d)}
                            className={`relative rounded-md border text-[11px] outline-none transition focus:outline-none focus-visible:ring-0 ${selected === d
                                ? "border-white/25 bg-[#1a1a1a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"
                                : "border-white/10 bg-white/[.02] text-white/65 hover:border-white/25"
                                }`}
                        >
                            {d}

                            {d === today.getDate() && month === todayMonth && year === todayYear && (
                                <span className="absolute bottom-[2px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-amber-300" />
                            )}
                        </button>
                    ) : <div key={i} />)}
                </div>

                <div className="mt-4">
                    <div className="mb-2 flex justify-end">
                        <button
                            onClick={reset}
                            title="Back to today"
                            className="text-white/45 outline-none transition hover:text-white/80 focus:outline-none focus-visible:ring-0"
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                <path d="M7.5 7.5H3.8V3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.2 7.2A8.5 8.5 0 1 1 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M12 8.2v4.2l2.8 1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex h-8 items-end justify-between border-t border-white/10 pt-3 text-[10px] text-white/35">
                        <span>{selected !== null ? `${selected} ${months[month]} ${year}` : "Select date"}</span>
                        <span className="tracking-[.2em]">CALENDAR</span>
                    </div>
                </div>

            </div>
        </main>
    );
}