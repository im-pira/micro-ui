export default function CameraLens() {
    const rings = [
        {
            size: 440,
            className:
                "bg-[linear-gradient(145deg,#1d1d1d_0%,#090909_38%,#040404_72%,#101010_100%)] border border-white/[.045] shadow-[inset_7px_7px_14px_rgba(255,255,255,.03),inset_-10px_-10px_18px_rgba(0,0,0,.9)]",
        },
        {
            size: 414,
            className:
                "bg-[#070707] border border-black shadow-[0_4px_8px_rgba(0,0,0,.75),inset_0_1px_1px_rgba(255,255,255,.035)]",
        },
        {
            size: 392,
            className:
                "bg-[radial-gradient(circle_at_36%_30%,#161616,#080808_48%,#030303_100%)] border border-white/[.04] shadow-[inset_0_4px_9px_rgba(0,0,0,.8),0_1px_0_rgba(255,255,255,.03)]",
        },
        {
            size: 358,
            className:
                "bg-[linear-gradient(145deg,#161616,#070707_46%,#020202)] shadow-[0_5px_12px_rgba(0,0,0,.7),inset_0_1px_1px_rgba(255,255,255,.025)]",
        },
        {
            size: 320,
            className:
                "bg-[#050505] border border-black shadow-[inset_0_10px_18px_rgba(0,0,0,.92),0_1px_0_rgba(255,255,255,.025)]",
        },
        {
            size: 284,
            className:
                "bg-[radial-gradient(circle_at_38%_32%,#181818,#080808_52%,#020202)] border border-white/[.035] shadow-[0_4px_12px_rgba(0,0,0,.8),inset_0_2px_2px_rgba(255,255,255,.035)]",
        },
    ];

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#777]">
            <div className="relative flex h-[560px] w-[560px] items-center justify-center">
                <div className="absolute h-[494px] w-[494px] rounded-full bg-[#030303] shadow-[0_25px_48px_rgba(0,0,0,.55)]">
                    <div className="pointer-events-none absolute -inset-[2px] rounded-full border border-[#555] shadow-[inset_0_1px_0_#7a7a7a,inset_0_-1px_0_#111,0_0_3px_rgba(255,255,255,.08)]" />

                    {Array.from({ length: 120 }).map((_, i) => {
                        const long = i % 2 === 0;

                        return (
                            <span
                                key={i}
                                className={`absolute left-1/2 top-0 w-[2px] ${long ? "h-[13px]" : "h-[7px]"
                                    }`}
                                style={{
                                    transformOrigin: "50% 247px",
                                    transform: `translateX(-50%) rotate(${i * 3}deg)`,
                                    clipPath:
                                        "polygon(10% 0,90% 0,57% 100%,43% 100%)",
                                    background:
                                        i % 4 === 0
                                            ? "linear-gradient(90deg,#111,#3d3d3d 42%,#666 50%,#303030 61%,#0b0b0b)"
                                            : "linear-gradient(90deg,#101010,#292929 43%,#454545 52%,#181818)",
                                }}
                            />
                        );
                    })}
                </div>

                {rings.map(({ size, className }, i) => (
                    <div
                        key={size}
                        className={`absolute rounded-full ${className}`}
                        style={{
                            width: size,
                            height: size,
                            transform: `translateY(${i % 2 === 0 ? -1 : 1}px)`,
                        }}
                    />
                ))}

                <div
                    className="pointer-events-none absolute h-[454px] w-[454px] rounded-full opacity-30"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(255,255,255,.11) .45px, transparent .55px)",
                        backgroundSize: "3px 3px",
                        WebkitMask:
                            "radial-gradient(circle,transparent 0 60%,#000 61% 100%)",
                    }}
                />

                <div className="pointer-events-none absolute h-[452px] w-[452px] rounded-full border border-white/[.055] shadow-[inset_9px_7px_18px_rgba(255,255,255,.035),inset_-14px_-16px_25px_rgba(0,0,0,.75)]" />

                <div className="pointer-events-none absolute h-[421px] w-[421px] rounded-full border border-black/90 shadow-[0_3px_5px_rgba(0,0,0,.7),inset_0_1px_0_rgba(255,255,255,.035)]" />

                {[344, 335, 326, 317, 308, 299, 290].map((size, i) => (
                    <div
                        key={size}
                        className="absolute rounded-full"
                        style={{
                            width: size,
                            height: size,
                            border:
                                i % 2 === 0
                                    ? "1px solid rgba(255,255,255,.065)"
                                    : "1px solid rgba(0,0,0,.95)",
                            boxShadow:
                                i % 2 === 0
                                    ? "0 1px 0 rgba(255,255,255,.03), inset 0 -1px 2px rgba(0,0,0,.9)"
                                    : "inset 0 1px 1px rgba(255,255,255,.018)",
                        }}
                    />
                ))}

                {[278, 268, 258, 248].map((size, i) => (
                    <div
                        key={size}
                        className="absolute rounded-full border border-black"
                        style={{
                            width: size,
                            height: size,
                            boxShadow:
                                i === 0
                                    ? "0 4px 8px rgba(0,0,0,.8), inset 0 1px 1px rgba(255,255,255,.04)"
                                    : "inset 0 2px 3px rgba(0,0,0,.9),0 1px 0 rgba(255,255,255,.025)",
                        }}
                    />
                ))}

                <div className="pointer-events-none absolute h-[374px] w-[374px] rounded-full">
                    <div className="absolute inset-0 rounded-full border border-black/90 shadow-[inset_0_2px_3px_rgba(0,0,0,.95),0_1px_0_rgba(255,255,255,.04)]" />

                    <div className="absolute inset-[22px] rounded-full border border-white/[.045] shadow-[0_-1px_0_rgba(0,0,0,.9),inset_0_1px_1px_rgba(255,255,255,.025)]" />

                    <svg
                        viewBox="0 0 500 500"
                        className="absolute inset-0 h-full w-full"
                    >
                        <defs>
                            <path
                                id="engraveTop"
                                d="M 66 250 A 184 184 0 0 1 434 250"
                            />

                            <path
                                id="engraveBottom"
                                d="M 434 250 A 184 184 0 0 1 66 250"
                            />

                            <path
                                id="engraveLeft"
                                d="M 250 434 A 184 184 0 0 1 250 66"
                            />
                        </defs>

                        <text
                            fill="#4a4a4a"
                            fontSize="12"
                            fontFamily="Arial, sans-serif"
                            letterSpacing="4"
                            stroke="#0b0b0b"
                            strokeWidth=".45"
                            paintOrder="stroke"
                        >
                            <textPath href="#engraveTop" startOffset="26%">
                                OPTICAL SYSTEM 01
                            </textPath>
                        </text>

                        <text
                            fill="#444"
                            fontSize="9"
                            fontFamily="Arial, sans-serif"
                            letterSpacing="3"
                            stroke="#080808"
                            strokeWidth=".4"
                            paintOrder="stroke"
                        >
                            <textPath href="#engraveBottom" startOffset="31%">
                                35MM · F1.4 · ASPH
                            </textPath>
                        </text>

                        <text
                            fill="#414141"
                            fontSize="8.5"
                            fontFamily="Arial, sans-serif"
                            letterSpacing="2.5"
                            stroke="#080808"
                            strokeWidth=".35"
                            paintOrder="stroke"
                        >
                            <textPath href="#engraveLeft" startOffset="29%">
                                PRECISION GLASS
                            </textPath>
                        </text>
                    </svg>
                </div>

                <span className="absolute right-[124px] top-[266px] rotate-90 text-[7px] tracking-[3px] text-[#555]">
                    Ø67
                </span>

                <div className="absolute flex h-[254px] w-[254px] items-center justify-center rounded-full bg-[linear-gradient(145deg,#383838_0%,#171717_11%,#050505_48%,#010101_68%,#191919_100%)] shadow-[0_10px_20px_rgba(0,0,0,.9),inset_0_2px_2px_rgba(255,255,255,.11),inset_0_-5px_9px_rgba(0,0,0,.95)]">
                    <div className="absolute inset-[3px] rounded-full border border-white/[.055] shadow-[inset_0_1px_0_rgba(255,255,255,.07),inset_0_-2px_3px_rgba(0,0,0,.9)]" />

                    <div className="absolute inset-[6px] rounded-full border border-black shadow-[0_2px_5px_rgba(0,0,0,.9)]" />

                    <div className="relative h-[238px] w-[238px] overflow-hidden rounded-full border border-[#080808] bg-black shadow-[0_0_0_2px_#020202,inset_0_0_35px_rgba(0,0,0,.98)]">
                        <img
                            src="/camera-lens/camera-iris.png"
                            alt=""
                            className="h-full w-full object-cover brightness-[.72] contrast-[1.18]"
                        />

                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.08)_61%,rgba(0,0,0,.78)_100%)]" />

                        <div className="absolute inset-0 rounded-full bg-[linear-gradient(140deg,rgba(255,255,255,.09),rgba(255,255,255,.025)_20%,transparent_40%,transparent_70%,rgba(0,0,0,.28))]" />

                        <div className="absolute left-[28px] top-[15px] h-[72px] w-[120px] -rotate-[22deg] rounded-full bg-white/[.025] blur-[14px]" />
                    </div>
                </div>

                <div className="pointer-events-none absolute h-[438px] w-[438px] rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,.075)_0%,rgba(255,255,255,.025)_17%,transparent_34%,transparent_67%,rgba(0,0,0,.28)_84%,rgba(255,255,255,.015)_100%)]" />

                <div className="pointer-events-none absolute h-[460px] w-[460px] rounded-full shadow-[inset_25px_20px_38px_rgba(255,255,255,.025),inset_-32px_-30px_50px_rgba(0,0,0,.72)]" />

                <div
                    className="pointer-events-none absolute h-[430px] w-[430px] rounded-full opacity-20"
                    style={{
                        background:
                            "linear-gradient(115deg,transparent 15%,rgba(255,255,255,.06) 32%,transparent 48%,rgba(255,255,255,.018) 65%,transparent 82%)",
                    }}
                />
            </div>
        </main>
    );
}