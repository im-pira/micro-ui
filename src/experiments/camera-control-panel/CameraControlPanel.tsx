"use client";

import { AELockButton, ExposureMeter, ModeControl, ShutterButton, useCameraControls, } from "./CameraControls";

export default function CameraControlPanel() {
  const { meterIndex, dialValue, mode, aeLocked, recording, rotateDial, cycleMode, toggleAeLock, toggleRecording, } = useCameraControls();

  const dialTicks = [
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

  const indicatorAngle = -120 + (dialValue / 100) * 240;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eeeeee]">
      <div className="relative h-[285px] w-[620px]">
        <div className="absolute -left-[30px] top-[14px] h-[255px] w-[175px] rounded-[90px] bg-black/18 blur-[52px]" />

        <div className="absolute bottom-[-40px] left-[20px] h-[90px] w-[575px] rounded-full bg-black/18 blur-[52px]" />

        <div className="absolute inset-[5px] rounded-[62px] bg-black/10 blur-[40px]" />

        <div className="relative h-full w-full overflow-hidden rounded-t-[16px] rounded-b-[64px] bg-[#080808] shadow-[0_30px_58px_rgba(0,0,0,0.26),-18px_18px_48px_rgba(0,0,0,0.14)]">
          <svg
            viewBox="0 0 620 285"
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
              d="M -20 66 H 388 C 438 66 462 84 476 120 L 515 305 H -20 Z"
              fill="url(#metal)"
            />
          </svg>

          <div className="absolute left-[38px] top-[16px] z-20 flex w-[72px] flex-col items-center">
            <div className="relative h-[45px] w-[66px]">
              <div className="absolute left-[1px] top-[17px] h-[29px] w-[64px] rounded-t-full border-[3px] border-b-0 border-[#444]" />

              <div
                className="absolute left-[1px] top-[17px] h-[29px] w-[64px] rounded-t-full"
                style={{
                  background:
                    "conic-gradient(from 220deg at 50% 100%, #ff6a20 0deg, #ffb52c 45deg, #ffd166 68deg, transparent 69deg)",
                  WebkitMask:
                    "radial-gradient(circle at 50% 100%, transparent 0 24px, #000 25px 28px, transparent 29px)",
                }}
              />

              <div className="absolute inset-x-0 bottom-[1px] text-center text-[17px] font-medium tracking-[-0.5px] text-white/75">
                FVL
              </div>
            </div>
          </div>

          <div className="absolute left-[126px] top-[19px] z-20 h-[39px] w-[70px]">
            <div className="absolute left-[3px] top-[20px] h-[18px] w-[3px] rotate-[10deg] rounded-full bg-[#54a9ff]" />
            <div className="absolute left-[12px] top-[6px] h-[3px] w-[17px] -rotate-[24deg] rounded-full bg-[#ff573c]" />
            <div className="absolute right-[13px] top-[6px] h-[3px] w-[18px] rotate-[24deg] rounded-full bg-[#d95ca6]" />
            <div className="absolute right-[3px] top-[20px] h-[18px] w-[3px] -rotate-[10deg] rounded-full bg-[#4fbd6a]" />

            <span className="absolute left-[10px] top-[7px] size-[6px] rounded-full bg-[#d9d9d9]" />
            <span className="absolute right-[10px] top-[7px] size-[6px] rounded-full bg-[#d9d9d9]" />

            <div className="absolute bottom-0 left-1/2 h-[19px] w-[25px] -translate-x-1/2 rounded-t-full bg-[#bdbdbd]">
              <div className="absolute left-1/2 top-[-5px] size-[11px] -translate-x-1/2 rounded-full bg-[#bdbdbd]" />
            </div>
          </div>

          <div className="absolute left-[220px] top-[17px] z-20">
            <ExposureMeter />
          </div>

          <div className="absolute right-[31px] top-[14px] z-20 w-[104px] text-white/55">
            <div className="flex items-end justify-between">
              <span className="text-[18px] font-light tracking-[-1px]">
                1/1.2k
              </span>
              <span className="text-[18px] font-light">0.0</span>
            </div>

            <div className="mt-[1px] h-px bg-white/22" />

            <div className="mt-[2px] flex justify-between text-[12px] tracking-[0.5px]">
              <span>SS</span>
              <span>EV</span>
            </div>

            <div className="mt-[12px] text-right">
              <span className="text-[18px] font-light">2.4K</span>
            </div>

            <div className="mt-[2px] h-px bg-white/20">
              <div className="ml-auto h-px w-[40%] bg-[#b76d29]/50" />
            </div>

            <div className="mt-[2px] text-right text-[12px] tracking-[0.6px]">
              ISO
            </div>
          </div>

          <div className="absolute left-[34px] top-[137px] z-20 size-[70px] overflow-hidden rounded-[10px] border-[4px] border-black bg-black">
            <img
              src="/camera-control-panel/camera.png"
              alt=""
              className="h-full w-full scale-[1.4] rounded-[5px] object-cover"
            />
          </div>

          <div className="absolute left-[120px] top-[142px] z-20 flex h-[60px] w-[98px] items-center rounded-[16px] bg-[#111111] px-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_5px_12px_rgba(0,0,0,0.18)]">
            <span className="text-[24px] font-medium leading-none tracking-[-1px] text-[#ff4b32]">
              SK
            </span>

            <div className="ml-auto">
              <ShutterButton
                recording={recording}
                onClick={toggleRecording}
              />
            </div>
          </div>

          <div
            className="absolute left-[242px] top-[103px] z-20 size-[140px] cursor-grab active:cursor-grabbing"
            onWheel={(event) => {
              event.preventDefault();
              rotateDial(event.deltaY > 0 ? "left" : "right");
            }}
          >
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
              {dialTicks.map((tick) => (
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

            <div
              className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out"
              style={{ transform: `rotate(${indicatorAngle}deg)` }}
            >
              <div className="absolute left-1/2 top-[13px] h-[8px] w-[3px] -translate-x-1/2 rounded-full bg-[#313331] shadow-[0_1px_2px_rgba(0,0,0,0.65)]" />
            </div>
          </div>

          <div className="absolute left-[404px] top-[118px] z-20">
            <ModeControl mode={mode} onChange={cycleMode} />
          </div>

          <div className="absolute left-[453px] top-[165px] z-10 h-px w-[26px] bg-black/35" />

          <div className="absolute right-[22px] bottom-[37px] z-20">
            <AELockButton active={aeLocked} onClick={toggleAeLock} />
          </div>

          <div className="absolute bottom-[13px] right-[22px] z-20 flex items-center gap-[5px] text-[4px] uppercase tracking-[1px] text-white/18">
            <span>CAM</span>
            <span className="size-[2px] rounded-full bg-[#f04a32]/50" />
            <span>CTRL</span>
            <span className="size-[2px] rounded-full bg-white/20" />
            <span>01</span>
          </div>

          <div className="absolute bottom-[18px] left-[120px] z-20 flex gap-[3px] opacity-25">
            <span className="h-[2px] w-[10px] rounded-full bg-black" />
            <span className="h-[2px] w-[5px] rounded-full bg-black" />
            <span className="h-[2px] w-[2px] rounded-full bg-black" />
          </div>
        </div>
      </div>
    </main>
  );
}