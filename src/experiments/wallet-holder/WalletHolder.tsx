import { useState } from "react";

export default function WalletHolder() {
  const [open, setOpen] = useState<number | null>(null);

  const cards = [
    ["top-[31px]", "bg-[linear-gradient(135deg,#d6b84f,#f1d979,#b69036)]"],
    ["top-[76px]", "bg-[linear-gradient(135deg,#4389bd,#74b5e2,#3476a8)]"],
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#455443]">
      <div className="relative h-[285px] w-[320px] rounded-[34px] bg-[#0b1713] shadow-[0_20px_30px_#0005]">

        {/* BACK LEATHER */}
        <div className="pointer-events-none absolute inset-[5px] rounded-[30px] bg-[linear-gradient(#10201cee,#10201cee),url('/wallet-holder/leather.png')] bg-cover bg-center" />

        {/* CARDS */}
        {cards.map(([top, bg], i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className={`
              absolute left-1/2 ${top} ${i === 0 ? "z-10" : "z-20"}
              w-[286px] aspect-[1.586/1] -translate-x-1/2
              overflow-hidden rounded-[13px] ${bg}
              outline-none ring-0 focus:outline-none focus:ring-0
              shadow-[0_5px_12px_#0007]
              transform-gpu will-change-transform
              transition-transform duration-[700ms]
              ease-[cubic-bezier(.22,1,.36,1)]
              ${open === i ? "-translate-y-[155px]" : "translate-y-0"}
            `}
          >
            <div className="pointer-events-none absolute -left-7 -top-9 h-36 w-36 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute left-8 -top-11 h-36 w-36 rounded-full border border-white/10" />

            <span className="pointer-events-none absolute right-4 top-4 text-[17px] font-black text-[#111]">
              AMERICAN
            </span>
          </button>
        ))}

        {/* FRONT POCKET */}
        <div className="pointer-events-none absolute bottom-[7px] left-[7px] right-[7px] z-30 h-[184px] overflow-hidden rounded-[26px] shadow-[0_-5px_10px_#0007,0_8px_14px_#0005]">
          <div className="absolute inset-0 bg-[linear-gradient(#12251fee,#12251fee),url('/wallet-holder/leather.png')] bg-cover bg-center" />
          <div className="absolute left-2 right-2 top-2 border-t border-dashed border-white/10" />
        </div>

        {/* GLASS AMOUNT */}
        <div className="absolute inset-x-0 top-[178px] z-40 text-center">
          <div className="group relative mx-auto w-fit cursor-default overflow-hidden">
            <p className="bg-[linear-gradient(180deg,#53695e,#17291f_45%,#07120d_65%,#60776a)] bg-clip-text text-[37px] font-semibold leading-none tracking-[-2px] text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,.14)]">
              $250,000
            </p>

            <span className="pointer-events-none absolute inset-y-0 -left-[60%] w-[35%] skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[480%]" />
          </div>

          <p className="mt-3 text-[10px] font-semibold tracking-[2px] text-[#14231b]">
            TOTAL BALANCE
          </p>
        </div>

        {/* STITCHING */}
        <div className="pointer-events-none absolute inset-[10px] z-40 rounded-[26px] border border-dashed border-white/10" />
      </div>
    </div>
  );
}