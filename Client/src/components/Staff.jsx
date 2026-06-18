import {useState} from "react";
import {
    Award,
    Bell,
    BookOpen,
    ChevronRight,
    Clock,
    CreditCard,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings, ShieldCheck, User,
    X
} from "lucide-react";

const Staff = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const SIDEBAR_LINKS = [
        { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
        { id: 'reviews',  label: 'Reviews',   icon: ShieldCheck },
        { id: 'notification',    label: 'Notifications',     icon: Bell },

    ];

    const student = {
        name: 'Aguwa Tommy',
        studentId: 'STU-2024-001',
        department: 'Computer Science',
        avatar: 'AT',
    };



    // const panels = {
    //     overview:    <OverviewPanel />,
    //     clearance:   <ClearancePanel />,
    //     results:     <ResultsPanel />,
    //     payments:    <PaymentsPanel />,
    //     certificate: <CertificatePanel />,
    //     profile: <Profile student={student} stats={stats} activities={activities} />
    // };

    /* ── Sidebar content (shared between desktop & mobile) ── */
    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-5 py-6 border-b border-gray-200">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <img src="./logo.png" alt="CampusFlow" className="w-9 h-9" />
                    </div>
                    <span className="font-bold text-gray-900 text-base tracking-tight">Campus<span className="text-blue-600">Flow</span></span>
                </div>
            </div>

            {/* Avatar */}
            <div className="px-5 py-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
                    >
                        {student.avatar}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{student.name}</p>
                        <p className="text-xs text-gray-400 truncate">{student.studentId}</p>
                    </div>
                </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {SIDEBAR_LINKS.map(({ id, label, icon: Icon }) => {
                    const active = activeTab === id;
                    return (
                        <button
                            key={id}
                            onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                                active
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                            {label}
                            {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-200" />}
                        </button>
                    );
                })}
            </nav>

            {/* Footer actions */}
            <div className="px-3 pb-5 space-y-1 border-t border-gray-100 pt-3">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" /> Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* ── Desktop sidebar ── */}
            <aside className="hidden lg:flex w-60 flex-col bg-gray-100 border-r border-gray-200 shrink-0 fixed top-0 left-0 h-full z-30">
                <SidebarContent />
            </aside>

            {/* ── Mobile sidebar overlay ── */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl lg:hidden">
                        <div className="absolute top-4 right-4">
                            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <SidebarContent />
                    </aside>
                </>
            )}

            {/* ── Main content ── */}
            <main className="flex-1 lg:ml-60 flex flex-col min-h-screen">

                {/* Top bar */}
                <header className="sticky top-0 z-20 bg-gray-100 border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-base font-bold text-gray-900 capitalize">{activeTab}</h1>
                            <p className="text-xs text-gray-400 hidden sm:block">Student Portal — {new Date().toLocaleDateString('en-NG', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                            style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
                        >
                            {student.avatar}
                        </div>
                    </div>
                </header>


                <div className="flex-1 p-5 sm:p-8">
                    {/*{panels[activeTab]}*/}
                </div>
            </main>
        </div>
    );
}

export default Staff;