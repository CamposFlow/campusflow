
import React, {useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {useAuth} from "./AuthContext.jsx";
import {registerUser} from "../api/axios.js"
import {CheckCircle, Eye, EyeOff, GraduationCap, XCircle} from "lucide-react"
import toast from "react-hot-toast"



function Register() {
    const {register} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
  const [university, setUniversity] = useState("");
    const [role] = useState("student");
      useGSAP(() => {
        const tl = gsap.timeline();


        tl.from(".login", {
            duration: 0.6,
            opacity: 0,
            y: 40,
            ease: "power2.out"
        })


            .from(".login .flex:first-child, .login h2, .login p, .login > div, .login button, .login > p", {
                duration: 0.4,
                opacity: 0,
                y: 20,
                stagger: 0.08,
                ease: "power2.out"
            }, "-=0.3")
    })

    const handleGoogleLogin1 = () => {
        window.location.href = "https://campusflowserver.onrender.com/auth/google";
    };

    const handleRegister = async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await registerUser(fullname, email, password, university, role);

            register(data.token, data.user.role);
            setSuccess("Registration Successful! Redirecting.....");
            toast.success('Registered Successfully!');
            setTimeout(() => {
                if (data.user.role === "admin")
                    navigate("/admin");
                else
                    navigate("/dashboard");
            }, 2000);
        } catch (error) {
            if (error.response)
                setError(error.response.data.error || "Registration failed");
            else if (error.request)
                setError("Cannot reach server, Check your Connection.");
            else
                setError("Something went wrong, Try again.");
        } finally {
            setLoading(false);
        }
    }




    return (
        <div className="login min-h-screen bg-surface flex items-center justify-center p-4">

            <div className="container bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-2 mb-6">
                    <img src="./LOGO1.png" alt="CampusFlow" className="w-9 h-9"/>
                    <h1 className="text-xl font-bold text-primary">Campus<span className='text-blue-600'>Flow</span></h1>
                </div>
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

                <div className="mb-4 relative m-2">
                    <input
                        type="fullname"
                        value={fullname}
                        placeholder=" "
                        onChange={(e)=>setFullName(e.target.value)}
                        className="peer w-full bg-white border border-gray-200 rounded-lg px-2 pt-3 pb-2 text-sm
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
                "/>
                    <label
                        htmlFor="fullname"
                        className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wide text-gray-400 transition-all duration-200
     peer-focus:top-0
    peer-placeholder-shown:top-3.5
    peer-focus:text-blue-600
    peer-[&:not(:placeholder-shown)]:top-0
    peer-[&:not(:placeholder-shown)]:text-blue-600"
                    >
                        Fullname
                    </label>
                </div>


                <div className="mb-4 relative m-2">

                    <input
                        type="email"
                        value={email}
                    placeholder=" "
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer w-full bg-white border border-gray-200 rounded-lg px-2 pt-3 pb-2 text-sm
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
                "/>
                    <label
                        htmlFor="email"
                        className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wide text-gray-400 transition-all duration-200
     peer-focus:top-0
    peer-placeholder-shown:top-3.5
    peer-focus:text-blue-600
    peer-[&:not(:placeholder-shown)]:top-0
    peer-[&:not(:placeholder-shown)]:text-blue-600"
                    >
                       Email
                    </label>
                </div>

                <div
                    className="flex items-center gap-3 bg-white border border-gray-200
            rounded-lg px-3 py-3 mb-4 ml-2 mr-2"
                >
                    <GraduationCap className="text-gray-400 shrink-0" size={18} />
                    <select
                        value={university}
                        id="university"
                        onChange={(e)=>setUniversity(e.target.value)}
                        className="bg-transparent text-gray-600 text-sm
            outline-none flex-1 cursor-pointer overflow-wrap:break-word">
                        <option value="">Select University</option>
                        <option value="FUTO_UNI">FUTO</option>
                        <option value="UNEC_UNI"> (University Of Nigeria Enugu)</option>
                    </select>
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
                <div className="relative mb-4 ml-2 mr-2">
                    <input
                        id="password"
                        type={confirmPassword ? "text" : "password"}
                        placeholder=" "
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        className="peer w-full bg-white border border-gray-200 rounded-lg px-2 pt-3 pb-2 text-sm
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 pl-4
                "/>
                    <label
                        htmlFor="confirm"
                        className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wide text-gray-400 transition-all duration-200
    peer-focus:-top-0
    peer-placeholder-shown:top-3.5
    peer-focus:text-blue-600
    peer-[&:not(:placeholder-shown)]:top-0
    peer-[&:not(:placeholder-shown)]:text-blue-600"
                    >
                      Confirm Password
                    </label>
                    <button type="button"
                            onClick={()=>setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-blue-600"
                    >
                        {showPassword?<EyeOff className="w-4 h-4"/>: <Eye className="w-4 h-4"/> }
                    </button>
                </div>
                {confirmPassword && (
                    <div
                        className={`ml-2 mr-2 flex items-center gap-1.5 text-xs mb-4 font-medium ${
                            password === confirmPassword ? "text-green-500" : "text-red-500"
                        }`}>
                        {
                            password === confirmPassword ? <CheckCircle className="w-3.5 h-3.5"/> : <XCircle className="w-3.5 h-3.5"/>
                        }
                        <span>
                    {password === confirmPassword ? "Password Matches" : "Passwords do not matches"}
                </span>
                    </div>
                )}

                <button
                    onClick={handleRegister}
                    disabled={loading || !email || !password || !confirmPassword || !fullname || !university}
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors
             disabled:bg-blue-400"
                >
                    {
                        loading ? "Creating Account...": "Create Account"
                    }

                </button>

                <p className="text-center text-sm text-gray-800 font-medium mt-6">
                    Already Have an Account? {" "}
                    <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign In</Link>
                </p>

            </div>
        </div>
    )
}
export default Register;