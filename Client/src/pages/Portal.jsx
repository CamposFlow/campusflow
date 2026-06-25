import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
    Menu, X, ShieldCheck, Link2, ClipboardPaste,
    Lock, Network, Globe, FileSearch, Check
} from "lucide-react"
import { Disclosure, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll"
import Loaders from "@/components/Loaders.jsx"
import Navbar from "@/components/Navbar.jsx";

const Portal = () => {
    const STEPS = ["name", "privacy", "hash"]
    // verification result state (unchanged behavior from before)
    const [hash, setHash] = useState("")
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    // stepper state
    const [currentStep, setCurrentStep] = useState("name")   // "name" | "privacy" | "hash"
    const [verifierName, setVerifierName] = useState("")
    const [privacyOpen, setPrivacyOpen] = useState(false)
    const [privacyAccepted, setPrivacyAccepted] = useState(false)

    const notify = () => toast.success("Document Verified")
    const notifyError = () => toast.error("Document Not Verified")

    return (
        <div className="min-h-screen bg-[#EFF6FF]">
          <Navbar/>
            <div className="pt-20 pb-32 px-6 relative ">

                <div className="max-w-6xl mx-auto relative ">

                    {/* Headline block */}
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Blockchain Powered Verification
                        </div>

                        <h1 className="text-5xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-5">
                            Verify any certificate
                            <br />
                            in three steps
                        </h1>

                        <p className="text-slate-500 text-base leading-relaxed max-w-md">
                            Confirm who you are, accept the terms, then check a document's
                            authenticity directly against the blockchain record.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                        transition={{
                            duration: 0.7,
                            delay: 1,
                            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                        }}
                        className="absolute right-0 bottom-0 translate-y-1/2 w-[320px] bg-white rounded-2xl border border-gray-100 shadow-xl p-6">

                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-4">
                            Step {STEPS.indexOf(currentStep) + 1} of {STEPS.length}
                        </p>

                        {/* Step row — Name */}
                        <div
                            onClick={() => verifierName && setCurrentStep("name")}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1.5 transition-colors ${
                                currentStep === "name" ? "bg-blue-50" : verifierName ? "cursor-pointer hover:bg-gray-50" : "opacity-40"
                            }`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                                verifierName && currentStep !== "name" ? "bg-blue-600 text-white" : currentStep === "name" ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-400"
                            }`}>
                                {verifierName && currentStep !== "name" ? <Check className="w-3.5 h-3.5" /> : "1"}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] text-blue-700">Verifier name</p>

                                {currentStep === "name" ? (
                                    <input
                                        autoFocus
                                        type="text"
                                        value={verifierName}
                                        onChange={(e) => setVerifierName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && verifierName.trim()) {
                                                setCurrentStep("privacy")
                                            }
                                        }}
                                        placeholder="Your full name"
                                        className="w-full text-sm font-medium text-slate-900 placeholder:text-gray-300 outline-none bg-transparent"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-slate-900 truncate">
                                        {verifierName || "Your full name"}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Step row — Privacy (placeholder for now) */}
                        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1.5 ${currentStep === "privacy" ? "bg-blue-50" : "opacity-40"}`}>
                            <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-xs shrink-0">2</div>
                            <p className="text-sm text-slate-500">Accept privacy terms</p>
                        </div>

                        {/* Step row — Hash (placeholder for now) */}
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-4 opacity-40">
                            <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-xs shrink-0">3</div>
                            <p className="text-sm text-slate-500">Paste certificate hash</p>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-2 text-sm font-medium">
                            Continue
                        </Button>

                    </motion.div>
                </div>
            </div>

            {/* spacer so the next section isn't crowded by the overlapping card */}
            <div className="h-24" />



        </div>
    )
}

export default Portal