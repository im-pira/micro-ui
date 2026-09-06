export default function Shapes() {
  const label = "mt-4 text-sm font-medium text-neutral-600"

  return (
    <div className="min-h-screen bg-[#e8e8e8] p-6">
      <div className="grid min-h-[calc(100vh-3rem)] grid-cols-5 place-content-center place-items-center gap-x-16 gap-y-20">

        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-2xl bg-[#e8e8e8] shadow-[-10px_-10px_20px_#fff,10px_10px_20px_#c5c5c5]" />
          <p className={label}>Raised Neumorphism</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-[28px] bg-gradient-to-tr from-white via-[#eeeeee] to-[#c9c9c9] shadow-[-10px_14px_12px_rgba(0,0,0,.28),_8px_12px_10px_rgba(0,0,0,.18),_inset_2px_2px_3px_white]" />
          <p className={label}>Extruded Neumorphism</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-2xl bg-[#f5f5f5] shadow-[7px_9px_12px_rgba(0,0,0,0.22)]" />
          <p className={label}>Drop Shadow</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-2xl border border-white/70 bg-[#f1f1f1] shadow-[inset_5px_5px_8px_#fff,inset_-5px_-5px_8px_#cfcfcf,7px_9px_12px_rgba(0,0,0,.18)]" />
          <p className={label}>Bevel & Emboss</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-2xl bg-[#f5f4f1] bg-[url('/shapes/paper-texture.png')] bg-cover shadow-[6px_8px_14px_rgba(0,0,0,.14)]" />
          <p className={label}>Texture Overlay</p>
        </div>

        {/* Satin Effect */}
        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-2xl bg-[linear-gradient(155deg,#fafafa_0%,#e3e3e3_24%,#ffffff_40%,#cfcfcf_54%,#f8f8f8_70%,#dedede_100%)] shadow-[0_16px_28px_rgba(0,0,0,.18),inset_3px_3px_5px_rgba(255,255,255,.95),inset_-3px_-3px_6px_rgba(120,120,120,.18)]" />
          <p className={label}>Satin Effect</p>
        </div>

        {/* Frosted plastic */}
        <div className="flex flex-col items-center">
        <div className="h-40 w-40 rounded-2xl border border-white/30 bg-white/5 backdrop-blur-xl shadow-xl" />
          <p className={label}>Frosted Plastic</p>
        </div>

        {/* Frosted Glass */}
        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-2xl bg-[linear-gradient(90deg,#f1f1f1_0%,#dedede_45%,#c8cdd2_100%)] shadow-[0_10px_22px_rgba(0,0,0,.12),inset_1px_1px_2px_rgba(255,255,255,.7)]" />
          <p className={label}>Frosted Glass</p>
        </div>

        {/* Pearlescent Ceramic */}
        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-2xl bg-[radial-gradient(circle_at_28%_22%,#ffffff_0%,#f8f8fb_28%,#e7e9ee_52%,#fdfdfd_72%,#dfe2e7_100%)] shadow-[0_18px_30px_rgba(0,0,0,.17),inset_3px_3px_6px_rgba(255,255,255,.95),inset_-3px_-3px_6px_rgba(120,130,145,.16)]" />
          <p className={label}>Pearlescent Ceramic</p>
        </div>

        {/* Brushed Metallic */}
        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-[28px] border-[3px] border-[#aeb3b8] bg-[linear-gradient(180deg,#c8ccd0_0%,#f7f8f9_32%,#ffffff_48%,#d7dadd_68%,#b8bdc2_100%)] shadow-[0_14px_24px_rgba(0,0,0,.22),inset_0_3px_6px_rgba(255,255,255,.8),inset_0_-4px_8px_rgba(70,80,90,.16)]" />
          <p className={label}>Brushed Metallic</p>
        </div>
      </div>
    </div>
  )
}