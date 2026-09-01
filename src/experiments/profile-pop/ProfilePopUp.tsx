"use client";
import { useState } from "react";

export default function ProfilePopUp() {
    const [open, setOpen] = useState(false);

    const bubbles = [
        { size: 102, x: -108, y: -170, image: "/profile-popup/1-img.png" },
        { size: 82, x: -40, y: -262, image: "/profile-popup/3-img.png" },
        { size: 158, x: 56, y: -136, image: "/profile-popup/4-img.png" },
        { size: 56, x: 86, y: -242, image: "/profile-popup/2-img.png" },
        { size: 86, x: -82, y: -74, image: "/profile-popup/5-img.png" },
    ];

    const bubbleStyle =
        "rounded-full overflow-hidden bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),inset_-10px_-12px_24px_rgba(0,0,0,0.28),0_12px_28px_rgba(0,0,0,0.28)]";

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#080808]">
            <div className="relative">
                {bubbles.map((b, i) => {
                    const delay = open ? i * 70 : (bubbles.length - 1 - i) * 45;

                    return (
                        <div
                            key={i}
                            className={`absolute left-1/2 top-1/2 ${bubbleStyle}`}
                            style={{
                                width: b.size,
                                height: b.size,
                                opacity: open ? 1 : 0,
                                transform: open
                                    ? `translate(calc(-50% + ${b.x}px),calc(-50% + ${b.y}px)) scale(1)`
                                    : "translate(-50%,-50%) scale(.55)",
                                filter: open ? "blur(0px)" : "blur(1.5px)",
                                transition: `transform 820ms cubic-bezier(.16,1,.3,1) ${delay}ms, opacity 420ms ease ${delay}ms, filter 500ms ease ${delay}ms`,
                                willChange: "transform, opacity, filter",
                            }}
                        >
                            <img
                                src={b.image}
                                alt=""
                                draggable={false}
                                className="h-full w-full object-cover scale-[1.03]"
                            />
                            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,.16),transparent_28%,rgba(255,255,255,.025)_45%,rgba(0,0,0,.06)_68%,rgba(0,0,0,.24)_100%)]" />
                            <div className="pointer-events-none absolute inset-[1px] rounded-full ring-1 ring-inset ring-white/[0.035]" />
                        </div>
                    );
                })}

                <button
                    onClick={() => setOpen(v => !v)}
                    className={`relative z-20 flex h-[78px] w-[78px] -translate-y-[14px] items-center justify-center ${bubbleStyle} text-[38px] font-extralight text-white/85 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03] active:scale-[.96]`}
                >
                    <span
                        className="mb-[3px] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                        style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                        +
                    </span>
                </button>
            </div>
        </div>
    );
}