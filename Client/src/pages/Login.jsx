import {useState, useRef} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import {FcGoogle} from "react-icons/fc";
import gsap from "gsap";
import {GoogleLogin} from "@react-oauth/google";
import {toast} from "react-hot-toast";
import {Button} from "@/components/ui/button.jsx";
import {useGSAP} from "@gsap/react";
import {loginUser} from "@/api/axios.js";
import {Eye, EyeOff} from "lucide-react";
import {useAuth} from "@/pages/AuthContext.jsx";


export const Login = () => {

    const {login} = useAuth();
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

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

    const handleGoogleLogin1 = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    const handleLogin = async ()=>{
        try {
            setError(null);
            setLoading(true);
            const data = await loginUser(username, password);

            login(data.token, data.user.role, rememberMe);
            setSuccess("Login Successful! Redirecting.....");
            toast.success('LoggedIn Successfully!');
            setTimeout(()=>{
                if (data.user.role === "admin")
                    navigate("/admin");
                else
                    navigate("/dashboard");

            },2000)
        }
        catch (error) {
            if (error.response)
                setError(error.response.data.error || "Invalid Email or password");
            else if (error.request)
                setError("Cannot reach server, Check your Connection.")
            else
                setError("Something went wrong, Try again.");
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="login min-h-screen bg-white flex items-center justify-center p-4">
            <div className="container bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-2 mb-3">
                    <img src="./LOGO1.png" alt="CampusFlow" className="w-9 h-9"/>
                    <h1 className="text-xl font-bold text-primary">Campus<span className='text-blue-600'>Flow</span></h1>
                </div>

                <h2 className="text-2xl font-bold text-blue-400 mb-1">Welcome Back</h2>
                <p className="text-gray-500 text-sm mb-6">Please sign in into your account</p>

                <button
                    type="button"
                    onClick={handleGoogleLogin1}
                    className="mb-4 w-full flex items-center justify-center gap-3 border
                    border-gray-300 bg-white text-gray-700 font-semibold p-2 rounded-lg
                    hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                    <FcGoogle className="w-5 h-5" />
                    Continue with Google
                </button>


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
                        placeholder=" "
                        onChange={(e)=>setEmail(e.target.value)}
                        className="peer w-full bg-white border border-gray-200 rounded-lg px-4 pt-5 pb-2 text-sm
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

    <div className="flex justify-between mb-3 ml-2 mr-2">
       <div className="flex items-center justify-center gap-2">
           <input type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e)=>setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
           />
           <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
       </div>

        <Link to="/reset" className="text-blue-500 text-sm hover:underline">
            Forgot Password?
        </Link>
    </div>

<Button
    type="button"
    onClick={handleLogin}
    className="w-full bg-blue-500 hover:bg-blue-700
font-semibold
transition-colors duration-300 py-4">
    {
        loading ? "Signing In...": "Sign In"
    }
</Button>
                <p className="text-center text-sm text-gray-800 font-medium mt-6">
                    New To CampusFlow? {" "}
                    <Link to="/register" className="text-blue-500 font-semibold hover:underline">Sign Up</Link>
                </p>

            </div>
        </div>

    )
}
export default Login;