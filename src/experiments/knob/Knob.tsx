import { useRef, useState } from "react";

export default function Knob() {
  const knobRef = useRef(null);
  const [angle, setAngle] = useState(225);

  const updateAngle = (x, y) => {
    const r = knobRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    let deg = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;

    setAngle(deg);
  };

  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateAngle(e.clientX, e.clientY);
  };

  const move = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    updateAngle(e.clientX, e.clientY);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#c8c8c8]">
      <div
        ref={knobRef}
        onPointerDown={down}
        onPointerMove={move}
        className="dial relative size-[300px] touch-none select-none rounded-full cursor-grab"
      >
        <div
          className="dial-face absolute inset-[4px] rounded-full"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="dial-center absolute left-1/2 top-1/2 size-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full" />

          <div className="absolute left-1/2 top-1/2 h-[40%] w-px -translate-x-1/2 -translate-y-full">
            <div className="dial-led absolute left-1/2 top-0 h-[13px] w-[25px] -translate-x-1/2 rotate-[28deg] rounded-full" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-[3px] z-20 rounded-full border-[2px] border-[#161616]" />
      </div>
    </div>
  );
}