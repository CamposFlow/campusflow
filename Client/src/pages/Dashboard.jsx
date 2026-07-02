import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loaders from "@/components/Loaders.jsx";
import { SIDEBAR_LINKS } from "../constants/sidebarLinks.js";
import { OverviewPanel } from "@/Panels/OverviewPanel.jsx";
import { ClearancePanel } from "@/Panels/ClearancePanel.jsx";
import { CertificatePanel } from "@/Panels/CertificatePanel.jsx";
import { ResultsPanel } from "@/Panels/Results.jsx";
import { PaymentsPanel } from "@/Panels/PaymentPanel.jsx";
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

/* ─────────────────────────────────────────────
   Tiny inline-style helpers (no extra deps)
───────────────────────────────────────────── */
const style = (obj) => obj;

/* ── Circular SVG progress ring ── */

/* ─────── Tab content panels ─────── */

const Profile = ({ student, stats, activities }) => {
  const info = [
    {
      icon: <IdCard className="text-blue-600 w-5 h-5 flex-shrink-0" />,
      text1: "Matric Number",
      text2: "Futo/2022/12345",
    },
    {
      icon: <Building className="text-blue-600 w-5 h-5 flex-shrink-0" />,
      text1: "Department",
      text2: "Computer Science",
    },
    {
      icon: <BarChart3 className="text-blue-600 w-5 h-5 flex-shrink-0" />,
      text1: "Level",
      text2: "400 Level",
    },
    {
      icon: <MailIcon className="text-blue-600 w-5 h-5 flex-shrink-0" />,
      text1: "Email Address",
      text2: "Johndoe@gmail.com",
    },
    {
      icon: <Phone className="text-blue-600 w-5 h-5 flex-shrink-0" />,
      text1: "Phone Number",
      text2: "+234 706 963 2334",
    },
    {
      icon: <Clock className="text-blue-600 w-5 h-5 flex-shrink-0" />,
      text1: "Semester",
      text2: "1st Semester",
    },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-6 ">
      <div className="flex items-start gap-6">
        <ProfileAvatar
          name={student.name}
          initials={student.avatar}
          size="lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 m-4">
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <span className="flex items-center gap-1 bg-green-50 text-green-600 text-sm font-medium px-2 py-2 rounded-full">
              <CheckCircle size={14} />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
            {info.map((infos, index) => (
              <div key={index} className="flex items-start gap-2">
                {infos.icon}
                <div>
                  <p className="text-xs text-gray-500">{infos.text1}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {infos.text2}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Dashboard Component
───────────────────────────────────────────── */
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

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
  };
  const [loading1, setLoading1] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading1(false);
    }, 6000);
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

      {/* Nav links */}
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

        <button
          type="button"
          onClick={() => {
            navigate("/profile");
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-150"
        >
          <IdCard className="w-4 h-4 text-gray-400" />
          Profile
        </button>
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
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="cursor-pointer">
              <ProfileAvatar
                name={student.name}
                initials={student.avatar}
                onClick={() => navigate("/profile")}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-5 sm:p-8">{panels[activeTab]}</div>
      </main>
    </div>
  );
};

export default StudentDashboard;
