import { useRef, useState } from "react";

export default function Knob() {
    const ref = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState(0);

    const update = (x: number, y: number) => {
        if (!ref.current) return;

        const r = ref.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        let deg = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90;
        if (deg < 0) deg += 360;

        setAngle(deg);
    };

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX, e.clientY);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        update(e.clientX, e.clientY);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#c8c8c8]">
            <div
                ref={ref}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                className="dial relative size-[220px] cursor-grab touch-none select-none rounded-full active:cursor-grabbing"
            >
                <div
                    className="dial-halo pointer-events-none absolute -inset-[26px] rounded-full"
                    style={{ transform: `rotate(${angle}deg)` }}
                />

                <div
                    className="dial-face absolute inset-0 rounded-full"
                    style={{ transform: `rotate(${angle}deg)` }}
                >
                    <div className="dial-inner absolute inset-[4px] rounded-full" />

                    <svg viewBox="0 0 220 220" className="pointer-events-none absolute inset-0 size-full">
                        <defs>
                            <path
                                id="dialText"
                                d="M 42 150 A 84 84 0 0 0 178 150"
                            />
                        </defs>

                        <text className="fill-neutral-500/50 font-[Manrope] text-[5px] font-medium tracking-[0.7px]">
                            <textPath href="#dialText" startOffset="12%">
                                TURN UNTIL IT FEELS RIGHT
                            </textPath>
                        </text>
                    </svg>
                    

                    <div className="absolute left-1/2 top-1/2 h-[40%] w-px -translate-x-1/2 -translate-y-full">
                        <div className="dial-indicator absolute left-1/2 top-[3px] h-[7px] w-[16px] -translate-x-1/2 rotate-[26deg] rounded-[3px]" />
                    </div>
                </div>

                <div className="dial-outline pointer-events-none absolute inset-[2px] z-20 rounded-full border-2 border-[#242424]" />
            </div>
        </div>
    );
}