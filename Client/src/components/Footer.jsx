import {Link as ScrollLink} from 'react-scroll'
import {ArrowUp, Globe, Mail, MapPin} from "lucide-react";

export const Footer = () => {
    const needed =[
        {
          icon:  <Globe className="text-white"/>,
            text:" hello@campusflow.ng"
        },
        {
            icon: <Mail className="text-white"/>,
            text:"FUTO, Owerri, Nigeria"
        },
        {
            icon: <MapPin className="text-white"/>,
            text:"@campusflow.ng"
        }
    ]
    return (
        <footer className="bg-gradient-to-b from-blue-400 to-blue-700 text-gray-300 pt-16 px-6">
<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:px-6">
<div>
    <h2 className="text-3xl font-bold text-white">Campus<span className="text-blue-600">Flow</span></h2>
    <p className="mt-4 text-sm font-medium leading-6 text-white">Simplifying campus management with smart tools for students, lecturers and administrators - powered by BlockChain.</p>


</div>


    <div className="md:flex flex-col items-center justify-center">
        <h3 className="text-white font-semibold mb-4">Services</h3>
        <ul className="space-y-3 text-white">
            <li>Student Portal</li>
            <li>Document Verification</li>
            <li>Clearance Management</li>
            <li>Academic Results</li>
        </ul>
    </div>
    <div className="flex gap-3 mt-6">
        {needed.map((need,index)=>(

            <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    {need.icon}
                </div>
                <h4 className="font-semibold text-white mb-1 text-sm"></h4>
                <p className="text-xs text-blue-100 hover:text-white transition-colors cursor-pointer">
                    {need.text}
                </p>
            </div>
        ))}
    </div>

</div>
            <div className="border-t border-white/50 mt-12 py-6 flex justify-between
     items-center">
                <p className="text-sm">&copy; 2026 CampusFlow. All rights reserved</p>
               <ScrollLink to="main"
                           smooth={true}
                           duration={500}
                           > <button className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition duration-300">
                   <ArrowUp size={18}/>
               </button>
               </ScrollLink>
            </div>
        </footer>
    )
}