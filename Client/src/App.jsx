import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {AuthProvider, useAuth} from "./pages/AuthContext.jsx"
import LandingPage from "./pages/LandingPage.jsx";
import Portal from "./pages/Portal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import {Toaster} from "react-hot-toast";
import {AdminDashboard} from "@/pages/Admin/AdminDashboard.jsx";
import {StaffDashboard} from "@/pages/Staff/StaffDashboard.jsx";
import {GoogleSuccess} from "./components/Google";
import Onboarding from "@/pages/Onboarding.jsx";
function ProtectedRoute({allowedRoles}) {
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
                position="bottom-right"
                toastOptions={{
                    className:'',
                    style: {
                        border:'1px solid blue',
                        color:'white',
                        padding:'8px',
                        backgroundColor:'navy',
                    },
                }}/>
            <Routes>
                <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
                <Route path="/google-success" element={<GoogleSuccess/>} />
                <Route path="/reset" element={<PublicRoute><ForgotPassword/></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/verify" element={<Portal/>}/>
                <Route path="/onboarding" element={<Onboarding/>}/>
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

