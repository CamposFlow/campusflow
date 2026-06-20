
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {useAuth} from "./pages/AuthContext.jsx"
import LandingPage from "./pages/LandingPage.jsx";
import Portal from "./pages/Portal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Staff from "./components/Staff.jsx";
import {Toaster} from "react-hot-toast";
import {AdminDashboard} from "@/pages/Admin/Dashboard.jsx";


function ProtectedRoute({children}) {

const {token} = useAuth();
  if (!token) {
    return <Navigate to={`/login`} replace/>
  }
  return children;
}
function App() {

  return (<>
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
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/verify" element={<Portal/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/me" element={<ProtectedRoute>
        </ProtectedRoute>}/>
      </Routes>
      </>
  )
}

export default App;