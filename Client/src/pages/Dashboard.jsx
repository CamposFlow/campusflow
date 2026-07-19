import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {toast} from "sonner";
import Loaders from "@/components/Loaders.jsx";
import { SIDEBAR_LINKS } from "../constants/sidebarLinks.js";
import { OverviewPanel } from "@/Panels/OverviewPanel.jsx";
import { ClearancePanel } from "@/Panels/ClearancePanel.jsx";
import { CertificatePanel } from "@/Panels/CertificatePanel.jsx";
import { ResultsPanel } from "@/Panels/Results.jsx";
import { PaymentsPanel } from "@/Panels/PaymentPanel.jsx";
import SOSPanel from "@/pages/Staff/Panel/Security.jsx"
import ProfilePage from './ProfilePage.jsx'
import api from "@/api/axios.js";
import { usePolling } from "@/hooks/usePolling.js";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Award,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Hash,
  GraduationCap,
  AlertCircle,
  Menu,
  X,
  IdCard,
  Building,
  BarChart3,
  Phone,
  MailIcon,
} from "lucide-react";
import { BarChart } from "recharts";
import { ProfileAvatar } from "@/components/Profile.jsx";
import { useAuth } from "@/pages/AuthContext.jsx";



const StudentDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  usePolling(() => {
    api.get('/student/notifications')
        .then(res => setNotifications(res.data.data || []))
        .catch(err => console.error(err));
  }, 15000);

  const handleMarkRead = (id) => {
    api.patch(`/student/notifications/${id}/read`)
        .then(() => {
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        })
        .catch(err => console.error(err));
  };

  const handleMarkAllRead = () => {
    api.patch('/student/notifications/read-all')
        .then(() => {
          setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        })
        .catch(err => console.error(err));
  };

  const timeAgo = (dateString) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    return location.state?.activeTab || "overview";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const student = {
    name: "John Doe",
    studentId: "STU-2024-001",
    department: "Computer Science",
    level: "400 Level",
    avatar: "JD",
  };
  const cert = [
    { label: "All clearances approved", done: false },
    { label: "Library clearance", done: true },
    { label: "Finance clearance", done: true },
    { label: "NYSC mobilisation letter", done: false },
  ];
  const payment = [
    {
      desc: "School Fees — 400L 1st Semester",
      amount: "₦320,000",
      date: "Jan 10, 2025",
      hash: "0x3a9f...c821",
      status: "Verified",
    },
    {
      desc: "Hostel Accommodation",
      amount: "₦85,000",
      date: "Jan 11, 2025",
      hash: "0xb2e1...f044",
      status: "Verified",
    },
    {
      desc: "Late Registration Fee",
      amount: "₦5,000",
      date: "Jan 12, 2025",
      hash: "0x77d3...9a11",
      status: "Verified",
    },
  ];
  const result = [
    {
      label: "Current GPA",
      value: "4.21",
      sub: "Out of 5.0",
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: TrendingUp,
    },
    {
      label: "Credit Units",
      value: "124",
      sub: "Accumulated",
      color: "text-green-600",
      bg: "bg-green-50",
      icon: BookOpen,
    },
    {
      label: "Semester Rank",
      value: "#7",
      sub: "In department",
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: GraduationCap,
    },
  ];
  const stats = [
    {
      title: "Certificate",
      status: "Not Available",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Clearance",
      status: "67% Complete",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Results",
      status: "Available",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Payment",
      status: "Verified",
      icon: CreditCard,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  const activities = [
    {
      id: 1,
      action: "School fees payment verified",
      date: "Jan 15, 2025",
      status: "completed",
    },
    {
      id: 2,
      action: "Department clearance request submitted",
      date: "Jan 12, 2025",
      status: "pending",
    },
    {
      id: 3,
      action: "Semester result uploaded for review",
      date: "Jan 10, 2025",
      status: "completed",
    },
    {
      id: 4,
      action: "Library clearance approved",
      date: "Jan 8, 2025",
      status: "completed",
    },
  ];
  const clearances = [
    {
      label: "Department",
      status: "Pending",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      pct: 20,
    },
    {
      label: "Library",
      status: "Completed",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      pct: 100,
    },
    {
      label: "Finance",
      status: "Completed",
      icon: ShieldCheck,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      pct: 100,
    },
  ];

  const panels = {
    overview: (
      <OverviewPanel student={student} stats={stats} activities={activities} />
    ),
    clearance: <ClearancePanel clearances={clearances} />,
    results: <ResultsPanel result={result} />,
    payments: <PaymentsPanel payment={payment} />,
    certificate: <CertificatePanel cert={cert} />,
    security: <SOSPanel />,
    profile: <ProfilePage />,
  };
  const [loading1, setLoading1] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    setTimeout(() => {
      navigate("/login");
    }, 800);
  };
  if (loading1) {
    return <Loaders />;
  }

  /* ── Sidebar content (shared between desktop & mobile) ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-20 px-5 border-b border-gray-100 flex items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src="./LOGO1.png" alt="CampusFlow" className="w-9 h-9" />
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">
            Campus<span className="text-blue-600">Flow</span>
          </span>
        </div>
      </div>


      <nav className="flex-1 px-3 mt-5 py-4 space-y-1">
        {SIDEBAR_LINKS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              {label}
              {active && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-200" />
              )}
            </button>
          );
        })}


      </nav>

      {/* Footer actions */}
      <div className="px-3 pb-5 space-y-1 border-t border-gray-100 pt-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Settings className="w-4 h-4 text-gray-400" /> Settings
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-red-300/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-60 flex-col bg-white border-r border-gray-100 shrink-0 fixed top-0 left-0 h-full z-30">
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
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
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
        <header className="sticky top-0 z-20 h-20 bg-white border-b border-gray-100 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-gray-900 capitalize">
                {activeTab}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Student Portal —{" "}
                {new Date().toLocaleDateString("en-NG", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                  onClick={() => setNotifOpen(v => !v)}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
            </span>
                )}
              </button>

              {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-gray-100 shadow-xl z-40 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-xs text-blue-600 font-medium hover:underline"
                            >
                              Mark all read
                            </button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="text-center py-10 text-sm text-gray-400">
                              No notifications yet
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    onClick={() => !n.is_read && handleMarkRead(n.id)}
                                    className={`px-4 py-3 border-b border-gray-50 cursor-pointer transition-colors ${
                                        n.is_read ? "hover:bg-gray-50" : "bg-blue-50/60 hover:bg-blue-50"
                                    }`}
                                >
                                  <div className="flex items-start gap-2">
                                    {!n.is_read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />}
                                    <div className={!n.is_read ? "" : "ml-3.5"}>
                                      <p className="text-sm font-medium text-gray-900">{n.title}</p>
                                      <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                                      <p className="text-[10px] text-gray-400 mt-1">{timeAgo(n.created_at)}</p>
                                    </div>
                                  </div>
                                </div>
                            ))
                        )}
                      </div>
                    </div>
                  </>
              )}
            </div>
            <div className="cursor-pointer">
              <ProfileAvatar
                name={student.name}
                initials={student.avatar}
                onClick={() => navigate("/profile")}
              />
            </div>
          </div>
        </header>


        <div className="flex-1 p-5 sm:p-8">{panels[activeTab]}</div>
      </main>
    </div>
  );
};

export default StudentDashboard;
