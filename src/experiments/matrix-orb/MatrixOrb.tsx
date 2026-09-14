import { useEffect, useRef, useState } from "react";
import "./MatrixOrb.css";
import OrbPanel, { type Shape } from "./OrbPanel";

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
    const [selector, setSelector] = useState({ left: 0, width: 0 });
    const [color, setColor] = useState("#A78BFA");
    const [shape, setShape] = useState<Shape>("circle");

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const drag = useRef({ x: 0, y: 0, startX: 0, startY: 0 });

    const grid = 11;
    const center = 5;

    useEffect(() => {
        const button = buttonRefs.current[states.indexOf(state)];

        if (button) {
            setSelector({
                left: button.offsetLeft,
                width: button.offsetWidth,
            });
        }
    }, [state]);

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
            <OrbPanel
                color={color}
                shape={shape}
                setColor={setColor}
                setShape={setShape}
            />

            {/* Orb */}
            <div className="-translate-y-8 text-center">
                <div className={`orb ${state} grid size-44 grid-cols-11 place-items-center`}>
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
                                className={`dot ${distance > 4.3 ? "outer-dot" : ""}`}
                                style={
                                    {
                                        width: dotSize,
                                        height: dotSize,
                                        background: color,
                                        borderRadius:
                                            shape === "circle"
                                                ? "999px"
                                                : shape === "soft"
                                                    ? "4px"
                                                    : shape === "diamond"
                                                        ? "2px"
                                                        : "0",
                                        rotate: shape === "diamond" ? "45deg" : undefined,
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

            {/* Draggable selector */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
                    className="flex touch-none select-none items-center rounded-[22px] border border-white/[0.08] bg-gradient-to-b from-[#191919] to-[#131313] p-1 shadow-[0_14px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                    {/* Grip */}
                    <div className="grid cursor-grab grid-cols-2 gap-[3px] px-2.5 active:cursor-grabbing">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <span
                                key={i}
                                className="size-1 rounded-full bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                            />
                        ))}
                    </div>

                    {/* States */}
                    <div className="relative flex">
                        <div
                            className="absolute inset-y-0 rounded-xl border border-white/[0.08] bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 ease-out"
                            style={{
                                left: selector.left,
                                width: selector.width,
                            }}
                        />

                        {states.map((item, i) => (
                            <button
                                key={item}
                                ref={(el) => {
                                    buttonRefs.current[i] = el;
                                }}
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => setState(item)}
                                className={`relative z-10 rounded-xl px-3 py-2 text-xs capitalize transition-colors duration-300 ${state === item
                                        ? "text-white"
                                        : "text-white/35 hover:text-white/60"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}