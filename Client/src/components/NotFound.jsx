import {Link} from 'react-router-dom'
import {motion} from "framer-motion";
import React from "react";
export const NotFound = () => {
    return (
        <div className="min-h-screen flex-col flex items-center justify-center gap-2">

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
            <h1 className="text-6xl font-bold text-blue-600 ">404</h1>
            <p className="text-gray-500 text-3xl">Page not found</p>
            <Link to="/" className="text-xl text-blue-600 hover:underline transition-all duration-300">Return Home</Link>
        </div>
    )
}