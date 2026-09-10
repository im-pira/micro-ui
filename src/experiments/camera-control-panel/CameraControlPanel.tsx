"use client";

import { useState } from "react";
import CameraLens from "./CameraLens";
import { AELockButton, ExposureMeter, ModeControl, ShutterButton, useCameraControls } from "./CameraControls";

export default function CameraControlPanel() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { dialValue, mode, aeLocked, recording, rotateDial, cycleMode, toggleAeLock, toggleRecording, } = useCameraControls();

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

          <div className="absolute left-[38px] top-[16px] z-20">
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
              <div className="absolute inset-x-0 bottom-[1px] text-center text-[17px] font-medium text-white/75">
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
              <span className="text-[18px] font-light tracking-[-1px]">1/1.2k</span>
              <span className="text-[18px] font-light">0.0</span>
            </div>
            <div className="mt-px h-px bg-white/20" />
            <div className="mt-[2px] flex justify-between text-[12px]">
              <span>SS</span>
              <span>EV</span>
            </div>
            <div className="mt-[12px] text-right text-[18px] font-light">2.4K</div>
            <div className="mt-[2px] h-px bg-white/20" />
            <div className="mt-[2px] text-right text-[12px]">ISO</div>
          </div>

          <button
            onClick={() => setPreviewOpen(true)}
            className="absolute left-[34px] top-[137px] z-20 size-[70px] overflow-hidden rounded-[10px] border-[4px] border-black bg-black"
          >
            <img
              src="/camera-control-panel/camera.png"
              alt=""
              className="h-full w-full scale-[1.4] rounded-[5px] object-cover"
            />
          </button>

          <div className="absolute left-[120px] top-[142px] z-20 flex h-[60px] w-[98px] items-center rounded-[16px] bg-[#111111] px-[10px]">
            <span className="text-[24px] font-medium tracking-[-1px] text-[#ff4b32]">
              SK
            </span>
            <div className="ml-auto">
              <ShutterButton recording={recording} onClick={toggleRecording} />
            </div>
          </div>

          <div className="absolute left-[238px] top-[98px] z-20">
            <CameraLens
              open={recording}
              value={dialValue}
              onChange={rotateDial}
            />
          </div>

          <div className="absolute left-[404px] top-[118px] z-20">
            <ModeControl mode={mode} onChange={cycleMode} />
          </div>

          <div className="absolute left-[453px] top-[165px] h-px w-[26px] bg-black/35" />

          <div className="absolute right-[20px] bottom-[52px] z-20">
            <AELockButton active={aeLocked} onClick={toggleAeLock} />
          </div>

          <div className="absolute left-[34px] top-[82px] z-20 flex items-center gap-[5px]">
            <span className="size-[4px] rounded-full bg-[#f04a32] shadow-[0_0_7px_rgba(240,74,50,0.45)]" />
            <span className="text-[5px] font-medium tracking-[1.4px] text-black/35">
              READY
            </span>
          </div>

          <div className="absolute left-[36px] bottom-[18px] z-20 flex items-center gap-[7px] text-[4px] tracking-[1px] text-black/25">
            <span>01</span>
            <span className="h-px w-[12px] bg-black/20" />
            <span>25</span>
            <span className="h-px w-[18px] bg-black/20" />
            <span>50</span>
          </div>

          <div className="absolute left-[226px] bottom-[17px] z-20 flex items-end gap-[4px] opacity-25">
            {[3, 7, 12, 7, 3].map((height, index) => (
              <span
                key={index}
                className="w-px bg-black"
                style={{ height }}
              />
            ))}
          </div>

          <div className="absolute left-[18px] top-[83px] z-20 size-[5px] rounded-full border border-black/20 bg-[#b8b8b8] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
          <div className="absolute right-[16px] top-[84px] z-20 size-[5px] rounded-full border border-white/10 bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]" />

          <div className="absolute bottom-[28px] right-[32px] z-20 flex items-center gap-[5px] text-[4px] uppercase tracking-[1px] text-white/18">
            <span>CAM</span>
            <span className="size-[2px] rounded-full bg-[#f04a32]/50" />
            <span>CTRL</span>
            <span className="size-[2px] rounded-full bg-white/20" />
            <span>01</span>
          </div>
        </div>
      </div>
      {previewOpen && (
        <div
          onClick={() => setPreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[10px] animate-[fadeIn_220ms_ease-out]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative overflow-hidden rounded-[18px] bg-black p-[5px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] animate-[previewIn_260ms_cubic-bezier(.22,1,.36,1)]"
          >
            <img
              src="/camera-control-panel/camera.png"
              alt="Camera preview"
              className="h-[320px] w-[360px] rounded-[14px] object-cover"
            />

            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute right-[10px] top-[10px] flex size-[26px] items-center justify-center rounded-full bg-black/50 text-[14px] text-white/80 backdrop-blur-md"
            >
              ×
            </button>
          </div>

          <style>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes previewIn {
        from {
          opacity: 0;
          transform: scale(.88) translateY(8px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
    `}</style>
        </div>
      )}
    </main>
  );
}