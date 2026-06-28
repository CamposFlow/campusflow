import React, { useState } from "react"
import {Search, Plus, Eye, ShieldOff, ShieldCheck, Link2, ClipboardPaste, X} from "lucide-react"
import {AnimatePresence, motion} from "framer-motion"
import {Button} from "@/components/ui/button.jsx";
import IssueCertificateModal from "@/pages/Admin/Panel/IssueCertificateModal.jsx";

const years = [ "2022","2023", "2024", "2025"]

const mockCertificates = [
    { id: 1, studentName: "Chukwuemeka Obi", studentId: "FUT/SET/21/0001", type: "B.Tech", date: "2025-06-01", isValid: true },
    { id: 2, studentName: "Adaeze Nwosu", studentId: "FUT/SET/21/0002", type: "B.Tech", date: "2025-06-02", isValid: true },
    { id: 3, studentName: "Emeka Eze", studentId: "FUT/SET/21/0003", type: "B.Tech", date: "2025-06-03", isValid: false },
    { id: 4, studentName: "Ngozi Okonkwo", studentId: "FUT/SET/21/0004", type: "HND", date: "2025-06-04", isValid: true },
    { id: 5, studentName: "Tunde Bakare", studentId: "FUT/SET/21/0005", type: "B.Tech", date: "2025-06-05", isValid: true },
]
const certificateData = {
    studentName: "Eziokwubundu Jenissi Ezichi",
    universityName: "Federal University of Technology, Owerri",
    certificateType: "Bachelor of Engineering — Software Engineering",
    issueDate: "June 15, 2026",
    hash: "0x71c7656ec7ab88b098defb751b7401b5f6d8976",
    verifiedAt: "June 26, 2026, 11:42 AM",
}

const AdminRecords = () => {
    const [isIssueOpen, setIsIssueOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [activeYear, setActiveYear] = useState("2025")
    const [search, setSearch] = useState("")

    const filtered = mockCertificates.filter((c) =>
        c.studentName.toLowerCase().includes(search.toLowerCase()) ||
        c.studentId.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">


            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Records</h1>
                    <p className="break-normal text-sm text-gray-400 mt-0.5 ">All certificates issued by your institution</p>
                </div>
                <Button
                    onClick={() => setIsIssueOpen(true)}
                    className="whitespace-nowrap flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm
                 font-medium px-4 py-2.5 rounded-lg transition-colors">
                    <Plus size={16} />
                    Issue Certificate
                </Button>
            </div>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex gap-2 relative">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            activeYear === year
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        {year}
                    </button>
                ))}
            </div>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Student</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Student ID</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Type</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Date Issued</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <AnimatePresence>
                    {filtered.map((cert, index) => (
                        <motion.tr
                            key={cert.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-5 py-3.5 font-medium text-gray-900">{cert.studentName}</td>
                            <td className="px-5 py-3.5 text-gray-500">{cert.studentId}</td>
                            <td className="px-5 py-3.5 text-gray-500">{cert.type}</td>
                            <td className="px-5 py-3.5 text-gray-500">{cert.date}</td>
                            <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      cert.isValid
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                  }`}>
                    {cert.isValid ? "Valid" : "Revoked"}
                  </span>
                            </td>
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                    <button
onClick={() => setShowModal(true)}
                                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                                        <Eye size={13} /> View
                                    </button>
                                    {cert.isValid && (
                                        <button className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium">
                                            <ShieldOff size={13} /> Revoke
                                        </button>
                                    )}
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>

                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">
                        No certificates found
                    </div>
                )}
            </div>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 22, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 sm:p-10">


                                <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>


                                <p className="text-[11px] font-semibold text-green-500 uppercase tracking-widest mb-6">
                                    Certificate of Authenticity
                                </p>


                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                                    {certificateData.certificateType}
                                </h2>

                                <p className="text-sm text-slate-500 mb-8">
                                    Issued by <span className="font-medium text-slate-700">{certificateData.universityName}</span>
                                </p>


                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">This certifies that</p>
                                <p className="text-2xl font-semibold text-slate-900 mb-8">
                                    {certificateData.studentName}
                                </p>

                                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                                    has been verified as the rightful holder of this certificate, with its
                                    authenticity confirmed against an immutable blockchain record.
                                </p>


                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-100">
                                    <div>
                                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">Issue Date</p>
                                        <p className="text-sm font-medium text-slate-800">{certificateData.issueDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">Verified At</p>
                                        <p className="text-sm font-medium text-slate-800">{certificateData.verifiedAt}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 px-4 py-4 flex items-center justify-between gap-2">
                                <div className="flex flex-row whitespace-nowrap gap-1">
                                    <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                    <p className="text-[11px] text-slate-400 font-mono truncate">
                                        {certificateData.hash}
                                    </p>
                                </div>
                                <div> <Button
                                    onClick={() => console.log("download triggered - wire this up later")}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <ClipboardPaste className="w-4 h-4" />
                                    Download Certificate
                                </Button></div>
                            </div>


                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
s
        </div>
    )
}

export default AdminRecords