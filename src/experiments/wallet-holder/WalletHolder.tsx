import { useState } from "react";
import "./wallet-holder.css";

export default function WalletHolder() {
  const [open, setOpen] = useState([false, false]);
  const [used, setUsed] = useState([false, false]);

  const cards = [
    {
      top: "top-[31px]",
      type: "card-gold",
      z: "z-10",
      metal:
        "bg-[linear-gradient(135deg,#9f7618_0%,#c79f36_22%,#8d6513_48%,#d5b754_72%,#76510d_100%)]",
    },
    {
      top: "top-[77px]",
      type: "card-red",
      z: "z-20",
      metal:
        "bg-[linear-gradient(135deg,#5d0712_0%,#861522_22%,#4c0710_48%,#9e2432_72%,#3b050b_100%)]",
    },
  ];

  const toggleCard = (i: number) => {
    setUsed((p) => p.map((v, j) => (j === i ? true : v)));
    setOpen((p) => p.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#455443]">
      <div className="relative h-[285px] w-[320px] rounded-[34px] bg-[#0a1512] shadow-[0_22px_32px_rgba(0,0,0,.32)]">
        {/* BACK */}
        <div className="pointer-events-none absolute inset-[5px] rounded-[30px] bg-[linear-gradient(rgba(13,30,25,.91),rgba(13,30,25,.91)),url('/wallet-holder/leather.png')] bg-cover bg-center" />

        <div className="pointer-events-none absolute inset-[10px] rounded-[26px] border border-dashed border-[#64756b]/25" />

        {/* CARDS */}
        {cards.map((card, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggleCard(i)}
            className={`absolute left-1/2 ${card.top} ${card.type}
              w-[286px] aspect-[1.586/1] overflow-hidden rounded-[13px]
              ${card.metal} outline-none ring-0
              shadow-[0_7px_16px_rgba(0,0,0,.48),inset_0_1px_0_rgba(255,255,255,.3),inset_0_-3px_5px_rgba(0,0,0,.35)]
              ${
                open[i]
                  ? "card-out"
                  : used[i]
                    ? "card-in"
                    : `${card.z} -translate-x-1/2`
              }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,.03)_30%,rgba(255,255,255,.12)_46%,rgba(255,255,255,.03)_58%,transparent_74%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[12px] border border-white/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,.14)]" />
            <div className="pointer-events-none absolute inset-x-5 top-[2px] h-px bg-white/20" />
            <div className="pointer-events-none absolute inset-x-[8%] bottom-0 h-[18%] bg-gradient-to-t from-black/20 to-transparent" />
          </button>
        ))}

        {/* GOLD POCKET */}
        <div className="pointer-events-none absolute left-[9px] right-[9px] top-[67px] z-[15] h-[58px] overflow-hidden rounded-t-[20px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(12,29,24,.9),rgba(12,29,24,.95)),url('/wallet-holder/leather.png')] bg-cover bg-center" />
          <div className="absolute inset-0 shadow-[inset_0_8px_12px_rgba(255,255,255,.025),inset_0_-10px_14px_rgba(0,0,0,.4),0_-4px_9px_rgba(0,0,0,.32)]" />
          <div className="absolute inset-x-3 top-[7px] border-t border-dashed border-[#68786f]/24" />
        </div>

        {/* RED POCKET */}
        <div className="pointer-events-none absolute left-[9px] right-[9px] top-[112px] z-[25] h-[58px] overflow-hidden rounded-t-[20px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(12,29,24,.91),rgba(12,29,24,.96)),url('/wallet-holder/leather.png')] bg-cover bg-center" />
          <div className="absolute inset-0 shadow-[inset_0_8px_12px_rgba(255,255,255,.025),inset_0_-10px_14px_rgba(0,0,0,.42),0_-4px_9px_rgba(0,0,0,.34)]" />
          <div className="absolute inset-x-3 top-[7px] border-t border-dashed border-[#68786f]/24" />
        </div>

        {/* FRONT POCKET */}
        <div className="pointer-events-none absolute bottom-[7px] left-[7px] right-[7px] z-30 h-[150px] overflow-hidden rounded-[26px] shadow-[0_16px_28px_rgba(0,0,0,.42),inset_0_14px_18px_rgba(255,255,255,.035),inset_0_-24px_30px_rgba(0,0,0,.62),inset_16px_0_20px_rgba(0,0,0,.28),inset_-16px_0_20px_rgba(0,0,0,.28)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(14,34,27,.88),rgba(14,34,27,.92)),url('/wallet-holder/leather.png')] bg-cover bg-center" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,rgba(255,255,255,.07),rgba(255,255,255,.03)_32%,transparent_68%)]" />

          <div className="absolute inset-[3px] rounded-[23px] shadow-[inset_0_2px_2px_rgba(255,255,255,.04),inset_0_-10px_14px_rgba(0,0,0,.34),inset_8px_0_12px_rgba(0,0,0,.16),inset_-8px_0_12px_rgba(0,0,0,.16)]" />

          <div className="absolute inset-[8px] rounded-[20px] border border-dashed border-[#6f8076]/20" />
        </div>

        {/* AMOUNT */}
        <div className="absolute inset-x-0 top-[181px] z-40 text-center">
          <p
            style={{ fontFamily: "'Doppio One', sans-serif" }}
            className="mx-auto w-fit cursor-default bg-[linear-gradient(100deg,#3b5147,#65796f_35%,#aebdb5_48%,#d8e0dc_52%,#9cafa5_58%,#52675d_70%,#3b5147)] bg-[length:240%_100%] bg-left bg-clip-text text-[37px] leading-none tracking-[-2.5px] text-transparent transition-[background-position] duration-700 hover:bg-right"
          >
            $350,000
          </p>

          <p className="mt-3 text-[9px] font-medium tracking-[2.5px] text-[#173d2e]/65">
            TOTAL BALANCE
          </p>
        </div>
      </div>
    </div>
  );
}