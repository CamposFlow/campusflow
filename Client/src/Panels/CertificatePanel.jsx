import SectionHeader from "@/components/SectionHeader.jsx";
import { AlertCircle, Award, Check, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/api/axios.js";

// small helper: truncates long strings like hashes / addresses for display
const truncateMiddle = (str, front = 6, back = 6) => {
    if (!str) return "";
    if (str.length <= front + back + 3) return str;
    return `${str.slice(0, front)}...${str.slice(-back)}`;
};

// a labeled row with a truncated value and a copy button
const CopyRow = ({ label, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    if (!value) return null;

    return (
        <div className="flex items-center justify-between gap-3 py-2.5 px-4 bg-gray-50 rounded-xl">
            <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">{label}</p>
                <p className="text-sm text-gray-700 font-mono truncate">{truncateMiddle(value)}</p>
            </div>
            <button
                onClick={handleCopy}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    copied
                        ? "bg-green-50 border-green-200 text-green-600"
                        : "bg-white border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600"
                }`}
            >
                {copied ? (
                    <>
                        <Check className="w-3.5 h-3.5" /> Copied
                    </>
                ) : (
                    <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                )}
            </button>
        </div>
    );
};

export const CertificatePanel = ({ cert }) => {
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/student/certificate')
            .then(res => setCertificate(res.data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const issuedDate = certificate?.timestamp
        ? new Date(Number(certificate.timestamp) * 1000).toLocaleDateString(undefined, {
            year: "numeric", month: "long", day: "numeric",
        })
        : null;

    return (
        <div className="panel-landing">
            <SectionHeader title="Certificate" sub="Your blockchain-verified academic certificate" />
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {loading ? (
                    <div className="py-20 text-center text-gray-400 text-sm">Checking certificate status…</div>
                ) : certificate ? (
                    <div
                        className="relative flex flex-col items-center justify-center py-16 px-6 text-center"
                        style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)" }}
                    >
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg"
                            style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                        >
                            <Award className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{certificate.certificate_type}</h3>
                        <p className="text-gray-500 text-sm mb-4">{certificate.institution}</p>

                        <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                            certificate.is_valid ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-500 border border-red-200"
                        }`}>
              {certificate.is_valid ? "Valid" : "Revoked"}
            </span>

                        {issuedDate && (
                            <p className="text-xs text-gray-400 mb-6">Issued on {issuedDate}</p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            {certificate.certificate_url && (

                                <a  href={certificate.certificate_url.replace("/upload/", "/upload/fl_attachment/")}
                                    target="_blank" rel="noreferrer"
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                                >
                                    View Certificate
                                </a>
                            )}
                            {certificate.tx_signature && (

                                <a  href={`https://explorer.solana.com/tx/${certificate.tx_signature}?cluster=devnet`}
                                    target="_blank" rel="noreferrer"
                                    className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:border-blue-200 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                                >
                                    Verify on-chain <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>

                        <div className="w-full max-w-md flex flex-col gap-2.5 text-left">
                            <CopyRow label="Certificate Hash" value={certificate.hash} />
                            <CopyRow label="Transaction Signature" value={certificate.tx_signature} />
                            <CopyRow label="PDA Address" value={certificate.pda_address} />
                        </div>


                    </div>
                ) : (
                    <div
                        className="relative flex flex-col items-center justify-center py-20 px-6 text-center"
                        style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)" }}
                    >
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg"
                            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
                        >
                            <Award className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Not Yet Available</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            Your certificate will be issued after all clearance processes are completed and verified by your institution.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
                                Check Requirements
                            </button>
                            <button className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:border-blue-200 text-sm font-semibold rounded-xl transition-colors">
                                Contact Registry
                            </button>
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-100 p-6">
                    <p className="text-xs text-gray-400 font-medium mb-3">Certificate requirements checklist</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cert.map((req, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                {req.done ? (
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
                                )}
                                <span className={`text-sm ${req.done ? "text-gray-600" : "text-gray-400"}`}>{req.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};