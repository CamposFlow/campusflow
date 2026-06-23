import {Link} from "react-router-dom";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Button} from "@/components/ui/button.jsx";
import {Mail, ArrowLeft, CheckCircle, Eye, EyeOff, Check, XCircle} from "lucide-react";
import OtpInput from 'react-otp-input';
import zxcvbn from 'zxcvbn';

const steps = ["Find Account", "Verify OTP", "New Password"];

export const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const[step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [direction, setDirection] = useState(1);
    const [otp, setOtp] = useState("");
    const goNext = () => {
        setDirection(1);
        setStep((prev) => prev + 1);
    }
    const goPrev = () => {
        setDirection(-1);
        setStep((prev) => prev - 1);
    }
    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir) => ({
            x: dir > 0 ? -300 : 300,
            opacity: 0,
        }),
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

    return (
        <div className="login min-h-screen bg-white flex items-center justify-center p-4">
            <div className="container bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-2 mb-6">
                    <img src="/LOGO1.png" alt="CampusFlow" className="w-9 h-9" />
                    <span className="font-bold text-xl text-[#0A1628]">
            Campus<span className="text-blue-600">Flow</span>
          </span>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {steps.map((label, index)=>(
                            <div key={index} className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                            duration-300 ${index < step ? "bg-blue-600 text-white" : index === step ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-gray-200 text-gray-400"}`}>
                                {index <step ? <CheckCircle className="w-4 h-4"/> : index + 1 }
                            </div>
                                <span className={`text-xs ${index === step ? "text-blue-600 font-semibold" : 
                                    "text-gray-400"}`}>{label}</span>
                            </div>
                        ))}
                        <div className="absolute left-0 right-0 flex justify-center">
                        </div>
                    </div>


                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <motion.div
                            className="bg-blue-600 h-1.5 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                    </div>
                </div>

<div className="relative overflow-hidden">
<AnimatePresence>
    <motion.div
        key={step}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
    >

        {step === 0 &&(
            <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-1">
                    Forgot Password
                </h2>
                <p className="text-gray-500 text-sm mb-6">Enter your email address and we will send you a code</p>

                <div className="relative mb-4 ml-2 mr-2">
                    <input
                        type="email"
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
                        Email Address
                    </label>
                    <Mail className="absolute right-4 top-4 w-4 h-4 text-gray-400"/>
                </div>


                <div className="mb-2 text-sm">
                    <Link
                        to="/login"
                        className="text-blue-500 font-semibold hover:underline"
                    >Back To Login</Link>
                </div>

                <Button
                    onClick={goNext}
                    disabled={!email}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                    Send Reset Code
                </Button>
            </div>
        )}

        {step === 1 &&(
            <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-1">Enter OTP</h2>
                <p className="text-gray-500 text-sm mb-6">
We sent a 6-digit code to {" "}
                    <span className="text-blue-600 font-medium">{email}</span>
                </p>

                <div className="flex justify-center mb-6">
<OtpInput onChange={setOtp} numInputs={6} value={otp} renderInput={(props)=>(
    <input
        {...props}
        className="!w-10 !h-10 mx-1.5 text-center text-lg font-bold border-2 border-gray-200 rounded-lg outline-none focus:border-blue-600
    bg-white transition-all duration-300"/>
)}/>
                </div>

                <p className="text-center text-sm text-gray-400 mb-6" >Didn't receive code?{" "}<span className="text-blue-600
                font-medium cursor-pointer hover:underline">Resend Code</span></p>
                <div className="flex gap-3">
                    <Button onClick={goPrev} variant="outline" className="flex-1">Back</Button>
<Button onClick={goNext} disabled={otp.length<6} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Verify Code</Button>
                </div>
            </div>
        )}

        {step===2 && (
            <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-1">New Password</h2>
           <p className="text-gray-500 text-sm mb-6">Set a strong new password for your account</p>

                <div className="relative mb-3 ml-2 mr-2">
                    <input
                        className="peer w-full bg-white border  border-gray-200 rounded-lg px-4 pt-5 pb-2 text-sm outline-none
                        focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        id="password"
                        placeholder=" "
                        value={password}
                    type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-4 top-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600">New Password</label>
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
                        <=1 ?"text-red500" : score === 2 ? "text-yellow-500" :
                            "text-green-500"}`}>{strengthConfig[score].label}</p>
                    </div>
                )}

                <div className="relative mb-3 ml-2 mr-2">
                    <input
                        className="peer w-full bg-white border  border-gray-200 rounded-lg px-4 pt-5 pb-2 text-sm outline-none
                        focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        id="password"
                        value={confirmPassword}
                        placeholder=" "
                        type={showConfirm ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label
                        htmlFor="confirm"
                        className="absolute left-4 top-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600">Confirm Password</label>
                    <button type="button"
                            onClick={()=>setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-blue-600"
                    >
                        {showConfirm?<EyeOff className="w-4 h-4"/>: <Eye className="w-4 h-4"/> }
                    </button>
                </div>
                {confirmPassword && (
                    <div className={`ml-2 mr-2 flex items-center gap-1.5 text-xs mb-4 font-medium ${
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

                <div className="flex gap-3">
                    <Button onClick={goPrev} variant="outline" className="
            flex-1">Back
                    </Button>
                    <Button onClick={goNext} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={!password || password !== confirmPassword || score< 2}
                    >Reset Password</Button>

                </div>
            </div>
        )}


    </motion.div>
</AnimatePresence>
</div>

            </div>
        </div>
    )
}

export default ForgotPassword