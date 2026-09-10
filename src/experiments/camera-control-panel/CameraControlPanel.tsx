export default function CameraControlPanel() {
  const ticks = [
    { angle: -120, label: "0" },
    { angle: -90 },
    { angle: -60 },
    { angle: -30 },
    { angle: 0, label: "50" },
    { angle: 30 },
    { angle: 60 },
    { angle: 90 },
    { angle: 120, label: "100" },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eeeeee]">
      <div className="relative h-[250px] w-[620px]">
        <div className="absolute -left-[30px] top-[15px] h-[220px] w-[170px] rounded-[80px] bg-black/20 blur-[50px]" />

        <div className="absolute bottom-[-38px] left-[20px] h-[80px] w-[570px] rounded-full bg-black/18 blur-[48px]" />

        <div className="absolute inset-[4px] rounded-[60px] bg-black/10 blur-[38px]" />

        <div className="relative h-full w-full overflow-hidden rounded-t-[16px] rounded-b-[64px] bg-[#080808] shadow-[0_28px_55px_rgba(0,0,0,0.28),-18px_18px_45px_rgba(0,0,0,0.16)]">
          <svg
            viewBox="0 0 620 250"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c7c7c7" />
                <stop offset="55%" stopColor="#b9b9b9" />
                <stop offset="100%" stopColor="#adadad" />
              </linearGradient>
            </defs>

            <path
              d="M -20 58 H 388 C 438 58 462 75 476 108 L 515 270 H -20 Z"
              fill="url(#metal)"
            />
          </svg>

          <div className="absolute left-[246px] top-[80px] z-20 size-[140px]">
            <div className="absolute -inset-[17px] rounded-full bg-[radial-gradient(circle_at_38%_28%,rgba(255,255,255,0.8),rgba(210,210,210,0.35)_40%,rgba(130,130,130,0.18)_72%,transparent_75%)] blur-[1px]" />

            <div className="absolute inset-0 rounded-full bg-[#e4e4e2] shadow-[0_9px_13px_rgba(0,0,0,0.45),-4px_-5px_8px_rgba(255,255,255,0.75)]" />

            <div
              className="absolute inset-[3px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #f8f8f7, #d8d8d6, #fafafa, #cfcfcd, #f8f8f7, #d2d2d0, #fafafa, #d5d5d3, #f8f8f7)",
              }}
            />

            <div className="absolute inset-[5px] rounded-full border-[2px] border-[#343434]" />

            <div
              className="absolute inset-[7px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 48% 48%, rgba(255,255,255,0.95) 0%, rgba(235,235,233,0.95) 48%, rgba(215,215,213,0.95) 100%)",
              }}
            />

            <div
              className="absolute inset-[7px] rounded-full opacity-40"
              style={{
                background:
                  "conic-gradient(from 15deg, transparent 0deg, rgba(255,255,255,0.7) 22deg, transparent 46deg, rgba(170,170,170,0.18) 70deg, transparent 95deg, rgba(255,255,255,0.65) 120deg, transparent 150deg, rgba(160,160,160,0.16) 185deg, transparent 215deg, rgba(255,255,255,0.6) 250deg, transparent 290deg, rgba(170,170,170,0.15) 325deg, transparent 360deg)",
              }}
            />

            <div className="pointer-events-none absolute inset-0 z-30">
              {ticks.map((tick) => (
                <div
                  key={tick.angle}
                  className="absolute inset-[9px]"
                  style={{
                    transform: `rotate(${tick.angle}deg)`,
                    transformOrigin: "50% 50%",
                  }}
                >
                  <span
                    className={`absolute left-1/2 top-0 -translate-x-1/2 bg-neutral-700 ${tick.label
                        ? "h-[6px] w-px opacity-40"
                        : "h-[4px] w-px opacity-20"
                      }`}
                  />

                  {tick.label && (
                    <span
                      className="absolute left-1/2 top-[7px] -translate-x-1/2 whitespace-nowrap text-[3px] font-medium tracking-[0.3px] text-neutral-600/45"
                      style={{
                        transform: `translateX(-50%) rotate(${-tick.angle}deg)`,
                      }}
                    >
                      {tick.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <svg
              viewBox="0 0 140 140"
              className="pointer-events-none absolute inset-0 size-full"
            >
              <defs>
                <path
                  id="dialText"
                  d="M 28 102 A 54 54 0 0 0 112 102"
                />
              </defs>

              <text className="fill-neutral-500/45 text-[3.3px] font-medium tracking-[0.5px]">
                <textPath href="#dialText" startOffset="10%">
                  PRECISION ADJUST
                </textPath>
              </text>
            </svg>

            <span className="absolute left-1/2 top-1/2 size-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-700/30" />

            <div className="absolute left-[98px] top-[84px] h-[7px] w-[3px] rotate-[120deg] rounded-full bg-[#313331] shadow-[0_1px_2px_rgba(0,0,0,0.65)]" />
          </div>
        </div>
      </div>
    </main>
  );
}