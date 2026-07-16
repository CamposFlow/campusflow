// components/FeaturesShowcase.jsx
import { useState } from "react";
import {
    Link2,
    ClipboardCheck,
    Siren,
    Lock,
    MapPin,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: Link2,
        title: "Blockchain-Verified Certificates",
        description:
            "Every certificate anchored on Solana, tamper-proof and instantly verifiable",
    },
    {

        icon: ClipboardCheck,
        title: "Real-Time Clearance Tracking",
        description:
            "Submit documents stage-by-stage and track approval status live",
    },
    {
        icon: Siren,
        title: "Live Campus Security Alerts",
        description: "One-tap SOS with GPS location, straight to campus security",
    },
    {
        icon: Lock,
        title: "Tamper-Proof Records",
        description: "Once issued, certificates can't be silently altered or forged",
    },
    {
        icon: MapPin,
        title: "Live Incident Mapping",
        description: "Real-time risk zones and reports across campus",
    },
    {
        icon: Zap,
        title: "Instant Verification",
        description:
            "Employers and institutions verify credentials in seconds, no phone calls needed",
    },
];

const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;
    return (
        <div
            className="shrink-0 w-64 sm:w-72 mx-3 rounded-2xl border border-slate-200
                bg-white p-5 shadow-sm hover:shadow-lg
                   hover:border-blue-300 transition-all duration-300 group hover:bg-linear-to-br hover:from-blue-50/80 hover:to-blue-100/40"
        >
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
                style={{
                    background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
                }}
            >
                <Icon size={18} className="text-white" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-1.5">
                {feature.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
                {feature.description}
            </p>
        </div>
    );
};

export const FeaturesShowcase = () => {
    const [paused, setPaused] = useState(false);
    // Duplicated once so the belt can loop seamlessly: translating the track
    // exactly -50% lands on an identical copy of the start, so the jump is invisible.
    const track = [...features, ...features];

    return (
        <div
            className="relative w-full overflow-hidden py-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* edge fades so cards don't look like they're cut off mid-scroll */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-white to-transparent" />

            <div
                className="flex w-max features-marquee-track"
                style={{ animationPlayState: paused ? "paused" : "running" }}
            >
                {track.map((feature, i) => (
                    <FeatureCard key={`${feature.title}-${i}`} feature={feature} />
                ))}
            </div>

            <style>{`
                @keyframes features-marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .features-marquee-track {
                    animation: features-marquee 32s linear infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .features-marquee-track {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
};