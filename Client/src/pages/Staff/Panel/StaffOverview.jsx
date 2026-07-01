import React from "react";
import { motion} from "framer-motion";
import {ClipboardCheck, CheckCircle, XCircle, Users, MessageSquare} from "lucide-react";
import api from '@/api/axios.js';
import {useEffect, useState} from "react";

export const StaffOverview = () => {
    const [stats, setStats] = useState({pending : 0, approved : 0,rejected: 0, total : 0 });
    const [activities, setActivities] = useState([]);
    const [staffName, setStaffName] = useState("");
    useEffect(() => {
        api.get('/me')
            .then(res => setStaffName(res.data.user.fullname))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const clearanceRes = await api.get('/clearance');
                const records = clearanceRes.data.data || [];
                console.log('data:',records);
                setStats({
                    pending: records.filter(r => r.is_approved === null).length,
                    approved: records.filter(r => r.is_approved === true).length,
                    rejected: records.filter(r => r.is_approved === false).length,
                    total: records.length,
                });
                setActivities(records.slice(0,5)); // last five activities
                console.log('activities:', records.slice(0,5));
            }catch (err){
                console.log(err);
            }
        };
        fetchData();
    }, [])
    const statsDisplay = [
        {label:'Pending Approval', value: stats.pending, icon: ClipboardCheck, color:"bg-yellow-100 text-yellow-600", text:"text-yellow-600"},
        {label: 'Approved Today', value: stats.approved, icon: CheckCircle, color:'bg-green-100 text-green-600', text:"text-green-600"},
        {label:'Rejected', value: stats.rejected, icon: XCircle, color: "bg-red-100 text-red-600", text:"text-red-600"},
        {label:'Total Students', value: stats.total, icon: Users, color:"bg-blue-100 text-blue-600", text:"text-blue-600"},
    ]
//     const activities =[
//         {id: 1, type: 'approved', text: 'Approved Library Clearance for 202414245', time:'5m ago'},
//         {id:2, type: 'rejected', text:'Rejected Library Clearance for 29942723', time:'6m ago'},
//         {id: 3, type: 'approved', text: 'Approved Library Clearance for 203414245', time:'7m ago'},
//         {id: 4, type: 'approved', text: 'Approved Library Clearance for 2022214245', time:'9m ago'},
//         {id: 5, type: 'rejected', text: 'Approved Library Clearance for 202414245', time:'10m ago'},
//     ]
    const typeConfig = {
        approved: { icon: CheckCircle, color: 'bg-green-500', ring: 'ring-green-200' },
        rejected: { icon: XCircle, color: 'bg-red-500', ring: 'ring-red-200' },
        pending: { icon: ClipboardCheck, color: 'bg-yellow-500', ring: 'ring-yellow-200' },
    }
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
            <h2 className="text-3xl font-bold mb-1 text-white uppercase">{staffName}</h2>
            <p className="text-blue-200 text-sm">Manage student records and verify activities</p>
        </div>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
              {statsDisplay.map((stat,index) => (
                  <motion.div
                      key={index}
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

               <div className="mt-6">
    <div className="flex items-center justify-between mb-4">
    <h3 className="text-base font-semibold text-gray-800">Recent Activity</h3>
    <span className="text-xs text-blue-600 cursor-pointer hover:underline">View all</span>
    </div>
                   <div className="relative pl-2">

                       <div className="absolute left-[26px] top-2 bottom-2 w-[2px]
            bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100"/>

                       {activities.map((activity, index) => {
                           const type = activity.is_approved === true ? 'approved' : activity.is_approved === false ? 'rejected' : 'pending';
                           const config = typeConfig[type] || typeConfig['approved'];


                           return(
                               <motion.div
                                   key={activity.id || index}
                                   initial={{ opacity: 0, x: -20 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   transition={{ delay: index * 0.1 }}
                                   className="relative flex items-start gap-4 pb-6 last:pb-0"
                               >
                                   <div className={`relative z-10 w-10 h-10 rounded-full flex 
                        items-center justify-center shrink-0
                        ${config.color} ring-4 ${config.ring}`}>
                                       <config.icon className="w-4 h-4 text-white"/>
                                   </div>
                                   <motion.div
                                       whileHover={{ x: 4 }}
                                       className="flex-1 bg-white border border-gray-100
                            rounded-xl px-4 py-3 shadow-sm"
                                   >
                                       <p className="text-sm text-gray-700 font-medium">
                                           {type.charAt(0).toUpperCase() + type.slice(1)} clearance for {activity.student_name}
                                       </p>

                                       <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${type === 'approved' ? 'bg-green-50 text-green-600'
                                : type === 'rejected' ? 'bg-red-50 text-red-600'
                                    : 'bg-yellow-50 text-yellow-600'}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                                           <p className="text-xs text-gray-400">{new Date(activity.created_at).toLocaleString()}</p>
                                       </div>
                                   </motion.div>
                               </motion.div>
                           )
                       })}
                   </div>
           </div>
        </div>
    )
}