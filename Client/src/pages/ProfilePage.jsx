import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ProfileAvatar } from "@/components/Profile.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/pages/AuthContext.jsx";
import { SIDEBAR_LINKS } from "@/constants/sidebarLinks.js";
import api from "@/api/axios.js";
import {
  Bell,
  Menu,
  X,
  Settings,
  LogOut,
  ChevronRight,
  Camera,
  Copy,
  ExternalLink,
  IdCard,
} from "lucide-react";

/* ─── Storage key ─── */
const STORAGE_KEY = "studentProfileData";

const defaultProfile = {
  firstName: "Amina",
  lastName: "Osman",
  email: "amina.osman@student.campusflow.edu",
  phone: "+234 803 123 4567",
  department: "Computer Science",
  level: "400 Level",
  matricNumber: "FUTO/2022/12345",
  state: "Ogun",
  city: "Abeokuta",
  postcode: "110001",
  country: "Nigeria",
};

/* ─── Tabs ─── */
const TABS = [
  { key: "overview", label: "Overview" },
  { key: "clearance", label: "Clearance" },
  { key: "results", label: "Results" },
  { key: "security", label: "Security" },
  { key: "payments", label: "Payments" },
  { key: "certificate", label: "Certificate" },
  { key: "profile", label: "Profile" },
];

/* ─── Framer Motion Animations ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const bannerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [copied, setCopied] = useState(false);

  const [profile, setProfile] = useState(() => {
    if (typeof window === "undefined") return defaultProfile;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultProfile;
    try {
      return JSON.parse(stored);
    } catch {
      return defaultProfile;
    }
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/me");
        const user = res.data?.user;
        if (user) {
          const names = (user.fullname || "").split(" ");
          setProfile((prev) => ({
            ...prev,
            firstName: names[0] || prev.firstName,
            lastName: names.slice(1).join(" ") || prev.lastName,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            department: user.department || prev.department,
            matricNumber: user.matric_number || prev.matricNumber,
            city: user.city || prev.city,
            state: user.state || prev.state,
          }));
        }
      } catch (err) {
        console.error("Failed to load backend profile details:", err);
      }
    };
    fetchUserData();
  }, []);

  const updateField = (field, value) =>
    setProfile((prev) => ({ ...prev, [field]: value }));

  const saveProfile = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    toast.success("Profile saved successfully");
  };

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    setTimeout(() => navigate("/login"), 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://campusflow.edu/student/${profile.matricNumber}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const profileUrl = `https://campusflow.edu/student/${profile.matricNumber}`;
  const displayUrl =
    profileUrl.length > 24 ? profileUrl.slice(0, 24) + "..." : profileUrl;


  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="h-20 px-5 border-b border-gray-100 flex items-center">
        <div className="flex items-center gap-2">
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
        {SIDEBAR_LINKS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              navigate("/dashboard");
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-150"
          >
            <Icon className="w-4 h-4 shrink-0 text-gray-400" />
            {label}
          </button>
        ))}

        {/* Profile — active */}
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white shadow-md shadow-blue-200 transition-all duration-150"
        >
          <IdCard className="w-4 h-4 shrink-0 text-white" />
          Profile
          <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-200" />
        </button>
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 space-y-1 border-t border-gray-100 pt-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-950 transition-colors">
          <Settings className="w-4 h-4 text-gray-400" />
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-60 flex-col bg-white border-r border-gray-100 shrink-0 fixed top-0 left-0 h-full z-30">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar ── */}
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

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* ── Top Header ── */}
        <header className="sticky top-0 z-20 h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-2">
              <ProfileAvatar name={fullName} size="sm" />
              <span className="hidden sm:block text-sm font-semibold text-gray-700">
                {fullName}
              </span>
            </div>
          </div>
        </header>

        {/* ── Page Body ── */}
        <div className="flex-1 p-6 sm:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1140px] mx-auto"
          >
            {/* ── Cover Banner (Slide Down & Scale) ── */}
            <motion.div
              variants={bannerVariants}
              className="relative w-full h-36 sm:h-[160px] rounded-3xl overflow-hidden shadow-md"
            >
              {/* Geometric shapes */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #3b82f6 75%, #1e40af 100%)",
                }}
              />
              {/* Decorative circles */}
              <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full opacity-20 bg-white" />
              <div className="absolute right-32 -bottom-16 w-44 h-44 rounded-full opacity-10 bg-white" />
              <div className="absolute right-12 top-6 w-24 h-24 rounded-full opacity-15 bg-white" />
              {/* Geometric triangles overlay */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                viewBox="0 0 900 240"
                preserveAspectRatio="xMidYMid slice"
              >
                <polygon points="500,0 700,0 600,240" fill="white" />
                <polygon points="650,0 900,0 900,240 750,240" fill="white" opacity="0.5" />
                <polygon points="400,0 550,0 500,240 350,240" fill="white" opacity="0.3" />
              </svg>
            </motion.div>

            {/* ── Two-column layout: Intercepting the Blue Cover background ── */}
            <div className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

              {/* ── Left Profile Card (Fades & Slides Up) ── */}
              <motion.div
                variants={itemVariants}
                className="w-full shrink-0"
              >
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-visible relative pt-0 hover:shadow-md transition-shadow duration-300">
                  {/* Avatar — shifted up to intercept card container */}
                  <div className="flex flex-col items-center -mt-14 px-6 pb-5">
                    <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-lg bg-white overflow-visible flex items-center justify-center group">
                      <ProfileAvatar name={fullName} size="xl" />
                    </div>
                    <h2 className="mt-4 text-base font-bold text-gray-900 text-center uppercase">
                      {fullName}
                    </h2>
                    <p className="uppercase text-xs text-gray-400 text-center mt-0.5 font-medium">
                      {profile.department}
                    </p>
                  </div>

                  {/* Stats rows matching picture layout */}
                  <div className="border-t border-gray-100 px-6 py-4 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Opportunities applied</span>
                      <span className="font-bold text-amber-500">32</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Opportunities won</span>
                      <span className="font-bold text-green-500">26</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Current opportunities</span>
                      <span className="font-bold text-gray-600">6</span>
                    </div>
                  </div>

                  {/* View Public Profile */}
                  <div className="px-6 pb-5 pt-4 border-t border-gray-100 space-y-3">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 hover:border-gray-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Public Profile
                    </button>

                    {/* URL copy row */}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <span className="text-xs text-gray-400 flex-1 truncate font-mono">
                        {displayUrl}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="shrink-0 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {copied && (
                      <p className="text-xs text-green-600 text-center font-medium">
                        Copied!
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ── Right Form Card (Fades & Slides Up) ── */}
              <motion.div
                variants={itemVariants}
                className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Tabs */}
                <div className="border-b border-gray-100 px-6 overflow-x-auto">
                  <div className="flex gap-6 min-w-max">
                    {TABS.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          if (tab.key === "profile") {
                            setActiveTab("profile");
                          } else {
                            navigate("/dashboard", { state: { activeTab: tab.key } });
                          }
                        }}
                        className={`py-5 text-sm font-semibold border-b-2 transition-all relative ${
                          activeTab === tab.key
                            ? "text-blue-600 border-blue-600"
                            : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.key && (
                          <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form body */}
                <div className="p-6 sm:p-8">
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      {/* Row 1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            First Name
                          </label>
                          <Input
                            value={profile.firstName}
                            onChange={(e) =>
                              updateField("firstName", e.target.value)
                            }
                            placeholder="First name"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Last Name
                          </label>
                          <Input
                            value={profile.lastName}
                            onChange={(e) =>
                              updateField("lastName", e.target.value)
                            }
                            placeholder="Last name"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Phone Number
                          </label>
                          <Input
                            value={profile.phone}
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            placeholder="+1800-000"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Email address
                          </label>
                          <Input
                            value={profile.email}
                            type="email"
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            placeholder="email@domain.com"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            City
                          </label>
                          <Input
                            value={profile.city}
                            onChange={(e) =>
                              updateField("city", e.target.value)
                            }
                            placeholder="City"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            State/County
                          </label>
                          <Input
                            value={profile.state}
                            onChange={(e) =>
                              updateField("state", e.target.value)
                            }
                            placeholder="State"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                      </div>

                      {/* Row 4 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Postcode
                          </label>
                          <Input
                            value={profile.postcode}
                            onChange={(e) =>
                              updateField("postcode", e.target.value)
                            }
                            placeholder="Postcode"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Country
                          </label>
                          <Input
                            value={profile.country}
                            onChange={(e) =>
                              updateField("country", e.target.value)
                            }
                            placeholder="Country"
                            className="rounded-lg border-gray-200 focus:border-blue-500 py-5 bg-white"
                          />
                        </div>
                      </div>

                      {/* Update button */}
                      <div className="pt-2 flex justify-center">
                        <Button
                          onClick={saveProfile}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-[1.02] active:scale-98"
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeTab !== "profile" && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-50/50 flex items-center justify-center mb-4">
                        <Settings className="w-7 h-7 text-blue-400" />
                      </div>
                      <p className="text-gray-500 text-sm font-medium">
                        {TABS.find((t) => t.key === activeTab)?.label} settings
                        coming soon.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
