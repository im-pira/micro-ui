export default function GlassFolder() {
    return (
        <div className="relative min-h-screen grid place-items-center overflow-hidden bg-[#08090a]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.06),transparent_32%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,#111214_0%,#090a0b_45%,#050505_100%)] opacity-90" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

            <div className="relative z-10">
                <svg viewBox="0 0 520 420" className="w-[520px] max-w-[92vw]">
                    <defs>
                        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#fff" />
                            <stop offset="18%" stopColor="#bdbdbd" />
                            <stop offset="38%" stopColor="#f5f5f5" />
                            <stop offset="58%" stopColor="#6f6f6f" />
                            <stop offset="78%" stopColor="#e7e7e7" />
                            <stop offset="100%" stopColor="#2a2a2a" />
                        </linearGradient>

                        <linearGradient id="front" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f7f7f7" />
                            <stop offset="38%" stopColor="#b9b9b9" />
                            <stop offset="70%" stopColor="#878787" />
                            <stop offset="88%" stopColor="#d6d6d6" />
                            <stop offset="100%" stopColor="#383838" />
                        </linearGradient>

                        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#fff" />
                            <stop offset="25%" stopColor="#777" />
                            <stop offset="50%" stopColor="#f7f7f7" />
                            <stop offset="75%" stopColor="#555" />
                            <stop offset="100%" stopColor="#ddd" />
                        </linearGradient>

                        <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
                            <feDropShadow dx="10" dy="18" stdDeviation="12" floodColor="#000" floodOpacity=".7" />
                        </filter>
                    </defs>

                    <g transform="translate(8 10) rotate(7 260 210)" filter="url(#shadow)">
                        {/* rear folder */}
                        <path
                            d="M132 70 Q140 40 164 38
               L278 49 Q292 50 300 66
               L321 104 Q326 114 340 118
               L434 142 Q456 148 454 171
               L442 296 Q440 315 420 316
               L120 282 Q98 279 100 257 Z"
                            fill="url(#metal)"
                            stroke="#2b2b2b"
                            strokeWidth="7"
                            strokeLinejoin="round"
                        />

                        {/* rear top chrome rim */}
                        <path
                            d="M132 70 Q140 40 164 38
               L278 49 Q292 50 300 66
               L321 104 Q326 114 340 118
               L434 142"
                            fill="none"
                            stroke="url(#rim)"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* deep gap */}
                        <path
                            d="M101 162 Q108 137 136 139
               L272 154 Q286 156 299 150
               L318 142 Q329 138 342 142
               L432 164 Q453 169 450 193
               L431 329 L107 293 Z"
                            fill="#050505"
                        />

                        {/* front panel */}
                        <path
                            d="M86 157 Q93 132 119 134
               L270 151 Q286 153 301 146
               L319 139 Q329 135 341 139
               L426 158 Q448 163 445 189
               L428 322 Q424 347 400 344
               L102 311 Q78 308 80 283 Z"
                            fill="url(#front)"
                            stroke="#404040"
                            strokeWidth="7"
                            strokeLinejoin="round"
                        />

                        {/* top front highlight */}
                        <path
                            d="M94 162 Q101 142 124 144
               L270 160 Q288 162 304 154
               L319 148 Q329 144 341 148
               L417 165"
                            fill="none"
                            stroke="#fff"
                            strokeOpacity=".72"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* bottom chrome glow */}
                        <path
                            d="M91 276 Q245 305 425 305"
                            fill="none"
                            stroke="#eee"
                            strokeOpacity=".35"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />

                        {/* right thick metal edge */}
                        <path
                            d="M426 158 Q450 164 447 190
               L429 323 Q427 341 408 344"
                            fill="none"
                            stroke="url(#rim)"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>
        </div>
    )
}