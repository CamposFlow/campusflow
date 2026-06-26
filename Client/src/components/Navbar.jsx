import { Link as ScrollLink} from "react-scroll";
import {Link, useNavigate } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {Shield, Menu,X} from 'lucide-react';
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";


const Navbar = () =>{
    const [activeSection, setActiveSection] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
const links=[
    {to: 'features', label:'Features'},
    {to : 'works', label:'How it Works'},
    {to:'contact', label:'Contact'}
]

    const navigate = useNavigate();
  return (
<>
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex p-2 items-center gap-12 px-6 bg-white/90 backdrop-blur-md border border-gray-200
rounded-full shadow-sm w-[92%] justify-between md:w-auto md:justify-start`}>

        <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
                <img src="./LOGO1.png" alt="CampusFlow" className="w-9 h-9 transition-transform duration-300 group-hover:rotate-12" />
                <span className="font-bold text-lg text-[#0A1628]">
            Campus
            <span className="text-blue-600">Flow</span>
          </span>
            </Link>
        </div>

        <div className="hidden md:flex items-center gap-1 px-2">
            {links.map((link) => (
                <ScrollLink
                    spy={true}
                    onSetActive={()=>setActiveSection(link.to)}
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-100}
                    className={`text-sm px-4 py-2 whitespace-nowrap rounded-full cursor-pointer
                transition-all duration-300 ${activeSection === link.to
                        ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
                >
                    {link.label}
                </ScrollLink>
            ))}
            <Link 
        to="/dashboard" 
        className="text-sm px-4 py-2 whitespace-nowrap rounded-full cursor-pointer transition-all duration-300 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    >
        Dashboard
    </Link>

        </div>

        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-300">
            <button
                onClick={() => navigate("/login")}
                className="text-sm text-gray-600 px-3 hover:text-blue-600 transition-colors">
                Login
            </button>
            <Button
                onClick={() => navigate("/register")}
                className="bg-blue-600 whitespace-nowrap text-white text-sm px-5 py-2.5 hover:scale-105 active:scale-95 rounded-full hover:bg-blue-700 transition-colors">
                Get Started
            </Button>
        </div>
        <button onClick={()=>setMobileOpen(!mobileOpen)}
                className="md:hidden p-1">
            {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
    </nav>
  <AnimatePresence>
      {mobileOpen && (
          <motion.div
              initial={{opacity: 0, y:-10, scale:0.95}}
              animate={{opacity:1, y:0, scale:1}}
              exit={{opacity:0,y:-10, scale:0.95}}
              transition={{duration:0.2, ease:'easeOut'}}
              className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-40 w-[80%] bg-white/95 backdrop-blur-md
        rounded-3xl shadow-lg border border-gray-100 flex flex-col p-4 gap-1 md:hidden">
              {links.map((link) => (
                  <ScrollLink key={link.to}
                              to={link.to} duration={500} offset={-100} smooth={true} onClick={()=>setMobileOpen(false)}
                              className="text-gray-700 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                      {link.label}
                  </ScrollLink>
              ))}

              <div className="h-px bg-gray-200 my-2"/>
              <button
                  onClick={()=> {
                      navigate("/login");
                      setMobileOpen(false);
                  }}
                  className="text-left text-gray-700 px-4 py-3 hover:bg-blue-50 rounded-xl">
                  Login
              </button>
              <Button
                  onClick={() => {
                      navigate("/register");
                      setMobileOpen(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-3 mt-1 hover:bg-blue-700"
              >Get Started</Button>
          </motion.div>
      )}
  </AnimatePresence>
</>
  );
};

export default Navbar;
// <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50 bg-gray-100 border-b border-gray-200 px-8 py-4 rounded-b-xl">
//     {({open})=>(
//         <>
//             <div className="max-w-7xl mx-auto flex items-center justify-between">
//
//                 <Link to="/" className="flex items-center gap-2">
//                     <img src="./logo.png" alt="CampusFlow" className="w-9 h-9" />
//                     <span className="font-bold text-xl text-[#0A1628]">
//             Campus
//             <span className="text-blue-600">Flow</span>
//           </span>
//                 </Link>
//
//                 <div className="hidden md:flex items-center gap-10 cursor-pointer">
//                     <ScrollLink
//                         to="features"
//                         smooth={true}
//                         duration={500}
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Features
//                     </ScrollLink>
//                     <ScrollLink
//                         to="works"
//                         smooth={true}
//                         duration={500}
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         How it Works
//                     </ScrollLink>
//                     <Link
//                         to="/verify"
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Verify
//                     </Link>
//                     <Link
//                         to="/dashboard"
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Dashboard
//                     </Link>
//                     <Link
//                         to="/admin"
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Admin
//                     </Link>
//                     <ScrollLink
//                         to="contact"
//                         smooth={true}
//                         duration={500}
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Contact
//                     </ScrollLink>
//                 </div>
//
//                 <select className="hidden md:flex border border-gray-400 rounded-md px-2 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
//                     <option value="">Select University</option>
//                     <option value="FUTO">FUTO</option>
//                     <option value="UNLIAG">UNILAG</option>
//                     <option value="UNN">UNN</option>
//                 </select>
//
//                 <Disclosure.Button className="md:hidden cursor-pointer">
//                     {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/> }
//                 </Disclosure.Button>
//
//             </div>
//             <Transition
//                 enter="transition ease-out duration-500"
//                 enterFrom="transform opacity-0 translate-y-8"
//                 enterTo="transform opacity-100 translate-y-0"
//                 leave="transition ease-in duration-400"
//                 leaveFrom="transform opacity-100 translate-y-0"
//                 leaveTo="transform opacity-0 translate-y-2"
//             >
//                 <Disclosure.Panel className="md:hidden flex flex-col px-6 pb-4 gap-3 pt-4 w-40">
//                     <ScrollLink
//                         to="features"
//                         smooth={true}
//                         duration={500}
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer"
//                     >
//                         Features
//                     </ScrollLink>
//                     <ScrollLink
//                         to="works"
//                         smooth={true}
//                         duration={500}
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer"
//                     >
//                         How it Works
//                     </ScrollLink>
//                     <Link
//                         to="/verify"
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Verify
//                     </Link>
//                     <Link
//                         to="/admin"
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Admin
//                     </Link>
//                     <ScrollLink
//                         to="contact"
//                         smooth={true}
//                         duration={500}
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer"
//                     >
//                         Contact
//                     </ScrollLink>
//                     <Link
//                         to="/dashboard"
//                         className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
//                     >
//                         Dashboard
//                     </Link>
//
//                 </Disclosure.Panel>
//             </Transition>
//         </>
//     )}
// </Disclosure>