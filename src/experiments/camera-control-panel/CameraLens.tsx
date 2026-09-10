"use client";

type CameraLensProps = {
    open: boolean;
    value?: number;
    onChange?: (direction: "left" | "right") => void;
};

export default function CameraLens({
    open,
    value = 50,
    onChange,
}: CameraLensProps) {
    const bladeCount = 8;
    const cx = 74;
    const cy = 74;
    const outerRadius = 48;
    const innerRadius = 11;
    const segment = 360 / bladeCount;
    const gap = 1.2;

    const polar = (radius: number, angle: number) => {
        const rad = ((angle - 90) * Math.PI) / 180;

        return {
            x: cx + radius * Math.cos(rad),
            y: cy + radius * Math.sin(rad),
        };
    };

    const createBlade = (index: number) => {
        const start = index * segment + gap;
        const end = (index + 1) * segment - gap;

        const outerStart = polar(outerRadius, start);
        const outerEnd = polar(outerRadius, end);
        const innerStart = polar(innerRadius, start);
        const innerEnd = polar(innerRadius, end);

        return `
      M ${outerStart.x} ${outerStart.y}
      A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
      L ${innerEnd.x} ${innerEnd.y}
      A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
      Z
    `;
    };

    return (
        <div
            className="relative size-[148px] select-none"
            onWheel={(event) => {
                if (!onChange) return;

                event.preventDefault();
                onChange(event.deltaY > 0 ? "left" : "right");
            }}
        >
            <div className="absolute -inset-[14px] rounded-full bg-black/20 blur-[15px]" />

            <div className="absolute inset-0 rounded-full bg-[#030303] shadow-[0_12px_20px_rgba(0,0,0,0.5),-3px_-3px_8px_rgba(255,255,255,0.16)]" />

            <div
                className="absolute inset-[2px] rounded-full"
                style={{
                    background:
                        "repeating-conic-gradient(#2a2a2a 0deg 1.8deg,#080808 1.8deg 3.8deg)",
                }}
            />

            <div className="absolute inset-[8px] rounded-full bg-[#090909] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />

            <div className="absolute inset-[14px] rounded-full border border-white/[0.04] bg-[#050505]" />

            <div className="absolute inset-[18px] rounded-full border border-black/80" />

            <svg
                viewBox="0 0 148 148"
                className="absolute inset-0 size-full"
            >
                <defs>
                    <linearGradient id="blade" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#42484b" />
                        <stop offset="50%" stopColor="#292e31" />
                        <stop offset="100%" stopColor="#171a1c" />
                    </linearGradient>

                    <radialGradient id="lensGlass" cx="42%" cy="36%" r="78%">
                        <stop offset="0%" stopColor="#15242c" />
                        <stop offset="18%" stopColor="#0a151b" />
                        <stop offset="45%" stopColor="#04090c" />
                        <stop offset="75%" stopColor="#010304" />
                        <stop offset="100%" stopColor="#000000" />
                    </radialGradient>

                    <radialGradient id="lensDepth" cx="50%" cy="45%" r="60%">
                        <stop offset="0%" stopColor="#071116" />
                        <stop offset="55%" stopColor="#020507" />
                        <stop offset="100%" stopColor="#000000" />
                    </radialGradient>

                    <clipPath id="irisClip">
                        <circle cx="74" cy="74" r="48" />
                    </clipPath>

                    <filter id="glassBlur">
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                </defs>

                <circle
                    cx="74"
                    cy="74"
                    r="49"
                    fill="#020303"
                />

                <g clipPath="url(#irisClip)">
                    <g
                        style={{
                            transformOrigin: "74px 74px",
                            transform: `rotate(${open ? 28 : 0}deg)`,
                            opacity: open ? 0.04 : 1,
                            transition:
                                "transform 1000ms cubic-bezier(.2,.8,.2,1), opacity 800ms ease",
                        }}
                    >
                        {Array.from({ length: bladeCount }).map((_, index) => (
                            <path
                                key={index}
                                d={createBlade(index)}
                                fill="url(#blade)"
                                stroke="#0b0d0e"
                                strokeWidth="0.8"
                            />
                        ))}
                    </g>
                </g>

                <circle
                    cx="74"
                    cy="74"
                    fill="url(#lensGlass)"
                    style={{
                        r: open ? 44 : 10,
                        transition:
                            "r 1000ms cubic-bezier(.2,.8,.2,1)",
                    }}
                />

                <circle
                    cx="74"
                    cy="74"
                    fill="url(#lensDepth)"
                    style={{
                        r: open ? 38 : 7,
                        opacity: open ? 0.95 : 0.2,
                        transition:
                            "r 1000ms cubic-bezier(.2,.8,.2,1), opacity 700ms ease",
                    }}
                />

                <ellipse
                    cx="58"
                    cy="51"
                    rx="18"
                    ry="7"
                    transform="rotate(-28 58 51)"
                    fill="rgba(255,255,255,0.05)"
                    filter="url(#glassBlur)"
                    style={{
                        opacity: open ? 1 : 0,
                        transition: "opacity 700ms ease 250ms",
                    }}
                />

                <circle
                    cx="74"
                    cy="74"
                    r="40"
                    fill="none"
                    stroke="rgba(110,160,190,0.05)"
                    strokeWidth="5"
                    style={{
                        opacity: open ? 1 : 0,
                        transition: "opacity 700ms ease 300ms",
                    }}
                />

                <circle
                    cx="74"
                    cy="74"
                    r="47"
                    fill="none"
                    stroke="rgba(255,255,255,0.035)"
                    strokeWidth="1"
                />

                <circle
                    cx="74"
                    cy="74"
                    r="49"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                />
            </svg>

            <svg
                viewBox="0 0 148 148"
                className="pointer-events-none absolute inset-0 z-20 size-full"
            >
                <defs>
                    <path
                        id="lensTextTop"
                        d="M 26 77 A 49 49 0 0 1 122 77"
                    />

                    <path
                        id="lensTextBottom"
                        d="M 122 79 A 49 49 0 0 1 26 79"
                    />
                </defs>

                <text
                    fill="rgba(225,220,208,.58)"
                    fontSize="4.6"
                    letterSpacing="1.2"
                >
                    <textPath
                        href="#lensTextTop"
                        startOffset="15%"
                    >
                        CAMERA LENS · 50MM · F1.4
                    </textPath>
                </text>

                <text
                    fill="rgba(225,220,208,.3)"
                    fontSize="3.9"
                    letterSpacing="1"
                >
                    <textPath
                        href="#lensTextBottom"
                        startOffset="23%"
                    >
                        OPTICAL SYSTEM 001
                    </textPath>
                </text>
            </svg>

            <div className="pointer-events-none absolute inset-[16px] z-30 rounded-full border border-white/[0.035]" />

            <div className="pointer-events-none absolute inset-[21px] z-30 rounded-full border border-black/70" />

            <div className="pointer-events-none absolute left-1/2 top-[10px] z-30 h-[9px] w-px -translate-x-1/2 bg-[#d8d4cb]/50" />

            <span className="pointer-events-none absolute bottom-[9px] left-1/2 z-30 -translate-x-1/2 text-[4px] tracking-[1.2px] text-white/22">
                {String(value).padStart(2, "0")}
            </span>
        </div>
    );
}