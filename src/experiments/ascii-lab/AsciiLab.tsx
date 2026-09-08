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
                            <h2 className="font-serif text-lg">
                                {card.title}
                            </h2>

                            <p className="mt-2 max-w-xs text-[10px] leading-tight text-neutral-500">
                                {card.text}
                            </p>

                            <div className="mt-10 flex items-center justify-between">
                                <div className="flex gap-1">
                                    {["1D", "7D", "1M"].map((item) => (
                                        <button
                                            key={item}
                                            className="rounded border border-neutral-200 px-2 py-1 text-[9px]"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <button className="rounded bg-black px-3 py-2 text-[9px] text-white">
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