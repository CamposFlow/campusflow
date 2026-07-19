import { useState } from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from "sonner";
import api from '../api/axios.js';
import {reverseGeocode} from '../constants/geocode.js';
import { useLocationPriming } from '../hooks/useLocationPriming';

export const FloatingSOSButton = () =>{
    useLocationPriming();
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fired, setFired] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const sendAlert = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { longitude, latitude } = position.coords;
                try {
                    const geocoded = await reverseGeocode(latitude, longitude);
                    await api.post("/api/telegram/send", {
                        latitude,
                        longitude,
                        locationText: geocoded,

                    });
                    toast.success("Alert sent! Help is on the way.");
                } catch (err) {
                    console.error(err);
                    toast.error("Failed to send alert. Try again or call security directly.");
                }
            },
            (error) => {
                console.log("Location error:", error.message);
                toast.error("Please allow location access so we can send your location.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const startHold = () => {
        if (fired || holding) return;
        setHolding(true);
        let count = 0;
        const id = setInterval(() => {
            count += 2;
            setProgress(count);
            if (count >= 100) {
                clearInterval(id);
                setFired(true);
                setHolding(false);
                sendAlert();
                setTimeout(() => { setFired(false); setProgress(0); }, 3000); // reset after showing confirmation
            }
        }, 60);
        setIntervalId(id);
    };

    const cancelHold = () => {
        clearInterval(intervalId);
        setHolding(false);
        setProgress(0);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] mb-10">
            <div className="relative w-16 h-16">
                <CircularProgressbar
                    value={progress}
                    styles={buildStyles({
                        pathColor: '#ef4444',
                        trailColor: 'rgba(220,38,38,0.15)',
                        strokeLinecap: 'round',
                    })}
                />
                <motion.button
                    className={`absolute inset-1.5 rounded-full flex items-center justify-center
                        select-none cursor-pointer transition-all
                        ${fired ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'}
                        shadow-[0_0_25px_rgba(220,38,38,0.6)]`}
                    animate={fired ? { scale: [1, 1.15, 1] } : {}}
                    onMouseDown={startHold}
                    onMouseUp={cancelHold}
                    onMouseLeave={cancelHold}
                    onTouchStart={startHold}
                    onTouchEnd={cancelHold}
                    aria-label="Hold to send emergency SOS alert"
                >
                    <span className="text-white text-[10px] font-bold uppercase tracking-wide">
                        {fired ? '✓' : holding ? '...' : 'SOS'}
                    </span>
                </motion.button>
            </div>
        </div>
    );
};

export default FloatingSOSButton;