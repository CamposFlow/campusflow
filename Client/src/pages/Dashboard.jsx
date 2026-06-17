import React, { useState } from 'react';
import {
  CheckCircle,
  Clock,
  CreditCard,
  Award,
  BookOpen,
  User,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  ChevronRight,
  TrendingUp,
  Hash,
  GraduationCap,
  AlertCircle,
  Menu,
  X,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Tiny inline-style helpers (no extra deps)
───────────────────────────────────────────── */
const style = (obj) => obj;

const SIDEBAR_LINKS = [
  { id: 'overview',    label: 'Overview',    icon: LayoutDashboard },
  { id: 'clearance',  label: 'Clearance',   icon: ShieldCheck },
  { id: 'results',    label: 'Results',     icon: BookOpen },
  { id: 'payments',   label: 'Payments',    icon: CreditCard },
  { id: 'certificate',label: 'Certificate', icon: Award },
];

/* ── Circular SVG progress ring ── */
const Ring = ({ pct = 0, color = '#2563eb', size = 80, stroke = 7 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
    </svg>
  );
};

/* ─────── Tab content panels ─────── */

const OverviewPanel = ({ student, stats, activities }) => (
  <div>
    {/* Greeting banner */}
    <div
      className="rounded-2xl p-7 mb-8 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%)' }}
    >
      {/* decorative circles */}
      <div style={{
        position:'absolute', right:'-40px', top:'-40px',
        width:'200px', height:'200px', borderRadius:'50%',
        background:'rgba(255,255,255,0.07)'
      }} />
      <div style={{
        position:'absolute', right:'60px', bottom:'-60px',
        width:'160px', height:'160px', borderRadius:'50%',
        background:'rgba(255,255,255,0.05)'
      }} />
      <div className="relative z-10">
        <p className="text-blue-200 text-sm font-medium mb-1">Good evening,</p>
        <h2 className="text-3xl font-bold mb-1">{student.name}</h2>
        <p className="text-blue-200 text-sm">
          {student.department} · {student.level} · {student.studentId}
        </p>
        <div className="flex gap-3 mt-5">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5 text-green-300" /> Session Active
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-300" /> 2025/2026 Session
          </span>
        </div>
      </div>
    </div>

    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((s, i) => (
        <div key={i}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
        >
          <div className={`w-11 h-11 ${s.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
            <s.icon className={`w-5 h-5 ${s.color}`} />
          </div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{s.title}</p>
          <p className={`text-base font-bold ${s.color}`}>{s.status}</p>
        </div>
      ))}
    </div>

    {/* Lower grid */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

      {/* Clearance summary */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">Clearance Progress</h3>
        <div className="flex items-center justify-center mb-5">
          <div className="relative">
            <Ring pct={67} color="#2563eb" size={110} stroke={9} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">67%</span>
              <span className="text-[10px] text-gray-400 font-medium">Complete</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Department', pct: 0,   color: 'bg-orange-400', status: 'Pending' },
            { label: 'Library',    pct: 100, color: 'bg-green-500',  status: 'Done' },
            { label: 'Finance',    pct: 100, color: 'bg-green-500',  status: 'Done' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-24 shrink-0">{item.label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
              <span className={`text-xs font-semibold ${item.pct === 100 ? 'text-green-600' : 'text-orange-500'}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Recent Activity</h3>
          <button className="text-xs text-blue-600 font-medium hover:underline">View all</button>
        </div>
        <div className="space-y-4">
          {activities.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={`p-2.5 rounded-xl ${a.status === 'completed' ? 'bg-green-50' : 'bg-orange-50'}`}>
                {a.status === 'completed'
                  ? <CheckCircle className="w-4 h-4 text-green-600" />
                  : <Clock className="w-4 h-4 text-orange-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{a.action}</p>
                <p className="text-xs text-gray-400">{a.date}</p>
              </div>
              <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                a.status === 'completed'
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-orange-50 text-orange-500 border border-orange-200'
              }`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ClearancePanel = () => (
  <div>
    <SectionHeader title="Clearance Status" sub="Track your departmental clearance in real time" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {[
        { label:'Department', status:'Pending',   icon: Clock,       color:'text-orange-600', bg:'bg-orange-50', border:'border-orange-200', pct:20  },
        { label:'Library',    status:'Completed', icon: CheckCircle, color:'text-green-600',  bg:'bg-green-50',  border:'border-green-200',  pct:100 },
        { label:'Finance',    status:'Completed', icon: ShieldCheck, color:'text-green-600',  bg:'bg-green-50',  border:'border-green-200',  pct:100 },
      ].map((c,i) => (
        <div key={i} className={`bg-white rounded-2xl border ${c.border} p-6 shadow-sm hover:shadow-md transition-all`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{c.label} Clearance</p>
              <p className={`text-xs font-semibold ${c.color}`}>{c.status}</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`${c.pct === 100 ? 'bg-green-500' : 'bg-orange-400'} h-full rounded-full`}
              style={{ width: `${c.pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">{c.pct}%</p>
        </div>
      ))}
    </div>
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4 items-start">
      <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-blue-800">Department clearance is pending</p>
        <p className="text-xs text-blue-600 mt-1">Visit the Computer Science department office with your completed forms to continue your clearance process.</p>
      </div>
    </div>
  </div>
);

const ResultsPanel = () => (
  <div>
    <SectionHeader title="Academic Results" sub="Your semester grades and GPA overview" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {[
        { label:'Current GPA',   value:'4.21', sub:'Out of 5.0', color:'text-blue-600',  bg:'bg-blue-50',  icon: TrendingUp },
        { label:'Credit Units',  value:'124',  sub:'Accumulated', color:'text-green-600', bg:'bg-green-50', icon: BookOpen },
        { label:'Semester Rank', value:'#7',   sub:'In department',color:'text-amber-600', bg:'bg-amber-50', icon: GraduationCap },
      ].map((s,i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
            <s.icon className={`w-5 h-5 ${s.color}`} />
          </div>
          <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
          <p className="text-xs text-gray-400 font-medium">{s.label}</p>
          <p className="text-[11px] text-gray-300 mt-0.5">{s.sub}</p>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">400 Level — 1st Semester</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="pb-3 font-semibold">Course</th>
              <th className="pb-3 font-semibold">Title</th>
              <th className="pb-3 font-semibold text-center">Units</th>
              <th className="pb-3 font-semibold text-center">Score</th>
              <th className="pb-3 font-semibold text-center">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              ['CSC 401','Software Engineering','3','88','A'],
              ['CSC 403','Computer Networks','3','76','B'],
              ['CSC 405','Database Systems','3','92','A'],
              ['MTH 401','Numerical Methods','2','65','C'],
              ['CSC 407','Compiler Design','3','80','A'],
            ].map(([code,title,units,score,grade],i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 font-mono text-xs text-blue-600 font-semibold">{code}</td>
                <td className="py-3 text-gray-700">{title}</td>
                <td className="py-3 text-center text-gray-500">{units}</td>
                <td className="py-3 text-center font-semibold text-gray-800">{score}</td>
                <td className="py-3 text-center">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    grade==='A' ? 'bg-green-50 text-green-600 border border-green-200'
                    : grade==='B' ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-orange-50 text-orange-600 border border-orange-200'
                  }`}>{grade}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const PaymentsPanel = () => (
  <div>
    <SectionHeader title="Payment Records" sub="Blockchain-verified payment transactions" />
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4 items-start mb-8">
      <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
      <p className="text-sm text-blue-700">
        All transactions are <span className="font-semibold">hashed and stored on the blockchain</span>.
        Payment records cannot be altered or deleted.
      </p>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">Transaction History</h3>
      <div className="space-y-4">
        {[
          { desc:'School Fees — 400L 1st Semester', amount:'₦320,000', date:'Jan 10, 2025', hash:'0x3a9f...c821', status:'Verified' },
          { desc:'Hostel Accommodation',            amount:'₦85,000',  date:'Jan 11, 2025', hash:'0xb2e1...f044', status:'Verified' },
          { desc:'Late Registration Fee',           amount:'₦5,000',   date:'Jan 12, 2025', hash:'0x77d3...9a11', status:'Verified' },
        ].map((t,i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{t.desc}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{t.amount}</p>
                <span className="text-[11px] font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  {t.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <Hash className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <code className="text-[11px] text-gray-500 font-mono truncate">{t.hash}</code>
              <span className="text-[10px] text-blue-500 ml-auto cursor-pointer group-hover:underline">Verify</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CertificatePanel = () => (
  <div>
    <SectionHeader title="Certificate" sub="Your blockchain-verified academic certificate" />
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Certificate preview area */}
      <div
        className="relative flex flex-col items-center justify-center py-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)' }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
        >
          <Award className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Not Yet Available</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Your certificate will be issued after all clearance processes are completed and verified by your institution.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
            Check Requirements
          </button>
          <button className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:border-blue-200 text-sm font-semibold rounded-xl transition-colors">
            Contact Registry
          </button>
        </div>
      </div>
      <div className="border-t border-gray-100 p-6">
        <p className="text-xs text-gray-400 font-medium mb-3">Certificate requirements checklist</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label:'All clearances approved',  done: false },
            { label:'Library clearance',        done: true  },
            { label:'Finance clearance',        done: true  },
            { label:'NYSC mobilisation letter', done: false },
          ].map((req, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {req.done
                ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                : <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />}
              <span className={`text-sm ${req.done ? 'text-gray-600' : 'text-gray-400'}`}>{req.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, sub }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <p className="text-sm text-gray-400 mt-0.5">{sub}</p>
  </div>
);

/* ─────────────────────────────────────────────
   Main Dashboard Component
───────────────────────────────────────────── */
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const student = {
    name: 'John Doe',
    studentId: 'STU-2024-001',
    department: 'Computer Science',
    level: '400 Level',
    avatar: 'JD',
  };

  const stats = [
    { title: 'Certificate',  status: 'Not Available', icon: Award,      color: 'text-amber-600',  bgColor: 'bg-amber-50'  },
    { title: 'Clearance',    status: '67% Complete',  icon: Clock,       color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { title: 'Results',      status: 'Available',     icon: BookOpen,    color: 'text-green-600',  bgColor: 'bg-green-50'  },
    { title: 'Payment',      status: 'Verified',      icon: CreditCard,  color: 'text-blue-600',   bgColor: 'bg-blue-50'   },
  ];

  const activities = [
    { id: 1, action: 'School fees payment verified', date: 'Jan 15, 2025', status: 'completed' },
    { id: 2, action: 'Department clearance request submitted',     date: 'Jan 12, 2025', status: 'pending'   },
    { id: 3, action: 'Semester result uploaded for review',        date: 'Jan 10, 2025', status: 'completed' },
    { id: 4, action: 'Library clearance approved',                 date: 'Jan 8, 2025',  status: 'completed' },
  ];

  const panels = {
    overview:    <OverviewPanel student={student} stats={stats} activities={activities} />,
    clearance:   <ClearancePanel />,
    results:     <ResultsPanel />,
    payments:    <PaymentsPanel />,
    certificate: <CertificatePanel />,
  };

  /* ── Sidebar content (shared between desktop & mobile) ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">CampusFlow</span>
        </div>
      </div>

      {/* Avatar */}
      <div className="px-5 py-5 border-b border-gray-100">
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
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between">
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

        {/* Page content */}
        <div className="flex-1 p-5 sm:p-8">
          {panels[activeTab]}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;