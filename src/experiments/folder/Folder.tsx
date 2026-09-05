export default function Folder() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#ededf0]">
      <div className="relative h-[232px] w-[286px]">
        <div className="absolute left-[54px] top-[40px] h-[110px] w-[181px] rounded-[13px] bg-[#202022] shadow-[0_5px_10px_#0005]" />

        <div className="absolute left-[82px] top-[43px] h-[110px] w-[92px] -rotate-[8deg] rounded-[6px] bg-[#f5f5f5] shadow-sm">
          <i className="absolute left-5 top-6 h-[5px] w-12 rounded-full bg-black/[.07]" />
          <i className="absolute left-5 top-11 h-[5px] w-14 rounded-full bg-black/[.07]" />
          <i className="absolute left-5 top-16 h-[5px] w-10 rounded-full bg-black/[.06]" />
        </div>

        <div className="absolute left-[126px] top-[48px] h-[104px] w-[67px] rounded-[5px] bg-[#eeeeef]">
          <i className="absolute left-4 top-6 h-[5px] w-8 rounded-full bg-black/[.07]" />
          <i className="absolute left-4 top-11 h-[5px] w-7 rounded-full bg-black/[.06]" />
        </div>

        <div className="absolute left-[170px] top-[59px] h-[89px] w-[50px] rotate-[6deg] rounded-[5px] bg-[#e9e9ea]">
          <i className="absolute left-3 top-5 h-[5px] w-6 rounded-full bg-black/[.07]" />
          <i className="absolute left-3 top-10 h-[5px] w-5 rounded-full bg-black/[.06]" />
        </div>

        <svg viewBox="0 0 210 130" className="absolute left-[40px] top-[68px] h-[130px] w-[210px] drop-shadow-[0_8px_8px_#0005]">
          <defs>
            <linearGradient id="front" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#a6a6a8" stopOpacity=".73" />
              <stop offset=".42" stopColor="#7c7c7f" stopOpacity=".78" />
              <stop offset="1" stopColor="#242426" stopOpacity=".97" />
            </linearGradient>
            <filter id="soft"><feGaussianBlur stdDeviation="4"/></filter>
          </defs>

          <path d="M14 9Q14 2 24 2H96Q113 2 125 9L139 18Q147 23 160 23H190Q201 23 201 35V108Q201 121 188 121H25Q12 121 12 108V18Q12 9 14 9Z"
            fill="url(#front)" stroke="#fff" strokeOpacity=".08" />

          <path d="M22 11H96Q111 11 123 18L137 26Q147 31 159 31H190"
            fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="2" />
        </svg>

        <div className="absolute left-[67px] top-[88px] h-[64px] w-[148px] rounded-[28px] bg-white/[.12] blur-[12px]" />
        <div className="absolute left-[46px] top-[82px] h-[99px] w-[25px] bg-black/40 blur-[10px]" />
        <div className="absolute right-[43px] top-[84px] h-[98px] w-[25px] bg-black/40 blur-[10px]" />
        <div className="absolute bottom-[31px] left-[62px] h-[25px] w-[165px] rounded-full bg-black/45 blur-[10px]" />
      </div>
    </div>
  );
}