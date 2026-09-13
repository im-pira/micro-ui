export default function FeatureCard() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,#f7f4ef_0%,#eee9e1_55%,#e5dfd6_100%)]">
      <div className="absolute h-[390px] w-[260px] rounded-full bg-black/10 blur-[70px]" />

      <div className="group relative h-[455px] w-[300px] overflow-hidden rounded-[28px] bg-black p-2.5 ring-1 ring-black/10 shadow-[0_50px_120px_rgba(0,0,0,0.35),0_25px_60px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_65px_150px_rgba(0,0,0,0.42),0_30px_75px_rgba(0,0,0,0.26),0_10px_25px_rgba(0,0,0,0.18)]">
        <div className="h-[275px] overflow-hidden rounded-[21px] bg-zinc-100">
          <img
            src="/feature-card/man.png"
            alt="Fashion model"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-col items-center px-5 pt-4 text-center">
          <h2 className="text-[15px] font-medium tracking-tight text-white">
            Redefine Your Look
          </h2>

          <p className="mt-2 max-w-[240px] text-[9px] leading-[1.5] text-zinc-400">
            A sleek, modern trench coat that blends bold elegance with timeless
            sophistication for any occasion.
          </p>

          <button className="group/btn mt-4 flex h-[36px] items-center gap-3 rounded-full border border-zinc-700 bg-zinc-900 pl-4 pr-1 text-[9px] text-zinc-300 transition-all duration-300 hover:bg-zinc-800 hover:text-white">
            Know more

            <span className="flex size-7 items-center justify-center rounded-full bg-white text-sm text-black transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-rotate-45">
              ↗
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}