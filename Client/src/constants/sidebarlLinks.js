import {LayoutDashboard, ShieldCheck,
BookOpen, CreditCard, Award, User} from "lucide-react";

export const SIDEBAR_LINKS = [
    { id: 'overview',    label: 'Overview',    icon: LayoutDashboard },
    { id: 'clearance',  label: 'Clearance',   icon: ShieldCheck },
    { id: 'results',    label: 'Results',     icon: BookOpen },
    { id: 'payments',   label: 'Payments',    icon: CreditCard },
    { id: 'certificate',label: 'Certificate', icon: Award },
];