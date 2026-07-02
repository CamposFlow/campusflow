import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2 } from "lucide-react"

const IssueCertificateModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        studentName: "",
        studentId: "",
        certificateType: "",
        hash: "",
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        // will connect to backend here later
        setTimeout(() => {
            setLoading(false)
            onClose()
        }, 2000)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Issue Certificate</h2>
                                    <p className="text-xs text-gray-400 mt-0.5">This will be written permanently on-chain</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-lg"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                                        Student Name
                                    </label>
                                    <input
                                        name="studentName"
                                        value={form.studentName}
                                        onChange={handleChange}
                                        placeholder="e.g. Chukwuemeka Obi"
                                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                                        Student ID
                                    </label>
                                    <input
                                        name="studentId"
                                        value={form.studentId}
                                        onChange={handleChange}
                                        placeholder="e.g. FUT/SET/21/0001"
                                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                                        Certificate Type
                                    </label>
                                    <select
                                        name="certificateType"
                                        value={form.certificateType}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    ><option value="">Select type</option>
                                        <option value="B.Tech">B.Tech</option>
                                        <option value="HND">HND</option>
                                        <option value="B.Sc">B.Sc</option>
                                        <option value="M.Sc">M.Sc</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                                        Document Hash
                                    </label>
                                    <input
                                        name="hash"
                                        value={form.hash}
                                        onChange={handleChange}
                                        placeholder="SHA-256 hash of certificate document"
                                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        Generated automatically from the uploaded document
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center gap-3 mt-6">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Writing to chain...
                                        </>
                                    ) : (
                                        "Issue Certificate"
                                    )}
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}

        </AnimatePresence>
    )
}

export default IssueCertificateModal