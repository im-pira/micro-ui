"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

function Bin({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="-2 -3 28 29"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 8.5v9A2.5 2.5 0 0 0 9.5 20h5A2.5 2.5 0 0 0 17 17.5v-9" />

            <g
                className="origin-[6px_7px] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{
                    transform: open
                        ? "rotate(-25deg) translate(-1px,-2px)"
                        : "rotate(0deg) translate(0,0)",
                }}
            >
                <path d="M5.5 7h13" />
                <path d="M9 7V4.5h6V7" />
            </g>
        </svg>
    );
}

function AnimatedCheck() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-6 animate-[checkPop_.7s_cubic-bezier(.22,1,.36,1)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M5 12.5 9.5 17 19 7.5"
                pathLength="1"
                className="animate-[checkDraw_.8s_ease-out_forwards]"
                style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1,
                }}
            />

            <style>{`
                @keyframes checkDraw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes checkPop {
                    0% {
                        transform: scale(0.72) rotate(-8deg);
                        opacity: 0;
                    }

                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }
            `}</style>
        </svg>
    );
}

export default function DeleteButton() {
    const [state, setState] = useState<"idle" | "open" | "success">("idle");

    const open = state === "open";
    const success = state === "success";

    const confirm = () => {
        setState("success");

        setTimeout(() => {
            setState("idle");
        }, 1600);
    };

    return (
        <div className="grid min-h-screen place-items-center bg-[#111]">
            <div
                className={`relative flex h-[56px] items-center overflow-hidden rounded-[18px] bg-[#202020]
            shadow-[0_14px_32px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.03)]
            transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
            ${open ? "w-[164px]" : "w-[56px]"}`}
            >
                <button
                    onClick={() => state === "idle" && setState("open")}
                    className={`absolute left-0 grid size-[56px] place-items-center text-[#9e9da8]
                transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                ${success ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
                >
                    <Bin open={open} />
                </button>

                <div
                    className={`absolute left-[58px] flex items-center
                transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                ${open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}
                >
                    <button
                        onClick={confirm}
                        className="grid h-9 w-10 place-items-center rounded-[11px]
                    bg-[#2a2a2a] text-[#ff633f]
                    shadow-[0_6px_14px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.04)]
                    transition-all duration-300
                    hover:-translate-y-[1px] hover:bg-[#303030]
                    hover:shadow-[0_8px_18px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.05)]
                    active:translate-y-0 active:scale-[.98]"
                    >
                        <Check size={19} strokeWidth={3} />
                    </button>

                    <div className="mx-[6px] h-4 w-px rounded-full bg-white/[0.10]" />

                    <button
                        onClick={() => setState("idle")}
                        className="grid h-9 w-10 place-items-center rounded-[11px]
                    bg-[#2a2a2a] text-[#9e9da8]
                    shadow-[0_6px_14px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.04)]
                    transition-all duration-300
                    hover:-translate-y-[1px] hover:bg-[#303030]
                    hover:shadow-[0_8px_18px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.05)]
                    active:translate-y-0 active:scale-[.98]"
                    >
                        <X size={19} strokeWidth={2.8} />
                    </button>
                </div>

                <div
                    className={`absolute inset-0 grid place-items-center rounded-[18px]
                bg-[#202020] text-[#ff633f]
                shadow-[0_12px_28px_rgba(0,0,0,.32),inset_0_1px_0_rgba(255,255,255,.03)]
                transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                ${success
                            ? "scale-100 opacity-100"
                            : "pointer-events-none scale-90 opacity-0"
                        }`}
                >
                    {success && <AnimatedCheck />}
                </div>
            </div>
        </div>
    );
}