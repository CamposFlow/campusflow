import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle,CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const incidentData = [
    { day: "Day 1", incidents: 2 },
    { day: "Day 5", incidents: 4 },
    { day: "Day 10", incidents: 5 },
    { day: "Day 15", incidents: 1 },
    { day: "Day 20", incidents: 6 },
    { day: "Day 25", incidents: 3 },
    { day: "Day 30", incidents: 3 },
]
const stages = [
    { stage: "Library", percent: 82, color: "#3B82F6" },
    { stage: "Hostel", percent: 67, color: "#10B981" },
    { stage: "Department", percent: 91, color: "#8B5CF6" },
    { stage: "SUG", percent: 44, color: "#F59E0B" },
];

export const AdminOverview = () => {
    const statsData = [
        {
            label: "Certificates Issued",
            value: "1,284",
            delta: "+24 this week",
            deltaType: "up",
            accentColor: "#3B82F6",
        },
        {label: "Clearances Approved", value: "387", delta: "+12 today", deltaType: "up", accentColor: "#10B981",},
        {label: "Active Incidents", value: "3", delta: "2 unresolved", deltaType: "warn", accentColor: "#F59E0B",},
        {label: "Universities", value: "7", delta: "+1 this month", deltaType: "up", accentColor: "#8B5CF6",},
    ];
    return (
        <div>
           <div className={"grid md:grid-cols-3 grid-cols-2 gap-3"}
           >
               {statsData.map((stat, index) => (
                   <motion.div
                       key={index}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: index * 0.1 }}
                       className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 overflow-hidden"
                   >
                       <div
                           className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
                           style={{ background: `${stat.accentColor}` }}
                       />
                       <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 pl-2">
                           {stat.label}
                       </p>

                       <p className="text-3xl font-bold text-gray-900 dark:text-white pl-2">
                           {stat.value}
                       </p>

                       <p className={`text-xs mt-2 pl-2 flex items-center gap-1 ${
                           stat.deltaType === "up" ? "text-emerald-500" : "text-amber-500"
                       }`}>
                           {stat.deltaType === "up"
                               ? <TrendingUp size={12} />
                               : <AlertTriangle size={12} />
                           }
                           {stat.delta}
                       </p>
                   </motion.div>
               ))}
           </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">


                <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-900">Incident Frequency</h2>
                        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
        Last 30 days
      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={incidentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false}
                            />
                            <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false}
                            />
                            <Tooltip contentStyle={{background: "#fff", border: "0.5px solid #E5E7EB", borderRadius: "8px", fontSize: "12px",
                                }}
                                formatter={(value) => [`${value} incidents`, ""]}
                            />
                            <Line type="monotone" dataKey="incidents" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#EF4444" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
                    <h2 className="text-sm font-semibold text-gray-900">SOS Overview</h2>

                    {/* Pulse */}
                    <div className="flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                            <span className="absolute w-24 h-24 rounded-full bg-red-100 animate-ping opacity-50" />
                            <span className="absolute w-20 h-20 rounded-full bg-red-100 animate-ping opacity-30" style={{ animationDelay: "0.5s" }} />
                            <div className="relative w-16 h-16 rounded-full bg-red-50 border-2 border-red-500 flex flex-col items-center justify-center z-10">
                                <span className="text-2xl font-bold text-red-500">3</span>
                                <span className="text-xs text-red-400">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-red-50 rounded-lg p-3 text-center">
                            <p className="text-xl font-bold text-red-500">3</p>
                            <p className="text-xs text-red-400 mt-0.5">Unresolved</p>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-3 text-center">
                            <p className="text-xl font-bold text-emerald-500">18</p>
                            <p className="text-xs text-emerald-400 mt-0.5">Resolved</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Resolution rate</span>
                            <span>86%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: "86%" }}
                            />
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 text-center">Live incidents on-chain</p>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="text-sm font-semibold text-gray-900 mb-4">Clearance Stages</h2>
                    <div className="space-y-3">
                        {stages.map((item) => (
                            <div key={item.stage}>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>{item.stage}</span>
                                    <span className="font-medium" style={{ color: item.color }}>
              {item.percent}%
            </span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${item.percent}%`, background: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        {[
                            {
                                text: "Certificate issued — Chukwuemeka Obi",
                                time: "2 mins ago · FUTO",
                                color: "#3B82F6",
                                icon: TrendingUp,
                            },
                            {
                                text: "Clearance approved — Library stage",
                                time: "14 mins ago · UNILAG",
                                color: "#10B981",
                                icon: CheckCircle,
                            },
                            {
                                text: "SOS reported — Female hostel route",
                                time: "31 mins ago · FUTO",
                                color: "#EF4444",
                                icon: AlertTriangle,
                            },
                            {
                                text: "Incident resolved — Block C corridor",
                                time: "1 hr ago · UNILAG",
                                color: "#10B981",
                                icon: CheckCircle,
                            },
                            {
                                text: "Certificate verified — NYSC Abuja",
                                time: "2 hrs ago · On-chain",
                                color: "#3B82F6",
                                icon: Clock,
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: `${item.color}15` }}
                                >
                                    <item.icon size={13} style={{ color: item.color }} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800 leading-snug">{item.text}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}