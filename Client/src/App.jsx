
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {useAuth} from "./pages/AuthContext.jsx"
import LandingPage from "./pages/LandingPage.jsx";
import Portal from "./pages/Portal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Staff from "./components/Staff.jsx";


function ProtectedRoute({children}) {

const {token} = useAuth();
  if (!token) {
    return <Navigate to={`/login`} replace/>
  }
  return children;
}
function App() {

  return (
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/verify" element={<Portal/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/me" element={<ProtectedRoute>
        </ProtectedRoute>}/>
      </Routes>
  )
}

export default App;