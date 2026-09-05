import { useState } from "react";

export default function Folder() {
    const [active, setActive] = useState<number | null>(null);

    const docs = [
        "left-[76px] top-[45px] h-[104px] w-[90px] -rotate-[8deg]",
        "left-[122px] top-[52px] h-[97px] w-[67px]",
        "left-[166px] top-[63px] h-[84px] w-[51px] rotate-[6deg]",
    ];

    return (
        <div className="grid min-h-screen place-items-center bg-[#ededf0]">
            <div className="relative h-[232px] w-[286px] [perspective:700px]">
                <div className="absolute left-[51px] top-[41px] h-[149px] w-[185px] rounded-[14px] bg-gradient-to-b from-[#29292b] to-[#171719] shadow-[0_8px_15px_#0004]" />

                {docs.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(active === i ? null : i)}
                        className={`absolute ${c} rounded-[6px] bg-gradient-to-br from-[#fafafa] to-[#dedee0] shadow-sm transition-transform duration-300 ${active === i ? "-translate-y-[6px]" : ""
                            }`}
                    >
                        <i className="absolute left-[20%] top-[24%] h-[5px] w-[58%] rounded-full bg-black/[.07]" />
                        <i className="absolute left-[20%] top-[44%] h-[5px] w-[49%] rounded-full bg-black/[.06]" />
                        <i className="absolute left-[20%] top-[64%] h-[5px] w-[38%] rounded-full bg-black/[.05]" />
                    </button>
                ))}

                <svg
                    viewBox="0 0 210 126"
                    className="absolute left-[39px] top-[72px] h-[126px] w-[210px] origin-bottom [transform:rotateX(-15deg)] drop-shadow-[0_8px_9px_#0004]"
                >
                    <defs>
                        <linearGradient id="front" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#9a9a9d" stopOpacity=".64" />
                            <stop offset=".48" stopColor="#6f6f72" stopOpacity=".76" />
                            <stop offset="1" stopColor="#1b1b1d" stopOpacity=".96" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M12 18Q12 8 22 8H112Q127 8 139 14L157 24Q168 30 182 30H190Q198 30 198 40V103Q198 118 183 118H27Q12 118 12 103Z"
                        fill="url(#front)"
                        stroke="rgba(255,255,255,.07)"
                        strokeWidth=".8"
                    />
                </svg>
            </div>
        </div>
    );
}