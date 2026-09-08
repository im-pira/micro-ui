import { useState } from "react";
import FishASCII from "./FishASCII";
import AbstractASCII from "./AbstractASCII";

const cards = [
    {
        title: "Turn Analysis Into Authority.",
        text: "Don’t just track the market—narrate it. Generate watermarked, high-fidelity chart snapshots and broadcast your thesis.",
        visual: <FishASCII />,
    },
    {
        title: "Share The Narrative",
        text: "Don’t just share a screenshot. Publish interactive market snapshots that allow your team to inspect the data.",
        visual: <AbstractASCII />,
    },
];


function RangeSwitch() {
    const options = ["1D", "7D", "1M"];
    const [active, setActive] = useState("1M");
    const index = options.indexOf(active);

    return (
        <div className="relative flex rounded-full border border-neutral-300 bg-neutral-50 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.08),0_6px_18px_rgba(0,0,0,0.08)]">
            <div
                className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full border border-neutral-200 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                    transform: `translateX(${index * 100}%)`,
                }}
            />

            {options.map((item) => (
                <button
                    key={item}
                    onClick={() => setActive(item)}
                    className="relative z-10 w-14 py-1.5 text-[10px] text-neutral-600"
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

function HingeCorner({
    position,
}: {
    position: "tl" | "tr" | "bl" | "br";
}) {
    const positions = {
        tl: "left-0 top-0",
        tr: "right-0 top-0 rotate-90",
        br: "bottom-0 right-0 rotate-180",
        bl: "bottom-0 left-0 -rotate-90",
    };

    return (
        <div
            className={`pointer-events-none absolute h-8 w-8 ${positions[position]}`}
        >
            <div className="absolute left-0 top-0 h-6 w-[3px] border border-neutral-200 bg-gradient-to-r from-white to-neutral-200 shadow-[1px_1px_3px_rgba(0,0,0,0.08)]" />

            <div className="absolute left-0 top-0 h-[3px] w-6 border border-neutral-200 bg-gradient-to-b from-white to-neutral-200 shadow-[1px_1px_3px_rgba(0,0,0,0.08)]" />
        </div>
    );
}

export default function ASCIILab() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-6">
            <div className="grid w-full max-w-4xl gap-20 md:grid-cols-2">
                {cards.map((card) => (
                    <article
                        key={card.title}
                        className="relative flex h-[560px] flex-col border border-neutral-200 bg-white p-4 ring-1 ring-black/[0.025] shadow-[0_2px_6px_rgba(0,0,0,0.05),0_14px_32px_rgba(0,0,0,0.07),0_32px_72px_rgba(0,0,0,0.09)] transition-transform duration-500 hover:-translate-y-1"
                    >
                        <HingeCorner position="tl" />
                        <HingeCorner position="tr" />
                        <HingeCorner position="br" />
                        <HingeCorner position="bl" />

                        <div className="min-h-0 flex-1 overflow-hidden">
                            {card.visual}
                        </div>

                        <div>
                            <h2 className="text-lg italic font-normal [font-family:'Open_Sans']">
                                {card.title}
                            </h2>

                            <p className="mt-1 max-w-sm text-[11px] leading-relaxed text-neutral-500">
                                {card.text}
                            </p>

                            <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-4">
                                <RangeSwitch />

                                <button className="group rounded-lg border border-neutral-700 bg-gradient-to-b from-neutral-700 via-neutral-900 to-black px-4 py-2 text-[10px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_8px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110">
                                    Share{" "}
                                    <span className="inline-block transition-transform duration-300 group-hover:rotate-12">
                                        ↗
                                    </span>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}