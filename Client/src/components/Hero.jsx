import { motion } from 'framer-motion'
import { Shield, UserPlus, LogIn, GraduationCap , CheckCircle, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from "react";

export default function Hero() {
    return (
        <section id="main" className="relative min-h-screen w-full overflow-hidden

            flex flex-col items-center justify-center px-6">

            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -left-20 w-[420px] h-[420px] bg-blue-400/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 w-[380px] h-[380px] bg-blue-600/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-300/25 rounded-full blur-3xl"
            />
            <div className="absolute inset-0"
                 style={{
                     backgroundImage: 'radial-gradient(circle, rgb(173, 216, 230) 1px, transparent 1px)',
                     backgroundSize: '28px 28px'
                 }}
            />


            <div className="absolute top-0 left-1/2 -translate-x-1/2
                w-[600px] h-[300px] bg-blue-100/60 rounded-full
                blur-3xl -translate-y-1/2" />


            <div className="relative z-10 flex flex-col items-center text-center">

                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl pt-24">


                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 bg-blue-50 border border-blue-100
            text-blue-600 text-sm px-4 py-2 rounded-full mb-4 md:mb-8"
                    >
                        <Shield className="w-4 h-4" />
                        Blockchain Powered Campus System
                    </motion.div>


                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl sm:text-5xl font-bold text-gray-900
            leading-tight tracking-tight mb-4"
                    >
                        Stress-free Campus.
                        <br />
                        <span className="bg-gradient-to-r from-blue-500 to-blue-700
            bg-clip-text text-transparent font-orbitron">
            Powered by Blockchain.

        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-500 text-base sm:text-lg max-w-xl mb-10"
                    >
                        CampusFlow handles your clearance, verifies your documents,
                        and keeps you safe — all in one place.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-3"
                    >
                        <Link to="/register">
                            <button className="flex items-center gap-2 bg-blue-600
                hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl
                font-semibold transition-all hover:scale-105
                hover:shadow-lg hover:shadow-blue-200">
                                <UserPlus className="w-5 h-5" />
                                Get Started
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="flex items-center gap-2 border border-gray-600
                text-gray-700 hover:bg-gray-50 px-8 py-3.5 rounded-xl
                font-semibold transition-all hover:scale-105">
                                <LogIn className="w-5 h-5" />
                                Login
                            </button>
                        </Link>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex items-center gap-3 bg-white border border-gray-200
            rounded-xl px-5 py-3 mt-6 w-full max-w-xs shadow-sm"
                    >
                        <GraduationCap className="text-gray-400 shrink-0" size={18} />
                        <select className="bg-transparent text-gray-600 text-sm
            outline-none flex-1 cursor-pointer">
                            <option value="">Select University</option>
                            <option value="FUTO">FUTO</option>
                            <option value="UNILAG">UNILAG</option>
                            <option value="UNN">UNN</option>
                        </select>
                    </motion.div>

                    <div className="flex lg:hidden items-center gap-3 mt-6 overflow-x-auto
    pb-2 w-full justify-center">
                        {[
                            { label: 'Clearance', color: 'bg-green-50 text-green-600' },
                            { label: 'Verification', color: 'bg-blue-50 text-blue-600' },
                            { label: 'SOS Safety', color: 'bg-red-50 text-red-600' },
                        ].map((item, i) => (
                            <span key={i} className={`shrink-0 text-xs px-3 py-1.5 
            rounded-full font-medium ${item.color}`}>
            {item.label}
        </span>
                        ))}
                    </div>

                </div>
            </div>


            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="hidden lg:block absolute left-16 top-1/4 w-52"
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ delay: 1.7, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4"
                >
                    <p className="text-xs text-gray-400 mb-2">Clearance Status</p>
                    <div className="flex flex-col gap-2">
                        {['Library', 'Medical', 'Departmental'].map((stage, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">{stage}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full
                        ${i === 0 ? 'bg-green-50 text-green-600'
                                    : i === 1 ? 'bg-yellow-50 text-yellow-600'
                                        : 'bg-gray-50 text-gray-400'}`}>
                        {i === 0 ? 'Approved' : i === 1 ? 'Pending' : 'Not Started'}
                    </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Top right card — Verification */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="hidden lg:block absolute right-24 top-1/4 w-48"
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ delay: 1.7, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-green-50
                flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-700">Certificate Valid</p>
                            <p className="text-xs text-gray-400">FUTO • 2024</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 font-mono truncate">
                        0x71C7656EC7ab88...
                    </p>
                </motion.div>
            </motion.div>

            {/* Bottom right card — SOS */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="hidden lg:block absolute right-24 bottom-1/3 w-44"
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ delay: 1.7, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white rounded-2xl shadow-lg border border-red-100 p-4"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-50
                flex items-center justify-center animate-pulse">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-red-600">SOS Triggered</p>
                            <p className="text-xs text-gray-400">Security notified</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}