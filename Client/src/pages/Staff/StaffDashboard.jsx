import {Sidebar} from "@/pages/Staff/Sidebar.jsx";
import React, {useEffect, useState} from "react";
import {Bell} from "lucide-react";
import {StaffOverview} from "@/pages/Staff/Panel/StaffOverview.jsx"
import Loaders from "@/components/Loaders.jsx";
import {StaffRecord} from "@/pages/Staff/Panel/StaffRecord.jsx";
import {StaffProfile} from "@/pages/Staff/Panel/StaffProfile.jsx"
import SOSPanel from "@/pages/Staff/Panel/Security.jsx"
import {useAuth} from "@/pages/AuthContext.jsx";
import ProfilePage from '../ProfilePage.jsx';

export const StaffDashboard = () => {
const [activeTab, setActiveTab] = useState('overview');
const [loading, setLoading] = useState(true);

    const { logout, user } = useAuth();
const tabTitle={
    overview:'Overview',
    record:'Student Record',
    profile:'Profile',
    security:'Security, Lets Keep Our Society Safe',
}
    const panels ={
        overview: <StaffOverview setActiveTab={setActiveTab} />,
        record:<StaffRecord/>,
        profile:<ProfilePage/>,
        security:<SOSPanel/>,

    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        },2000)
    },[]);
    if (loading){

        return <Loaders />;
    }

    return (
        <div className=" flex min-h-screen ">

            <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            />

            <main className="min-w-0 flex-1 md:ml-64 min-h-screen bg-gray-200 flex flex-col">
                <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between">
                    <div className="ml-10">
                        <h1 className="text-base font-bold text-gray-900 capitalize">{tabTitle[activeTab]}</h1>
                        <p className="text-xs text-gray-400 hidden sm:block">Staff Portal — {new Date().toLocaleDateString('en-NG', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div
                            onClick={() => setActiveTab('profile')}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                            style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
                        >
                            {user?.fullname?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                    </div>
                </header>


                <div className="flex-1 p-5 sm:p-8">
                    {panels[activeTab]}
                </div>

            </main>
        </div>
    )
}