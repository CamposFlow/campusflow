import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const builders = [
    {
        name: "Ezichi Jenissi",
        role: "Full-Stack Developer",
        department: "Software Engineering",
        profileUrl: "https://jenissi.me",
        github: "https://github.com/jenissiezichi",
        twitter: "https://x.com/the_realjenissi",
        photo: "/builders/me.jpg",
    },
    {
        name: "Prayskey Ogbonna",
        role: "Full-Stack Developer",
        department: "Software Engineering",
        profileUrl: "https",
        github: "https://github.com/Prayskey",
        twitter: "https://x.com/prayskey01",
        photo: "/builders/2.jfif",
    },
    {
        name: "Lucky-Daniel Dunamis",
        role: "Front-End Developer",
        department: "Mechatronics Engineering",
        profileUrl: "https",
        github: "https://github.com/Lucky-Daniel-Dunamis",
        twitter: "https://x.com/lucans_codes",
        photo: "/builders/lucan.jpg",
    }
];

const getIndex = (i, len) => ((i % len) + len) % len;

const initials = (name) =>
    name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();


const FALLBACK_GRADIENTS = [
    "linear-gradient(150deg, #2563EB 0%, #0A1628 100%)",
    "linear-gradient(150deg, #0F6E56 0%, #0A1628 100%)",
    "linear-gradient(150deg, #534AB7 0%, #0A1628 100%)",
    "linear-gradient(150deg, #993C1D 0%, #0A1628 100%)",
];

const GithubIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
    </svg>
);

const XIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.83-5.97 6.83H1.65l7.73-8.84L1.24 2.25h6.83l4.72 6.24 5.45-6.24Zm-1.16 17.52h1.83L7.02 4.13H5.06l12.02 15.64Z" />
    </svg>
);

const BuilderCard = ({ builder, isActive, onClick, gradient }) => {
    const [photoFailed, setPhotoFailed] = useState(false);
    const showPhoto = builder.photo && !photoFailed;

    return (
        <motion.button
            type="button"
            onClick={onClick}
            animate={{
                scale: isActive ? 1 : 0.86,
                opacity: isActive ? 1 : 0.55,
            }}
            whileHover={!isActive ? { opacity: 0.8 } : {}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative shrink-0 overflow-hidden rounded-2xl text-left cursor-pointer
                ${isActive ? "w-56 h-[22rem] z-10" : "w-40 h-72"}`}
            style={{ background: gradient }}
            aria-label={`Show ${builder.name}`}
            aria-current={isActive}
        >
            {showPhoto ? (
                <img
                    src={builder.photo}
                    alt=""
                    onError={() => setPhotoFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className={`rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center font-semibold text-white
                            ${isActive ? "w-16 h-16 text-lg" : "w-11 h-11 text-sm"}`}
                    >
                        {initials(builder.name)}
                    </div>
                </div>
            )}

            <div
                className={`absolute inset-x-0 bottom-0 ${isActive ? "p-4" : "p-3"}`}
                style={{
                    background:
                        "linear-gradient(0deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.55) 45%, rgba(10,22,40,0) 80%)",
                }}
            >
                <p
                    className={`font-semibold text-white leading-snug line-clamp-1 ${
                        isActive ? "text-base" : "text-xs"
                    }`}
                >
                    {builder.name}
                </p>

                {isActive && (
                    <>
                        <p className="text-blue-200 text-xs mt-1 leading-snug line-clamp-1">
                            {builder.role}
                        </p>
                        <p className="font-bold text-blue-300/70 text-[11px] mt-0.5 leading-snug line-clamp-1">
                            {builder.department}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                            {builder.profileUrl && (
                                <a
                                    href={builder.profileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-[11px] font-semibold bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full transition-colors"
                                >
                                    View profile
                                </a>
                            )}
                            {builder.github && (
                                <a
                                    href={builder.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`${builder.name} on GitHub`}
                                    className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                                >
                                    <GithubIcon />
                                </a>
                            )}
                            {builder.twitter && (
                                <a
                                    href={builder.twitter}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`${builder.name} on X`}
                                    className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                                >
                                    <XIcon />
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </motion.button>
    );
};

export const BuildersCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = builders.length;

    const goTo = useCallback((i) => setActiveIndex(getIndex(i, total)), [total]);
    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

    useEffect(() => {
        if (paused || total <= 1) return;
        const interval = setInterval(goNext, 4000);
        return () => clearInterval(interval);
    }, [paused, total, goNext]);

    if (total === 0) return null;

    const prevBuilder = builders[getIndex(activeIndex - 1, total)];
    const activeBuilder = builders[getIndex(activeIndex, total)];
    const nextBuilder = builders[getIndex(activeIndex + 1, total)];

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="flex items-baseline justify-between px-1 mb-3">
                <span className="text-xs font-medium tracking-wide uppercase text-slate-400">
                    Builders
                </span>
                <span className="text-xs text-slate-400">
                    {String(activeIndex + 1).padStart(2, "0")}/
                    {String(total).padStart(2, "0")}
                </span>
            </div>

            <div className="relative h-[24rem] overflow-hidden rounded-3xl bg-slate-100">
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                    {total > 1 && (
                        <BuilderCard
                            builder={prevBuilder}
                            isActive={false}
                            onClick={goPrev}
                            gradient={
                                FALLBACK_GRADIENTS[
                                    getIndex(activeIndex - 1, FALLBACK_GRADIENTS.length)
                                    ]
                            }
                        />
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.35 }}
                        >
                            <BuilderCard
                                builder={activeBuilder}
                                isActive
                                onClick={() => {}}
                                gradient={
                                    FALLBACK_GRADIENTS[
                                        getIndex(activeIndex, FALLBACK_GRADIENTS.length)
                                        ]
                                }
                            />
                        </motion.div>
                    </AnimatePresence>

                    {total > 1 && (
                        <BuilderCard
                            builder={nextBuilder}
                            isActive={false}
                            onClick={goNext}
                            gradient={
                                FALLBACK_GRADIENTS[
                                    getIndex(activeIndex + 1, FALLBACK_GRADIENTS.length)
                                    ]
                            }
                        />
                    )}
                </div>

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous builder"
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M15 6l-6 6 6 6"
                                    stroke="#0A1628"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next builder"
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M9 6l6 6-6 6"
                                    stroke="#0A1628"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {total > 1 && (
                <div className="flex justify-center gap-1.5 mt-4">
                    {builders.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === activeIndex ? "w-6 bg-blue-600" : "w-1.5 bg-slate-300"
                            }`}
                            aria-label={`Go to builder ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};