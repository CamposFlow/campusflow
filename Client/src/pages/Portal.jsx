import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {toast} from "sonner";
import { motion, AnimatePresence } from "framer-motion"
import {Footer} from "@/components/Footer.jsx";
import api from '@/api/axios.js';
import {
    Menu, X, ShieldCheck, Link2, ClipboardPaste,
    Lock, Network, Globe, FileSearch, Check,
    ExternalLink, XCircle, Eye, EyeOff
} from "lucide-react"

import VerifyNav from "@/components/VerifyNav.jsx";

const Portal = () => {
    const STEPS = ["name", "privacy", "hash"]

    const [hash, setHash] = useState("")
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showCertificate, setShowCertificate] = useState(false)
    const [showDocument, setShowDocument] = useState(false)

    const handleVerify = async () => {
        setLoading(true);
        setShowDocument(false);
        try {
            const { data } = await api.post("/verify", {
                document_hash: hash.trim(),
                verifier_org: verifierName.trim(),
            });
            setResult(data);
            if (data.success) {
                setShowCertificate(true);
                if (data.verified) {
                    notify();
                } else {
                    toast.error("Certificate found, but it has been revoked.");
                }
            } else {
                notifyError();
            }
        } catch (err) {
            console.error("Verification request failed:", err);
            setResult({ success: false, verified: false, message: "Certificate not found." });
            notifyError();
        } finally {
            setLoading(false);
        }
    };
    // stepper state
    const [currentStep, setCurrentStep] = useState("name")
    const [verifierName, setVerifierName] = useState("")
    const [privacyOpen, setPrivacyOpen] = useState(false)
    const [privacyAccepted, setPrivacyAccepted] = useState(false)


    const works =[
        {
            icon:<Lock className="w-5 h-5 text-blue-600" />,
            h4 : "Secure Hash Algorithm",
            p: "Uses Industry-Standard SHA-256 encryption to ensure data integrity"
        },
        {
            icon:<Network className="w-5 h-5 text-blue-600" />,
            h4:"Distributed Ledger",
            p:"Immutable records stored across multiple institutional nodes"
        },
        {
            icon:<Globe className="w-5 h-5 text-blue-600" />,
            h4:"Publicly Verifiable",
            p:"No account required. Open access for employers and institutions"
        }
    ]


    const steps =[
        {
            number :1,
            icon:<FileSearch className="w-6 h-6 text-blue-600"/>,
            title: "Get the Document Hash",
            description:"Every Official CampusFlow document has a unique 64-character hash printed at the footer." +
                " Copy that hash from the document you wish to verify"},
        {
            number :2,
            icon: <ClipboardPaste className="w-6 h-6 text-blue-600"/>,
            title:"Paste and Verify",
            description: "Paste the hash into the input field above and click Verify. The system instantly" +
                "queries the blockchain and check the record"
        },
        {
            number:3,
            icon :<ShieldCheck className="w-6 h-6 text-blue-600"/>,
            title: "Get Instant Result",
            description:"Within seconds you'll see whether the document is authentic or not - including the certificate name" +
                ", who issued it, who it was issued to and the blockchain timestamp proof"
        }
    ]
    const notify = () => toast.success("Document Verified")
    const notifyError = () => toast.error("Document Not Verified")
    const [verifying, setVerifying] = useState(false)

    return (
        <div className="min-h-screen bg-[#EFF6FF]">
            <VerifyNav/>

            <section>
                <div className="pt-20 pb-32 px-6 relative overflow-hidden">
                    <motion.div
                        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-20 -left-20 w-[420px] h-[420px] bg-blue-400/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 right-0 w-[380px] h-[380px] bg-blue-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-300/25 rounded-full blur-3xl"
                    />
                    <div className="max-w-6xl mx-auto relative ">

                        <AnimatePresence mode="wait">
                            {!verifying ? (
                                <motion.div
                                    key="hero"
                                    initial={{opacity:1}}
                                    exit={{opacity:0, y:-20}}
                                    transition={{duration:0.4}}
                                    className="max-w-xl mx-auto px-4 mt-3 text-center sm:mx-0 sm:px-0 sm:text-left sn:ml-5"
                                >



                                    <div className="max-w-xl">
                                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            Blockchain Powered Verification
                                        </div>

                                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-5">
                                            Verify any certificate
                                            <br />
                                            <span className="text-blue-500"> in three steps</span>
                                        </h1>

                                        <p className="text-slate-500 text-base leading-relaxed max-w-md">
                                            Confirm who you are, accept the terms, then check a document's
                                            authenticity directly against the blockchain record.
                                        </p>

                                        <button
                                            onClick={()=> setVerifying(true)}
                                            className="mt-8 flex items-center gap-2 bg-blue-600
                hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl
                font-semibold transition-all hover:scale-105
                hover:shadow-lg hover:shadow-blue-200">
                                            Click to verify
                                        </button>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                                        transition={{
                                            duration: 0.7,
                                            delay: 0.5,
                                            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                                        }}
                                        className="hidden md:flex flex-col absolute right-0 bottom-0 translate-y-1/2 w-[320px] bg-white rounded-2xl border border-gray-100 shadow-xl p-6">

                                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-4">
                                            Steps Involved  {" "}  ( Step {STEPS.indexOf(currentStep) + 1} of {STEPS.length})
                                        </p>

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
                                        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1.5 ${currentStep === "privacy" ? "bg-blue-50" : "opacity-40"}`}>
                                            <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-xs shrink-0">2</div>
                                            <p className="text-sm text-slate-500">Accept privacy terms</p>
                                        </div>

                                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-4 opacity-40">
                                            <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-xs shrink-0">3</div>
                                            <p className="text-sm text-slate-500">Paste certificate hash</p>
                                        </div>

                                        <Button

                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-2 text-sm font-medium">
                                            Continue
                                        </Button>

                                    </motion.div>

                                </motion.div>
                            ) : (
                                <motion.div
                                    key="stepper"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="max-w-md mx-auto w-full mt-4"
                                >
                                    {/* Small header above the card */}
                                    <div className="text-center mb-6">
                                        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide mb-2">
                                            Certificate Verification
                                        </p>
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            Let's confirm a few things
                                        </h2>
                                    </div>

                                    {/* The actual card */}
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 overflow-hidden">
                                        <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-blue-600 rounded-full"
                                                animate={{ width: `${((STEPS.indexOf(currentStep) + 1) / STEPS.length) * 100}%` }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                            />
                                        </div>

                                        <div className="relative min-h-[180px]">
                                            <AnimatePresence mode="wait">
                                                {currentStep === "name" && (
                                                    <motion.div
                                                        key="step-name"
                                                        initial={{ opacity: 0, y: 40 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -40 }}
                                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    >
                                                        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide mb-2">
                                                            Step 1 of {STEPS.length}
                                                        </p>
                                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                                            What's your name?
                                                        </h3>
                                                        <p className="text-sm text-slate-500 mb-5">
                                                            We'll attach this to the verification record.
                                                        </p>

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
                                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-5"
                                                        />

                                                        <Button
                                                            onClick={() => verifierName.trim() && setCurrentStep("privacy")}
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium"
                                                        >
                                                            Continue
                                                        </Button>
                                                    </motion.div>
                                                )}
                                                {currentStep === "privacy" && (
                                                    <motion.div
                                                        key="step-privacy"
                                                        initial={{ opacity: 0, y: 40 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -40 }}
                                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    >
                                                        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide mb-2">
                                                            Step 2 of {STEPS.length}
                                                        </p>
                                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                                            Privacy &amp; consent
                                                        </h3>
                                                        <p className="text-sm text-slate-500 mb-4">
                                                            Quick read before we check the document.
                                                        </p>

                                                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
                                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                                We'll check your name and the document hash against records stored
                                                                on-chain. No file contents are uploaded — only the cryptographic hash
                                                                you provide is compared.
                                                            </p>
                                                        </div>

                                                        <label className="flex items-center gap-2 mb-5 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={privacyAccepted}
                                                                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                                                className="w-4 h-4 accent-blue-600"
                                                            />
                                                            <span className="text-sm text-slate-700">I understand and agree</span>
                                                        </label>

                                                        <div className="flex gap-3">
                                                            <Button
                                                                onClick={() => setCurrentStep("name")}
                                                                className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 rounded-lg py-2.5 text-sm font-medium"
                                                            >
                                                                Back
                                                            </Button>
                                                            <Button
                                                                onClick={() => privacyAccepted && setCurrentStep("hash")}
                                                                disabled={!privacyAccepted}
                                                                className={`flex-1 rounded-lg py-2.5 text-sm font-medium text-white ${
                                                                    privacyAccepted ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                                                                }`}
                                                            >
                                                                Continue
                                                            </Button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                                {currentStep === "hash" && (
                                                    <motion.div
                                                        key="step-hash"
                                                        initial={{ opacity: 0, y: 40 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -40 }}
                                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    >
                                                        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide mb-2">
                                                            Step 3 of {STEPS.length}
                                                        </p>

                                                        {result && !result.success && (
                                                            <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                                                {result.message}
                                                            </p>
                                                        )}

                                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                                            Paste the document hash
                                                        </h3>
                                                        <p className="text-sm text-slate-500 mb-5">
                                                            Found at the footer of official CampusFlow certificates.
                                                        </p>

                                                        <div className="relative mb-5">
                                                            <Link2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                            <input
                                                                autoFocus
                                                                type="text"
                                                                value={hash}
                                                                onChange={(e) => setHash(e.target.value)}
                                                                placeholder="e.g. 0x71c7656e..."
                                                                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                            />
                                                        </div>

                                                        <div className="flex gap-3">
                                                            <Button
                                                                onClick={() => setCurrentStep("privacy")}
                                                                className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 rounded-lg py-2.5 text-sm font-medium"
                                                            >
                                                                Back
                                                            </Button>
                                                            <Button
                                                                onClick={handleVerify}
                                                                disabled={!hash.trim() || loading}
                                                                className={`flex-1 rounded-lg py-2.5 text-sm font-medium text-white ${
                                                                    hash.trim() && !loading ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                                                                }`}
                                                            >
                                                                {loading ? "Verifying..." : "Verify"}
                                                            </Button>
                                                        </div>

                                                    </motion.div>

                                                )}

                                            </AnimatePresence>
                                        </div>
                                    </div>


                                    <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Hash-only check
            </span>
                                        <span className="flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" />
                Verified on-chain
            </span>
                                    </div>
                                    <p className="text-slate-700 text-center text-sm leading-relaxed mt-4 border-l-2 border-blue-200 pl-4">
                                        Every CampusFlow certificate is hashed and recorded on the Solana
                                        blockchain the moment it's issued. When you verify a document, we check
                                        that exact hash against the permanent on-chain record — no institution
                                        can alter it afterward, and no login is required.
                                    </p>
                                </motion.div>
                            )}

                        </AnimatePresence>

                    </div>

                </div>

            </section>

            <section id="works1" className="bg-gray-100 py-20 px-8">
                <div className="text-center mb-14">
                    <span className="text-blue-600 text-xl tracking-widest font-semibold uppercase">Simple Process</span>
                    <h2 className="text-3xl font-bold mt-2">
                        How it Works
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                        Verify Academic Certificate or Document in three simple steps - no account Required
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card flex flex-col items-center text-center">
                            <div className="step-number w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-3xl mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-110 relative">
                                {step.number}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent" />
                            </div>
                            <div className="step-card-content bg-white rounded-2xl p-7 w-full hover:shadow-2xl border border-gray-200 transition-all duration-300 group hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/80
                                hover:to-blue-100/40 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5
                                     group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="bg-blue-50 w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100
                                         transition-all duration-300 group-hover:shadow-lg">
                                        {step.icon}
                                    </div>
                                    <h3 className="group-hover:text-blue-900 font-bold text-gray-900 text-lg mb-2 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>




            </section>
            <section id="features1" className="bg-white py-20 px-8">
                <div className="text-center mb-14">
                    <span className="text-blue-600 text-2xl tracking-widest font-semibold uppercase">Features</span>

                    <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                        A simple step process powered by blockchain that makes document verification instant, tamper-proof
                        and globally accessible
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {
                        works.map((work, index) => (
                            <div key={index}
                                 className="feature-card bg-white rounded-2xl p-7 sm:p-8 border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-blue-100/40 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none" />
                                <div className="bg-blue-50 w-14 h-14 flex items-center justify-center rounded-xl shrink-0 group-hover:bg-blue-100 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                                    {work.icon}
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg mt-5 mb-2 group-hover:text-blue-900 transition-colors duration-300">
                                    {work.h4}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{work.p}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
            <AnimatePresence>
                {showCertificate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowCertificate(false)}
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

                                <div className={`absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                                    result?.verified ? "bg-green-500" : "bg-red-500"
                                }`}>
                                    {result?.verified ? (
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-white" />
                                    )}
                                </div>

                                <p className={`text-[11px] font-semibold uppercase tracking-widest mb-6 ${
                                    result?.verified ? "text-green-500" : "text-red-500"
                                }`}>
                                    {result?.verified ? "Certificate of Authenticity" : "Certificate Revoked"}
                                </p>

                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                                    {result?.certificate?.certificateType || "—"}
                                </h2>

                                <p className="text-sm text-slate-500 mb-8">
                                    Issued by <span className="font-medium text-slate-700">{result?.certificate?.institution || "—"}</span>
                                </p>

                                {/* This certifies that */}
                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">This certifies that</p>
                                <p className="text-2xl font-semibold text-slate-900 mb-1 uppercase">
                                    {result?.certificate?.studentName || "—"}
                                </p>
                                <p className="text-xs text-slate-400 font-mono mb-8">
                                    Matric No. {result?.certificate?.matricNumberMasked || "—"}
                                </p>

                                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                                    {result?.verified
                                        ? "has been verified as the rightful holder of this certificate, with its authenticity confirmed against an immutable blockchain record."
                                        : "was issued this certificate, but it has since been revoked by the issuing institution. It should no longer be treated as valid."}
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-100">
                                    <div>
                                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">Issue Date</p>
                                        <p className="text-sm font-medium text-slate-800">
                                            {result?.certificate?.issuedOn
                                                ? new Date(Number(result.certificate.issuedOn) * 1000).toLocaleDateString("en-US", {
                                                    year: "numeric", month: "long", day: "numeric",
                                                })
                                                : "—"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">Status</p>
                                        <p className={`text-sm font-medium ${result?.verified ? "text-green-600" : "text-red-600"}`}>
                                            {result?.verified ? "Valid" : "Revoked"}
                                        </p>
                                    </div>
                                </div>

                                {showDocument && result?.certificate?.certificateUrl && (
                                    <div className="mt-6 pt-6 border-t border-blue-100">
                                        <img
                                            src={result.certificate.certificateUrl}
                                            alt="Certificate document"
                                            className="w-full rounded-lg border border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-900 px-4 py-4 flex flex-col gap-3">
                                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                                    <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                    <p className="text-[11px] text-slate-400 font-mono truncate flex-1 min-w-0">
                                        {result?.proof?.hash || "—"}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        onClick={() => {
                                            if (result?.proof?.explorerUrl) {
                                                window.open(result.proof.explorerUrl, "_blank", "noopener,noreferrer");
                                            }
                                        }}
                                        disabled={!result?.proof?.explorerUrl}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Verify on Explorer
                                    </Button>

                                    <Button
                                        onClick={() => setShowDocument((prev) => !prev)}
                                        disabled={!result?.certificate?.certificateUrl}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        {showDocument ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        {showDocument ? "Hide Document" : "View Document"}
                                    </Button>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowCertificate(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer/>
        </div>
    )
}

export default Portal