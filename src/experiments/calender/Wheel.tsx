import { useEffect, useRef, useState } from "react";

type Props = {
    items: (string | number)[];
    value: number;
    setValue: (v: number) => void;
};

export default function Wheel({ items, value, setValue }: Props) {
    const [open, setOpen] = useState(false), [temp, setTemp] = useState(value);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        setTemp(value);
        setTimeout(() => ref.current?.scrollTo({ top: value * 36, behavior: "instant" }), 0);
    }, [open, value]);

    const scroll = () => {
        if (!ref.current) return;
        const i = Math.round(ref.current.scrollTop / 36);
        if (i >= 0 && i < items.length) setTemp(i);
    };

    return (
        <div className="relative z-50">
            <button type="button" onClick={() => setOpen(v => !v)} className="bg-transparent px-3 py-1 text-[13px] font-medium tracking-wide text-white/80">
                {items[value]}
            </button>

            {open && (
                <div className="absolute left-1/2 top-9 z-[999] w-20 -translate-x-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#111] shadow-[8px_10px_18px_rgba(0,0,0,.7)]">
                    <div className="pointer-events-none absolute left-1 right-1 top-[42px] z-10 h-9 rounded-md border-y border-white/10 bg-white/[.06]" />

                    <div ref={ref} onScroll={scroll} className="h-[120px] snap-y snap-mandatory overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="h-[42px]" />

                        {items.map((item, i) => (
                            <button
                                type="button"
                                key={item}
                                onClick={() => { setValue(i); setOpen(false) }}
                                className={`relative z-20 block h-9 w-full snap-center text-sm ${i === temp ? "text-white" : "text-white/30"}`}
                            >
                                {item}
                            </button>
                        ))}

                        <div className="h-[42px]" />
                    </div>
                </div>
            )}
        </div>
    );
}