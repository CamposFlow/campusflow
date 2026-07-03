import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Siren, AlertTriangle, Zap, ShieldAlert, HeartPulse } from 'lucide-react';
import { RiskZoneMap } from "@/components/RiskZone";
import {toast} from "sonner";
import api from "@/api/axios.js";
import {reverseGeocode} from '@/constants/geocode.js'


function SOSPanel() {
 const [topic, setTopic] = useState('');
    const [locationText, setLocationText] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [submitting, setSubmitting] = useState(false);



    const sendAlert = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { longitude, latitude } = position.coords;
                try {
                    const geocoded = await reverseGeocode(latitude, longitude);
                   setLocationText(geocoded);
                    const res = await api.post("/api/telegram/send", {
                        latitude,
                        longitude,
                        locationText
                    });
                    console.log(`Alert response:`, res.data);
                    toast.success("Alert sent! Help is on the way.");
                } catch (err) {
                    console.error(err);
                    toast.error("Failed to send alert. Try again or call security directly.");
                }
            },
            (error) => {
                console.log("Location error:", error.message);
                alert("Please allow location access so we can send your location");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fired, setFired] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [activeReport, setActiveReport] = useState(null);

    useEffect(() => {
        // Ask on Security page mount, not just when form opens
        if (!navigator.geolocation) return

        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                // Already allowed — silently get location
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords
                    const geocoded = await reverseGeocode(latitude, longitude)
                    setLocationText(geocoded)
                })
            } else if (result.state === 'prompt') {
                // Not asked yet — show a friendly toast first, then trigger browser dialog
                toast("📍 Allow location access for faster incident reporting", {
                    duration: 4000,
                })
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords
                        const geocoded = await reverseGeocode(latitude, longitude)
                        setLocationText(geocoded)
                        toast.success("Location detected!")
                    },
                    () => toast.error("Location denied. Enter manually.")
                )
            }
            // result.state === 'denied' — do nothing, user already said no
        })
    }, []) // ← empty array = runs once on page mount


    const cards = [
            {icon: AlertTriangle, title: 'Suspicious Activity', desc: 'Report suspicious persons or behavior', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', id: 'suspicious'},
            {icon: Zap, title: 'Broken Infrastructure', desc: 'Damaged facilities, lights, roads', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', id: 'infrastructure'},
            {icon: ShieldAlert, title: 'Unauthorized Access', desc: 'Report trespassers or security breach', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200', id: 'unauthorized'},
        {icon:HeartPulse, title: "Medical Concern", desc: 'Medical Emergency', color:'text-red-500', bg:'bg-red-50', border: 'border-red-200', id: 'medical'},
    ]

    const handleSubmitReport = async () => {
        if (!locationText.trim() || !description.trim()) {
            toast.error("Please fill in location and description.");
            return;
        }

        setSubmitting(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { longitude, latitude } = position.coords;
                try {
                    const geocoded = await reverseGeocode(latitude, longitude);
                    setLocationText(geocoded);
                    await api.post("/api/telegram/report", {
                        category: activeReport,
                        locationText,
                        description,
                        longitude,
                        latitude,
                    });
                    console.log('pill response:')
                    toast.success("Report submitted!");
                    setLocationText("");
                    setDescription("");
                    setPhoto(null);
                    setActiveReport(null);
                } catch (err) {
                    toast.error("Failed to submit report. Try again.");
                } finally {
                    setSubmitting(false);
                }
            },
            (error) => {
                console.log("Location error:", error.message);
                toast.error("Please allow location access so we can send your location.");
                setSubmitting(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    function startHold() {
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
            }
        }, 60);
        setIntervalId(id);
    }

    function cancelHold() {
        clearInterval(intervalId);
        setHolding(false);
        setProgress(0);
    }
    return (
        <div>

            <div className="mt-10 w-[90%] mx-auto bg-gradient-to-r from-[#0A1628] to-[#14294a] rounded-3xl p-3 md:p-6 text-center text-white relative overflow-hidden">

                <div className="absolute inset-0 bg-red-500/10 blur-3xl"/>
                <h2 className="text-2xl md:text-5xl font-bold mb-4 relative z-10">
                    Stay Safe On Campus
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto mb-14 relative z-10 mt-3 text-sm md:text-xl">
                    Instantly alert campus security and share your location
                    during emergencies.
                </p>
                <div className="relative flex justify-center items-center">
                    <div className="absolute w-66 h-66 rounded-full bg-red-500/10 animate-ping"/>
                    <div className={`absolute w-56 h-56 rounded-full bg-red-600/20`}/>
                    <div className="relative w-36 h-36">
                        {/* Progress ring */}
                        <CircularProgressbar
                            value={progress}
                            styles={buildStyles({
                                pathColor: '#ef4444',
                                trailColor: 'rgba(220,38,38,0.15)',
                                strokeLinecap: 'round',
                            })}
                        />

                        <motion.button
                            className={`absolute inset-3 rounded-full flex flex-col items-center justify-center
                                select-none cursor-pointer transition-all
                                ${fired ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'}
                                shadow-[0_0_50px_rgba(220,38,38,0.6)]`}
                            animate={fired ? { scale: [1, 1.1, 1] } : {}}
                            onMouseDown={startHold}
                            onMouseUp={cancelHold}
                            onMouseLeave={cancelHold}
                            onTouchStart={startHold}
                            onTouchEnd={cancelHold}
                        >
    <span className="text-white text-xs uppercase tracking-widest">
      {fired ? '✓ Sent' : holding ? 'Hold...' : 'Hold For'}
    </span>
                            <span className="text-white text-3xl font-bold">
      {fired ? 'HELP SENT' : 'HELP'}
    </span>
                        </motion.button>
                    </div>
                </div>
                <p className="mt-12 text-slate-400 relative z-10 text-sm md:text-xl">
                    {fired ?
                        'Emergency alert Sent to Campus Security'
                        : 'Hold button for 3 seconds to send emergency alert'
                    }
                </p>
            </div>
<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 mb-2 justify-items-center">

    <motion.div
    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 md:py-2 shadow-sm text-center"
    initial={{opacity:0, y:10}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.1}}
    >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
        <span className="text-xs font-medium text-slate-700">Campus Security Online</span>
    </motion.div>

    <motion.div
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 md:py-2 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
    >
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-xs font-medium text-slate-700">📍 Your location detected</span>
    </motion.div>

    <motion.div
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 md:py-2 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
    >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-medium text-slate-700">2 active incidents nearby</span>
    </motion.div>

</div>

            <div className="mt-10 px-2">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Campus Risk Map</h2>
                <p className="text-slate-500 mb-4">Areas with repeated reports are flagged automatically.</p>
                <RiskZoneMap />
            </div>
            <div className="mt-10 px-2">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">SOS Emergency Center</h2>
                <p className="text-slate-500 mb-6">Get immediate assistance and report emergencies on campus.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {cards.map((item) => (
                        <motion.div
                            key={item.id}
                            onClick={() => setActiveReport(item.id)}
                            whileHover={{ y: -4 }}
                            className={`${item.bg} border ${item.border} rounded-2xl md:rounded-3xl flex flex-col h-full p-4 md:p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all`}
                        >
                            <item.icon className={`${item.color} mb-2 md:mb-3`} size={28} />
                            <h3 className="font-semibold text-slate-800 text-sm md:text-base leading-tight">{item.title}</h3>
                            <p className="text-slate-500 text-sm mt-1 md:text-sm leading-slug">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            {activeReport && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setActiveReport(null)}
                >
                    <motion.div
                        className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900">
                                {activeReport === 'suspicious' && '🔦 Suspicious Activity'}
                                {activeReport === 'infrastructure' && '💡 Broken Infrastructure'}
                                {activeReport === 'unauthorized' && '🚪 Unauthorized Access'}
                                {activeReport === 'medical' && '🏥 Medical Concern'}
                            </h3>
                            <button
                                onClick={() => setActiveReport(null)}
                                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                          >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1 block">
                                    Location on Campus
                                </label>
                                <input
                                    type="text"
                                    value={locationText}
                                    onChange={(e) => setLocationText(e.target.value)}
                                    placeholder="e.g. Engineering Block, Gate 2..."
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1 block">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    placeholder="Describe what happened..."
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1 block">
                                    Photo (optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm"
                                />
                            </div>

                            <button
                                onClick={handleSubmitReport
                                }
                                disabled={submitting}
                                className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                            >
                                {submitting ? "Submitting..." : "Submit Report"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
export default SOSPanel;