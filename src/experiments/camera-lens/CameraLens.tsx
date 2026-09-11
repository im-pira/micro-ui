export default function CameraLens() {
    const rings = [
        "w-[460px] h-[460px] bg-[#060606] shadow-[0_18px_45px_rgba(0,0,0,.55)]",
        "w-[444px] h-[444px] bg-[#0b0b0b] border border-white/[.05]",
        "w-[426px] h-[426px] bg-gradient-to-br from-[#151515] via-[#080808] to-[#030303] border border-white/[.08]",
        "w-[394px] h-[394px] bg-[#090909] border border-white/[.04]",
        "w-[360px] h-[360px] bg-gradient-to-br from-[#121212] via-[#070707] to-[#020202]",
        "w-[318px] h-[318px] bg-[#090909]",
        "w-[280px] h-[280px] bg-gradient-to-br from-[#131313] to-[#050505]",
    ];

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#777]">
            <div className="relative flex h-[560px] w-[560px] items-center justify-center">
                {/* outer knurled edge */}
                <div className="absolute h-[492px] w-[492px] rounded-full bg-[#050505] shadow-[0_14px_35px_rgba(0,0,0,.45)]">
                    {/* thin dark metallic outer rim */}
                    <div className="pointer-events-none absolute -inset-[1px] rounded-full border border-[#3a3a3a] shadow-[inset_0_1px_0_#666,inset_0_-1px_0_#111]" />

                    {/* long / short tapered metallic indices */}
                    {Array.from({ length: 120 }).map((_, i) => {
                        const long = i % 2 === 0;

                        return (
                            <span
                                key={i}
                                className={`absolute left-1/2 top-0 ${long ? "h-[13px]" : "h-[7px]"
                                    } w-[2px]`}
                                style={{
                                    transformOrigin: "50% 246px",
                                    transform: `translateX(-50%) rotate(${i * 3}deg)`,
                                    clipPath: "polygon(20% 0,80% 0,58% 100%,42% 100%)",
                                    background:
                                        "linear-gradient(90deg,#171717 0%,#3d3d3d 40%,#666 52%,#2b2b2b 68%,#111 100%)",
                                }}
                            />
                        );
                    })}
                </div>

                {/* body rings */}
                {rings.map((ring, i) => (
                    <div key={i} className={`absolute rounded-full ${ring}`} />
                ))}

                {/* micro machined grooves */}
                {[344, 334, 324, 314, 304, 294, 284].map((size) => (
                    <div
                        key={size}
                        className="absolute rounded-full border border-white/[0.035]"
                        style={{ width: size, height: size }}
                    />
                ))}

                {/* inner machining */}
                {[272, 262, 252, 242].map((size) => (
                    <div
                        key={size}
                        className="absolute rounded-full border border-black/70 shadow-[0_1px_0_rgba(255,255,255,.025)]"
                        style={{ width: size, height: size }}
                    />
                ))}

                {/* engraved text */}
                <svg
                    viewBox="0 0 500 500"
                    className="pointer-events-none absolute h-[430px] w-[430px]"
                >
                    <defs>
                        <path id="top" d="M 95 250 A 155 155 0 0 1 405 250" />
                        <path id="left" d="M 250 405 A 155 155 0 0 1 250 95" />
                        <path id="bottom" d="M 405 250 A 155 155 0 0 1 95 250" />
                    </defs>

                    <text
                        fill="#8f8f8f"
                        fontSize="25"
                        fontFamily="Arial, sans-serif"
                        letterSpacing="8"
                    >
                        <textPath href="#top" startOffset="36%">
                            LEICA
                        </textPath>
                    </text>

                    <text
                        fill="#878787"
                        fontSize="19"
                        fontFamily="Arial, sans-serif"
                        letterSpacing="5"
                    >
                        <textPath href="#left" startOffset="19%">
                            SUMMICRON-M
                        </textPath>
                    </text>

                    <text
                        fill="#858585"
                        fontSize="18"
                        fontFamily="Arial, sans-serif"
                        letterSpacing="5"
                    >
                        <textPath href="#bottom" startOffset="35%">
                            4028044
                        </textPath>
                    </text>
                </svg>

                {/* 35 text */}
                <span className="absolute right-[108px] top-[292px] rotate-[67deg] text-[24px] tracking-[5px] text-[#858585]">
                    35
                </span>

                {/* iris image */}
                <div className="absolute h-[216px] w-[216px] overflow-hidden rounded-full border-[5px] border-[#080808] bg-black shadow-[inset_0_0_35px_rgba(0,0,0,.95)]">
                    <img
                        src="/camera-lens/camera-iris.png"
                        alt=""
                        className="h-full w-full object-cover brightness-[.72] contrast-[1.18]"
                    />

                    {/* dark edge shading */}
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.12)_62%,rgba(0,0,0,.72)_100%)]" />

                    {/* glass highlight */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[.06] via-transparent to-black/35" />
                </div>

                {/* subtle metal sheen */}
                <div className="pointer-events-none absolute h-[438px] w-[438px] rounded-full bg-gradient-to-br from-white/[.035] via-transparent to-black/30" />
            </div>
        </main>
    );
}