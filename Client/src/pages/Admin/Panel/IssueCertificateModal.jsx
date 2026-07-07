import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, Upload, FileText, CheckCircle2 } from "lucide-react"
import api from "@/api/axios.js"

const IssueCertificateModal = ({ isOpen, onClose, student }) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [file, setFile] = useState(null)
    const [certificateType, setCertificateType] = useState("")
    const [institution, setInstitution] = useState("")
    const fileInputRef = useRef(null)

    const reset = () => {
        setLoading(false)
        setSuccess(false)
        setError("")
        setFile(null)
        setCertificateType("")
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    const handleSubmit = async () => {
        if (!certificateType || !institution || !file) {
            setError("All fields are required.")
            return
        }
        try {
            setLoading(true)
            setError("")
            const formData = new FormData()
            formData.append("certificate", file)
            formData.append("studentName", student.fullname)
            formData.append("matricNumber", student.matric_number)
            formData.append("certificateType", certificateType)
            formData.append("institution", student.university)

            await api.post("/admin/upload-certificate", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setSuccess(true)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to issue certificate.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 z-40"
                    />
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
                                <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-lg">
                                    <X size={16} />
                                </button>
                            </div>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                                    <h3 className="font-bold text-gray-800">Certificate Issued!</h3>
                                    <p className="text-xs text-gray-400">Successfully recorded on-chain and saved.</p>
                                    <button onClick={handleClose} className="mt-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">

                                        {/* Student info — prefilled, read only */}
                                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                                            <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">Issuing For</p>
                                            <p className="text-sm font-bold text-gray-800">{student?.fullname}</p>
                                            <p className="text-xs text-gray-500">{student?.matric_number || "No matric number"}</p>
                                        </div>

                                        {/* Certificate Type */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 mb-1 block">Certificate Type</label>
                                            <select
                                                value={certificateType}
                                                onChange={(e) => setCertificateType(e.target.value)}
                                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                            >
                                                <option value="">Select type</option>
                                                <option value="B.Tech">B.Tech</option>
                                                <option value="HND">HND</option>
                                                <option value="B.Sc">B.Sc</option>
                                                <option value="M.Sc">M.Sc</option>
                                                <option value="PhD">PhD</option>
                                            </select>
                                        </div>

                                        {/* Institution */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 mb-1 block">Institution</label>
                                            <input
                                                value={student.university}
                                                onChange={(e) => setInstitution(e.target.value)}
                                                placeholder="e.g. Federal University of Technology Owerri"
                                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        {/* File Upload */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 mb-1 block">Certificate Document</label>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                className="hidden"
                                            />
                                            {!file ? (
                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                                                >
                                                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                                    <p className="text-sm font-semibold text-gray-600">Click to upload</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">PDF, PNG, JPG — max 10MB</p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-green-500 shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800 truncate max-w-[220px]">{file.name}</p>
                                                            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {error && (
                                            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center gap-3 mt-6">
                                        <button
                                            onClick={handleClose}
                                            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading || !certificateType || !institution || !file}
                                            className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                                        >
                                            {loading ? (
                                                <><Loader2 size={14} className="animate-spin" /> Writing to chain...</>
                                            ) : (
                                                "Issue Certificate"
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default IssueCertificateModal