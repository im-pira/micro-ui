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
          <div className="absolute left-1/2 top-[14px] z-30 h-[23px] w-[82px] -translate-x-1/2 rounded-full bg-black shadow-[0_1px_2px_rgba(255,255,255,.08)]" />
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
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,#fff_0%,#f3f3f3_55%,#e8e8e8_100%)] p-8">
      <div className="flex gap-10">
        <PhoneShell>
          <div className="flex h-full flex-col px-5 pb-6 pt-16">
            <div className="mb-5">
              <div className="mb-1 text-[10px] uppercase tracking-[.16em] text-black/35">
                Study 01
              </div>

              <div className="text-[34px] leading-[.94] tracking-[-.045em] text-[#aaa]">
                Fluid
                <span className="ml-1.5 text-[38px] tracking-[-.055em] text-black">
                  Forms
                </span>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-[17px]">
              <RedWarpGradient />

              <div className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[.12em] text-white backdrop-blur-md">
                Live
              </div>

              <div className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[.12em] text-white/90">
                Red / Black / White
              </div>

              <div className="absolute bottom-4 right-4 text-[10px] font-medium text-white/90">
                01
              </div>
            </div>

            <button className="mt-4 h-10 rounded-full bg-black text-[11px] font-medium text-white shadow-sm">
              View study
            </button>
          </div>
        </PhoneShell>

        <PhoneShell screenClass="bg-black">
          <div className="relative h-full">
            <AnimatedGradient />

            <div className="absolute inset-0 z-10 flex flex-col px-5 pb-6 pt-[82px] text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[.16em] text-white/70">
                    Study 02
                  </div>

                  <div className="mt-1 text-[12px] font-medium text-white">
                    Generative Mesh
                  </div>
                </div>

                <div className="rounded-full border border-white/40 bg-black/10 px-2.5 py-1 text-[8px] uppercase tracking-[.12em] backdrop-blur">
                  Live
                </div>
              </div>

              <div className="mt-auto">
                <div className="mb-7">
                  <div className="mb-2 text-[10px] uppercase tracking-[.15em] text-white/65">
                    Cloth Motion
                  </div>

                  <div className="text-[40px] leading-[.82] tracking-[-.06em]">
                    Soft
                    <br />
                    Motion
                    <br />
                    Field
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between border-t border-white/20 pt-3 text-[10px] font-medium text-white/80">
                  <span>Pastel / Mesh</span>
                  <span>02</span>
                </div>

                <button className="h-11 w-full rounded-full border border-white/60 bg-white/85 px-5 text-[12px] font-medium tracking-[-0.01em] text-black shadow-[0_10px_26px_rgba(0,0,0,.14)] backdrop-blur-xl transition duration-200 hover:-translate-y-[1px] hover:bg-white active:translate-y-0">
                  Explore motion
                </button>
              </div>
            </div>
          </div>
        </PhoneShell>
      </div>
    </main>
  );
}