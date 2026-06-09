import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ShieldX, Link2, ClipboardPaste } from "lucide-react"
import { Link } from "react-scroll"

const Portal = ()=>{
    const [hash, setHash] = useState("")
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleVerify = () => {
        if (!hash) return
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setResult("success")
        }, 1500)
    }
    return(
//         <div className="min-h-screen bg-white">
// <div style={{background:"linear-gradient(135deg, #0F1F3D 0%, #1a3a6b 50%, #0F1F3D 100%)"}}>
//
// <nav className="bg-gray-200 py-3 px-8">
//     <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <div className="flex items-center gap-2">
//             <img src="./logo.png" alt="logo" className="w-8 h-8"/>
//             <div>
//                 <p className="text-black font-bold text-base leading-none">Campus<span className="text-blue-600">Flow</span></p>
//                 <p className="text-gray-600 text-xs">Document Verification Portal</p>
//             </div>
//         </div>
//
//         <div className="hidden md:flex items-center gap-8">
//             {
//                 tags.map((tag,index)=>(
//                     <Link key={index} to={tag.to} className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium">{tag.name}</Link>
//                 ))
//             }
//         </div>
//     </div>
// </nav>
//
//             <div className="bg-white py-16 px-8 text-center">
// <div className="max-w-2xl mx-auto">
// <h1 className="text-4xl font-bold text-gray-700 mb-4">
// Document Verification Portal
// </h1>
//     <p className="text-gray-600 text-sm leading-relaxed">Verify authenticity of academic documents and
//     certificate using <span className="font-semibold"> blockchain technology</span></p>
// </div>
//             </div>
// </div>        </div>'

        <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

            <nav className="w-full bg-white border-b border-gray-100 px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="./logo.png" alt="CampusFlow" className="w-9 h-9" />
                        <span className="font-bold text-xl text-navy">Campus<span className="text-blue-600">Flow</span></span>
                    </Link>
                    <div className="flex items-center gap-8">
                        <Link to="/" className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer">Verify Document</Link>
                        <Link to="/" className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer">How it Works</Link>
                    </div>
                    <Link to="/login">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                            Staff Login
                        </Button>
                    </Link>
                </div>
            </nav>


            <div className="bg-navy py-20 px-8 text-center relative overflow-hidden">


                <div className="absolute inset-0 opacity-5"
                     style={{
                         backgroundImage: `radial-gradient(circle at 20% 50%, #2563EB 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, #2563EB 0%, transparent 50%)`
                     }}
                />
                <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs px-4 py-1.5 rounded-full mb-6">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Blockchain Powered Verification
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Document Verification Portal
                    </h1>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Verify the authenticity of academic documents and certificates
                        using <span className="text-white font-semibold">blockchain technology.</span>
                    </p>
                </div>
            </div>

            {/* Verify Card */}
            <div className="max-w-2xl mx-auto px-8 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                    <p className="text-sm font-semibold text-navy mb-2">
                        Paste Document Hash to Verify
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                        The hash is a unique 64-character identifier found at the footer of official CampusFlow documents.
                    </p>

                    <div className="flex gap-3">
                        <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 gap-2">
                            <Link2 className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                placeholder="e.g. 0x71C7656EC7ab88b098defB..."
                                className="flex-1 py-3 text-sm outline-none text-gray-700 placeholder:text-gray-300"/>
                            <ClipboardPaste
                                className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600 shrink-0"
                                onClick={() => navigator.clipboard.readText().then(setHash)}
                            />
                        </div>
                        <Button
                            onClick={handleVerify}
                            disabled={loading || !hash}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                        <p className="text-xs text-gray-400">
                            All verifications are secure and powered by blockchain
                        </p>
                    </div>

                </div>
            </div>


            {result && (
                <div className="max-w-2xl mx-auto px-8 mt-6">


                    {result === "success" && (
                        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-green-600 text-lg">Certificate Verified</h3>
                                    <p className="text-gray-500 text-sm">This document is authentic and verified on the blockchain.</p>
                                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mt-2">
                    <ShieldCheck className="w-3 h-3" />
                    Blockchain Verified
                  </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Certificate Name</p>
                                    <p className="font-semibold text-navy">NYSC Exemption Certificate</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Date Issued</p>
                                    <p className="font-semibold text-navy">March 20, 2025</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Issued By</p>
                                    <p className="font-semibold text-navy">Federal University of Technology, Owerri</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Issued To</p>
                                    <p className="font-semibold text-navy">Jenissi Ezichi (FUTO/2022/12345)</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-400 text-xs mb-1">Blockchain Timestamp</p>
                                    <p className="font-semibold text-navy">May 10, 2025, 10:24:32 AM (UTC)</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-400 text-xs mb-1">Transaction Hash</p>
                                    <p className="font-semibold text-blue-600 text-xs">0x7aC4D05E...7A21B9F3C6D4E</p>
                                </div>
                            </div>
                        </div>
                    )}


                    {result === "failed" && (
                        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                                    <ShieldX className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-red-600 text-lg">Verification Failed</h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Certificate not found or may be invalid. Please confirm the hash and try again.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
            <div className="pb-20" />

        </div>

    )
}

export default Portal;