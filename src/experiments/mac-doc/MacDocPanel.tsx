type MacDocPanelProps = {
  magnification: number;
  setMagnification: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
};

export default function MacDocPanel({ magnification, setMagnification, size, setSize }: MacDocPanelProps) {
  return (
    <div className="w-[320px] rounded-[16px] border border-white/[0.06] bg-[#121212]/95 px-6 py-5 shadow-[0_14px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="text-[12px] font-medium tracking-wide text-white/75">Dock Controls</div>
          <div className="mt-1 text-[9px] font-light tracking-wide text-white/25">Adjust interaction and scale</div>
        </div>
        <span className="mt-[2px] h-2 w-2 rounded-full bg-white/20 shadow-[0_0_4px_rgba(255,255,255,0.08)]" />
      </div>

      <div className="mb-5 h-px bg-white/[0.05]" />

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-light text-white/60">Magnification</span><span className="text-[9px] tabular-nums text-white/25">{magnification.toFixed(2)}</span></div>
        <input type="range" min="0" max="0.8" step="0.01" value={magnification} onChange={(e) => setMagnification(Number(e.target.value))} className="dock-slider" />
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-light text-white/60">Dock Size</span><span className="text-[9px] tabular-nums text-white/25">{size.toFixed(2)}x</span></div>
        <input type="range" min="1" max="2.4" step="0.01" value={size} onChange={(e) => setSize(Number(e.target.value))} className="dock-slider" />
      </div>

      <div className="flex items-center justify-between rounded-[8px] border border-white/[0.04] bg-white/[0.02] px-3 py-2">
        <span className="text-[9px] font-light tracking-wide text-white/35">Live preview</span>
        <span className="flex items-center gap-1.5 text-[8px] text-white/30"><span className="h-[3px] w-[3px] rounded-full bg-emerald-400/60" />Active</span>
      </div>

      <style>{`
        .dock-slider{appearance:none;width:100%;height:2px;border-radius:999px;background:#252525;outline:none;cursor:pointer}
        .dock-slider::-webkit-slider-runnable-track{height:2px;border-radius:999px;background:#252525}
        .dock-slider::-webkit-slider-thumb{appearance:none;width:10px;height:10px;margin-top:-4px;border-radius:50%;background:#222;border:1px solid rgba(255,255,255,.16);box-shadow:none}
        .dock-slider::-moz-range-track{height:2px;border-radius:999px;background:#252525}
        .dock-slider::-moz-range-thumb{width:10px;height:10px;border-radius:50%;background:#222;border:1px solid rgba(255,255,255,.16);box-shadow:none}
      `}</style>
    </div>
  );
}