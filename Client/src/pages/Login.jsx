import {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useAuth} from "./AuthContext.jsx";
import {loginUser} from "../services/api.js";
import {Eye, EyeOff, Mail} from "lucide-react";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAuth();
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

    const handleLogin = async () => {
        try {
            const data = await loginUser(username, password)
            login(data.access_token)
            setSuccess("Login Successful! Redirecting.....")

            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (err) {
            setError("Incorrect username or password");
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="login min-h-screen bg-white flex items-center justify-center p-4">
            <div className="container bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">

                {/* HEADER  */}
                <div className="flex items-center gap-2 mb-6">
                    <img src="./logo.png" alt="CampusFlow" className="w-9 h-9"/>
                    <h1 className="text-xl font-bold text-primary">Campus<span className='text-blue-600'>Flow</span></h1>
                </div>

                <h2 className="text-2xl font-bold text-blue-400 mb-1">Welcome Back</h2>
                <p className="text-gray-500 text-sm mb-6">Please sign in into your account</p>

                {
                    error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
                            {error}
                        </div>
                    )
                }
                {
                    success && (
                        <div className="bg-red-50 border border-green-200 text-green-600 text-sm rounded-lg p-3 mb-4">
                            {success}
                        </div>
                    )
                }

                <div className="relative mb-4 ml-2 mr-2">
                    <input
                        type="username"
                        placeholder=""
                        onChange={(e)=>setUsername(e.target.value)}
                        className="peer w-full bg-white border border-gray-200 rounded-lg px-4 pt-5 pb-2 text-sm
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
                "/>
                    <label
                        htmlFor="username"
                        className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wide text-gray-400 transition-all duration-200
     peer-focus:top-0
    peer-placeholder-shown:top-3.5
    peer-focus:text-blue-600
    peer-[&:not(:placeholder-shown)]:top-0
    peer-[&:not(:placeholder-shown)]:text-blue-600"
                    >
                        Matric Number
                    </label>

                </div>

                <div className="relative mb-4 ml-2 mr-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        onChange={(e)=>setPassword(e.target.value)}
                        className="peer w-full bg-white border border-gray-200 rounded-lg px-2 pt-3 pb-2 text-sm
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 pl-4
                "/>
                    <label
                        htmlFor="password"
                        className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wide text-gray-400 transition-all duration-200
    peer-focus:-top-0
    peer-placeholder-shown:top-3.5
    peer-focus:text-blue-600
    peer-[&:not(:placeholder-shown)]:top-0
    peer-[&:not(:placeholder-shown)]:text-blue-600"
                    >
                        Password
                    </label>
                    <button type="button"
                            onClick={()=>setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-blue-600"
                    >
                        {showPassword?<EyeOff className="w-4 h-4"/>: <Eye className="w-4 h-4"/> }
                    </button>
                </div>

    <div className="mb-3 ml-2 mr-2">
        <Link to="/reset" className="text-blue-500 text-sm hover:underline">
            Forgot Password?
        </Link>
    </div>
                <button
                    onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg
            hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                >
                    {
                        loading ? "Signing In...": "Sign In"
                    }

                </button>

                <p className="text-center text-sm text-gray-800 uppercase mt-6">
                    New To CampusFlow? {" "}
                    <Link to="/register" className="text-blue-500 font-semibold hover:underline">Sign Up</Link>
                </p>

            </div>
        </div>

    )
}
export default Login;