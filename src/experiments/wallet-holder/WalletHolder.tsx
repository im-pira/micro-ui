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
      top: "top-[83px]",
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
      <div
        className="
          relative h-[285px] w-[320px] rounded-[34px] bg-[#07120f]
          shadow-[0_20px_30px_rgba(0,0,0,.34),inset_0_0_0_3px_rgba(0,0,0,.65),inset_0_0_0_7px_rgba(24,43,35,.55),inset_0_-12px_22px_rgba(0,0,0,.38)]
        "
      >
        {/* BACK LEATHER */}
        <div className="pointer-events-none absolute inset-[6px] overflow-hidden rounded-[29px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(13,30,25,.91),rgba(13,30,25,.94)),url('/wallet-holder/leather.png')] bg-cover bg-center" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(255,255,255,.04),transparent_62%)]" />

          <div className="absolute inset-0 shadow-[inset_10px_0_16px_rgba(0,0,0,.24),inset_-10px_0_16px_rgba(0,0,0,.24),inset_0_-14px_18px_rgba(0,0,0,.34)]" />
        </div>

        {/* OUTER STITCH */}
        <div className="pointer-events-none absolute inset-[11px] rounded-[24px] border border-dashed border-[#74847a]/22" />

        {/* CARDS */}
        {cards.map((card, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggleCard(i)}
            className={`absolute left-1/2 ${card.top} ${card.type}
              w-[286px] aspect-[1.586/1] overflow-hidden rounded-[13px]
              ${card.metal} outline-none ring-0
              shadow-[0_7px_15px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.28),inset_0_-3px_5px_rgba(0,0,0,.36)]
              ${
                open[i]
                  ? "card-out"
                  : used[i]
                    ? "card-in"
                    : `${card.z} -translate-x-1/2`
              }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,.025)_30%,rgba(255,255,255,.11)_46%,rgba(255,255,255,.025)_58%,transparent_74%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[12px] border border-white/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,.15)]" />
            <div className="pointer-events-none absolute inset-x-5 top-[2px] h-px bg-white/20" />
            <div className="pointer-events-none absolute inset-x-[8%] bottom-0 h-[18%] bg-gradient-to-t from-black/20 to-transparent" />
          </button>
        ))}

        {/* POCKET BETWEEN GOLD + RED */}
        {/* UPPER POCKET */}
<div className="pointer-events-none absolute left-[7px] right-[7px] top-[73px] z-[15] h-[52px] overflow-hidden rounded-t-[8px]">
  <div className="absolute inset-0 bg-[linear-gradient(rgba(14,34,27,.89),rgba(13,31,25,.94)),url('/wallet-holder/leather.png')] bg-cover bg-center" />

  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,255,255,.055)_0%,rgba(255,255,255,.02)_36%,transparent_70%)]" />

  <div className="absolute inset-x-0 top-0 h-[14px] bg-gradient-to-b from-black/34 to-transparent" />

  <div className="absolute inset-[3px] rounded-t-[6px] shadow-[inset_0_2px_1px_rgba(255,255,255,.035),inset_0_-9px_13px_rgba(0,0,0,.32),inset_7px_0_10px_rgba(0,0,0,.14),inset_-7px_0_10px_rgba(0,0,0,.14)]" />

  <div className="absolute inset-x-[8px] top-[8px] h-[12px] rounded-t-[4px] border-t border-dashed border-[#75867b]/22" />
</div>

        {/* MAIN FRONT POCKET */}
        <div
          className="
            pointer-events-none absolute bottom-[7px] left-[7px] right-[7px] z-30
            h-[158px] overflow-hidden
            rounded-t-[8px] rounded-b-[26px]
            shadow-[0_13px_24px_rgba(0,0,0,.42),inset_0_10px_16px_rgba(255,255,255,.035),inset_0_-24px_28px_rgba(0,0,0,.6),inset_14px_0_18px_rgba(0,0,0,.26),inset_-14px_0_18px_rgba(0,0,0,.26)]
          "
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(14,34,27,.89),rgba(13,31,25,.94)),url('/wallet-holder/leather.png')] bg-cover bg-center" />

          {/* center bulge */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,255,255,.055)_0%,rgba(255,255,255,.02)_36%,transparent_70%)]" />

          {/* top lip */}
          <div className="absolute inset-x-0 top-0 h-[14px] bg-gradient-to-b from-black/34 to-transparent" />

          {/* bottom cushion */}
          <div className="absolute inset-x-4 bottom-0 h-[34%] bg-gradient-to-t from-black/24 to-transparent" />

          {/* inner bevel */}
          <div className="absolute inset-[3px] rounded-t-[6px] rounded-b-[23px] shadow-[inset_0_2px_1px_rgba(255,255,255,.035),inset_0_-9px_13px_rgba(0,0,0,.32),inset_7px_0_10px_rgba(0,0,0,.14),inset_-7px_0_10px_rgba(0,0,0,.14)]" />

          {/* pocket stitching */}
          <div className="absolute inset-[8px] rounded-t-[4px] rounded-b-[19px] border border-dashed border-[#75867b]/22" />
        </div>

        {/* AMOUNT */}
        <div className="absolute inset-x-0 top-[183px] z-40 text-center">
          <p
            style={{ fontFamily: "'Doppio One', sans-serif" }}
            className="
              mx-auto w-fit cursor-default
              bg-[linear-gradient(100deg,#3b5147,#65796f_35%,#aebdb5_48%,#d8e0dc_52%,#9cafa5_58%,#52675d_70%,#3b5147)]
              bg-[length:240%_100%] bg-left bg-clip-text
              text-[37px] leading-none tracking-[-2.5px] text-transparent
              transition-[background-position] duration-700 hover:bg-right
            "
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