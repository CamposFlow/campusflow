import React from "react";
import {motion} from "framer-motion";
import {ClipboardCheck, CheckCircle, XCircle, Users} from "lucide-react";

export const AdminOverview = () => {
const stats =[
    {label:'Pending Approval', value: 12, icon: ClipboardCheck, color:"bg-yellow-100 text-yellow-600", text:"text-yellow-600"},
    {label: 'Approved Today', value: 13, icon: CheckCircle, color:'bg-green-100 text-green-600', text:"text-green-600"},
    {label:'Rejected', value: 14, icon: XCircle, color: "bg-red-100 text-red-600", text:"text-red-600"},
    {label:'Total Students', value: 500, icon: Users, color:"bg-blue-100 text-blue-600", text:"text-blue-600"},
]

    return (
        <div>
        <div className="rounded-2xl p-7 mb-8 relative overflow-hidden"
             style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%)'}}
        >
            <div style={{
                position: 'absolute', right: '-40px', top: '-40px',
                width: '200px', height: '200px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)'
            }}/>
            <div style={{
                position: 'absolute', right: '60px', bottom: '-60px',
                width: '160px', height: '160px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)'
            }}/>
            <p className="text-blue-200 text-sm font-medium mb-1">Welcome Back</p>
            <h2 className="text-3xl font-bold mb-1 text-white">Aguwa John</h2>
            <p className="text-blue-200 text-sm">Manage student records and verify activities</p>
        </div>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
              {stats.map((stat,index) => (
                  <motion.div
                      key={stat.label}
                      initial={{opacity:0, y:20}}
                      animate={{opacity:1, y:0}}
                      whileHover={{y:-4, boxShadow:"0 8px 20px rgba(0, 0, 0, 0.08)"}}
                      className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-4 ">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="w-5 h-5"/>
                      </div>
                      <p className="text-2xl font-semibold text-gray-700 mt-3">{stat.value}</p>
                      <p className={`text-sm  mt-1 ${stat.text} font font-medium`}>{stat.label}</p>
                  </motion.div>
              ))}
          </div>
        </div>
    )
}