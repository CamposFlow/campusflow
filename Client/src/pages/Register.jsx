import React, {useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {useAuth} from "./AuthContext.jsx";
import {registerUser} from "../api/axios.js"
import {CheckCircle, Eye, EyeOff, GraduationCap, XCircle} from "lucide-react"
import {toast} from "sonner"
import {FcGoogle} from "react-icons/fc";
import zxcvbn from "zxcvbn";
import {motion} from "framer-motion";



function Register() {
    const {register} = useAuth();
    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);
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
    const [department, setDepartment] = useState("");
    const [level, setLevel] = useState("");
    const [matric_number, setMatricNumber] = useState("");
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
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    // const handleGoogleLogin1 = () => {
    //     window.location.href = "https://campusflowserver-uc79.vercel.app/auth/google";
    // };

    const handleRegister = async () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        try {
            setError(null);
            setLoading(true);
            const data = await registerUser(fullname, email, password, university, role, department, level, matric_number);

            register(data.token, data.user.role);
            setSuccess("Registration Successful! Redirecting.....");
            toast.success('Registered Successfully!');
            setTimeout(()=>{
                const redirectMap = { admin: "/admin", staff: "/staff", student: "/dashboard" };
                navigate(redirectMap[data.user.role] || "/dashboard");
            },2000)
        } catch (error) {
            if (error.response)
                setError(error.response.data.message || "Registration failed, Try again.");
            else if (error.request)
                setError("Cannot reach server, Check your Connection.");
            else
                setError("Something went wrong, Try again.");
        } finally {
            setLoading(false);
        }
    }

    const strength = zxcvbn(password);
    const score = strength.score
    const strengthConfig = {
        0: { label: "Very Weak", color: "bg-red-500", width: "25%" },
        1: { label: "Weak", color: "bg-orange-500", width: "50%" },
        2: { label: "Fair", color: "bg-yellow-500", width: "75%" },
        3: { label: "Strong", color: "bg-green-500", width: "100%" },
        4: { label: "Very Strong", color: "bg-blue-600", width: "100%" },
    }

    const passwordChecks = [
        { label: "8–20 characters", passed: password.length >= 8 && password.length <= 20 },
        { label: "One uppercase letter", passed: /[A-Z]/.test(password) },
        { label: "One number", passed: /[0-9]/.test(password) },
        { label: "One special character", passed: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className="login min-h-screen bg-surface flex items-center justify-center p-4">

            <div className="container bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-2 mb-6">
                    <img src="./LOGO1.png" alt="CampusFlow" className="w-9 h-9"/>
                    <h1 className="text-xl font-bold text-primary">Campus<span className='text-blue-600'>Flow</span></h1>
                </div>
                <h1 className="text-2xl font-bold text-blue-600 mb-1">Create Account</h1>
                <p className="text-gray-500 text-sm mb-6">Fill in Your Credentials to Register</p>

                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={handleGoogleLogin1}*/}
                {/*    className="mb-4 w-full flex items-center justify-center gap-3 border*/}
                {/*    border-gray-300 bg-white text-gray-700 font-semibold p-2 rounded-lg*/}
                {/*    hover:bg-gray-50 transition-colors duration-200 cursor-pointer"*/}
                {/*>*/}
                {/*    <FcGoogle className="w-5 h-5" />*/}
                {/*    Continue with Google*/}
                {/*</button>*/}
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


                <div className="mb-4 m-2">
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            placeholder=" "
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailTouched(true)}
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
                    {emailTouched && email.length > 0 && !validateEmail(email) && (
                        <p className="text-xs text-red-500 mt-1">Enter a valid email address</p>
                    )}
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
                        <option value="FUTO">FUTO</option>
                        <option value="UNEC"> (University Of Nigeria Enugu)</option>
                    </select>
                </div>
    <div className="mb-4 relative m-2">
        <input
            type="text"
            value={department}
            placeholder=" "
            onChange={(e) => setDepartment(e.target.value)}
            className="peer w-full bg-white border border-gray-200 rounded-lg px-2 pt-3 pb-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <label className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wide text-gray-400 transition-all duration-200 peer-focus:top-0 peer-placeholder-shown:top-3.5 peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-blue-600">
            Department
        </label>
    </div>

    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-3 mb-4 ml-2 mr-2">
        <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-transparent text-gray-600 text-sm outline-none flex-1 cursor-pointer"
        >
            <option value="">Select Level</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
            <option value="500">500 Level</option>
        </select>
    </div>
                <div className="mb-4 relative m-2">
                    <input
                        type="text"
                        value={matric_number}
                        placeholder=" "
                        onChange={(e) => setMatricNumber(e.target.value)}
                        className="peer w-full bg-white border border-gray-200 rounded-lg px-2 pt-3 pb-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <label className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-wide text-gray-400 transition-all duration-200 peer-focus:top-0 peer-placeholder-shown:top-3.5 peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-blue-600">
                        Matric Number
                    </label>
                </div>
                <div className="relative mb-4 ml-2 mr-2">
                     <input
                        id="password"
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
                {password && (
                    <div className="mb-4 mr-2 ml-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <motion.div className={`h-1.5 rounded-full 
${strengthConfig[score].color}`}
                                        initial={{width:"0%"}}
                                        animate={{width:strengthConfig[score].width}}
                                        transition={{duration:0.3}}
                            />
                        </div>
                        <p className={`text-xs mt-1 font-medium ${score
                        <=1 ?"text-red-500" : score === 2 ? "text-yellow-500" :
                            "text-green-500"}`}>{strengthConfig[score].label}</p>

                        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
                            {passwordChecks.map((check) => (
                                <div
                                    key={check.label}
                                    className={`flex items-center gap-1.5 text-xs font-medium ${
                                        check.passed ? "text-green-600" : "text-gray-400"
                                    }`}
                                >
                                    {check.passed ? (
                                        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                                    ) : (
                                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                                    )}
                                    <span>{check.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="relative mb-4 ml-2 mr-2">
                    <input
                        id="confirm"
                        placeholder=" "
                        type={showConfirm ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                            onClick={()=>setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-blue-600"
                    >
                        {showConfirm?<EyeOff className="w-4 h-4"/>: <Eye className="w-4 h-4"/> }
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
                    disabled={score<2 ||!matric_number || !level || !department ||loading || !email || !password || !confirmPassword || !fullname || !university}
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