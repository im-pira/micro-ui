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
        <div className="w-64 rounded-[22px] border border-white/[0.09] bg-gradient-to-b from-[#181818] to-[#111] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="mb-2.5 text-[10px] uppercase tracking-[0.14em] text-white/35">
                Color
            </p>

            <div className="flex flex-wrap gap-2">
                {[...colors, ...customColors].map((item) => (
                    <button
                        key={item}
                        onClick={() => setColor(item)}
                        style={{ background: item }}
                        className={`size-6 shrink-0 rounded-full border transition ${color === item
                                ? "border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                                : "border-transparent"
                            }`}
                    />
                ))}

                <label className="relative grid size-6 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/[0.02] text-xs text-white/45 transition hover:bg-white/[0.05]">
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
                <div className="mt-3 flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                    <div className="flex items-center gap-2">
                        <span className="size-3.5 rounded-full" style={{ background: pendingColor }} />
                        <span className="text-[11px] text-white/45">
                            {pendingColor.toUpperCase()}
                        </span>
                    </div>

                    <button
                        onClick={addColor}
                        className="text-[11px] text-white/65 transition hover:text-white"
                    >
                        Add
                    </button>
                </div>
            )}

            <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <p className="mb-2.5 text-[10px] uppercase tracking-[0.14em] text-white/35">
                Shape
            </p>

            <div className="grid grid-cols-4 gap-2">
                {shapes.map((item) => (
                    <button
                        key={item}
                        onClick={() => setShape(item)}
                        className={`grid h-12 place-items-center rounded-xl border transition ${shape === item
                                ? "border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                : "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04]"
                            }`}
                    >
                        <span
                            className={`size-3.5 bg-white/70 ${item === "circle"
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