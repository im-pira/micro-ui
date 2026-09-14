import { useState } from "react";

type OrbState =
  | "idle"
  | "active"
  | "thinking"
  | "searching"
  | "listening"
  | "connecting";

const states: OrbState[] = [
  "idle",
  "active",
  "thinking",
  "searching",
  "listening",
  "connecting",
];

export default function MatrixOrb() {
  const [state, setState] = useState<OrbState>("idle");

  const grid = 11;
  const center = 5;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#111] text-white">
      <div className="-translate-y-10 text-center">
        <div className={`orb grid size-44 grid-cols-11 place-items-center ${state}`}>
          {Array.from({ length: grid * grid }).map((_, i) => {
            const row = Math.floor(i / grid);
            const col = i % grid;
            const distance = Math.hypot(col - center, row - center);

            if (distance > 5.4) return <span key={i} />;

            const dotSize = Math.max(2, 11 - distance * 1.6);
            const angle = Math.atan2(row - center, col - center);

            return (
              <span
                key={i}
                className="dot rounded-full bg-violet-400"
                style={{
                  width: dotSize,
                  height: dotSize,
                  "--distance": distance,
                  "--angle": angle,
                  "--i": i,
                } as React.CSSProperties}
              />
            );
          })}
        </div>

        <p className="mt-5 text-sm capitalize text-white/55">{state}</p>
      </div>

      <div className="absolute bottom-14 flex gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
        {states.map((item) => (
          <button
            key={item}
            onClick={() => setState(item)}
            className={`rounded-xl px-3 py-2 text-xs capitalize transition ${
              state === item ? "bg-black text-white" : "text-white/40"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}