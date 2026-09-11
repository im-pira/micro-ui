export default function CameraLens() {
    const rings = [
        "w-[460px] h-[460px] bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,.6)]",
        "w-[444px] h-[444px] bg-gradient-to-br from-[#151515] via-[#090909] to-[#030303] border border-white/[.055]",
        "w-[426px] h-[426px] bg-gradient-to-br from-[#171717] via-[#090909] to-[#020202] border border-white/[.06]",
        "w-[394px] h-[394px] bg-[#090909] border border-white/[.035] shadow-[inset_0_2px_7px_rgba(255,255,255,.025)]",
        "w-[360px] h-[360px] bg-gradient-to-br from-[#151515] via-[#080808] to-[#020202]",
        "w-[318px] h-[318px] bg-[#070707] shadow-[inset_0_0_18px_rgba(0,0,0,.8)]",
        "w-[280px] h-[280px] bg-gradient-to-br from-[#151515] via-[#090909] to-[#030303] border border-white/[.025]",
    ];

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#777]">
            <div className="relative flex h-[560px] w-[560px] items-center justify-center">

                {/* outer knurled edge */}
                <div className="absolute h-[492px] w-[492px] rounded-full bg-[#040404] shadow-[0_18px_38px_rgba(0,0,0,.5)]">

                    {/* thin metallic outer rim */}
                    <div className="pointer-events-none absolute -inset-[1px] rounded-full border border-[#484848] shadow-[inset_0_1px_0_#686868,inset_0_-1px_0_#0c0c0c,0_0_3px_rgba(255,255,255,.06)]" />

                    {/* long / short machined indices */}
                    {Array.from({ length: 120 }).map((_, i) => {
                        const long = i % 2 === 0;

                        return (
                            <span
                                key={i}
                                className={`absolute left-1/2 top-0 w-[2px] ${long ? "h-[13px]" : "h-[7px]"
                                    }`}
                                style={{
                                    transformOrigin: "50% 246px",
                                    transform: `translateX(-50%) rotate(${i * 3}deg)`,
                                    clipPath:
                                        "polygon(15% 0, 85% 0, 56% 100%, 44% 100%)",
                                    background:
                                        i % 4 === 0
                                            ? "linear-gradient(90deg,#161616,#505050 48%,#737373 52%,#262626)"
                                            : "linear-gradient(90deg,#111,#353535 48%,#505050 52%,#1c1c1c)",
                                }}
                            />
                        );
                    })}
                </div>

                {/* body rings */}
                {rings.map((ring, i) => (
                    <div key={i} className={`absolute rounded-full ${ring}`} />
                ))}

                {/* subtle outer barrel highlight */}
                <div className="pointer-events-none absolute h-[454px] w-[454px] rounded-full border border-white/[.035] shadow-[inset_5px_5px_12px_rgba(255,255,255,.018),inset_-8px_-8px_16px_rgba(0,0,0,.65)]" />

                {/* micro machined grooves */}
                {[344, 334, 324, 314, 304, 294, 284].map((size, i) => (
                    <div
                        key={size}
                        className={`absolute rounded-full border ${i % 2 === 0
                                ? "border-white/[0.045]"
                                : "border-white/[0.022]"
                            }`}
                        style={{ width: size, height: size }}
                    />
                ))}

                {/* inner machining */}
                {[272, 262, 252, 242].map((size, i) => (
                    <div
                        key={size}
                        className="absolute rounded-full border border-black/80"
                        style={{
                            width: size,
                            height: size,
                            boxShadow:
                                i % 2 === 0
                                    ? "0 1px 0 rgba(255,255,255,.035)"
                                    : "0 -1px 0 rgba(0,0,0,.9)",
                        }}
                    />
                ))}

                {/* lens engravings */}
                <svg
                    viewBox="0 0 500 500"
                    className="pointer-events-none absolute h-[405px] w-[405px]"
                >
                    <defs>
                        <path
                            id="engraveTop"
                            d="M 90 250 A 160 160 0 0 1 410 250"
                        />

                        <path
                            id="engraveBottom"
                            d="M 410 250 A 160 160 0 0 1 90 250"
                        />

                        <path
                            id="engraveLeft"
                            d="M 250 410 A 160 160 0 0 1 250 90"
                        />
                    </defs>

                    <text
                        fill="#616161"
                        fontSize="13"
                        fontFamily="Arial, sans-serif"
                        letterSpacing="4"
                    >
                        <textPath href="#engraveTop" startOffset="24%">
                            OPTICAL SYSTEM 01
                        </textPath>
                    </text>

                    <text
                        fill="#555"
                        fontSize="10"
                        fontFamily="Arial, sans-serif"
                        letterSpacing="3"
                    >
                        <textPath href="#engraveBottom" startOffset="31%">
                            35MM · F1.4 · ASPH
                        </textPath>
                    </text>

                    <text
                        fill="#505050"
                        fontSize="9"
                        fontFamily="Arial, sans-serif"
                        letterSpacing="2.5"
                    >
                        <textPath href="#engraveLeft" startOffset="30%">
                            PRECISION GLASS
                        </textPath>
                    </text>
                </svg>

                {/* small engraved details */}
                <span className="absolute right-[124px] top-[266px] rotate-90 text-[7px] tracking-[3px] text-[#525252]">
                    Ø67
                </span>

                {/* iris housing */}
                <div className="absolute flex h-[250px] w-[250px] items-center justify-center rounded-full bg-gradient-to-br from-[#222] via-[#080808] to-black shadow-[inset_0_1px_2px_rgba(255,255,255,.08),0_0_18px_rgba(0,0,0,.95)]">

                    {/* iris */}
                    <div className="relative h-[238px] w-[238px] overflow-hidden rounded-full border border-[#151515] bg-black shadow-[inset_0_0_28px_rgba(0,0,0,.95)]">
                        <img
                            src="/camera-lens/camera-iris.png"
                            alt=""
                            className="h-full w-full object-cover brightness-[.72] contrast-[1.18]"
                        />

                        {/* edge vignette */}
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_48%,rgba(0,0,0,.1)_64%,rgba(0,0,0,.78)_100%)]" />

                        {/* glass highlight */}
                        <div className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,.075),transparent_27%,transparent_68%,rgba(0,0,0,.24))]" />

                        {/* soft reflection */}
                        <div className="absolute left-[48px] top-[26px] h-[54px] w-[80px] -rotate-[20deg] rounded-full bg-white/[.025] blur-xl" />
                    </div>
                </div>

                {/* subtle metal sheen */}
                <div className="pointer-events-none absolute h-[438px] w-[438px] rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,.045),transparent_28%,transparent_65%,rgba(0,0,0,.28))]" />

                {/* dimensional shading */}
                <div className="pointer-events-none absolute h-[460px] w-[460px] rounded-full shadow-[inset_18px_14px_28px_rgba(255,255,255,.018),inset_-24px_-20px_34px_rgba(0,0,0,.55)]" />
            </div>
        </main>
    );
}