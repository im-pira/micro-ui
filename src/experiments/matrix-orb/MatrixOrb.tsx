import { useRef, useState } from "react";

const states = [
    "idle",
    "active",
    "thinking",
    "searching",
    "listening",
    "connecting",
] as const;

type OrbState = (typeof states)[number];

export default function MatrixOrb() {
    const [state, setState] = useState<OrbState>("idle");
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const drag = useRef({
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
    });

    const grid = 11;
    const center = 5;

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);

        drag.current = {
            x: pos.x,
            y: pos.y,
            startX: e.clientX,
            startY: e.clientY,
        };
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

        setPos({
            x: drag.current.x + e.clientX - drag.current.startX,
            y: drag.current.y + e.clientY - drag.current.startY,
        });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111] text-white">
            {/* Orb */}
            <div className="-translate-y-8 text-center">
                <div
                    className={`orb ${state} grid size-44 grid-cols-11 place-items-center`}
                >
                    {Array.from({ length: grid * grid }).map((_, i) => {
                        const row = Math.floor(i / grid);
                        const col = i % grid;

                        const dx = col - center;
                        const dy = row - center;
                        const distance = Math.hypot(dx, dy);

                        if (distance > 5.4) return <span key={i} />;

                        const dotSize = Math.max(2, 11 - distance * 1.6);
                        const angle = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2);

                        return (
                            <span
                                key={i}
                                className={`dot rounded-full bg-violet-400 ${distance > 4.3 ? "outer-dot" : ""
                                    }`}
                                style={
                                    {
                                        width: dotSize,
                                        height: dotSize,
                                        "--distance": distance,
                                        "--index": i,
                                        "--angle": angle,
                                    } as React.CSSProperties
                                }
                            />
                        );
                    })}
                </div>

                <p className="mt-5 text-sm capitalize text-white/50">{state}</p>
            </div>

            {/* Draggable controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    style={{
                        transform: `translate(${pos.x}px, ${pos.y}px)`,
                    }}
                    className="flex touch-none select-none items-center rounded-2xl border border-white/10 bg-[#191919] p-1"
                >
                    {/* Drag grip */}
                    <div className="grid cursor-grab grid-cols-2 gap-[3px] px-2.5 active:cursor-grabbing">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <span
                                key={i}
                                className="size-1 rounded-full bg-white/35"
                            />
                        ))}
                    </div>

                    {states.map((item) => (
                        <button
                            key={item}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => setState(item)}
                            className={`rounded-xl px-3 py-2 text-xs capitalize transition ${state === item
                                    ? "bg-black text-white"
                                    : "text-white/40 hover:text-white/70"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <style>{`
        .dot {
          opacity: .85;
        }

        /* static glow */
        .idle .dot {
          box-shadow: 0 0 7px rgba(167, 139, 250, .5);
        }

        /* orb boing */
        .active {
          animation: boing 1.4s ease-in-out infinite;
        }

        /* dots disappear + return */
        .thinking .dot {
          animation: thinking 1.8s ease-in-out infinite;
          animation-delay: calc(var(--distance) * 90ms);
        }

        /* only outer dots act like loading dial */
        .searching .dot {
          opacity: .2;
        }

        .searching .outer-dot {
          animation: searching 1.4s linear infinite;
          animation-delay: calc(var(--angle) * -1.4s);
        }

        /* heartbeat */
        .listening .dot {
          animation: heartbeat 1.5s ease-in-out infinite;
          animation-delay: calc(var(--distance) * 45ms);
        }

        /* dots illuminate one after another */
        .connecting .dot {
          opacity: .15;
          animation: connecting 2s ease-in-out infinite;
          animation-delay: calc(var(--index) * 14ms);
        }

        @keyframes boing {
          0%, 100% { transform: scale(1); }
          45% { transform: scale(1.08, .94); }
          65% { transform: scale(.97, 1.04); }
        }

        @keyframes thinking {
          0%, 100% {
            opacity: .9;
            transform: scale(1);
          }
          50% {
            opacity: .05;
            transform: scale(.35);
          }
        }

        @keyframes searching {
          0%, 75%, 100% {
            opacity: .15;
            transform: scale(1);
          }
          15% {
            opacity: 1;
            transform: scale(1.35);
          }
        }

        @keyframes heartbeat {
          0%, 100% { opacity: .25; }
          25% { opacity: 1; }
          38% { opacity: .35; }
          52% { opacity: .9; }
          70% { opacity: .25; }
        }

        @keyframes connecting {
          0%, 20% { opacity: .12; }
          45%, 70% { opacity: 1; }
          100% { opacity: .12; }
        }
      `}</style>
        </div>
    );
}