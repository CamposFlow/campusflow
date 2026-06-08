import { GraduationCap, UserPlus, LogIn, FileQuestion, ShieldX, AlertTriangle
    , ClipboardList, ShieldCheck, Users, Bell, Mail,
    MapPin,
    Globe
    
 } from "lucide-react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import gsap from "gsap"
import {useGSAP} from "@gsap/react";
const LandingPage =()=>{
useGSAP(()=>{
    gsap.from(".welcome",{
         duration: 2,
            opacity: 0,
            y: 40,
            ease: "power2.out"
    })
})
const steps = [
    {
        number:"1",
icon : <UserPlus className="w-6 h-6 text-blue-600"/>,
title : " Register and Select University",
description :"Register and Select your University, Your dashboard is instantly configured for your Instituition",
    },
        {
number: "2",
icon : <ClipboardList className="w-6 h-6 text-blue-600"/>,
title : "Navigate Your Clearance",
description :"Follow personalized clearance checklist step by step. Every completed stage is recorded permanently on the Blockchain",

    },
            {
number: "3",
icon : <ShieldCheck className="w-6 h-6 text-blue-600"/>,
title : "Verify and Stay Safe",
description :"Track your academic levels and grades. Instuition verify your documents instantly via blockchain. Stay"
+ "informed with Campus alerts and report safety concern anonymously to create a secure environment for evry student. ",

    }
]
const features=[
{
    icon:<ClipboardList className="w-7 h-7 text-blue-600"/>,
    title: "Smart Clearance Guide",
    description: "Step-by-step clearance guidiance for every level and faculty, nobody is left out. Know excatly what documents to bring, where to go and what fees are legitimate - before you leave home.",
},
{
    icon:<ShieldCheck className="w-7 h-7 text-blue-600"/>,
    title: "BlockChain Document Verification",
    description: "Certificate hashed and stored permanently on the blockchain. Any insituition can very authenticity in seconds - No More Verification Delay On Certificate.",
},
{
   icon:<Bell className="w-7 h-7 text-blue-600"/>,
    title: "Campus Saftey and Alert",
    description: "Report any suspicious activity anonymously. Every incicdent is recorded on the blockchain - Permanently, Transparently and Without Manipulation", 
}
]
const problems =[
     {
    icon: <FileQuestion className="w-8 h-8 text-blue-600" />,
    title: "Complicated Clearance",
    description: "Students waste weeks navigating confusing clearance processes and unnecessary back-and-forth.",
  },
  {
    icon: <ShieldX className="w-8 h-8 text-blue-600" />,
    title: "Fake Documents",
    description: "Document forgery and verification delays cost institutions and employers time and trust.",
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
    title: "Unsafe Campus",
    description: "Safety issues and scams go unreported, putting students at risk on campus.",
  },
]

    return(
    
    <div className="pt-16">

        <Navbar/>
        <section
        className="relative w-full min-h-[600px] flex items-center text-black"
        style={{
            backgroundImage:"url('./campus.jpg')",
            backgroundSize:"cover",
            backgroundPosition:"center",

        }}
        >
            <div className="absolute inset-0 bg-[#0A1628]/80"/>

<div className="relative z-10 max-w-7xl mx-auto px-8 py-24 w-full md:ml-10">
    <div max-w-xl>
<span className="inline-block bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
    Smart Campus. Smart Students
</span>

<h1 className="welcome text-5xl font-bold text-white leading-tight mb-4">
    Welcome To <br/><span className="text-blue-800">CampusFlow</span>
</h1>

<p className="text-white/70 font-medium text-base mb-8 leading-relaxed">
    Taking the Stress out of Clearance, document verification, <br/> and Campus Safety - Powered by Blockchain
</p>

<div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-md px-4 py-3 mb-6 max-w-sm">
    <GraduationCap className="text-white/60" size={20}/>
    <select className="bg-transparent text-white text-sm outline-none flex-1 cursor-pointer">
        <option className="text-gray-800" value="">
Select University
        </option>
                <option value="FUTO" className="text-gray-800">
FUTO
        </option>
                <option value="UNLIAG" className="text-gray-800">
UNILAG
        </option>
                <option value="UNN" className="text-gray-800">
UNN
        </option>
    </select>
</div>

<div className="flex items-center gap-4">
    <Link to="/register">
    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 flex items-center gap-2">
    <UserPlus className="w-4 h-4"/>
        Register Now
    </Button>
    </Link>
    <Link to="/login">
    <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent px-8 py-4
    flex items-center gap-2">
<LogIn className="w-4 h-4"/>
Login
    </Button>
    
    </Link>

</div>
    </div>

</div>
        </section>


        <section className="bg-white py-20 px-8">
            <div className="max-w-7xl mx-auto">
<h2 className="text-3xl font-bold text-cente text-black mb-12 text-center">
The Problem We Solve
</h2>

<div className="flex flex-col md:flex-row gap-6">
{
    problems.map((problem,index)=>(
        <div key={index} className="border border-gray-100
        rounded-xl p-6 hover:shadow-md transition-shadow hover:bg-gray-100">
<div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center
justify-center mb-4">
{problem.icon}
    </div>
    <h3 className="font-semibold text-black text-lg mb-2">{problem.title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{problem.description}</p>
        </div>
    ))
}
</div>
            </div>
        </section>
        <section id="features" className="bg-gray-50 py-20 px-8">
            <div className="max-w-7xl mx-auto">
<div className="text-center mb-14">
<span className="text-blue-600 text-xl font-semibold uppercase tracking-widest">What We Offer</span>
<h2 className="text-3xl font-bold mt-2">
    Everything You Need In One Place
</h2>
<p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
    CampusFlow brings together the tools every Nigerian University student needs to navigate a campus life Confidently, Stress-Free and Securely.
</p>
</div>

<div className="flex flex-col md:flex-row gap-8">

{
    features.map((feature,index)=>(
        <div key={index} className="bg-white rounded-2xl p-8 border
        border-gray-100 hover:shadow-lg transition-all gap-5 hover:bg-gray-100 hover:border-gray-200">
            <div className="bg-blue-50 w-14 h-14 flex items-center justify-center rounded-xl shrink-0">
                {feature.icon}
            </div>

          
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
    ))
}
</div>


            </div>
        </section>

        <section id="works" className="bg-white py-20 px-8">
            <div  className="max-w-7xl mx-auto">

               <div className="text-center mb-14">
                <span className="text-blue-600 text-xl tracking-widest font-semibold uppercase">Simple Process</span>
                <h2 className="text-3xl font-bold mt-2">
                    How CampusFlow Works
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">Get Started in minutes, no confusion, no stress, no unnecessary back-and-forth</p>
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
            </div>

        </section>

        
    <section id="contact" className="bg-blue-500 px-8 py-20">
<div className="max-w-7xl max-auto">

        <div className="text-center mb-14">
                <span className="text-white text-xl font-semibold uppercase 
                tracking-widest"> Get in Touch</span>
    
        <h2 className="text-3xl font-bold mt-2">
            Contact Us
        </h2>
        
        <p className="text-white mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Have questions about CampusFlow? Want to Onboard your Instituition? We'd love to hear from you...
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w4xl mx-auto">

<div className="flex items-start gap-4">
    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
<Mail className="w-5 h-5 text-blue-600"/>
    </div>
    <div>
        <h4 className="font-semibold text-white mb-1">
            Email Us
        </h4>
        <p className="text-sm text-white">hello@campusflow.ng</p>
    </div>
</div>  

<div className="flex items-start gap-4">
    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
<MapPin className="w-5 h-5 text-blue-600"/>
    </div>
    <div>
        <h4 className="font-semibold text-white mb-1">
          Based At
        </h4>
        <p className="text-sm text-white">  Federal University Of Technology, Owerri, Nigeria.</p>
    </div>
</div>


<div className="flex items-start gap-4">
    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
<Globe className="w-5 h-5 text-blue-600"/>
    </div>
    <div>
        <h4 className="font-semibold text-white mb-1">
            Follow Us
        </h4>
        <p className="text-sm text-white">@campusflow.ng</p>
    </div>
</div>

</div>

</div>

    </section>
</div>

    )
}

export default LandingPage