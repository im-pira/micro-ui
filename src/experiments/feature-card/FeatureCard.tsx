export default function FeatureCard() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,#f7f4ef_0%,#eee9e1_55%,#e5dfd6_100%)]">
      <div className="absolute h-[390px] w-[260px] rounded-full bg-black/10 blur-[70px]" />

      <div className="group relative h-[455px] w-[300px] overflow-hidden rounded-[28px] bg-black p-2.5 shadow-[0_50px_120px_rgba(0,0,0,0.34),0_20px_50px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_65px_145px_rgba(0,0,0,0.4),0_28px_70px_rgba(0,0,0,0.22)]">
        <div className="relative h-[275px] overflow-hidden rounded-[21px] bg-black">
          <img
            src="/feature-card/man.png"
            alt="Fashion model"
            className="block h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />

          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[7px] tracking-[0.18em] text-white/70 backdrop-blur-md">
            01 / 04
          </div>
        </div>

        <div className="mx-auto mt-3 h-px w-[82%] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center px-5 pt-3 text-center">
          <div className="mb-1.5 flex items-center gap-1.5 text-[7px] tracking-[0.2em] text-zinc-500">
            <span className="size-1 rounded-full bg-orange-500/90" />
            NEW COLLECTION
          </div>

          <h2 className="text-[15px] font-medium tracking-[-0.01em] text-white">
            Redefine Your Look
          </h2>

          <p className="mt-2 max-w-[230px] text-[9px] leading-[1.55] text-zinc-400">
            A modern silhouette with bold character and timeless appeal.
          </p>

          <button className="group/btn mt-4 flex h-[36px] items-center gap-3 rounded-full border border-white/10 bg-zinc-900/90 pl-4 pr-1 text-[9px] text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-zinc-800 hover:text-white">
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