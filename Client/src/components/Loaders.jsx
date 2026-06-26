
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "../Loader.css"
import {HashLoader} from "react-spinners";
import Typed from "typed.js";
import {useGSAP} from "@gsap/react";

export const Loaders = () => {
    const textRef = useRef(null);
    const headRef = useRef(null);
    const containerRef = useRef(null);
    const loaderRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(textRef.current, {
            strings: [
                "Clearance",
                "document verification",
                "campus safety - Powered By Blockchain"
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 800,
            loop: true,
        });
        return () => {
            typed.destroy();
        }
    }, [])

    useGSAP(() => {
        const tl = gsap.timeline();

        // Container fade in
        tl.from(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
        })

        // Logo entrance with rotation
        tl.from(".logo", {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.8)",
            rotation: -180,
        }, 0.1)

        // Title entrance
        tl.from(".title", {
            x: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
        }, "-=0.4")

        // Subtitle entrance
        tl.from(".subtitle", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
        }, "-=0.3")

        // Loader pulse animation
        tl.to(".loader-pulse", {
            boxShadow: "0 0 0 20px rgba(37, 99, 235, 0)",
            duration: 1.5,
            repeat: -1,
            ease: "power1.inOut",
        }, 0.5)

        // Progress bar animation
        tl.to(progressRef.current, {
            width: "100%",
            duration: 2.5,
            ease: "power1.inOut",
            repeat: -1,
        }, 0)

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white flex flex-col items-center justify-center gap-8 px-4 relative overflow-hidden">
            {/* Animated background gradient orbs */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Loader with pulse effect */}
                <div className="relative">
                    <div ref={loaderRef} className="loader-pulse">
                        <HashLoader
                            color="#2563eb"
                            size={50}
                            speedMultiplier={0.8}
                        />
                    </div>
                </div>

                {/* Header section */}
                <div className="text-center" ref={headRef}>
                    <div className="flex items-center gap-3 justify-center mb-3">
                        <img src="/LOGO1.png" alt="CampusFlow" className="logo w-14 h-14 drop-shadow-lg" />
                        <h1 className="text-5xl sm:text-6xl font-bold title">
                            Campus<span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Flow</span>
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-sm sm:text-base font-medium subtitle leading-relaxed">
                        Taking Stress Out of <span className="text-blue-600 font-semibold" ref={textRef}></span>
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-xs">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden shadow-sm">
                        <div ref={progressRef} className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                    </div>
                    <p className="text-center text-xs text-gray-500 font-medium mt-3">Initializing CampusFlow...</p>
                </div>

                {/* Loading dots animation */}
                <div className="flex gap-2 items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>

            {/* Bottom tagline */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Powered by <span className="text-blue-600 font-medium">Blockchain Technology</span>
                </p>
            </div>

        </div>
    );
};

export default Loaders;