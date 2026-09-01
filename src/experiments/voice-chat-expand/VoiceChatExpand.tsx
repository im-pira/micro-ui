import { useState } from "react";
import { AudioLines, X } from "lucide-react";

const users = [
    { name: "Afshin", image: "/voice-chat-expand/7-img.png", speed: "14s", reverse: true, bio: "Product designer, visual thinker, and quiet observer. Usually into late-night design talks, music, internet culture, and meeting interesting people." },
    { name: "Natko", image: "/voice-chat-expand/6-img.png", speaking: true, speed: "9s", reverse: true, bio: "Creative technologist with a love for sound, experiments, and weird ideas. Enjoys spontaneous conversations and building things just for fun." },
    { name: "Ana", image: "/voice-chat-expand/5-img.png", speed: "13s", reverse: false, bio: "Curious, expressive, and always collecting stories. Into art, travel, photography, and conversations that go somewhere unexpected." },
    { name: "Mariana", image: "/voice-chat-expand/3-img.png", speed: "16s", reverse: true, bio: "Soft-spoken creative with strong opinions about design, music, and culture. Prefers thoughtful conversations over small talk." },
    { name: "Nero", image: "/voice-chat-expand/4-img.png", speed: "10s", reverse: false, bio: "Minimalist, night owl, and professional overthinker. Interested in technology, visual culture, games, and quiet voice rooms." },
    { name: "Andrez", image: "/voice-chat-expand/2-img.png", speed: "15s", reverse: false, bio: "Easygoing, playful, and usually here for good energy. Loves memes, music, gaming, and conversations that start with nothing and go everywhere." },
    { name: "Oğuz", image: "/voice-chat-expand/1-img.png", speaking: true, speed: "11s", reverse: false, bio: "Creative mind with too many tabs open. Into design, internet culture, random ideas, deep talks, and making ordinary things feel more interesting." },
];

export default function VoiceChatExpand() {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<(typeof users)[number] | null>(null);

    return (
        <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
            <div className="relative">
                <button
                    onClick={() => setOpen(true)}
                    className={`relative flex items-center rounded-full border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.025)),#202020] p-2 pr-4 shadow-[0_14px_35px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100"}`}
                >
                    <span className="pointer-events-none absolute inset-x-8 top-[2px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#2a2a2a]">
                        <div className="flex items-center gap-[3px]">
                            {[10, 18, 26, 18, 10].map((h, i) => (
                                <span
                                    key={i}
                                    className="w-[3px] rounded-full bg-white"
                                    style={{
                                        height: h,
                                        animation: `voiceBar ${0.7 + i * 0.08}s ease-in-out ${i * 0.08}s infinite alternate`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-[3px]">
                        {users.slice(0, 4).map((user) => (
                            <div key={user.name} className="relative overflow-hidden rounded-full p-[0.5px]">
                                <div
                                    className="absolute inset-[-60%] bg-[conic-gradient(from_0deg,transparent_315deg,rgba(255,255,255,.09)_334deg,transparent_352deg)]"
                                    style={{
                                        animation: `spin ${user.speed} linear infinite`,
                                        animationDirection: user.reverse ? "reverse" : "normal",
                                    }}
                                />
                                <img src={user.image} alt={user.name} className="relative h-14 w-14 rounded-full object-cover" />
                            </div>
                        ))}
                    </div>

                    <svg viewBox="0 0 24 14" className="ml-3 h-3.5 w-6 fill-white">
                        <path d="M1 1.5C5.5 5.8 8.8 10.8 12 12.2C15.2 10.8 18.5 5.8 23 1.5C19.5 4.2 15.8 6 12 6C8.2 6 4.5 4.2 1 1.5Z" />
                    </svg>
                </button>

                <div
                    className={`absolute left-1/2 top-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] border border-white/[0.10] bg-[linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.012)_28%,rgba(255,255,255,.006)_100%),#121212] shadow-[0_35px_90px_rgba(0,0,0,.55),0_8px_24px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-[.96] opacity-0"}`}
                >
                    <div className="relative flex h-[64px] items-center justify-center border-b border-white/[0.07] bg-white/[0.015]">
                        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                        <h2 className="text-xl font-medium tracking-[-0.02em] text-white/90">Voice Chat</h2>
                        <button onClick={() => setOpen(false)} className="absolute right-5 text-white/35 transition hover:text-white/70">
                            <X size={21} />
                        </button>
                    </div>

                    <div className="relative px-6 pt-5 pb-5 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.025),transparent_42%)]">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-0">
                                {[25, 50, 75].map((left) => (
                                    <span
                                        key={left}
                                        className="absolute top-3 bottom-3 w-px -translate-x-1/2"
                                        style={{
                                            left: `${left}%`,
                                            background:
                                                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,.03) 12%, rgba(180,180,180,.12) 34%, rgba(255,255,255,.26) 50%, rgba(180,180,180,.12) 66%, rgba(255,255,255,.03) 88%, transparent 100%)",
                                            boxShadow: "0 0 6px rgba(255,255,255,.03)",
                                        }}
                                    />
                                ))}

                                <span
                                    className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2"
                                    style={{
                                        background:
                                            "linear-gradient(to right, transparent 0%, rgba(255,255,255,.03) 10%, rgba(180,180,180,.12) 30%, rgba(255,255,255,.26) 50%, rgba(180,180,180,.12) 70%, rgba(255,255,255,.03) 90%, transparent 100%)",
                                        boxShadow: "0 0 6px rgba(255,255,255,.03)",
                                    }}
                                />
                            </div>

                            <div className="relative z-10 grid grid-cols-4 grid-rows-2">
                                {users.map((user) => (
                                    <button
                                        key={user.name}
                                        onClick={() => setSelectedUser(user)}
                                        className="flex min-h-[112px] flex-col items-center justify-center px-3"
                                    >
                                        <div className="relative">
                                            <div className="relative overflow-hidden rounded-full p-[0.5px]">
                                                <div
                                                    className="absolute inset-[-60%] bg-[conic-gradient(from_0deg,transparent_315deg,rgba(255,255,255,.11)_334deg,transparent_352deg)]"
                                                    style={{
                                                        animation: `spin ${user.speed} linear infinite`,
                                                        animationDirection: user.reverse ? "reverse" : "normal",
                                                    }}
                                                />
                                                <img src={user.image} alt={user.name} className="relative h-[64px] w-[64px] rounded-full object-cover" />
                                            </div>

                                            {user.speaking && (
                                                <div className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,.35)]">
                                                    <AudioLines size={13} />
                                                </div>
                                            )}
                                        </div>

                                        <span
                                            className="mt-1 text-[14px] tracking-[0.01em] text-white/45"
                                            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400 }}
                                        >
                                            {user.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="relative z-10 mt-5 w-full rounded-[18px] border border-white/70 bg-[linear-gradient(180deg,#f7f7f7_0%,#e9e9e9_100%)] py-3.5 text-[15px] font-medium text-black shadow-[0_24px_50px_rgba(0,0,0,.5),0_10px_22px_rgba(0,0,0,.38),0_3px_8px_rgba(0,0,0,.24),inset_0_2px_0_rgba(255,255,255,1),inset_0_-2px_0_rgba(0,0,0,.08)] transition-all duration-200 hover:-translate-y-[1px]">
                            Join Now
                        </button>

                        <p className="relative z-10 mt-2.5 text-center text-[11px] font-light tracking-[0.01em] text-white/20">
                            Join muted. Speak when ready.
                        </p>
                    </div>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-md transition-all duration-300 ${selectedUser ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            >
                {selectedUser && (
                    <div className="relative w-[560px] rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01)),#101010]/90 p-8 shadow-[0_40px_120px_rgba(0,0,0,.7),inset_0_1px_0_rgba(255,255,255,.06)]">
                        <button onClick={() => setSelectedUser(null)} className="absolute right-6 top-6 text-white/35 hover:text-white/70">
                            <X size={22} />
                        </button>

                        <div className="flex items-center gap-5">
                            <img src={selectedUser.image} alt={selectedUser.name} className="h-24 w-24 rounded-full object-cover" />

                            <div>
                                <h3 className="text-[22px] font-semibold text-white">{selectedUser.name}</h3>
                                <div className="mt-1 flex items-center gap-1.5">
                                    <p className="text-[13px] text-white/55">
                                        {selectedUser.speaking ? "Speaking now" : "In the voice room"}
                                    </p>
                                    <span
                                        className={`h-1 w-1 rounded-full ${selectedUser.speaking ? "bg-green-400" : "bg-red-400/80"
                                            } animate-[pulse_1.8s_ease-in-out_infinite]`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-7 rounded-[20px] border border-white/10 bg-black/30 p-5 backdrop-blur-sm">
                            <p className="text-[13px] leading-6 text-white/70">{selectedUser.bio}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}