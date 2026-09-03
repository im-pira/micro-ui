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
            brand: "visa",
            metal:
                "bg-[linear-gradient(135deg,#9f7618_0%,#c79f36_22%,#8d6513_48%,#d5b754_72%,#76510d_100%)]",
        },
        {
            top: "top-[83px]",
            type: "card-red",
            z: "z-20",
            brand: "mastercard",
            metal:
                "bg-[linear-gradient(135deg,#5d0712_0%,#861522_22%,#4c0710_48%,#9e2432_72%,#3b050b_100%)]",
        },
    ];

    const toggleCard = (i: number) => {
        setUsed((p) => p.map((v, j) => (j === i ? true : v)));
        setOpen((p) => p.map((v, j) => (j === i ? !v : v)));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#2f382f]">
            <div className="relative h-[285px] w-[320px] rounded-[34px] bg-[#07120f]
shadow-[0_24px_38px_rgba(0,0,0,.42),0_10px_18px_rgba(0,0,0,.22),inset_0_0_0_3px_rgba(0,0,0,.72),inset_0_0_0_7px_rgba(24,43,35,.55),inset_12px_0_18px_rgba(0,0,0,.22),inset_-12px_0_18px_rgba(0,0,0,.22),inset_0_-16px_24px_rgba(0,0,0,.44)]">
                {/* BACK LEATHER */}
                <div className="pointer-events-none absolute inset-[6px] overflow-hidden rounded-[29px]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(13,30,25,.91),rgba(13,30,25,.94)),url('/wallet-holder/leather.png')] bg-cover bg-center" />

                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_22%,rgba(255,255,255,.05)_0%,rgba(255,255,255,.018)_36%,transparent_68%)]" />

                    <div className="absolute inset-0 shadow-[inset_0_18px_24px_rgba(255,255,255,.025),inset_0_-24px_30px_rgba(0,0,0,.48),inset_18px_0_24px_rgba(0,0,0,.30),inset_-18px_0_24px_rgba(0,0,0,.30)]" />

                    <div className="absolute inset-[6px] rounded-[23px] shadow-[inset_0_0_18px_rgba(0,0,0,.34),inset_0_-12px_18px_rgba(0,0,0,.28)]" />
                </div>

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
              ${open[i]
                                ? "card-out"
                                : used[i]
                                    ? "card-in"
                                    : `${card.z} -translate-x-1/2`
                            }`}
                    >
                        {/* metal shine */}
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,.025)_30%,rgba(255,255,255,.11)_46%,rgba(255,255,255,.025)_58%,transparent_74%)]" />

                        <div className="pointer-events-none absolute inset-[1px] rounded-[12px] border border-white/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,.15)]" />

                        {/* chip */}
                        <div className="pointer-events-none absolute left-5 top-5 h-8 w-10 rounded-md border border-black/20 bg-[linear-gradient(135deg,#d9bf69,#9f7b28,#ead58a)] shadow-[inset_0_1px_1px_rgba(255,255,255,.35)]">
                            <div className="absolute left-1/2 top-0 h-full border-l border-black/20" />
                            <div className="absolute left-0 top-1/2 w-full border-t border-black/20" />
                        </div>

                        {/* contactless */}
                        <div className="pointer-events-none absolute left-[72px] top-[24px] flex gap-[2px]">
                            <span className="h-4 w-2 rounded-r-full border-r border-white/45" />
                            <span className="h-5 w-2 rounded-r-full border-r border-white/35" />
                            <span className="h-6 w-2 rounded-r-full border-r border-white/25" />
                        </div>

                        {card.brand === "visa" ? (
                            <>
                                <div className="pointer-events-none absolute right-5 top-4 text-[25px] font-black italic tracking-[-2px] text-[#f3ead0]">
                                    VISA
                                </div>

                                <div className="pointer-events-none absolute bottom-5 left-5 text-left text-[#f2ead7]/75">
                                    <p className="text-[9px] tracking-[2px]">SIGNATURE</p>
                                    <p className="mt-2 text-[13px] tracking-[2.5px]">
                                        4532&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;8921
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="pointer-events-none absolute right-5 top-5 flex items-center">
                                    <span className="h-7 w-7 rounded-full bg-[#eb001b]/85" />
                                    <span className="-ml-3 h-7 w-7 rounded-full bg-[#f79e1b]/75" />
                                </div>

                                <div className="pointer-events-none absolute bottom-5 left-5 text-left text-white/70">
                                    <p className="text-[9px] tracking-[2px]">WORLD ELITE</p>
                                    <p className="mt-2 text-[13px] tracking-[2.5px]">
                                        5412&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;7318
                                    </p>
                                </div>
                            </>
                        )}

                        <div className="pointer-events-none absolute inset-x-5 top-[2px] h-px bg-white/20" />
                    </button>
                ))}

                {/* UPPER POCKET */}
                <div className="pointer-events-none absolute left-[7px] right-[7px] top-[73px] z-[15] h-[52px] overflow-hidden rounded-t-[8px]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(14,34,27,.89),rgba(13,31,25,.94)),url('/wallet-holder/leather.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,255,255,.055)_0%,rgba(255,255,255,.02)_36%,transparent_70%)]" />
                    <div className="absolute inset-x-0 top-0 h-[14px] bg-gradient-to-b from-black/34 to-transparent" />
                    <div className="absolute inset-[3px] rounded-t-[6px] shadow-[inset_0_2px_1px_rgba(255,255,255,.035),inset_0_-9px_13px_rgba(0,0,0,.32),inset_7px_0_10px_rgba(0,0,0,.14),inset_-7px_0_10px_rgba(0,0,0,.14)]" />
                    <div className="absolute inset-x-[8px] top-[8px] h-[12px] rounded-t-[4px] border-t border-dashed border-[#75867b]/22" />
                </div>

                {/* MAIN FRONT POCKET */}
                <div className="pointer-events-none absolute bottom-[7px] left-[7px] right-[7px] z-30 h-[158px] overflow-hidden rounded-t-[8px] rounded-b-[26px] shadow-[0_16px_28px_rgba(0,0,0,.48),inset_0_12px_18px_rgba(255,255,255,.035),inset_0_-30px_36px_rgba(0,0,0,.72)]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(14,34,27,.89),rgba(13,31,25,.94)),url('/wallet-holder/leather.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,255,255,.055)_0%,rgba(255,255,255,.02)_36%,transparent_70%)]" />
                    <div className="absolute inset-x-0 top-0 h-[14px] bg-gradient-to-b from-black/34 to-transparent" />
                    <div className="absolute inset-[3px] rounded-t-[6px] rounded-b-[23px] shadow-[inset_0_2px_1px_rgba(255,255,255,.04),inset_0_-12px_16px_rgba(0,0,0,.38)]" />
                    <div className="absolute inset-[8px] rounded-t-[4px] rounded-b-[19px] border border-dashed border-[#75867b]/22" />
                </div>

                {/* AMOUNT */}
                <div className="absolute inset-x-0 top-[183px] z-40 text-center">
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