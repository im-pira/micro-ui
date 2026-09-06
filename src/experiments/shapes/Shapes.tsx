export default function Shapes() {
  return (
    <div className="min-h-screen bg-[#e8e8e8] p-6">
      <div className="grid min-h-[calc(100vh-3rem)] grid-cols-5 grid-rows-3 place-items-center">

        {/* Raised neumorphism */}
        <div className="h-40 w-40 rounded-2xl bg-[#e8e8e8] shadow-[-10px_-10px_20px_#fff,10px_10px_20px_#c5c5c5]" />

        
        {/* Extruded neumorphism */}
        <div className="h-40 w-40 rounded-[28px] bg-gradient-to-tr from-white via-[#eeeeee] to-[#c9c9c9] shadow-[-10px_14px_12px_rgba(0,0,0,.28),_8px_12px_10px_rgba(0,0,0,.18),_inset_2px_2px_3px_white]" />

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
        <div className="h-40 w-40 rounded-2xl bg-white" />
        <div className="h-40 w-40 rounded-2xl bg-white" />

      </div>
    </div>
  )
}