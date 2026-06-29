import { useState } from "react"
import { Search, CheckCircle, Clock, XCircle } from "lucide-react"
import { motion } from "framer-motion"

const mockStudents = [
    {
        id: 1,
        name: "Chukwuemeka Obi",
        studentId: "FUT/SET/21/0001",
        level: "500L",
        department: "Software Engineering",
        clearances: {
            Library: true,
            Hostel: true,
            Department: true,
            SUG: false,
        },
    },
    {
        id: 2,
        name: "Adaeze Nwosu",
        studentId: "FUT/SET/21/0002",
        level: "500L",
        department: "Computer Science",
        clearances: {
            Library: true,
            Hostel: false,
            Department: true,
            SUG: false,
        },
    },
    {
        id: 3,
        name: "Emeka Eze",
        studentId: "FUT/SET/21/0003",
        level: "500L",
        department: "Electrical Engineering",
        clearances: {
            Library: false,
            Hostel: false,
            Department: false,
            SUG: false,
        },
    },
    {
        id: 4,
        name: "Ngozi Okonkwo",
        studentId: "FUT/SET/21/0004",
        level: "500L",
        department: "Mechanical Engineering",
        clearances: {
            Library: true,
            Hostel: true,
            Department: true,
            SUG: true,
        },
    },
    {
        id: 5,
        name: "Tunde Bakare",
        studentId: "FUT/SET/21/0005",
        level: "100L",
        department: "Civil Engineering",
        clearances: {
            Library: true,
            Hostel: false,
            Department: false,
            SUG: false,
        },
    },
]


export const AdminStudent = () => {
    const [search, setSearch] = useState("")

    const filtered = mockStudents.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.toLowerCase().includes(search.toLowerCase())
    )
    return (
     <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
             <div>
                 <h1 className="text-2xl font-bold text-gray-900">Students</h1>
                 <p className="text-sm text-gray-400 mt-0.5">
                     {mockStudents.length} students registered
                 </p>
             </div>
         </div>

         <div className="relative max-w-sm">
             <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
                 type="text"
                 placeholder="Search by name or ID..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
         </div>
         <div className="grid grid-cols-3 gap-4">
             <div className="bg-white border border-gray-200 rounded-xl p-4">
                 <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Students</p>
                 <p className="text-2xl font-bold text-gray-900">{mockStudents.length}</p>
             </div>
             <div className="bg-white border border-gray-200 rounded-xl p-4">
                 <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Fully Cleared</p>
                 <p className="text-2xl font-bold text-emerald-500">
                     {mockStudents.filter((s) => Object.values(s.clearances).every(Boolean)).length}
                 </p>
             </div>
             <div className="bg-white border border-gray-200 rounded-xl p-4">
                 <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pending Clearance</p>
                 <p className="text-2xl font-bold text-amber-500">
                     {mockStudents.filter((s) => !Object.values(s.clearances).every(Boolean)).length}
                 </p>
             </div>
         </div>

         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
             <table className="w-full text-sm">
                 <thead>
                 <tr className="border-b border-gray-100 bg-gray-50">
                     <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Student</th>
                     <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">ID</th>
                     <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Department</th>
                     <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Clearance Stages</th>
                     <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Progress</th>
                 </tr>
                 </thead>
                 <tbody>
                 {filtered.map((student, index) => {
                     const { total, approved } = getClearanceStatus(student.clearances)
                     const percent = Math.round((approved / total) * 100)

                     return (
                         <motion.tr
                             key={student.id}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: index * 0.05 }}
                             className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                         >
                             <td className="px-5 py-3.5">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                                         {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                     </div>
                                     <div>
                                         <p className="font-medium text-gray-900">{student.name}</p>
                                         <p className="text-xs text-gray-400">{student.level}</p>
                                     </div>
                                 </div>
                             </td>
                             <td className="px-5 py-3.5 text-gray-500">{student.studentId}</td>
                             <td className="px-5 py-3.5 text-gray-500">{student.department}</td>
                             <td className="px-5 py-3.5">
                                 <div className="flex items-center gap-1.5">
                                     {Object.entries(student.clearances).map(([stage, approved]) => (
                                         <div
                                             key={stage}
                                             title={stage}
                                             className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                 approved ? "bg-emerald-50" : "bg-gray-100"
                                             }`}
                                         >
                                             {approved
                                                 ? <CheckCircle size={13} className="text-emerald-500" />
                                                 : <XCircle size={13} className="text-gray-300" />
                                             }
                                         </div>
                                     ))}
                                 </div>
                             </td>
                             <td className="px-5 py-3.5">
                                 <div className="flex items-center gap-2">
                                     <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                         <div
                                             className={`h-full rounded-full ${
                                                 percent === 100 ? "bg-emerald-500" : "bg-blue-500"
                                             }`}
                                             style={`{ width: ${percent}% }`}
                                         />
                                     </div>
                                     <span className="text-xs text-gray-400">{approved}/{total}</span>
                                 </div>
                             </td>
                         </motion.tr>
                     )
                 })}
                 </tbody>
             </table>

             {filtered.length === 0 && (
                 <div className="text-center py-12 text-gray-400 text-sm">
                     No students found
                 </div>
             )}

         </div>
     </div>
    )
}
