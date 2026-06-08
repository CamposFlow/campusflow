
import {useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {useAuth} from "./AuthContext.jsx";
import {registerUser} from "../services/api.js"

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    useGSAP(() => {
        const tl = gsap.timeline();

        // Container fade and slide in
        tl.from(".login", {
            duration: 0.6,
            opacity: 0,
            y: 40,
            ease: "power2.out"
        })

            // Stagger child elements
            .from(".login .flex:first-child, .login h2, .login p, .login > div, .login button, .login > p", {
                duration: 0.4,
                opacity: 0,
                y: 20,
                stagger: 0.08,
                ease: "power2.out"
            }, "-=0.3") // Overlap with container animation
    })
    const handleRegister = async () => {
        if (!email || !username || !password || !full_name){
            setError("");
            return
        }
        setLoading(true);
        setError("")
        try{
            await registerUser(username, email, password, full_name)
            setSuccess("Account Created! Redirecting to login....")
            setTimeout(()=>{
                navigate("/login")
            },2000)
        }catch(err){
            setError(err.response?.data?.detail || "Registration Failed!")
        }
        finally {
            setLoading(false);
        }
    }




    return (
        <div className="login min-h-screen bg-surface flex items-center justify-center p-4">

            <div className="container bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">

                <h1 className="text-2xl font-bold text-blue-600 mb-1">Create Account</h1>
                <p className="text-gray-500 text-sm mb-6">Fill in Your Credentials to Register</p>

                {
                    error &&   <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
                        {error}
                    </div>
                }
                {
                    success && (
                        <div className="bg-red-50 border border-green-200 text-green-600 text-sm rounded-lg p-3 mb-4">
                            {success}
                        </div>
                    )
                }

                <div className="mb-4">
                    <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={full_name}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"/>
                </div>

                <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                        <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Username</label>
                        <input
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"/>
                    </div>

                </div>

                <div className="mb-4">
                    <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"/>
                </div>
                <div className="mb-4">
                    <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"/>
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors
             disabled:opacity-50"
                >
                    {
                        loading ? "Creating Account...": "Create Account"
                    }

                </button>

                <p className="text-center text-sm text-gray-800 uppercase mt-6">
                    Already Have an Account? {" "}
                    <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign In</Link>
                </p>

            </div>
        </div>
    )
}
export default Register;