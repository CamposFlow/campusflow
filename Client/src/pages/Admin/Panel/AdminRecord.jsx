import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Search, CheckCircle, XCircle, Clock, Eye, FileText } from "lucide-react";
import {PieChart, Pie, Tooltip, ResponsiveContainer, Cell} from "recharts";

const records = [
    {id: 1, studentId: 'STU/2021/1234', name: 'Chukwuemeka Obi', stage: 'Library', documents: 3, status: 'pending', time: '10 mins ago'},
    {id: 2, studentId: 'STU/2021/5678', name: 'Adaeze Nwosu', stage: 'Medical', documents: 5, status: 'approved', time: '1 hr ago'},
    {id: 3, studentId: 'STU/2021/9012', name: 'Emeka Eze', stage: 'Departmental', documents: 4, status: 'rejected', time: '2 hrs ago'},
    {id: 4, studentId: 'STU/2021/3456', name: 'Chioma Ike', stage: 'Library', documents: 2, status: 'pending', time: '3 hrs ago'},
    {id: 5, studentId: 'STU/2021/7890', name: 'Tunde Balogun', stage: 'Medical', documents: 3, status: 'approved', time: '5 hrs ago'},
    {id: 5, studentId: 'STU/2021/7390', name: 'Tumola Balogun', stage: 'Medical', documents: 3, status: 'approved', time: '7 hrs ago'},
]
const tabs = [
    { label: 'Pending', key: 'pending', color: 'text-yellow-600', bg: 'bg-yellow-50', active: 'bg-yellow-500' },
    { label: 'Approved', key: 'approved', color: 'text-green-600', bg: 'bg-green-50', active: 'bg-green-500' },
    { label: 'Rejected', key: 'rejected', color: 'text-red-600', bg: 'bg-red-50', active: 'bg-red-500' },
]


const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Pending' },
    approved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Approved' },
    rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Rejected' },
}
const counts={
    pending :records.filter(r=>r.status === 'pending').length,
    approved :records.filter(r=>r.status === 'approved').length,
    rejected:records.filter(r=>r.status === 'rejected').length,
}
const chartData =[
    {name:'Pending', value:counts.pending, color: '#EAB308'},
    {name:'Approved', value:counts.approved, color: '#22C55E'},
    {name:'Rejected', value:counts.rejected, color: '#EF4444'},
]

export const AdminRecord = () => {
    const [records, setRecords] = useState([
        {id: 1, studentId: 'STU/2021/1234', name: 'Chukwuemeka Obi', stage: 'Library', documents: 3, status: 'pending', time: '10 mins ago'},
        {id: 2, studentId: 'STU/2021/5678', name: 'Adaeze Nwosu', stage: 'Medical', documents: 5, status: 'approved', time: '1 hr ago'},
        {id: 3, studentId: 'STU/2021/9012', name: 'Emeka Eze', stage: 'Departmental', documents: 4, status: 'rejected', time: '2 hrs ago'},
        {id: 4, studentId: 'STU/2021/3456', name: 'Chioma Ike', stage: 'Library', documents: 2, status: 'pending', time: '3 hrs ago'},
        {id: 5, studentId: 'STU/2021/7890', name: 'Tunde Balogun', stage: 'Medical', documents: 3, status: 'approved', time: '5 hrs ago'},
        {id: 6, studentId: 'STU/2021/7390', name: 'Tumola Balogun', stage: 'Medical', documents: 3, status: 'approved', time: '7 hrs ago'},
    ])
    const [activeTab, setActiveTab] = useState('pending')
    const [search, setSearch] = useState('')
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const filteredRecords = records.filter(record => {
        const matchesTab = record.status === activeTab
        const matchesSearch = record.name.toLowerCase().includes(search.toLowerCase()) ||
                            record.studentId.toLowerCase().includes(search.toLowerCase())
        return matchesTab && matchesSearch
    })

    const handleApprove = (id) => {
        setRecords(records.map(r => r.id === id ? { ...r, status: 'approved' } : r))
        setShowModal(false)
    }

    const handleReject = (id) => {
        setRecords(records.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
        setShowModal(false)
    }

    const handleViewDetails = (record) => {
        setSelectedRecord(record)
        setShowModal(true)
    }

    return (

        <div className="space-y-6">
<div>
    <h2 className="text-xl font-bold text-gray-800">Physical Clearance</h2>
    <p className="text-sm text-gray-500 mt-1">Review and Manage student Clearance</p>
</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Pending', count: counts.pending, color: 'text-yellow-600', bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', icon: Clock },
                    { label: 'Approved', count: counts.approved, color: 'text-green-600', bg: 'from-green-50 to-green-100', border: 'border-green-200', icon: CheckCircle },
                    { label: 'Rejected', count: counts.rejected, color: 'text-red-600', bg: 'from-red-50 to-red-100', border: 'border-red-200', icon: XCircle },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{y:-4, boxShadow:"0 8px 20px rgba(0, 0, 0, 0.08)"}}
                        className={`bg-linear-to-br ${stat.bg} border ${stat.border} rounded-2xl p-4 flex items-center justify-between shadow-sm`}
                    >
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
                            <p className={`text-2xl md:text-4xl font-extrabold ${stat.color}`}>{stat.count}</p>
                            <p className="text-xs text-gray-400 mt-1">submissions</p>
                        </div>
                        <stat.icon className={`w-6 h-6 ${stat.color} opacity-20 md:w-10 md:h-10`} />
                    </motion.div>
                ))}
            </div>


            <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm font-semibold text-gray-600 mb-4">Submission Breakdown</p>
                <div className="flex items-center gap-6">

                    <div className="relative w-40 h-40 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-2xl font-extrabold text-gray-800 mt-1">{records.length}</p>
                            <p className="text-xs text-gray-400">Total</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        {chartData.map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500 font-medium">{item.name}</span>
                                    <span className="font-bold text-gray-800">
                            {Math.round((item.value / records.length) * 100)}%
                        </span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.value / records.length) * 100}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex gap-2 relative">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`min-w-0 relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-colors duration-200 z-10
                ${activeTab === tab.key ? tab.color : 'text-gray-400 hover:text-gray-600'}`}
                    >

                        {activeTab === tab.key && (
                            <motion.div
                                layoutId="activeTab"
                                className={`absolute inset-0 rounded-xl ${tab.bg}`}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                style={{ zIndex: -1 }}
                            />
                        )}

                        {tab.label}


                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full 
                ${activeTab === tab.key ? `${tab.active} text-white` : 'bg-gray-100 text-gray-400'}`}>
                {records.filter(r => r.status === tab.key).length}
            </span>

                        {tab.key === 'pending' && records.filter(r => r.status === 'pending').length > 0 && activeTab !== 'pending' && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        )}
                    </button>
                ))}
            </div>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or student ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stage</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Documents</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map((record, index) => (
                                        <motion.tr
                                            key={record.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{record.name}</p>
                                                    <p className="text-xs text-gray-500">{record.studentId}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">{record.stage}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                                    <FileText className="w-4 h-4" />
                                                    {record.documents}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{record.time}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleViewDetails(record)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center">
                                            <p className="text-gray-500 text-sm">No records found for this status.</p>
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {showModal && selectedRecord && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >


                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Clearance Details</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-200 rounded-full px-2 py-1"
                                >
                                    ✕
                                </button>
                            </div>


                            <div className="px-6 py-6 space-y-6">


                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Student Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Name</p>
                                            <p className="font-semibold text-gray-900">{selectedRecord.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Student ID</p>
                                            <p className="font-semibold text-gray-900">{selectedRecord.studentId}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Stage</p>
                                            <p className="font-semibold text-gray-900">{selectedRecord.stage}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm ${statusConfig[selectedRecord.status].bg} ${statusConfig[selectedRecord.status].color}`}>
                                                {(() => {
                                                    const IconComponent = statusConfig[selectedRecord.status].icon
                                                    return <IconComponent className="w-4 h-4" />
                                                })()}
                                                {statusConfig[selectedRecord.status].label}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />


                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Documents Submitted</h4>
                                    <div className="space-y-2">
                                        {Array.from({ length: selectedRecord.documents }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-900">Document {i + 1}</p>
                                                    <p className="text-xs text-gray-500">PDF • 2.3 MB</p>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                                    View
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />


                                {selectedRecord.status === 'pending' && (
                                    <div className="flex gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleApprove(selectedRecord.id)}
                                            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg
                                             font-semibold transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            Approve
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleReject(selectedRecord.id)}
                                            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                                        >
                                            <XCircle className="w-5 h-5" />
                                            Reject
                                        </motion.button>
                                    </div>
                                )}

                                {selectedRecord.status === 'approved' && (
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <p className="text-sm text-green-800 font-semibold flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5" />
                                            This clearance has been approved
                                        </p>
                                    </div>
                                )}

                                {selectedRecord.status === 'rejected' && (
                                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                        <p className="text-sm text-red-800 font-semibold flex items-center gap-2">
                                            <XCircle className="w-5 h-5" />
                                            This clearance has been rejected
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}