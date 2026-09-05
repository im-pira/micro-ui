import { useState } from "react";

export default function Folder() {
    const [active, setActive] = useState<number | null>(null);

    const docs = [
        "left-[72px] top-[43px] h-[126px] w-[94px] -rotate-[8deg]",
        "left-[111px] top-[50px] h-[118px] w-[82px]",
        "left-[153px] top-[61px] h-[101px] w-[68px] rotate-[5deg]",
    ];

    return (
        <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_42%,#1b1c1f_0%,#111214_52%,#090a0c_100%)]">
            <div className="relative h-[232px] w-[286px] [perspective:750px]">
                {/* Back */}
                <div className="absolute left-[51px] top-[41px] h-[149px] w-[185px] rounded-[14px] border border-white/[.05] bg-gradient-to-b from-[#303033] via-[#232326] to-[#151517] shadow-[0_14px_28px_#0008]" />

                {/* Documents */}
                {docs.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(active === i ? null : i)}
                        className={`absolute ${c} overflow-hidden rounded-[6px] border border-white/50 bg-gradient-to-br from-[#fff] via-[#f4f4f4] to-[#d9d9db] shadow-[0_3px_8px_#0003] will-change-transform transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${active === i
                                ? "[transform:translateY(-8px)_translateZ(18px)_scale(1.018)] shadow-[0_10px_18px_#0004]"
                                : "hover:[transform:translateY(-2px)_translateZ(4px)]"
                            }`}
                    >
                        <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />
                        <i className="absolute left-[20%] top-[24%] h-[4px] w-[58%] rounded-full bg-black/[.075]" />
                        <i className="absolute left-[20%] top-[43%] h-[4px] w-[54%] rounded-full bg-black/[.065]" />
                        <i className="absolute left-[20%] top-[62%] h-[4px] w-[46%] rounded-full bg-black/[.055]" />
                        {i < 2 && (
                            <i className="absolute left-[20%] top-[79%] h-[4px] w-[35%] rounded-full bg-black/[.045]" />
                        )}
                    </button>
                ))}

                {/* Frosted front */}
                <svg
                    viewBox="0 0 210 126"
                    className="absolute left-[39px] top-[72px] h-[126px] w-[210px] origin-bottom [transform:rotateX(-15deg)] drop-shadow-[0_10px_12px_#0006]"
                >
                    <defs>
                        <linearGradient id="front" x1="0" y1="0" x2=".12" y2="1">
                            <stop offset="0" stopColor="#d1d1d3" stopOpacity=".56" />
                            <stop offset=".3" stopColor="#a7a7aa" stopOpacity=".61" />
                            <stop offset=".58" stopColor="#7c7c80" stopOpacity=".7" />
                            <stop offset=".82" stopColor="#454548" stopOpacity=".87" />
                            <stop offset="1" stopColor="#18181a" stopOpacity=".97" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M12 18Q12 8 22 8H112Q127 8 139 14L157 24Q168 30 182 30H190Q198 30 198 40V103Q198 118 183 118H27Q12 118 12 103Z"
                        fill="url(#front)"
                        stroke="rgba(255,255,255,.2)"
                        strokeWidth=".9"
                    />
                </svg>
            </div>
        </div>
    );
}