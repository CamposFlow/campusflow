import {ShieldCheck, CheckCircle, Clock} from "lucide-react";
import React from "react";

export const ClearancePanel = () => {

    return(
        <div>
            <SectionHeader title="Clearance Status" sub="Track your departmental clearance in real time" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {[
                    { label:'Department', status:'Pending',   icon: Clock,       color:'text-orange-600', bg:'bg-orange-50', border:'border-orange-200', pct:20  },
                    { label:'Library',    status:'Completed', icon: CheckCircle, color:'text-green-600',  bg:'bg-green-50',  border:'border-green-200',  pct:100 },
                    { label:'Finance',    status:'Completed', icon: ShieldCheck, color:'text-green-600',  bg:'bg-green-50',  border:'border-green-200',  pct:100 },
                ].map((c,i) => (
                    <div key={i} className={`bg-white rounded-2xl border ${c.border} p-6 shadow-sm hover:shadow-md transition-all`}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center`}>
                                <c.icon className={`w-5 h-5 ${c.color}`} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{c.label} Clearance</p>
                                <p className={`text-xs font-semibold ${c.color}`}>{c.status}</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className={`${c.pct === 100 ? 'bg-green-500' : 'bg-orange-400'} h-full rounded-full`}
                                style={{ width: `${c.pct}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">{c.pct}%</p>
                    </div>
                ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4 items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-blue-800">Department clearance is pending</p>
                    <p className="text-xs text-blue-600 mt-1">Visit the Computer Science department office with your completed forms to continue your clearance process.</p>
                </div>
            </div>
        </div>
    )
};
