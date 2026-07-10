import React, {useEffect, useState} from "react"
import {Search, Plus, Eye, ShieldOff, ShieldCheck, Link2, ClipboardPaste, ExternalLink, Copy, Check, X} from "lucide-react"
import {AnimatePresence, motion} from "framer-motion"
import {Button} from "@/components/ui/button.jsx";
import IssueCertificateModal from "@/pages/Admin/Panel/IssueCertificateModal.jsx";
import api from '@/api/axios.js'




const AdminRecords = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const levels = ["100", "200", "300", "400", "500"]
    const [activeLevel, setActiveLevel] = useState("100")
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const [students, setStudents] = useState([]);

    const fetchStudents = async (level) => {
        try {
            const { data } = await api.get(`/admin/students?level=${level}`);
            setStudents(data.students);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchStudents(activeLevel);
    }, [activeLevel]);// fetches when tab changes

    const filtered = students.filter((c) =>
        c.fullname.toLowerCase().includes(search.toLowerCase()) ||
        (c.matric_number || "").toLowerCase().includes(search.toLowerCase())
    )


    const [hashCopied, setHashCopied] = useState(false);

    const handleCopyHash = () => {
        if (!selectedCertificate?.hash) return;
        navigator.clipboard.writeText(selectedCertificate.hash);
        setHashCopied(true);
        setTimeout(() => setHashCopied(false), 1500);
    };
    return (
        <div className="space-y-6">


            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Records</h1>
                    <p className="break-normal text-sm text-gray-400 mt-0.5 ">All certificates issued by your institution</p>
                </div>
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


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                <div className="flex gap-2 overflow-x-auto">
                    {levels.map((level) => (
                        <button
                            key={level}
                            onClick={() => setActiveLevel(level)}
                            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                activeLevel === level
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                        >
                            {level}L
                        </button>
                    ))}
                </div>
            </div>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Student</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Matric Number</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Department</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Level</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((cert, index) => (
                        <motion.tr
                            key={cert.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-5 py-3.5 font-medium text-gray-900">{cert.fullname}</td>
                            <td className="px-5 py-3.5 text-gray-500">{cert.matric_number || "—"}</td>
                            <td className="px-5 py-3.5 text-gray-500">{cert.department || "—"}</td>
                            <td className="px-5 py-3.5 text-gray-500">{cert.level || "—"}</td>
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => {
                                            setSelectedStudent(cert);
                                            setModalOpen(true);
                                        }}
                                        className="bg-transparent hover:bg-green-200 rounded-lg flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
                                    >
                                        <Plus size={13} /> Issue
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            try {
                                                const { data } = await api.get(`admin/certificate/student/${cert.matric_number}`);
                                                if (!data.certificates?.length) {
                                                    alert("No certificate issued for this student yet.");
                                                    return;
                                                }
                                                setSelectedCertificate(data.certificates[0]);
                                                setShowModal(true);
                                            } catch (err) {
                                                console.error("No certificate found for this student");
                                            }
                                        }}
                                        className="bg-transparent hover:bg-blue-200 rounded-lg flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        <Eye size={13} /> View
                                    </Button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}

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
                                    {selectedCertificate?.certificate_type}
                                </h2>

                                <p className="text-sm text-slate-500 mb-8">
                                    Issued by <span className="font-medium text-slate-700">{selectedCertificate?.institution}</span>
                                </p>


                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">This certifies that</p>
                                <p className="text-2xl font-semibold text-slate-900 mb-8 uppercase">
                                    {selectedCertificate?.student_name}
                                </p>

                                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                                    has been verified as the rightful holder of this certificate, with its
                                    authenticity confirmed against an immutable blockchain record.
                                </p>


                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-100">
                                    <div>
                                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">Issue Date</p>
                                        <p className="text-sm font-medium text-slate-800">
                                            {selectedCertificate?.timestamp
                                                ? new Date(Number(selectedCertificate.timestamp) * 1000).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : "—"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">Status</p>
                                        <p className={`text-sm font-medium ${selectedCertificate?.is_valid ? "text-green-600" : "text-red-600"}`}>
                                            {selectedCertificate?.is_valid ? "Valid" : "Revoked"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900 px-4 sm:px-6 py-4 space-y-3">
                                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                                    <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                    <p className="text-[11px] text-slate-400 font-mono truncate flex-1 min-w-0">
                                        {selectedCertificate?.hash}
                                    </p>
                                    <button
                                        onClick={handleCopyHash}
                                        className="shrink-0 text-slate-400 hover:text-white transition-colors"
                                        aria-label="Copy certificate hash"
                                    >
                                        {hashCopied ? (
                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>

                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Button
                                        onClick={() => {
                                            if (selectedCertificate?.tx_signature) {
                                                window.open(
                                                    `https://explorer.solana.com/tx/${selectedCertificate.tx_signature}?cluster=devnet`,
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                );
                                            }
                                        }}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View on Explorer
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            if (selectedCertificate?.certificate_url) {
                                                window.open(selectedCertificate.certificate_url, "_blank", "noopener,noreferrer");
                                            }
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <ClipboardPaste className="w-4 h-4" />
                                        Download
                                    </Button>
                                </div>
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
<IssueCertificateModal
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    student={selectedStudent}
/>
        </div>
    )
}

export default AdminRecords