"use client";

import type { ReactNode } from "react";
import AnimatedGradient from "./AnimatedGradient";

function PhoneShell({
  children,
  screenClass = "bg-[#faf9f7]",
}: {
  children: ReactNode;
  screenClass?: string;
}) {
  return (
    <div className="relative h-[650px] w-[315px] rounded-[48px] bg-gradient-to-br from-[#4a4a4a] via-[#080808] to-[#252525] p-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.16),inset_0_0_0_2px_rgba(0,0,0,.8),0_24px_60px_rgba(0,0,0,.3)]">
      <div className="pointer-events-none absolute inset-[4px] rounded-[44px] ring-1 ring-white/10" />

      <div className={`relative h-full w-full overflow-hidden rounded-[40px] ${screenClass}`}>
        <div className="absolute left-1/2 top-[14px] z-30 h-[19px] w-[60px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        {children}
      </div>
    </div>
  );
}

export default function GradientFramework() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-8">
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

            <div className="relative flex-1 overflow-hidden rounded-[17px] bg-white">
              <div className="absolute left-7 -top-12 h-40 w-36 rounded-[50%] bg-red-500 blur-[16px]" />

              <div className="absolute -left-20 top-32 h-60 w-[370px] rotate-[8deg] rounded-[50%] bg-red-600 blur-[2px]" />

              <div className="absolute -left-20 top-[240px] h-56 w-56 rounded-[50%] bg-black blur-[3px]" />

              <div className="absolute right-2 top-[270px] h-24 w-36 rounded-[50%] bg-white blur-[8px]" />
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