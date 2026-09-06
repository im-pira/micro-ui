export default function Shapes() {
  return (
    <div className="min-h-screen bg-[#e8e8e8] p-6">
      <div className="grid min-h-[calc(100vh-3rem)] grid-cols-5 grid-rows-3 place-items-center">

        {/* Raised neumorphism */}
        <div className="h-40 w-40 rounded-2xl bg-[#e8e8e8] shadow-[-10px_-10px_20px_#fff,10px_10px_20px_#c5c5c5]" />

        
        {/* Extruded neumorphism */}
        <div className="h-40 w-40 rounded-[28px] bg-gradient-to-tr from-white via-[#eeeeee] to-[#c9c9c9] shadow-[-10px_14px_12px_rgba(0,0,0,.28),_8px_12px_10px_rgba(0,0,0,.18),_inset_2px_2px_3px_white]" />

        {/* Drop shadow */}
        <div className="h-40 w-40 rounded-2xl bg-[#f5f5f5] shadow-[7px_9px_12px_rgba(0,0,0,0.22)]" />

        {/* Beveled / embossed neumorphism */}
        <div className="h-40 w-40 rounded-2xl bg-[#f1f1f1] shadow-[inset_5px_5px_8px_#fff,inset_-5px_-5px_8px_#cfcfcf,7px_9px_12px_rgba(0,0,0,.18)] border border-white/70" />

        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />

        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />

      </div>
    </div>
  )
}