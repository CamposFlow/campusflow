import {
    LayoutDashboard, ShieldCheck,
    BookOpen, CreditCard, Award, User, UserCog, FileBarChart, Settings, HelpCircle, IdCard
} from "lucide-react";


export const SIDEBAR_LINKS = [
    { id: 'overview',    label: 'Overview',    icon: LayoutDashboard },
    { id: 'clearance',  label: 'Clearance',   icon: ShieldCheck },
    { id: 'results',    label: 'Results',     icon: BookOpen },
    {id:'security', label: 'Security', icon: ShieldCheck},
    { id: 'payments',   label: 'Payments',    icon: CreditCard },
    { id: 'certificate',label: 'Certificate', icon: Award },
    { icon: IdCard, label: "Profile", id: "profile" },

];

export const AdminLinks =[
    { path: 'overview',    label: 'Overview',    icon: LayoutDashboard },
    { id: 'students',    label: 'Students',    icon: User  },
    { id: 'staff',    label: 'Staff',    icon:UserCog  },
    { id: 'payments',    label: 'Payments',    icon:CreditCard  },
    { id: 'reports',    label: 'Reports',    icon:FileBarChart  },
    { id: 'settings',    label: 'Setting',    icon:Settings  },
]
export const bottomLinks = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
]