import { useEffect, useRef } from "react";

type Props = {
    src: string;
    chars?: string;
    color?: string;
    cellSize?: number;
    threshold?: number;
};

export default function ASCIIVideoRenderer({
    src,
    chars = "01",
    color = "#333",
    cellSize = 7,
    threshold = 55,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const overlay = fadeRef.current;

        if (!canvas || !overlay) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const video = document.createElement("video");
        const buffer = document.createElement("canvas");
        const bufferCtx = buffer.getContext("2d");

        if (!bufferCtx) return;

        video.src = src;
        video.muted = true;
        video.loop = false;
        video.playsInline = true;
        video.autoplay = true;

        let frameId = 0;
        let fadeTimeout = 0;
        let restartTimeout = 0;
        let whiteTimeout = 0;

        const draw = () => {
            frameId = requestAnimationFrame(draw);

            if (video.readyState < 2) return;

            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const w = rect.width;
            const h = rect.height;

            ctx.clearRect(0, 0, w, h);

            buffer.width = video.videoWidth;
            buffer.height = video.videoHeight;

            bufferCtx.drawImage(video, 0, 0);

            const pixels = bufferCtx.getImageData(
                0,
                0,
                buffer.width,
                buffer.height
            );

            const objectW = w * 0.92;
            const objectH =
                objectW * (video.videoHeight / video.videoWidth);

            const offsetX = (w - objectW) / 2;
            const offsetY = (h - objectH) / 2;

            ctx.font = `${cellSize}px monospace`;
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            for (let y = 0; y < objectH; y += cellSize) {
                for (let x = 0; x < objectW; x += cellSize) {
                    const sx = Math.floor(
                        (x / objectW) * buffer.width
                    );

                    const sy = Math.floor(
                        (y / objectH) * buffer.height
                    );

                    const i = (sy * buffer.width + sx) * 4;

                    const brightness =
                        pixels.data[i] * 0.299 +
                        pixels.data[i + 1] * 0.587 +
                        pixels.data[i + 2] * 0.114;

                    if (brightness < threshold) continue;

                    const value =
                        (brightness - threshold) /
                        (255 - threshold);

                    const char =
                        chars[
                        Math.min(
                            chars.length - 1,
                            Math.floor(value * chars.length)
                        )
                        ];

                    ctx.globalAlpha = 0.2 + value * 0.7;

                    ctx.fillText(
                        char,
                        offsetX + x,
                        offsetY + y
                    );
                }
            }

            ctx.globalAlpha = 1;
        };

        const runCycle = () => {
            overlay.style.transition = "none";
            overlay.style.opacity = "0";

            video.currentTime = 0;
            video.play().catch(() => { });

            // visible for 5s
            fadeTimeout = window.setTimeout(() => {
                overlay.style.transition =
                    "opacity 2.5s ease-in-out";
                overlay.style.opacity = "1";
            }, 3500);

            // after fade completes
            restartTimeout = window.setTimeout(() => {
                video.pause();

                // stay fully white for 2s
                whiteTimeout = window.setTimeout(() => {
                    video.currentTime = 0;
                    video.play().catch(() => { });

                    overlay.style.transition =
                        "opacity 1s ease-in-out";
                    overlay.style.opacity = "0";

                    // start next cycle after fade-in
                    window.setTimeout(runCycle, 1000);
                }, 1000);
            }, 6000);
        };

        const start = () => {
            draw();
            runCycle();
        };

        video.addEventListener("loadeddata", start, {
            once: true,
        });

        return () => {
            cancelAnimationFrame(frameId);

            clearTimeout(fadeTimeout);
            clearTimeout(restartTimeout);
            clearTimeout(whiteTimeout);

            video.pause();
        };
    }, [src, chars, color, cellSize, threshold]);

    return (
        <div className="relative h-full w-full overflow-hidden">
            <canvas
                ref={canvasRef}
                className="h-full w-full"
            />

            <div
                ref={fadeRef}
                className="pointer-events-none absolute inset-0 bg-white opacity-0"
            />
        </div>
    );
}