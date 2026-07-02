import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {AuthProvider, useAuth} from "./pages/AuthContext.jsx"
import LandingPage from "./pages/LandingPage.jsx";
import Portal from "./pages/Portal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import {Toaster} from "sonner";
import {AdminDashboard} from "@/pages/Admin/AdminDashboard.jsx";
import {StaffDashboard} from "@/pages/Staff/StaffDashboard.jsx";
import {GoogleSuccess} from "./components/Google";
import Onboarding from "@/pages/Onboarding.jsx";
function ProtectedRoute({allowedRoles}) {r
const {token,role} = useAuth();

  if (!token) {
    return <Navigate to={`/login`} replace/>
  }
  if (allowedRoles && !allowedRoles.includes(role)){
     return <Navigate to={`/login`} replace/>
  }
  return <Outlet/>;
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
            <Toaster
                position="top-right"
                theme="dark"
                className="rounded-2xl shadow-lg font-sans"
                toastOptions={{ style: { background: '#fafafa' , border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '12px', fontSize: '14px', fontWeight: '500',
                    },
                    success: {
                        style: {
                            borderLeft: '4px solid #2563EB',
                        },
                        iconTheme: {
                            primary: '#2563EB',
                            secondary: '#ffffff',
                        },
                    },
                    error: {
                        style: {
                            borderLeft: '4px solid #dc2626',
                        },
                        iconTheme: {
                            primary: '#dc2626',
                            secondary: '#ffffff',
                        },
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

                <Route element={<ProtectedRoute allowedRoles={["student"]}/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
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

