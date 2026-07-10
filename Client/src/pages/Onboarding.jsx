import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { GraduationCap, Hash, BookOpen, Layers } from "lucide-react";
import { completeProfile } from "@/api/axios.js";
import toast from "react-hot-toast";

function Onboarding() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [role] = useState("student");
    const [university, setUniversity] = useState("");
    const [department, setDepartment] = useState("");
    const [level, setLevel] = useState("");
    const [matricNumber, setMatricNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isValid = university && department && level && matricNumber;

    const handleComplete = async () => {
        if (!isValid) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await completeProfile(role, university, department, level, matricNumber);

            login(res.token, res.user.role);

            toast.success("Profile setup complete!");
            const redirectMap = { admin: "/admin", staff: "/staff", student: "/dashboard" };
            navigate(redirectMap[res.user.role] || "/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-4">
            <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-2 mb-6">
                    <img src="./LOGO1.png" alt="CampusFlow" className="w-9 h-9" />
                    <h1 className="text-xl font-bold text-primary">Campus<span className="text-blue-600">Flow</span></h1>
                </div>

                <h2 className="text-2xl font-bold text-blue-600 mb-1">Complete Your Profile</h2>
                <p className="text-gray-500 text-sm mb-6">Just a few more details to get you started</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-3 mb-4">
                    <GraduationCap className="text-gray-400 shrink-0" size={18} />
                    <select
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="bg-transparent text-gray-600 text-sm outline-none flex-1 cursor-pointer"
                    >
                        <option value="">Select University</option>
                        <option value="FUTO_UNI">FUTO</option>
                        <option value="UNEC_UNI">University Of Nigeria Enugu</option>
                    </select>
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-3 mb-4">
                    <BookOpen className="text-gray-400 shrink-0" size={18} />
                    <input
                        type="text"
                        placeholder="Department (e.g. Software Engineering)"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="bg-transparent text-gray-600 text-sm outline-none flex-1"
                    />
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-3 mb-4">
                    <Layers className="text-gray-400 shrink-0" size={18} />
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="bg-transparent text-gray-600 text-sm outline-none flex-1 cursor-pointer"
                    >
                        <option value="">Select Level</option>
                        {["100", "200", "300", "400", "500"].map(l => (
                            <option key={l} value={l}>{l} Level</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-3 mb-6">
                    <Hash className="text-gray-400 shrink-0" size={18} />
                    <input
                        type="text"
                        placeholder="Matric Number"
                        value={matricNumber}
                        onChange={(e) => setMatricNumber(e.target.value)}
                        className="bg-transparent text-gray-600 text-sm outline-none flex-1"
                    />
                </div>

                <button
                    onClick={handleComplete}
                    disabled={loading || !isValid}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                    {loading ? "Saving..." : "Continue"}
                </button>
            </div>
        </div>
    );
}

export default Onboarding;