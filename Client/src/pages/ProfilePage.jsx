import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ProfileAvatar } from "@/components/Profile.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Home,
  Menu,
  ShieldCheck,
  User,
  X,
  CreditCard,
  MessageCircle,
  CalendarDays,
} from "lucide-react";

const STORAGE_KEY = "studentProfileData";
const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

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
};

const sidebarLinks = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Security", icon: ShieldCheck },
  { label: "Billing", icon: CreditCard },
  { label: "Messages", icon: MessageCircle },
  { label: "Calendar", icon: CalendarDays },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
  const [selectedTab, setSelectedTab] = useState("Account");

  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    toast.success("Profile saved successfully");
  };

  const initials =
    `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <motion.div
      className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[280px_1fr]">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="relative border-b border-slate-200 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-900 text-white text-lg font-bold">
                CF
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-900">
                  CampusFlow
                </p>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Student profile
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-4 rounded-2xl p-2 text-slate-600 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="space-y-1 px-4 py-6">
            {sidebarLinks.map((item) => {
              const active = item.label === "Profile";
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    item.path && navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-slate-200 px-6 py-6">
            <div className="rounded-[1.75rem] bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Need quick access?</p>
              <p className="mt-2 text-sm text-slate-500">
                Open the dashboard any time from here.
              </p>
              <Button
                type="button"
                className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                onClick={() => {
                  navigate("/dashboard");
                  setSidebarOpen(false);
                }}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </aside>

        <aside className="hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:flex lg:flex-col">
          <div className="border-b border-slate-200 px-6 py-7">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-900 text-white text-lg font-bold">
                CF
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-900">
                  CampusFlow
                </p>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Student profile
                </p>
              </div>
            </div>
          </div>
          <nav className="space-y-1 px-4 py-6">
            {sidebarLinks.map((item) => {
              const active = item.label === "Profile";
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.path && navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-slate-200 px-6 py-6">
            <div className="rounded-[1.75rem] bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Need quick access?</p>
              <p className="mt-2 text-sm text-slate-500">
                Open the dashboard any time from here.
              </p>
              <Button
                type="button"
                className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-3 rounded-[2rem] bg-white/95 px-4 shadow-sm shadow-slate-200/50 backdrop-blur-md lg:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-base font-bold text-slate-900">Profile</h1>
                <p className="text-xs text-slate-500">
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
            <div className="flex items-center gap-3">
              <button className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-slate-50">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Dashboard
              </button>
            </div>
          </header>

          <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 px-6 py-8 text-white shadow-sm sm:px-8 sm:py-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-300">
                  Profile
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Student profile overview
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-200 sm:text-base">
                  Edit your CampusFlow profile, update contact details, and keep
                  your student record accurate.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur">
                  <p className="font-semibold">Active student</p>
                  <p className="text-slate-300">Last updated 2 hours ago</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/30 px-4 py-3 text-sm text-white hover:bg-white/10"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to dashboard
                </Button>
              </div>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <motion.section
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
              variants={cardVariants}
            >
              <div className="bg-slate-950 px-6 py-7 text-white">
                <div className="flex items-start gap-4">
                  <div className="rounded-3xl border border-white/20 bg-white/10 p-2">
                    <ProfileAvatar
                      name={`${profile.firstName} ${profile.lastName}`}
                      initials={initials}
                      size="lg"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                      Student
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300">
                      {profile.department} · {profile.level}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 px-6 py-6">
                <div className="grid gap-4">
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Matric number
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {profile.matricNumber}
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Phone
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {profile.phone}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 rounded-[1.75rem] bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">
                      Student since
                    </span>
                    <span>2022</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">Location</span>
                    <span>
                      {profile.city}, {profile.state}
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
              variants={cardVariants}
            >
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Account", key: "Account" },
                    { label: "Security", key: "Security" },
                    { label: "Billing", key: "Billing" },
                    { label: "Notifications", key: "Notifications" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setSelectedTab(tab.key)}
                      className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                        selectedTab === tab.key
                          ? "bg-slate-900 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      First name
                    </label>
                    <Input
                      value={profile.firstName}
                      onChange={(event) =>
                        updateField("firstName", event.target.value)
                      }
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Last name
                    </label>
                    <Input
                      value={profile.lastName}
                      onChange={(event) =>
                        updateField("lastName", event.target.value)
                      }
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email address
                    </label>
                    <Input
                      value={profile.email}
                      type="email"
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone number
                    </label>
                    <Input
                      value={profile.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Department
                    </label>
                    <Input
                      value={profile.department}
                      onChange={(event) =>
                        updateField("department", event.target.value)
                      }
                      placeholder="Department"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Level
                    </label>
                    <Input
                      value={profile.level}
                      onChange={(event) =>
                        updateField("level", event.target.value)
                      }
                      placeholder="Level"
                    />
                  </div>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      City
                    </label>
                    <Input
                      value={profile.city}
                      onChange={(event) =>
                        updateField("city", event.target.value)
                      }
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      State
                    </label>
                    <Input
                      value={profile.state}
                      onChange={(event) =>
                        updateField("state", event.target.value)
                      }
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Matric number</p>
                  <p className="mt-1 text-slate-500">{profile.matricNumber}</p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    type="button"
                    className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    onClick={saveProfile}
                  >
                    Save profile
                  </Button>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
