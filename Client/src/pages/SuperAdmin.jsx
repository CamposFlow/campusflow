import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Loaders from "@/components/Loaders.jsx";
import { useAuth } from "@/pages/AuthContext.jsx";
import {
  LayoutDashboard,
  School,
  Users,
  Activity,
  Plus,
  Search,
  Power,
  Trash2,
  Bell,
  LogOut,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Database,
  Cpu,
  Globe,
  Terminal,
  Layers,
  Clock,
  ExternalLink,
  ShieldAlert,
  Award,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ─────────────────────────────────────────────────────────────
   Mock / Initial State Data
───────────────────────────────────────────────────────────── */

const initialUniversities = [
  {
    id: 1,
    name: "Federal University of Technology, Owerri",
    code: "FUTO",
    domain: "futo.edu.ng",
    students: 12450,
    status: "Active",
  },
  {
    id: 2,
    name: "University of Lagos",
    code: "UNILAG",
    domain: "unilag.edu.ng",
    students: 28120,
    status: "Active",
  },
  {
    id: 3,
    name: "University of Ibadan",
    code: "UI",
    domain: "ui.edu.ng",
    students: 18900,
    status: "Active",
  },
  {
    id: 4,
    name: "Obafemi Awolowo University",
    code: "OAU",
    domain: "oauife.edu.ng",
    students: 22300,
    status: "Suspended",
  },
  {
    id: 5,
    name: "University of Nigeria, Nsukka",
    code: "UNN",
    domain: "unn.edu.ng",
    students: 24100,
    status: "Active",
  },
];

const initialAdmins = [
  {
    id: 1,
    name: "Dr. Alvan Ikoku",
    email: "alvan.ikoku@futo.edu.ng",
    university: "FUTO",
    status: "Active",
  },
  {
    id: 2,
    name: "Prof. Toyin Ogundipe",
    email: "t.ogundipe@unilag.edu.ng",
    university: "UNILAG",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Kayode Adebowale",
    email: "k.adebowale@ui.edu.ng",
    university: "UI",
    status: "Active",
  },
  {
    id: 4,
    name: "Prof. Eyitope Ogunbodede",
    email: "e.ogunbodede@oauife.edu.ng",
    university: "OAU",
    status: "Suspended",
  },
];

const chartData = [
  { month: "Jan", FUTO: 400, UNILAG: 240, UI: 200, OAU: 180 },
  { month: "Feb", FUTO: 520, UNILAG: 310, UI: 230, OAU: 210 },
  { month: "Mar", FUTO: 610, UNILAG: 460, UI: 320, OAU: 190 },
  { month: "Apr", FUTO: 780, UNILAG: 550, UI: 400, OAU: 260 },
  { month: "May", FUTO: 900, UNILAG: 720, UI: 490, OAU: 310 },
  { month: "Jun", FUTO: 1100, flex: 890, UI: 610, OAU: 290 },
];

// Note: map 'flex' to UNILAG key in month Jun
chartData[5].UNILAG = 890;

const initialActivities = [
  {
    id: 1,
    text: "Assigned Administrator 'Prof. Toyin Ogundipe' to UNILAG",
    time: "10 mins ago",
    type: "admin",
  },
  {
    id: 2,
    text: "University profiles for FUTO synchronized on-chain",
    time: "1 hr ago",
    type: "system",
  },
  {
    id: 3,
    text: "OAU campus status set to Suspended by SuperAdmin",
    time: "3 hrs ago",
    type: "warning",
  },
  {
    id: 4,
    text: "New University registered: University of Nigeria, Nsukka",
    time: "1 day ago",
    type: "success",
  },
];

const initialSOSAlerts = [
  {
    id: 1,
    campus: "FUTO",
    route: "Female Hostel Corridor",
    time: "5 mins ago",
    severity: "High",
  },
  {
    id: 2,
    campus: "UNILAG",
    route: "Main Library Gate",
    time: "12 mins ago",
    severity: "Medium",
  },
];

/* ─────────────────────────────────────────────────────────────
   Main Dashboard Component
───────────────────────────────────────────────────────────── */

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Core Entity States
  const [universities, setUniversities] = useState(initialUniversities);
  const [admins, setAdmins] = useState(initialAdmins);
  const [activities, setActivities] = useState(initialActivities);
  const [sosAlerts, setSosAlerts] = useState(initialSOSAlerts);

  // Search States
  const [uniSearch, setUniSearch] = useState("");
  const [adminSearch, setAdminSearch] = useState("");

  // Modals States
  const [uniModalOpen, setUniModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Form Fields
  const [newUni, setNewUni] = useState({
    name: "",
    code: "",
    domain: "",
    students: "",
  });
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    university: "",
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    setTimeout(() => navigate("/login"), 800);
  };

  /* ─────────────────────────────────────────────────────────────
     Action Handlers
  ───────────────────────────────────────────────────────────── */

  const addUniversity = (e) => {
    e.preventDefault();
    if (!newUni.name || !newUni.code || !newUni.domain) {
      toast.error("Please fill all required fields");
      return;
    }

    const created = {
      id: Date.now(),
      name: newUni.name,
      code: newUni.code.toUpperCase(),
      domain: newUni.domain.toLowerCase(),
      students: Number(newUni.students) || 0,
      status: "Active",
    };

    setUniversities([created, ...universities]);
    setActivities([
      {
        id: Date.now(),
        text: `Registered new university: ${created.name} (${created.code})`,
        time: "Just now",
        type: "success",
      },
      ...activities,
    ]);
    setNewUni({ name: "", code: "", domain: "", students: "" });
    setUniModalOpen(false);
    toast.success(`${created.code} successfully registered!`);
  };

  const deleteUniversity = (id, code) => {
    if (window.confirm(`Are you sure you want to remove ${code}?`)) {
      setUniversities(universities.filter((u) => u.id !== id));
      setActivities([
        {
          id: Date.now(),
          text: `Removed University: ${code}`,
          time: "Just now",
          type: "warning",
        },
        ...activities,
      ]);
      toast.success(`${code} removed successfully`);
    }
  };

  const toggleUniversityStatus = (id, currentStatus, code) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUniversities(
      universities.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
    );
    setActivities([
      {
        id: Date.now(),
        text: `University ${code} status changed to ${newStatus}`,
        time: "Just now",
        type: "system",
      },
      ...activities,
    ]);
    toast.info(`${code} is now ${newStatus}`);
  };

  const addAdmin = (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email || !newAdmin.university) {
      toast.error("Please fill all fields");
      return;
    }

    const created = {
      id: Date.now(),
      name: newAdmin.name,
      email: newAdmin.email.toLowerCase(),
      university: newAdmin.university,
      status: "Active",
    };

    setAdmins([created, ...admins]);
    setActivities([
      {
        id: Date.now(),
        text: `Assigned admin ${created.name} to ${created.university}`,
        time: "Just now",
        type: "admin",
      },
      ...activities,
    ]);
    setNewAdmin({ name: "", email: "", university: "" });
    setAdminModalOpen(false);
    toast.success(`Admin assigned successfully for ${created.university}!`);
  };

  const deleteAdmin = (id, name) => {
    if (window.confirm(`Revoke admin privileges for ${name}?`)) {
      setAdmins(admins.filter((a) => a.id !== id));
      setActivities([
        {
          id: Date.now(),
          text: `Revoked Admin permissions: ${name}`,
          time: "Just now",
          type: "warning",
        },
        ...activities,
      ]);
      toast.success("Administrator revoked successfully");
    }
  };

  const toggleAdminStatus = (id, currentStatus, name) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setAdmins(
      admins.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
    toast.info(`${name} status set to ${newStatus}`);
  };

  if (loading) {
    return <Loaders />;
  }

  /* ─────────────────────────────────────────────────────────────
     Sidebar Content (Reusable for Mobile & Desktop)
  ───────────────────────────────────────────────────────────── */

  const SidebarContent = () => {
    const links = [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "universities", label: "Universities", icon: School },
      { id: "admins", label: "Administrators", icon: Users },
      { id: "health", label: "System Health", icon: Activity },
    ];

    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">
        {/* Header Logo */}
        <div className="h-20 px-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <img src="./LOGO1.png" alt="CampusFlow" className="w-10 h-10" />
          <div>
            <h1 className="font-bold text-gray-950 dark:text-white text-base tracking-tight leading-none">
              Campus<span className="text-blue-600">Flow</span>
            </h1>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1 block">
              Super Admin
            </span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {links.map((link) => {
            const active = activeTab === link.id;
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`w-4.5 h-4.5 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-500"}`}
                />
                <span>{link.label}</span>
                {active && (
                  <ChevronRight className="w-4 h-4 ml-auto text-blue-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed top-0 left-0 h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-50 shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-150"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize leading-tight">
                {activeTab === "health"
                  ? "System Health & Audits"
                  : `${activeTab}`}
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5 hidden sm:block">
                CampusFlow Global System Status —{" "}
                {new Date().toLocaleDateString("en-NG", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden md:flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Node Sync</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
            </button>

            {/* Profile Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-blue-100 dark:shadow-none select-none">
              SA
            </div>
          </div>
        </header>

        {/* Content Dynamic Panel */}
        <div className="flex-1 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "overview" && (
                <SuperAdminOverview
                  universities={universities}
                  admins={admins}
                  activities={activities}
                  sosAlerts={sosAlerts}
                  setSosAlerts={setSosAlerts}
                />
              )}
              {activeTab === "universities" && (
                <SuperAdminUniversities
                  universities={universities}
                  uniSearch={uniSearch}
                  setUniSearch={setUniSearch}
                  uniModalOpen={uniModalOpen}
                  setUniModalOpen={setUniModalOpen}
                  newUni={newUni}
                  setNewUni={setNewUni}
                  addUniversity={addUniversity}
                  deleteUniversity={deleteUniversity}
                  toggleUniversityStatus={toggleUniversityStatus}
                  admins={admins}
                />
              )}
              {activeTab === "admins" && (
                <SuperAdminAdmins
                  admins={admins}
                  adminSearch={adminSearch}
                  setAdminSearch={setAdminSearch}
                  adminModalOpen={adminModalOpen}
                  setAdminModalOpen={setAdminModalOpen}
                  newAdmin={newAdmin}
                  setNewAdmin={setNewAdmin}
                  addAdmin={addAdmin}
                  deleteAdmin={deleteAdmin}
                  toggleAdminStatus={toggleAdminStatus}
                  universities={universities}
                />
              )}
              {activeTab === "health" && <SuperAdminSystemHealth />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PANEL: Overview
───────────────────────────────────────────────────────────── */

const SuperAdminOverview = ({
  universities,
  admins,
  activities,
  sosAlerts,
  setSosAlerts,
}) => {
  // Mock data for monitoring lists
  const studentsList = [
    {
      id: 1,
      name: "John Doe",
      email: "john@futo.edu.ng",
      university: "FUTO",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@unilag.edu.ng",
      university: "UNILAG",
      status: "Active",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      email: "ahmed@ui.edu.ng",
      university: "UI",
      status: "Active",
    },
    {
      id: 4,
      name: "Chioma Okafor",
      email: "chioma@oau.edu.ng",
      university: "OAU",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Bola Adeyemi",
      email: "bola@unn.edu.ng",
      university: "UNN",
      status: "Active",
    },
  ];

  const schoolsList = universities;

  const uploadedDocuments = [
    {
      id: 1,
      student: "John Doe",
      document: "WAEC Certificate",
      university: "FUTO",
      uploadDate: "2025-01-15",
      status: "Verified",
    },
    {
      id: 2,
      student: "Jane Smith",
      document: "Birth Certificate",
      university: "UNILAG",
      uploadDate: "2025-01-14",
      status: "Verified",
    },
    {
      id: 3,
      student: "Ahmed Hassan",
      document: "UTME Admit",
      university: "UI",
      uploadDate: "2025-01-13",
      status: "Pending",
    },
    {
      id: 4,
      student: "Chioma Okafor",
      document: "ID Card",
      university: "OAU",
      uploadDate: "2025-01-12",
      status: "Verified",
    },
  ];

  const rejectedDocuments = [
    {
      id: 1,
      student: "Tunde Obi",
      document: "Passport",
      university: "FUTO",
      rejectionReason: "Image too blurry",
      rejectedDate: "2025-01-10",
    },
    {
      id: 2,
      student: "Grace Eze",
      document: "Driver's License",
      university: "UNILAG",
      rejectionReason: "Expired",
      rejectedDate: "2025-01-08",
    },
    {
      id: 3,
      student: "David Mensah",
      document: "WAEC Certificate",
      university: "UI",
      rejectionReason: "Invalid format",
      rejectedDate: "2025-01-06",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <div className="rounded-3xl border border-blue-100/70 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-6 text-white shadow-lg shadow-blue-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-blue-100">
              Super admin control center
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              System Monitoring Dashboard
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-blue-100/90">
              Monitor students, schools, and document uploads across the
              platform.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-blue-100">
              System Status
            </p>
            <p className="mt-1 text-lg font-semibold">
              All systems operational
            </p>
          </div>
        </div>
      </div>

      {/* Four Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Students List */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <Users className="h-4 w-4 text-blue-600" />
              Students
            </h3>
            <span className="text-xs font-semibold text-gray-400">
              {studentsList.length} total
            </span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {studentsList.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {student.name}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {student.university}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    student.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Schools List */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <School className="h-4 w-4 text-indigo-600" />
              Schools
            </h3>
            <span className="text-xs font-semibold text-gray-400">
              {schoolsList.length} registered
            </span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {schoolsList.map((school) => (
              <div
                key={school.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {school.code}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    {school.name}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    school.status === "Active"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {school.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Uploaded Documents */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <Award className="h-4 w-4 text-emerald-600" />
              Documents Uploaded
            </h3>
            <span className="text-xs font-semibold text-gray-400">
              {uploadedDocuments.length} files
            </span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uploadedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {doc.document}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {doc.student} • {doc.university}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    doc.status === "Verified"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rejected Documents */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25 }}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Rejected Documents
            </h3>
            <span className="text-xs font-semibold text-gray-400">
              {rejectedDocuments.length} rejected
            </span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {rejectedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col rounded-lg bg-red-50/50 p-3 dark:bg-red-950/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {doc.document}
                    </p>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400">
                      {doc.student}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
                    Rejected
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-red-600 dark:text-red-400 font-medium">
                  Reason: {doc.rejectionReason}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PANEL: Universities Management
───────────────────────────────────────────────────────────── */

const SuperAdminUniversities = ({
  universities,
  uniSearch,
  setUniSearch,
  uniModalOpen,
  setUniModalOpen,
  newUni,
  setNewUni,
  addUniversity,
  deleteUniversity,
  toggleUniversityStatus,
  admins,
}) => {
  const filtered = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      u.code.toLowerCase().includes(uniSearch.toLowerCase()) ||
      u.domain.toLowerCase().includes(uniSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search universities by code, name, domain..."
            value={uniSearch}
            onChange={(e) => setUniSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          onClick={() => setUniModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4.5 py-2.5 rounded-xl shadow-md shadow-blue-105 dark:shadow-none transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Register University</span>
        </button>
      </div>

      {/* Universities Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Academic Domain
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Enrolled Students
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Campus Admin
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Node Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-400 font-semibold"
                  >
                    No registered universities match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((uni, idx) => {
                  const assignedAdmin = admins.find(
                    (a) => a.university === uni.code,
                  );

                  return (
                    <tr
                      key={uni.id}
                      className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-850/30 transition-colors"
                    >
                      <td className="px-6 py-4.5 font-semibold text-gray-900 dark:text-white">
                        {uni.name}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="text-xs font-bold font-mono tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                          {uni.code}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 font-medium text-gray-500 dark:text-gray-400">
                        {uni.domain}
                      </td>
                      <td className="px-6 py-4.5 font-bold text-gray-700 dark:text-gray-300">
                        {uni.students.toLocaleString()}
                      </td>
                      <td className="px-6 py-4.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {assignedAdmin ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[9px]">
                              {assignedAdmin.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span>{assignedAdmin.name}</span>
                          </div>
                        ) : (
                          <span className="text-amber-500 italic font-medium">
                            No admin assigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4.5">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border tracking-wider ${
                            uni.status === "Active"
                              ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50"
                              : "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/50"
                          }`}
                        >
                          {uni.status}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() =>
                            toggleUniversityStatus(uni.id, uni.status, uni.code)
                          }
                          title="Toggle Status"
                          className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-150 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
                        >
                          <Power
                            className={`w-4 h-4 ${uni.status === "Active" ? "text-emerald-500" : "text-gray-400"}`}
                          />
                        </button>
                        <button
                          onClick={() => deleteUniversity(uni.id, uni.code)}
                          title="Remove University"
                          className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/60 text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register University Modal */}
      <AnimatePresence>
        {uniModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUniModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-2xl z-10 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Register Campus Node
                </h3>
                <button
                  onClick={() => setUniModalOpen(false)}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={addUniversity} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Federal University of Technology, Owerri"
                    value={newUni.name}
                    onChange={(e) =>
                      setNewUni({ ...newUni, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                      Campus Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FUTO"
                      value={newUni.code}
                      onChange={(e) =>
                        setNewUni({ ...newUni, code: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                      Enrolled Count
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 15000"
                      value={newUni.students}
                      onChange={(e) =>
                        setNewUni({ ...newUni, students: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Academic Domain Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. futo.edu.ng"
                    value={newUni.domain}
                    onChange={(e) =>
                      setNewUni({ ...newUni, domain: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setUniModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-100 dark:shadow-none transition-colors cursor-pointer"
                  >
                    Register Node
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PANEL: Administrators Management
───────────────────────────────────────────────────────────── */

const SuperAdminAdmins = ({
  admins,
  adminSearch,
  setAdminSearch,
  adminModalOpen,
  setAdminModalOpen,
  newAdmin,
  setNewAdmin,
  addAdmin,
  deleteAdmin,
  toggleAdminStatus,
  universities,
}) => {
  const filtered = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      a.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
      a.university.toLowerCase().includes(adminSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search admins by name, email, campus..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          onClick={() => setAdminModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4.5 py-2.5 rounded-xl shadow-md shadow-blue-100 dark:shadow-none transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Assign Administrator</span>
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Administrator
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Assigned Campus
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-400 font-semibold"
                  >
                    No administrators found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((adm, idx) => (
                  <tr
                    key={adm.id}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-850/30 transition-colors"
                  >
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                          {adm.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {adm.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 font-medium text-gray-500 dark:text-gray-400">
                      {adm.email}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="text-xs font-bold font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                        {adm.university}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border tracking-wider ${
                          adm.status === "Active"
                            ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50"
                            : "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/50"
                        }`}
                      >
                        {adm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() =>
                          toggleAdminStatus(adm.id, adm.status, adm.name)
                        }
                        title="Toggle status"
                        className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-150 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
                      >
                        <Power
                          className={`w-4 h-4 ${adm.status === "Active" ? "text-emerald-500" : "text-gray-400"}`}
                        />
                      </button>
                      <button
                        onClick={() => deleteAdmin(adm.id, adm.name)}
                        title="Revoke Admin Access"
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/60 text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Admin Modal */}
      <AnimatePresence>
        {adminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAdminModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-2xl z-10 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Assign University Administrator
                </h3>
                <button
                  onClick={() => setAdminModalOpen(false)}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={addAdmin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Administrator Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. Toyin Ogundipe"
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. t.ogundipe@unilag.edu.ng"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Select Campus University *
                  </label>
                  <select
                    required
                    value={newAdmin.university}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, university: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  >
                    <option value="">-- Choose School --</option>
                    {universities.map((u) => (
                      <option key={u.id} value={u.code}>
                        {u.name} ({u.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setAdminModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-100 dark:shadow-none transition-colors cursor-pointer"
                  >
                    Assign Admin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PANEL: System Health
───────────────────────────────────────────────────────────── */

const SuperAdminSystemHealth = () => {
  const [latency, setLatency] = useState(12);
  const [logs, setLogs] = useState([
    "CFS-01: [INFO] System Health initialized successfully.",
    "CFS-02: [INFO] Mainnet Blockchain syncing node initialized.",
    "CFS-03: [INFO] API Gateway listener active on port 443.",
    "CFS-04: [INFO] Synced block #1,204,912.",
  ]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const isOk = Math.random() > 0.15;
      const ms = Math.floor(Math.random() * 15) + 6;
      setLatency(ms);

      const codes = ["FUTO", "UNILAG", "UI", "OAU", "UNN"];
      const campus = codes[Math.floor(Math.random() * codes.length)];
      const block = 1204912 + Math.floor(Math.random() * 200);

      const possibleLogs = [
        `CFS-NODE: [INFO] Sync block #${block} successful.`,
        `CFS-API: [INFO] GET /api/v1/clearance/status from ${campus} admin - 200 OK (${ms}ms).`,
        `CFS-DB: [INFO] Write certificate signature block to database - Success.`,
        `CFS-BLOCKCHAIN: [SUCCESS] Transaction mined on Block #${block}.`,
        isOk
          ? `CFS-HEALTH: [INFO] Pulse checked - all components nominal.`
          : `CFS-WARN: [WARN] Temporary database IO spike detected - resolving.`,
      ];

      setLogs((prev) => [
        ...prev.slice(-15),
        possibleLogs[Math.floor(Math.random() * possibleLogs.length)],
      ]);
    }, 3000);

    return () => clearInterval(logInterval);
  }, []);

  const healthMetrics = [
    {
      name: "Main API Gateway",
      status: "Nominal",
      value: `${latency}ms`,
      desc: "Vercel Server Latency",
      icon: Globe,
      color: "text-emerald-500",
      pct: 98,
    },
    {
      name: "Blockchain Node Verification",
      status: "Active",
      value: "Syncing",
      desc: "10 Mainnet Peers",
      icon: Layers,
      color: "text-blue-500",
      pct: 100,
    },
    {
      name: "System Cluster Load",
      status: "Nominal",
      value: "8.4%",
      desc: "Cloud CPU Capacity",
      icon: Cpu,
      color: "text-purple-500",
      pct: 8,
    },
    {
      name: "On-Chain Database IO",
      status: "Nominal",
      value: "99.98%",
      desc: "Write Availability",
      icon: Database,
      color: "text-teal-500",
      pct: 99,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {healthMetrics.map((met, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">
                  {met.name}
                </p>
                <h4 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                  {met.value}
                </h4>
              </div>
              <met.icon className={`w-5 h-5 ${met.color}`} />
            </div>

            <div className="mt-4.5 space-y-1">
              <div className="flex justify-between text-[10px] text-gray-450 font-bold">
                <span>{met.desc}</span>
                <span className={met.color}>{met.status}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    met.color.includes("emerald")
                      ? "bg-emerald-500"
                      : met.color.includes("blue")
                        ? "bg-blue-500"
                        : met.color.includes("purple")
                          ? "bg-purple-500"
                          : "bg-teal-500"
                  }`}
                  style={{ width: `${met.pct}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Simulator Logs */}
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col font-mono text-xs text-gray-200">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3 text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5 text-blue-500" />
            <span className="font-semibold text-gray-300">
              Global Node Cluster Console Log
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
        </div>

        <div className="flex-1 space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {logs.map((log, idx) => {
            let textColor = "text-gray-305";
            if (log.includes("[SUCCESS]")) textColor = "text-emerald-400";
            if (log.includes("[WARN]"))
              textColor = "text-amber-400 font-semibold";
            if (log.includes("[ERROR]")) textColor = "text-red-400 font-bold";

            return (
              <p
                key={idx}
                className={`leading-relaxed whitespace-pre-wrap ${textColor}`}
              >
                {log}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
