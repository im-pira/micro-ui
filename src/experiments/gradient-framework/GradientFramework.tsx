"use client";

import AnimatedGradient from "./AnimatedGradient";
import RedWarpGradient from "./RedWarpGradient";

function PhoneShell({
  children,
  screenClass = "bg-[#faf9f7]",
}: {
  children: React.ReactNode;
  screenClass?: string;
}) {
  return (
    <div className="relative h-[650px] w-[315px] rounded-[50px] bg-[linear-gradient(135deg,#666_0%,#151515_16%,#050505_42%,#2d2d2d_70%,#080808_100%)] p-[9px] shadow-[0_35px_80px_rgba(0,0,0,.6),0_12px_28px_rgba(0,0,0,.45),inset_0_0_0_1px_rgba(255,255,255,.22)]">

      {/* outer metallic rim */}
      <div className="pointer-events-none absolute inset-[2px] rounded-[48px] ring-1 ring-white/15" />

      {/* top metallic glint */}
      <div className="pointer-events-none absolute left-[48px] right-[48px] top-[4px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* bottom metallic glint */}
      <div className="pointer-events-none absolute bottom-[4px] left-[60px] right-[60px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* inner black bezel */}
      <div className="relative h-full w-full rounded-[43px] bg-black p-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08),inset_0_0_18px_rgba(0,0,0,.9)]">

        <div className={`relative h-full w-full overflow-hidden rounded-[40px] ${screenClass}`}>
          <div className="absolute left-1/2 top-[14px] z-30 h-[19px] w-[60px] -translate-x-1/2 rounded-full bg-black shadow-[0_1px_2px_rgba(255,255,255,.08)]" />
          {children}
        </div>
      </div>

      {/* soft floor shadow */}
      <div className="pointer-events-none absolute -bottom-7 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />
    </div>
  );
}

export default function GradientFramework() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#0d0e10_55%,#08090a_100%)] p-8">
      <div className="flex gap-10">
        <PhoneShell>
          <div className="flex h-full flex-col px-5 pb-6 pt-16">
            <div className="mb-6">
              <div className="text-[33px] leading-[.95] tracking-[-.04em] text-[#aaa]">
                Latest
              </div>

              <div className="text-[37px] leading-[.95] tracking-[-.05em] text-black">
                Collection
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-[17px]">
              <RedWarpGradient />
            </div>

            <button className="mt-4 h-9 rounded-full bg-white text-[10px] text-black shadow-sm">
              Explore collection
            </button>
          </div>
        </PhoneShell>

        <PhoneShell screenClass="bg-black">
          <div className="relative h-full">
            <AnimatedGradient />

            <div className="absolute inset-0 z-10 flex flex-col px-5 pb-6 pt-[80px] text-white">
              <div className="flex justify-between text-[9px] leading-[1.15]">
                <span>
                  Human made designed
                  <br />
                  Dither Gradient collection
                </span>

                <span>[40]</span>
              </div>

              <div className="mt-auto mb-5 text-[38px] leading-[.82] tracking-[-.055em]">
                Dither©
                <br />
                Animated
                <br />
                Gradient
              </div>

              <button className="h-9 rounded-full bg-white text-[10px] text-black">
                Explore collection
              </button>
            </div>
          </div>
        </PhoneShell>
      </div>
    </main>
  );
}