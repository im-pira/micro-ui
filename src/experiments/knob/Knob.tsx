import { useEffect, useState } from "react";

export default function Knob() {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        let frame: number;

        const animate = () => {
            setAngle((prev) => (prev + 0.35) % 360);
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, []);

    const ticks = [
        { angle: -120, label: "0" },
        { angle: -90 },
        { angle: -60 },
        { angle: -30 },
        { angle: 0, label: "50" },
        { angle: 30 },
        { angle: 60 },
        { angle: 90 },
        { angle: 120, label: "100" },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#c8c8c8]">
            <div className="relative">
                <div className="dial relative size-[220px] select-none rounded-full">
                    <div
                        className="dial-halo pointer-events-none absolute -inset-[26px] rounded-full"
                        style={{ transform: `rotate(${angle}deg)` }}
                    />

                    {/* fixed measurement scale */}
                    <div className="pointer-events-none absolute inset-0 z-30">
                        {ticks.map((tick) => (
                            <div
                                key={tick.angle}
                                className="absolute inset-[8px]"
                                style={{
                                    transform: `rotate(${tick.angle}deg)`,
                                    transformOrigin: "50% 50%",
                                }}
                            >
                                <span
                                    className={`absolute left-1/2 top-0 -translate-x-1/2 bg-neutral-700 ${tick.label ? "h-[7px] w-px opacity-40" : "h-[4px] w-px opacity-20"
                                        }`}
                                />

                                {tick.label && (
                                    <span
                                        className="absolute left-1/2 top-[10px] -translate-x-1/2 whitespace-nowrap font-[Manrope] text-[4px] font-medium tracking-[0.4px] text-neutral-600/45"
                                        style={{
                                            transform: `translateX(-50%) rotate(${-tick.angle}deg)`,
                                            transformOrigin: "center",
                                        }}
                                    >
                                        {tick.label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* rotating face */}
                    <div
                        className="dial-face absolute inset-0 rounded-full"
                        style={{ transform: `rotate(${angle}deg)` }}
                    >
                        <div className="dial-inner absolute inset-[4px] rounded-full" />

                        <svg
                            viewBox="0 0 220 220"
                            className="pointer-events-none absolute inset-0 size-full"
                        >
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

                        <span className="pointer-events-none absolute left-1/2 top-1/2 size-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-700/25" />

                        {/* indicator */}
                        <div className="absolute left-1/2 top-1/2 h-[40%] w-px -translate-x-1/2 -translate-y-full">
                            <div className="dial-indicator absolute left-1/2 top-[4px] h-[10px] w-[3px] -translate-x-1/2 rotate-[12deg] rounded-[1px]" />
                        </div>
                    </div>

                    <div className="dial-outline pointer-events-none absolute inset-[2px] z-20 rounded-full border-2 border-[#343434]" />
                </div>
            </div>
        </div>
    );
}