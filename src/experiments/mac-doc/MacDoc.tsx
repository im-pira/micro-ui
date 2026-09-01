import { useRef, useState } from "react";
import MacDocPanel from "./MacDocPanel";

export default function MacDoc() {
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frame = useRef<number | null>(null);
  const targetX = useRef<number | null>(null);

  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const [magnification, setMagnification] = useState(0.48);
  const [dockSize, setDockSize] = useState(1.7);

  const apps = [
    { name: "Chrome", icon: "/magnetic-button-icons/chrome.png", scale: "scale-[1.4]" },
    { name: "Music", icon: "/magnetic-button-icons/music.png", scale: "scale-[1.72]" },
    { name: "Cursor", icon: "/magnetic-button-icons/cursor.png", scale: "scale-[2.6]" },
    { name: "Docker", icon: "/magnetic-button-icons/docker.png", scale: "scale-[0.70]" },
    { name: "Youtube", icon: "/magnetic-button-icons/youtube.png", scale: "scale-[0.70]" },
    { name: "Twitch", icon: "/magnetic-button-icons/twitch.png", scale: "scale-[0.8]", bg: "h-[24px] w-[21px] rounded-[6px]" },
    { name: "Whatsapp", icon: "/magnetic-button-icons/whatsaap.png", scale: "scale-[1.20]", bg: "h-[22px] w-[22px] rounded-[7px]" },
    { name: "Phantom", icon: "/magnetic-button-icons/phantom.png", scale: "scale-[0.6]", bg: "h-[24px] w-[21px] rounded-[6px]" },
    { name: "Instagram", icon: "/magnetic-button-icons/instagram.png", scale: "scale-[0.9]", bg: "h-[24px] w-[21px] rounded-[6px]" },
    { name: "Insomnia", icon: "/magnetic-button-icons/insomnia.png", scale: "scale-[0.8]", bg: "h-[24px] w-[21px] rounded-[6px]" },
  ];

  const animate = () => {
    setMouseX((current) => {
      if (targetX.current === null) return null;
      if (current === null) return targetX.current;

      const next = current + (targetX.current - current) * 0.12;

      return Math.abs(next - targetX.current) < 0.1 ? targetX.current : next;
    });

    frame.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    targetX.current = e.clientX;

    if (!frame.current) frame.current = requestAnimationFrame(animate);
  };

  const resetDock = () => {
    targetX.current = null;
    setMouseX(null);
    setHovered(null);

    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  };

  const getMagnification = (index: number) => {
    if (mouseX === null) return 1;

    const icon = iconRefs.current[index];
    if (!icon) return 1;

    const rect = icon.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - center);

    const radius = 120;
    const influence = Math.max(0, 1 - distance / radius);
    const smooth = influence * influence * (3 - 2 * influence);

    return 1 + smooth * magnification;
  };

  return (
    <main className="relative h-screen overflow-hidden bg-[#0d0d0f]">
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2">
        <MacDocPanel
          magnification={magnification}
          setMagnification={setMagnification}
          size={dockSize}
          setSize={setDockSize}
        />
      </div>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetDock}
        style={{
          transform: `translateX(-50%) scale(${dockSize})`,
        }}
        className="absolute bottom-8 left-1/2 w-fit inline-flex origin-bottom items-center gap-1 rounded-[12px] border border-white/10 bg-gradient-to-b from-white/[0.14] via-white/[0.07] to-black/20 px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
      >
        <span className="pointer-events-none absolute inset-x-1 top-1 h-[32%] rounded-[9px] bg-gradient-to-b from-white/[0.10] to-transparent blur-[0.3px]" />

        {apps.map((app, index) => {
          const zoom = getMagnification(index);

          return (
            <button
              key={app.name}
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              aria-label={app.name}
              onMouseEnter={() => setHovered(index)}
              className="group relative z-10 flex h-5 w-8 shrink-0 origin-bottom items-center justify-center"
              style={{
                transform: `translateY(-${(zoom - 1) * 24}px) scale(${zoom})`,
                transition: "transform 100ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="relative flex items-center justify-center">
                {app.bg && (
                  <span className={`absolute bg-[#fff] ${app.bg}`} />
                )}

                <img
                  src={app.icon}
                  alt={app.name}
                  className={`relative z-10 h-10 w-10 max-w-none object-contain ${app.scale}`}
                />
              </div>

              <span
                className={`pointer-events-none absolute -top-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 whitespace-nowrap transition-all duration-150 ${hovered === index
                  ? "opacity-100 -translate-y-1"
                  : "opacity-0"
                  }`}
              >
                <span className="mt-2 text-[4px] font-light tracking-wide text-white/65">
                  {app.name}
                </span>

                <span className="h-[2px] w-[2px] rounded-full bg-white/55 shadow-[0_0_1px_rgba(255,255,255,0.25)]" />
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}