import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { useEffect } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {useAuth} from "./pages/AuthContext.jsx"
import Home from "./pages/Home.jsx";
import LandingPage from "./pages/LandingPage.jsx";


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

        <Route path="/me" element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>
      </Routes>
  )
}

export default App;