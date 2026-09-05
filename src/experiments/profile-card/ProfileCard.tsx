export default function ProfileCard() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#101010]">
            <div className="rounded-[37px] p-[0.7px] bg-[linear-gradient(135deg,rgba(255,255,255,.22),rgba(120,120,120,.08)_35%,rgba(255,255,255,.12)_60%,rgba(70,70,70,.08)_100%)]">
                <div className="w-[360px] rounded-[36px] bg-[linear-gradient(180deg,#070707_0%,#000_55%,#050505_100%)] p-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_18px_35px_rgba(0,0,0,0.35),0_45px_90px_-28px_rgba(0,0,0,0.75)]">
                    
                    <div className="relative rounded-[28px] p-[1px] overflow-hidden bg-white/10">
                        <div className="absolute inset-[-100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_305deg,#666_325deg,#f3f3f3_338deg,#8a8a8a_350deg,transparent_360deg)]" />

                        <div className="relative overflow-hidden rounded-[27px]">
                            <img
                                src="/profile-card/iron.png"
                                alt="profile"
                                className="h-[360px] w-full object-cover"
                            />

                            <div className="absolute top-2.5 left-1/2 z-20 h-[20px] w-[120px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#111,#050505_55%,#000)] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,.06),inset_0_-2px_4px_rgba(0,0,0,.9),0_5px_14px_rgba(0,0,0,.45)]" />

                            <div className="pointer-events-none absolute left-[3px] right-[3px] bottom-[3px] h-[52px] rounded-b-[24px] backdrop-blur-[4px] [mask-image:linear-gradient(to_top,black_0%,transparent_100%)]" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-2 pt-4 pb-1">
                        <div className="flex items-center gap-2.5">
                            <div className="relative h-10 w-10">
                                <div className="absolute inset-0 overflow-hidden rounded-full">
                                    <div className="absolute inset-[-80%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#333,#666,#d8d8d8,#666,#333)]" />
                                </div>

                                <img
                                    src="/profile-card/iron.png"
                                    alt="avatar"
                                    className="absolute inset-[0.5px] h-[39px] w-[39px] rounded-full object-cover"
                                />

                                <span className="absolute right-0 bottom-0 h-[10px] w-[10px] rounded-full border-[0.5px] border-black bg-[#35dc78]" />
                            </div>

                            <div className="leading-tight">
                                <p className="text-[13px] font-normal tracking-[0.01em] text-white/80">
                                    @drake
                                </p>
                                <p className="mt-1 text-[11px] text-white/35">
                                    2m ago
                                </p>
                            </div>
                        </div>

                        <button className="group relative h-10 min-w-[140px] overflow-hidden rounded-[14px] border border-white/[0.045] bg-[linear-gradient(180deg,#111_0%,#090909_55%,#050505_100%)] px-5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-[1px] hover:border-white/10 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_12px_22px_rgba(0,0,0,0.55)] active:translate-y-0">
                            <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/25" />
                            <span className="absolute -left-12 top-0 h-full w-10 skew-x-[-20deg] bg-white/[0.06] blur-[1px] transition-all duration-700 group-hover:left-[115%]" />
                            <span className="absolute right-3 top-3 h-[3px] w-[3px] rounded-full bg-white/20 group-hover:bg-white/40" />
                            Add member
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}