import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { GraduationCap, UserPlus, LogIn, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {Button} from "@/components/ui/button.jsx";

export default function Hero() {
    const typedRef = useRef(null)

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: ['Clearance.', 'Verification.', 'Campus Safety.'],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
        })
        return () => typed.destroy()
    }, [])

    return (
        <section id="main"
                 className="relative w-full min-h-screen flex flex-col
                items-center justify-center overflow-hidden"
                 style={{
                     backgroundImage: "url('./campus.jpg')",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                 }}
        >

            <div className="absolute inset-0 bg-gradient-to-b
                from-black/80 via-black/60 to-black/90" />


            <div className="absolute top-1/4 left-1/4 w-96 h-96
                bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80
                bg-blue-400/10 rounded-full blur-3xl animate-pulse
                delay-1000" />

            <div className="relative z-10 flex flex-col items-center
                text-center px-6 max-w-screen mx-auto pt-24">

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 bg-blue-600/20
                        border border-blue-500/40 text-blue-300 text-sm
                        px-5 py-2 rounded-full mb-8 backdrop-blur-sm"
                >
                    <Shield className="w-4 h-4" />
                    Blockchain Powered Campus System
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl sm:text-6xl font-bold text-white
                        leading-tight mb-4 tracking-tight"
                >
                    Smarter Campus.
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600
                        bg-clip-text text-transparent">
                        Zero Stress.
                    </span>
                </motion.h1>


                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-white/60 text-lg mb-3"
                >
                    Powered by blockchain for
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-blue-400 text-xl font-semibold mb-10 h-9"
                >
                    <span ref={typedRef} />
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-center gap-3 bg-white/10 border
                        border-white/20 rounded-xl px-5 py-3 mb-8 w-full
                        max-w-sm backdrop-blur-md"
                >
                    <GraduationCap className="text-white/60 shrink-0" size={18} />
                    <select className="bg-transparent text-white text-sm
                        outline-none flex-1 cursor-pointer">
                        <option className="bg-gray-900" value="">Select University</option>
                        <option className="bg-gray-900" value="FUTO">FUTO</option>
                        <option className="bg-gray-900" value="UNILAG">UNILAG</option>
                        <option className="bg-gray-900" value="UNN">UNN</option>
                    </select>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4
                        "
                >
                    <Link to="/register">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300
                        transform hover:scale-105 hover:shadow-xl shadow-lg relative overflow-hidden hover:shadow-2xl hover:shadow-blue-600/30">
                            <UserPlus className="w-5 h-5" />
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1
                                transition-transform" />
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button className="w-full border-2 border-white text-white hover:bg-white/20 bg-white/10 px-8 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:shadow-xl shadow-lg relative overflow-hidden">
                            <LogIn className="w-5 h-5" />
                            Login
                        </Button>
                    </Link>
                </motion.div>

            </div>

        </section>
    )
}