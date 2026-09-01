import { useId, useState } from "react";

export default function LoveToggle() {
  const [active, setActive] = useState(true);
  const id = useId().replace(/:/g, "");

  const heartPath =
  "M-0.03 65.66C0.41 73.37 2.16 81.35 5.33 88.25C8.51 95.15 13.63 101.45 19.02 107.06C24.42 112.67 31.27 117.43 37.70 121.89C44.12 126.35 50.79 130.22 57.56 133.83C64.34 137.44 71.17 140.92 78.34 143.58C85.51 146.24 93 149.34 100.58 149.80C108.15 150.26 116.39 148.37 123.79 146.32C131.19 144.28 138.06 140.84 144.96 137.52C151.85 134.19 158.59 130.50 165.15 126.35C171.70 122.21 178.41 117.90 184.28 112.65C190.15 107.41 196.30 101.42 200.38 94.90C204.46 88.38 207.37 81.09 208.78 73.56C210.19 66.02 210.29 57.22 208.85 49.71C207.41 42.20 204.33 34.92 200.13 28.52C195.94 22.11 189.92 15.72 183.69 11.30C177.45 6.89 170.15 3.72 162.74 2.01C155.33 0.31 146.77 -0.02 139.23 1.06C131.68 2.14 123.96 4.84 117.42 8.13C112.14 10.78 108.01 13.31 105 14.55C101.99 13.31 97.86 10.78 92.58 8.13C86.04 4.84 78.32 2.14 70.77 1.06C63.23 -0.02 54.67 0.31 47.26 2.01C39.85 3.72 32.55 6.89 26.31 11.30C20.08 15.72 14.06 22.11 9.87 28.52C5.67 34.92 2.59 42.20 1.15 49.71C-0.29 57.22 -0.19 66.02 -0.03 65.66Z";

  return (
    <main className="page">
      <button
        type="button"
        className={`love-toggle ${active ? "active" : ""}`}
        onClick={() => setActive((prev) => !prev)}
        aria-label="Love toggle"
        aria-pressed={active}
      >
        <svg
          className="love-svg"
          viewBox="-2 -2 214 154"
          aria-hidden="true"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <linearGradient
              id={`heart-fill-${id}`}
              x1="25"
              y1="20"
              x2="180"
              y2="130"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ff7f9d" />
              <stop offset="100%" stopColor="#fa5d86" />
            </linearGradient>

            <radialGradient
              id={`heart-light-${id}`}
              cx="28%"
              cy="25%"
              r="80%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            <clipPath id={`heart-clip-${id}`}>
              <path d={heartPath} />
            </clipPath>
          </defs>

          <path
            className="heart-fill"
            d={heartPath}
            fill={`url(#heart-fill-${id})`}
          />

          <ellipse
            className="heart-light"
            cx="70"
            cy="58"
            rx="100"
            ry="85"
            fill={`url(#heart-light-${id})`}
            clipPath={`url(#heart-clip-${id})`}
          />

          <path className="heart-outline" d={heartPath} />
        </svg>

        <span className="knob" />
      </button>
    </main>
  );
}