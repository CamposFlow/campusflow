import { ClipLoader } from "react-spinners";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const Loaders = () => {
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const loaderRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(titleRef.current, {
            y: 24,
            opacity: 0,
            duration: 0.8,
        })
            .from(
                subRef.current,
                {
                    y: 16,
                    opacity: 0,
                    duration: 0.6,
                },
                "-=0.35"
            )
            .from(
                loaderRef.current,
                {
                    scale: 0.85,
                    opacity: 0,
                    duration: 0.5,
                },
                "-=0.2"
            );
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h1
                ref={titleRef}
                className="text-4xl font-bold text-black mb-2 tracking-tight"
            >
                Campus<span className="text-blue-600">Flow</span>
            </h1>

            <p ref={subRef} className="text-gray-600 mb-6">
                Simplifying campus experience
            </p>

            <div ref={loaderRef} className="flex items-center gap-2">
                <ClipLoader size={25} color="blue" />
                <span className="text-gray-600">Loading</span>
            </div>
        </div>
    );
};

export default Loaders;