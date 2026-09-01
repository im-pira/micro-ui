"use client";
import { useState } from "react";

export default function BlackCardStack() {
    const [open, setOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const cards = [
        { closed: 28, open: -44, color: "#414141", title: "PROJECTS", text: "Selected experiments and product work." },
        { closed: 42, open: -20, color: "#343434", title: "ABOUT", text: "Designer and developer building interactive things." },
        { closed: 56, open: 4, color: "#292929", title: "EXPERIENCE", text: "Interfaces, design systems and creative development." },
        { closed: 70, open: 28, color: "#202020", title: "CONTACT", text: "Let's make something interesting together." },
    ];

    const barcode = [1,1,2,1,3,1,2,1,1,3,2,1,1,2,3,1,1,2,1,3,1,2];
    const activeCard = hoveredCard !== null ? cards[hoveredCard] : cards[0];
    const showingPreview = open && hoveredCard !== null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#080808]">
            <style>{`@import url("https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap");.black-ops{font-family:"Black Ops One",sans-serif;}`}</style>
            <div className="relative h-[420px] w-[720px]">
                <div className="absolute left-[100px] top-1/2 h-[210px] w-[210px] -translate-y-1/2 [perspective:1000px]">
                    <div className="relative h-full w-full [transform:rotateX(3deg)_rotateY(-4deg)] [transform-style:preserve-3d]">
                        <button onClick={() => { setOpen(v => !v); setHoveredCard(null); }} className="absolute inset-0 z-0 outline-none" aria-label="Toggle wallet" />
                        <div className="pointer-events-none absolute inset-0 translate-x-[-8px] translate-y-[10px] rounded-[44px] bg-[#090909] shadow-[0_30px_55px_rgba(0,0,0,.55)]" />
                        <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-[linear-gradient(145deg,#1b1b1b,#0b0b0b)] shadow-[inset_3px_3px_8px_rgba(255,255,255,.04),inset_-10px_-12px_20px_rgba(0,0,0,.5),0_18px_35px_rgba(0,0,0,.35)]">
                            <div className="absolute inset-[8px] rounded-[36px] bg-[linear-gradient(145deg,#141414,#0d0d0d)]" />
                        </div>
                        <div onMouseLeave={() => setHoveredCard(null)} className="absolute left-[15px] right-[15px] -top-[78px] bottom-[65px] overflow-hidden rounded-t-[30px]">
                            {cards.map((card, i) => {
                                const top = open ? card.open + 86 : card.closed + 86;
                                return <div key={card.title} className="pointer-events-none absolute left-[6px] right-[6px] h-[116px] rounded-[24px]" style={{ top, zIndex: i + 1, background: `linear-gradient(145deg, ${card.color}, #141414)`, boxShadow: "inset 0 2px 3px rgba(255,255,255,.045),0 7px 14px rgba(0,0,0,.28)", transition: `top 700ms cubic-bezier(.16,1,.3,1) ${open ? i * 55 : (cards.length - 1 - i) * 38}ms` }} />;
                            })}
                            {open && cards.map((card, i) => {
                                const top = card.open + 86;
                                const nextTop = i < cards.length - 1 ? cards[i + 1].open + 86 : top + 30;
                                return <div key={`hover-${card.title}`} onMouseEnter={() => setHoveredCard(i)} className="absolute left-[6px] right-[6px] z-30 cursor-pointer" style={{ top, height: Math.max(nextTop - top, 26) }} />;
                            })}
                        </div>
                        <div className="pointer-events-none absolute bottom-[10px] left-[10px] right-[10px] z-40 h-[106px] rounded-[24px_24px_34px_34px] bg-[linear-gradient(145deg,#171717,#0b0b0b)] shadow-[inset_3px_3px_7px_rgba(255,255,255,.035),inset_-10px_-12px_18px_rgba(0,0,0,.45),0_14px_26px_rgba(0,0,0,.4)]">
                            <div className="absolute left-1/2 top-0 h-[40px] w-[72px] -translate-x-1/2 overflow-hidden">
                                <div className="absolute left-1/2 top-[-36px] h-[72px] w-[72px] -translate-x-1/2 rounded-full bg-[#080808]" />
                            </div>
                        </div>
                    </div>
                </div>
                <svg className="pointer-events-none absolute left-[318px] top-1/2 h-[92px] w-[105px] overflow-visible" viewBox="0 0 105 92" style={{ opacity: showingPreview ? 0.58 : 0, transform: showingPreview ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(-8px)", transition: "opacity 160ms ease, transform 320ms cubic-bezier(.16,1,.3,1)" }}>
                    <path d="M4 68 C15 34 39 20 86 22" fill="none" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
                    <path d="M78 15 L88 22 L79 30" fill="none" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="absolute left-[432px] top-1/2 h-[190px] w-[190px]" style={{ opacity: showingPreview ? 1 : 0, pointerEvents: showingPreview ? "auto" : "none", transform: showingPreview ? "translateY(-50%) translateX(0) scale(1)" : "translateY(-50%) translateX(-10px) scale(.97)", transition: "opacity 160ms ease, transform 360ms cubic-bezier(.16,1,.3,1)" }}>
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] border border-white/[0.04] p-[26px]" style={{ background: `radial-gradient(circle at 28% 16%,rgba(255,255,255,.12),transparent 30%),linear-gradient(120deg,rgba(255,255,255,.035) 0%,transparent 22%,rgba(255,255,255,.018) 46%,transparent 72%),linear-gradient(145deg,${activeCard.color} 0%,#202020 42%,#121212 100%)`, boxShadow: "inset 1px 1px 0 rgba(255,255,255,.08),inset -10px -12px 24px rgba(0,0,0,.42),inset 0 0 28px rgba(255,255,255,.018),0 24px 50px rgba(0,0,0,.5)", backdropFilter: "blur(10px)", transition: "background 220ms ease, box-shadow 220ms ease" }}>
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.025)_38%,rgba(255,255,255,.07)_49%,rgba(255,255,255,.018)_58%,transparent_72%)]" />
                        <div className="pointer-events-none absolute left-[14%] top-[7%] h-[26%] w-[58%] rotate-[-8deg] rounded-full bg-white/[0.035] blur-xl" />
                        <div className="relative z-10 flex h-full flex-col">
                            <div className="black-ops text-[17px] tracking-[0.04em] text-white/90">{activeCard.title}</div>
                            <p className="mt-[28px] max-w-[145px] text-[11px] leading-[1.55] text-white/50">{activeCard.text}</p>
                            <div className="mt-auto flex justify-end">
                                <div className="flex h-[14px] items-end gap-[1px] opacity-40">
                                    {barcode.map((w, i) => <span key={i} className="bg-white" style={{ width: `${w}px`, height: "12px" }} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}