import { useState } from "react"
import { Button } from "@/components/ui/button"
import toast, {Toaster} from "react-hot-toast";
import {Disclosure, Transition} from "@headlessui/react";
import {ClipboardIcon, ShieldCheckIcon, ShieldXIcon} from "@animateicons/react/lucide"
import {
    Menu,
    X,
    ShieldCheck,
    Link2,
    ClipboardPaste,
    Lock,
    Network,
    Globe,
    FileSearch
} from "lucide-react"
import { Link } from "react-router-dom"
import { Link as ScrollLink} from "react-scroll";
const Portal = ()=>{
    const [hash, setHash] = useState("")
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const notify = () => toast.success('Document Verified')
    const notifyError = () => toast.error('Document Not Verified')
    const pasted = ()=>toast.success("Hash Pasted")
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

    const handleVerify = () => {
        if (!hash) return
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setResult("success")
        }, 1500)
        notify();
    }
    return(

        <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

            <Disclosure as="nav" className="w-full bg-white border-b border-gray-100 px-8 py-4">

                {({open})=>(
                    <>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="./logo.png" alt="CampusFlow" className="w-9 h-9" />
                        <span className="font-bold text-xl text-navy">Campus<span className="text-blue-600">Flow</span></span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <ScrollLink  to="works"
                                     smooth={true}
                                     duration={500} className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer">How It Works</ScrollLink>
                        <ScrollLink  to="features"
                                     smooth={true}
                                     duration={500} className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer">Features</ScrollLink>
                    </div>

                    <Link to="/" className="hidden md:flex">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                            Back Home
                        </Button>
                    </Link>
                    <Disclosure.Button className="md:hidden">
                        {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/> }
                    </Disclosure.Button>
                </div>
                <Transition
                    enter="transition ease-out duration-500"
                    enterFrom="transform opacity-0 translate-y-8"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-400"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 translate-y-2"
                >
                    <Disclosure.Panel className="md:hidden flex flex-col px-6 pb-4 gap-3 pt-4 w-35">
                        <ScrollLink  to="works"
                                     smooth={true}
                                     duration={500} className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer">How It Works</ScrollLink>
                        <ScrollLink  to="features"
                                     smooth={true}
                                     duration={500} className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer">Features</ScrollLink>

                    </Disclosure.Panel>
                    </Transition>
                    </>
                )}
            </Disclosure>


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


            <div className="max-w-2xl mx-auto px-8 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                    <p className="text-sm font-semibold text-navy mb-2">
                        Paste Document Hash to Verify
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                        The hash is a unique 64-character identifier found at the footer of official CampusFlow documents.
                    </p>

                    <div className="flex gap-3 min-w-0">
                        <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 gap-2 min-w-0">
                            <Link2 className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                placeholder="e.g. 0x71C7656EC7ab88b098defB..."
                                className="flex-1 min-w-0 py-3 text-sm outline-none text-gray-700 placeholder:text-gray-300"/>
                            <ClipboardIcon
                                className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600 shrink-0"
                                duration={1}
                                onClick={async ()=>{
                                    const text = await navigator.clipboard.readText()
                                    setHash(text)
                                    pasted()

                                }}
                            />
                        </div>
                        <Button
                            onClick={handleVerify}
                            disabled={loading || !hash}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5"
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </Button>
                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                            className:'',
                            style: {
                                border:'1px solid blue',
                                color:'white',
                                padding:'8px',
                                backgroundColor:'navy',
                            },
                        }}/>
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
                                    <ShieldCheckIcon className="w-6 h-6 text-green-600" duration={1.5} />
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
                                    <ShieldXIcon className="w-6 h-6 text-red-600" />
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
            <div className="pb-15" />

<section id="works" className="bg-gray-100 py-20 px-8">
    <div className="text-center mb-14">
        <span className="text-blue-600 text-xl tracking-widest font-semibold uppercase">Simple Process</span>
        <h2 className="text-3xl font-bold mt-2">
            How it Works
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
           Verify Academic Certificate or Document in three simple steps - no account Required
        </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 relative gap-8">
        {
            steps.map((step,index)=>(
                <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 relative z-10">
                        {step.number}
                    </div>
                    <div className="bg-gray-100 hover:bg-gray-200 rounded-2xl p-6 w-full hover:shadow-lg">
                        <div className="bg-blue-50 w-12 h-12 rounded-b-2xl
    mx-auto mb-4 rounded-r-2xl flex items-center justify-center">
                            {step.icon}
                        </div>
                        <h3 className="font-bold text-lg mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                </div>
            ))
        }

    </div>



</section>
            <section id="features" className="bg-white py-20 px-8">
                <div className="text-center mb-14">
                    <span className="text-blue-600 text-2xl tracking-widest font-semibold uppercase">Features</span>

                    <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                        A simple step process powered by blockchain that makes document verification instant, tamper-proof
                        and globally accessible
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 relative gap-8">
                    {
                        works.map((work, index) => (
                            <div key={index}
                                 className="bg-white rounded-xl p-5 border border-gray-100 shadow-lg hover:bg-gray-100">
                                <div className="bg-blue-100 w-10 h-10 rounded-b-lg rounded-r-lg flex items-center justify-center mb-3">
                                    {work.icon}
                                </div>
                                <h4 className="font-semibold text-sm text-black mb-1">
                                    {work.h4}
                                </h4>
                                <p className="text-gray-400 text-xs leading-relaxed">{work.p}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
            <footer className="mt-16 bg-navy" py-10 px-8>
<div className="max-w-5xl mx-auto text-center">
    <div className="flex items-center justify-center gap-2 mb-3 pt-4">
        <img src="./logo.png" className="w-7 h-7" alt="CampusFlow"/>
        <span className="text-white font-bold">Campus<span className="text-blue-600">Flow</span></span>
    </div>
<p className="text-white/40 text-sm mb-4">
    Building a secure, transparent, and efficient Campus Experience with Blockchain Technology
</p>
    <div className="flex items-center justify-center gap-6 text-white/50 text-xs">
        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
        <span className="hover:text-white cursor-pointer">Terms of Service</span>
        <span className="hover:text-white cursor-pointer">Contact Support</span>
    </div>
    <p className="text-white/30 text-sm pb-4 pt-4">
        &copy; 2024 CampusFlow Nigerian University Assistance System, All rights reserved
    </p>
</div>

            </footer>

        </div>

    )
}

export default Portal;