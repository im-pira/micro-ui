import { useState } from "react";

export type Shape = "circle" | "soft" | "square" | "diamond";

const colors = ["#A78BFA", "#22D3EE", "#34D399", "#F472B6", "#F97316", "#FACC15"];
const shapes: Shape[] = ["circle", "soft", "square", "diamond"];

type Props = {
    color: string;
    shape: Shape;
    setColor: (color: string) => void;
    setShape: (shape: Shape) => void;
};

export default function OrbPanel({ color, shape, setColor, setShape }: Props) {
    const [customColors, setCustomColors] = useState<string[]>([]);
    const [pendingColor, setPendingColor] = useState(color);
    const [showAdd, setShowAdd] = useState(false);

    const addColor = () => {
        setCustomColors((prev) =>
            prev.includes(pendingColor) ? prev : [...prev, pendingColor]
        );
        setShowAdd(false);
    };

    return (
        <div className="absolute right-8 top-8 w-64 rounded-[22px] border border-white/[0.09] bg-gradient-to-b from-[#181818] to-[#111] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="mb-3 text-xs uppercase tracking-wider text-white/40">
                Color
            </p>

            <div className="flex flex-wrap gap-2">
                {[...colors, ...customColors].map((item) => (
                    <button
                        key={item}
                        onClick={() => setColor(item)}
                        style={{ background: item }}
                        className={`size-7 shrink-0 rounded-full border transition ${color === item
                                ? "border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.35)]"
                                : "border-transparent"
                            }`}
                    />
                ))}

                <label className="relative grid size-7 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/[0.02] text-sm text-white/45 transition hover:border-white/25 hover:bg-white/[0.05] hover:text-white/70">
                    +
                    <input
                        type="color"
                        value={pendingColor}
                        onChange={(e) => {
                            setPendingColor(e.target.value);
                            setColor(e.target.value);
                        }}
                        onBlur={() => setShowAdd(true)}
                        className="absolute inset-0 opacity-0"
                    />
                </label>
            </div>

            {showAdd && (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                    <div className="flex items-center gap-2">
                        <span
                            className="size-4 rounded-full"
                            style={{ background: pendingColor }}
                        />
                        <span className="text-xs text-white/45">
                            {pendingColor.toUpperCase()}
                        </span>
                    </div>

                    <button
                        onClick={addColor}
                        className="rounded-md px-2 py-1 text-xs text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                    >
                        Add
                    </button>
                </div>
            )}

            <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <p className="mb-3 text-xs uppercase tracking-wider text-white/40">
                Shape
            </p>

            <div className="grid grid-cols-4 gap-2">
                {shapes.map((item) => (
                    <button
                        key={item}
                        onClick={() => setShape(item)}
                        className={`grid aspect-square place-items-center rounded-xl border transition ${shape === item
                                ? "border-white/20 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                : "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04]"
                            }`}
                    >
                        <span
                            className={`size-4 bg-white/70 ${item === "circle"
                                    ? "rounded-full"
                                    : item === "soft"
                                        ? "rounded-md"
                                        : item === "diamond"
                                            ? "rotate-45 rounded-sm"
                                            : ""
                                }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}