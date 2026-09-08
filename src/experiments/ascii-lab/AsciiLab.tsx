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
        <div className="relative flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
            <div
                className="absolute inset-y-1 left-1 w-[calc(33.333%-0.25rem)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out"
                style={{
                    transform: `translateX(${index * 100}%)`,
                }}
            />

            {options.map((item) => (
                <button
                    key={item}
                    onClick={() => setActive(item)}
                    className="relative z-10 px-3 py-1.5 text-[10px] text-neutral-600 transition-colors"
                >
                    {item}
                </button>
            ))}
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
                        className="flex h-[560px] flex-col border border-neutral-300 bg-white p-4"
                    >
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

                                <button className="rounded-full border border-neutral-700 bg-gradient-to-b from-neutral-700 via-neutral-900 to-black px-4 py-2 text-[10px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_8px_rgba(0,0,0,0.25)] transition hover:brightness-110">
                                    Share ↗
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
} 