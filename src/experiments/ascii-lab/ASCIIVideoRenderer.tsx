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
        const buffer = document.createElement("canvas");
        const bufferCtx = buffer.getContext("2d");
        if (!ctx || !bufferCtx) return;

        const video = document.createElement("video");

        video.src = src;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";

        let frameId = 0;
        let cycleTimer = 0;
        let fadeTimer = 0;
        let whiteTimer = 0;

        let width = 0;
        let height = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            width = rect.width;
            height = rect.height;

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const observer = new ResizeObserver(resize);
        observer.observe(canvas);

        const draw = () => {
            frameId = requestAnimationFrame(draw);

            if (video.readyState < 2 || !width || !height) return;

            ctx.clearRect(0, 0, width, height);

            bufferCtx.drawImage(video, 0, 0);

            const pixels = bufferCtx.getImageData(
                0,
                0,
                buffer.width,
                buffer.height
            );

            const objectW = width * 0.92;
            const objectH =
                objectW * (video.videoHeight / video.videoWidth);

            const offsetX = (width - objectW) / 2;
            const offsetY = (height - objectH) / 2;

            ctx.font = `${cellSize}px monospace`;
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            for (let y = 0; y < objectH; y += cellSize) {
                for (let x = 0; x < objectW; x += cellSize) {
                    const sx = Math.min(
                        buffer.width - 1,
                        Math.floor((x / objectW) * buffer.width)
                    );

                    const sy = Math.min(
                        buffer.height - 1,
                        Math.floor((y / objectH) * buffer.height)
                    );

                    const i = (sy * buffer.width + sx) * 4;

                    const brightness =
                        pixels.data[i] * 0.299 +
                        pixels.data[i + 1] * 0.587 +
                        pixels.data[i + 2] * 0.114;

                    if (brightness < threshold) continue;

                    const value =
                        (brightness - threshold) / (255 - threshold);

                    const char =
                        chars[
                            Math.min(
                                chars.length - 1,
                                Math.floor(value * chars.length)
                            )
                        ];

                    ctx.globalAlpha = 0.2 + value * 0.7;
                    ctx.fillText(char, offsetX + x, offsetY + y);
                }
            }

            ctx.globalAlpha = 1;
        };

        const runCycle = () => {
            // fish/smoke moving normally
            fadeTimer = window.setTimeout(() => {
                overlay.style.transition = "opacity 2.5s ease-in-out";
                overlay.style.opacity = "1";
            }, 3500);

            // fully faded
            cycleTimer = window.setTimeout(() => {
                video.pause();

                // pure white for 2 seconds
                whiteTimer = window.setTimeout(() => {
                    video.currentTime = 0;
                    video.play().catch(() => {});

                    // let first frames decode behind white
                    window.setTimeout(() => {
                        overlay.style.transition = "opacity 700ms ease-out";
                        overlay.style.opacity = "0";

                        window.setTimeout(runCycle, 700);
                    }, 300);
                }, 2000);
            }, 6000);
        };

        const start = async () => {
            buffer.width = video.videoWidth;
            buffer.height = video.videoHeight;

            resize();
            draw();

            // start hidden so first decoded frames never jerk on screen
            overlay.style.opacity = "1";

            await video.play().catch(() => {});

            // warm up video before revealing it
            window.setTimeout(() => {
                overlay.style.transition = "opacity 700ms ease-out";
                overlay.style.opacity = "0";

                window.setTimeout(runCycle, 700);
            }, 350);
        };

        video.addEventListener("loadeddata", start, { once: true });

        return () => {
            cancelAnimationFrame(frameId);

            clearTimeout(fadeTimer);
            clearTimeout(cycleTimer);
            clearTimeout(whiteTimer);

            observer.disconnect();
            video.pause();
        };
    }, [src, chars, color, cellSize, threshold]);

    return (
        <div className="relative h-full w-full overflow-hidden">
            <canvas ref={canvasRef} className="block h-full w-full" />

            <div
                ref={fadeRef}
                className="pointer-events-none absolute inset-0 bg-white opacity-100"
            />
        </div>
    );
}