export default function CameraControlPanel() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eeeeee]">
      <div className="relative h-[250px] w-[620px]">
        {/* dark left/back shadow */}
        <div className="absolute -left-[24px] top-[20px] h-[205px] w-[150px] rounded-[70px] bg-black/40 blur-[28px]" />

        {/* soft bottom shadow */}
        <div className="absolute bottom-[-24px] left-[30px] h-[55px] w-[540px] rounded-full bg-black/20 blur-[30px]" />

        {/* subtle overall back shadow */}
        <div className="absolute inset-[8px] rounded-[55px] bg-black/15 blur-[18px]" />

        {/* main body */}
        <div className="relative h-full w-full overflow-hidden rounded-t-[16px] rounded-b-[64px] bg-[#080808]">
          <svg
            viewBox="0 0 620 250"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c7c7c7" />
                <stop offset="55%" stopColor="#b9b9b9" />
                <stop offset="100%" stopColor="#adadad" />
              </linearGradient>
            </defs>

            <path
              d="
                M -20 58
                H 388
                C 438 58 462 75 476 108
                L 515 270
                H -20
                Z
              "
              fill="url(#metal)"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}