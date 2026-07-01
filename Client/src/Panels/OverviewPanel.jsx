import { CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import Ring from "../components/Ring.jsx";
import api from "@/api/axios.js";

export const OverviewPanel = ({ student, stats, activities }) => {
  const [barReady, setBarReady] = useState(false);
  const [ringPct, setRingPct] = useState(0);
  const [department, setDepartment] = useState("");
  const [studentName, setStudentName] = useState("");
  const [matric_number, setMatricNumber] = useState("");

    useEffect(() => {
        api.get('/me')
            .then(res => {
                setStudentName(res.data.user.fullname);
                setDepartment(res.data.user.department);
            })
            .catch(err => console.error(err));
    }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBarReady(true);
      const target = 67;
      const duration = 900;
      const interval = 20;
      const steps = Math.ceil(duration / interval);
      let current = 0;
      const stepValue = target / steps;

      const ticker = window.setInterval(() => {
        current += stepValue;
        if (current >= target) {
          setRingPct(target);
          window.clearInterval(ticker);
        } else {
          setRingPct(Math.round(current));
        }
      }, interval);
    }, 750);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="panel-landing">
      {/* Greeting banner */}
      <div
        className="rounded-2xl p-7 mb-8 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%)",
        }}
      >
        {/* decorative circles */}
        <div
          style={{
            position: "absolute",
            right: "-40px",
            top: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "-60px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div className="relative z-10 ">
          <p className="text-blue-200 text-sm font-medium mb-1">
            Good evening,
          </p>
          <h2 className="text-3xl font-bold mb-1 uppercase">{studentName}</h2>
          <p className="text-blue-200 text-sm">
            {department} · {student.level} · {student.studentId}
          </p>
          <div className="flex gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-green-300" /> Session
              Active
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-amber-300" /> 2025/2026 Session
            </span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm  hover:scale-105 hover:shadow-lg transition-all duration-200 group cursor-pointer"
          >
            <div
              className={`w-11 h-11 ${s.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
            >
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {s.title}
            </p>
            <p className={`text-base font-bold ${s.color}`}>{s.status}</p>
          </div>
        ))}
      </div>

      {/* Lower grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 ">
        {/* Clearance summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">
            Clearance Progress
          </h3>
          <div className="flex items-center justify-center mb-5">
            <div className="relative">
              <Ring pct={ringPct} color="#2563eb" size={110} stroke={9} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {ringPct}%
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  Complete
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                label: "Department",
                pct: 0,
                color: "bg-orange-400",
                status: "Pending",
              },
              {
                label: "Library",
                pct: 100,
                color: "bg-green-500",
                status: "Done",
              },
              {
                label: "Finance",
                pct: 100,
                color: "bg-green-500",
                status: "Done",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24 shrink-0">
                  {item.label}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full progress-fill`}
                    style={{ width: barReady ? `${item.pct}%` : "0%" }}
                  />
                </div>
                <span
                  className={`text-xs font-semibold ${item.pct === 100 ? "text-green-600" : "text-orange-500"}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
              Recent Activity
            </h3>
            <button className="text-xs text-blue-600 font-medium hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`p-2.5 rounded-xl ${a.status === "completed" ? "bg-green-50" : "bg-orange-50"}`}
                >
                  {a.status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {a.action}
                  </p>
                  <p className="text-xs text-gray-400">{a.date}</p>
                </div>
                <span
                  className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    a.status === "completed"
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-orange-50 text-orange-500 border border-orange-200"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
