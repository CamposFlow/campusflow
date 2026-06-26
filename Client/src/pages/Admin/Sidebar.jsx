import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {useAuth} from "@/pages/AuthContext.jsx";
import {
    LayoutDashboard,
    Megaphone,
    User,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    X, ChevronRight,
} from "lucide-react"

const studentLinks = [
    { icon: LayoutDashboard, label: "Dashboard", path: "overview" },
    { icon: User, label: "Records", path: "record" },
    { icon: Megaphone, label: "Security", path: "security" },
    { icon: User, label: "Profile", path: "profile" },
]

const bottomLinks = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
]

export const Sidebar = ({activeTab ,setActiveTab}) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const navigate = useNavigate()
    // const {logout}= useAuth();

    const handleLogout = () => {
        // logout();
        // toast.success("Successfully Logged Out!")
        // setTimeout(() => {
        //     navigate("/login")
        // }, 1500)
    }


    return (
        <>

            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-gray-200 text-gray-700 p-2 rounded-lg"
            >
                <Menu className="w-5 h-5" />
            </button>
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <div
                className={`
                    fixed left-0 top-0 h-screen w-64 bg-white z-50
                    flex flex-col
                    transition-transform duration-300
                    md:translate-x-0
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className="md:hidden absolute top-4 right-4 text-gray-700 bg-gray-200 px-1.5 py-1.5 rounded-2xl hover:text-black"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="px-6 py-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="CampusFlow" className="w-9 h-9" />
                        <div>
                            <p className="text-gray-900 font-bold text-base leading-none">
                                Campus<span className="text-blue-600">Flow</span>
                            </p>
                            <p className="text-gray-900 text-xs mt-0.5">
                                Smart Campus. Smarter Students.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="flex-1 px-3 py-4 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                        {studentLinks.map((link) => {
                            const isActive = activeTab === link.path
                            return (
                                <button
                                    key={link.path}

                                    onClick={() => {
                                        setMobileOpen(false)
                                        setActiveTab(link.path)
                                    }

                                }
                                    className={`
                                        flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors
                                        ${isActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                    }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon className="w-5 h-5" />
                                        <span className="text-sm font-medium">{link.label}</span>
                                    </div>
                                    {link.badge && (
                                        <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {link.badge}
                                        </span>
                                    )}
                                    {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-200" />}

                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="px-3 py-4 border-t border-white/10">
                    <div className="flex flex-col gap-1">
                        {bottomLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                                <link.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        ))}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 hover:bg-red-300/20 hover:text-red-400 transition-colors w-full text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className=" text-sm font-medium">Logout</span>
                        </button>
                    </div>


                    <div className="mt-4 px-3">
                        <div className="bg-blue-400 border border-blue-500/20 rounded-lg p-3">
                            <p className="text-white/50 text-xs text-center">
                                Secure. Transparent. Trusted.
                            </p>
                            <p className="text-white/30 text-xs text-center mt-0.5">
                                Powered by Blockchain
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}