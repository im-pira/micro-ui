import { useRef, useState } from "react";

export default function Knob() {
  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);

  const update = (x: number, y: number) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    let deg = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;

    setAngle(deg);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      update(e.clientX, e.clientY);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#c8c8c8]">
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className="dial relative size-[300px] touch-none select-none rounded-full cursor-grab"
      >
        {/* moving outer halo */}
        <div
          className="dial-halo pointer-events-none absolute inset-[-26px] rounded-full"
          style={{ transform: `rotate(${angle}deg)` }}
        />

        {/* rotating physical face */}
        <div
          className="dial-face absolute inset-0 rounded-full"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="dial-inner absolute inset-[5px] rounded-full" />

          {/* text opposite the indicator */}
          <svg
            viewBox="0 0 300 300"
            className="pointer-events-none absolute inset-0 size-full"
          >
            <defs>
              <path
                id="dialText"
                d="M 225 184 A 88 88 0 0 1 75 184"
              />
            </defs>

            <text className="dial-text">
              <textPath href="#dialText" startOffset="4%">
                LADIES AND GENTLEMEN, THIS IS RIVE
              </textPath>
            </text>
          </svg>

          {/* indicator */}
          <div className="absolute left-1/2 top-1/2 h-[40%] w-px -translate-x-1/2 -translate-y-full">
            <div className="dial-indicator absolute left-1/2 top-[2px] h-[13px] w-[24px] -translate-x-1/2 rotate-[35deg] rounded-full" />
          </div>
        </div>

        <div className="dial-outline pointer-events-none absolute inset-[2px] rounded-full" />
      </div>
    </div>
  );
}