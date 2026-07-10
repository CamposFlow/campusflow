import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider, useAuth } from "./pages/AuthContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Portal from "./pages/Portal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import {Toaster} from "sonner";
import {AdminDashboard} from "@/pages/Admin/AdminDashboard.jsx";
import {StaffDashboard} from "@/pages/Staff/StaffDashboard.jsx";
import {GoogleSuccess} from "./components/Google";
import Onboarding from "@/pages/Onboarding.jsx";
import InstallBanner from "@/components/InstallBanner.jsx";
import {NotFound} from '@/components/NotFound.jsx'
import {FloatingSOSButton} from "./components/FloatingSOSButton.jsx";

function ProtectedRoute({allowedRoles}) {
    const {token,role} = useAuth();

    if (!token) {
        return <Navigate to={`/login`} replace />;
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to={`/login`} replace />;
    }
    return (
        <>
            <Outlet />
            <FloatingSOSButton/>
        </>
    );
}

function PublicRoute({children}) {
    const {token, role} = useAuth();
    if (token) {
        const redirectMap = { admin: "/admin", staff: "/staff", student: "/dashboard" };
        return <Navigate to={redirectMap[role] || "/dashboard"} replace/>
    }
    return children;
}

function App() {

    return (<AuthProvider>
            <InstallBanner/>

            <Toaster
                position="top-right"
                closeButton
                expand={false}
                toastOptions={{
                    classNames: {
                        toast: 'rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] !min-w-[420px] !p-4 !text-[15px] !font-medium border',
                        title: '!text-base !font-semibold',
                        success: '!bg-blue-600 !text-white !border-blue-600',
                        error: '!bg-red-50 !text-red-600 !border-red-200',
                        warning: '!bg-yellow-50 !text-yellow-700 !border-yellow-200',
                        info: '!bg-blue-50 !text-blue-700 !border-blue-200',
                        closeButton: '!bg-white/20 !border-none !text-white/80 hover:!text-white',
                        icon: '!w-5 !h-5',
                    },
                }}
            />
            <Routes>
                <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
                <Route path="/google-success" element={<GoogleSuccess/>} />
                <Route path="/reset" element={<PublicRoute><ForgotPassword/></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/onboarding" element={<PublicRoute><Onboarding/></PublicRoute>} />
                <Route path="/verify" element={<Portal/>}/>
                    <Route path="*" element={<NotFound />}/>

                <Route element={<ProtectedRoute allowedRoles={["student"]}/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>

                </Route>
                <Route element={<ProtectedRoute allowedRoles={["staff"]}/>}>
                    <Route path="/staff" element={<StaffDashboard/>}/>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                </Route>

            </Routes>
        </AuthProvider>
    )
}

export default App;




// function App() {
//
//     return (<>
//             <Toaster
//                 position="bottom-right"
//                 toastOptions={{
//                     className:'',
//                     style: {
//                         border:'1px solid blue',
//                         color:'white',
//                         padding:'8px',
//                         backgroundColor:'navy',
//                     },
//                 }}/>
//             <Routes>
//                 <Route path="/login" element={<Login/>} />
//                 <Route path="/reset" element={<ForgotPassword/>} />
//                 <Route path="/register" element={<Register/>} />
//                 <Route path="/" element={<LandingPage/>}/>
//                 <Route path="/verify" element={<Portal/>}/>
//                     <Route path="/dashboard" element={<Dashboard/>}/>
//                     <Route path="/staff" element={<StaffDashboard/>}/>
// <Route path="/admin" element={<AdminDashboard/>}/>
//
//             </Routes>
//         </>
//     )
// }
// export default App;
