import {createContext, useContext, useState, useEffect, useRef} from "react";
import api from "@/api/axios.js";

const AuthContext = createContext();

const decodeToken = (token) =>{
    try{
        const raw = token.replace("Bearer","");
        return JSON.parse(atob(raw.split(".")[1]));
    }
    catch{
        return null;
    }
}

function getStoredToken(){
    return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
}
function getStoredRole(){
    return localStorage.getItem("role") || sessionStorage.getItem("role") || null;
}

export const AuthProvider = ({children}) => {
    useEffect(() => {
        const ping = () => fetch("https://campusflowserver-uc79.vercel.app/health");
        ping();
        const interval = setInterval(ping, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);
    const [token, setToken] = useState(getStoredToken());
    const [role, setRole] = useState(getStoredRole());
    const [user, setUser] = useState(null);
    const logoutTimer = useRef(null);

    const fetchUser = async () => {
        try {
            const res = await api.get('/me');
            setUser(res.data?.user || null);
        } catch (err) {
            console.error('Failed to fetch user:', err);
            setUser(null);
        }
    };

    const scheduleAutoLogout = (currentToken) => {
        if (logoutTimer.current)
            clearTimeout(logoutTimer.current);
        const decoded = decodeToken(currentToken);
        if(!decoded?.exp)
            return;

        const expireInMs = decoded?.exp * 1000 - Date.now();
        if(expireInMs <= 0){
            logout();
            return;
        }
        logoutTimer.current = setTimeout(()=>{
            logout();
        }, expireInMs);
    };

    useEffect(()=>{
        if(token) {
            scheduleAutoLogout(token);
            fetchUser();
        }
        return () => {
            if(logoutTimer.current)
                clearTimeout(logoutTimer.current);
        };
    },[])

    const login = (newToken, newRole, rememberMe = false)=>{
        const storage = rememberMe ? localStorage: sessionStorage;
        storage.setItem("token", newToken);
        storage.setItem("role", newRole);
        setToken(newToken);
        setRole(newRole);
        scheduleAutoLogout(newToken);
        fetchUser();
    }
    const register = (newToken, newRole) => {
        const storage = localStorage;
        storage.setItem("token", newToken);
        storage.setItem("role", newRole);
        setToken(newToken);
        setRole(newRole);
        scheduleAutoLogout(newToken);
        fetchUser();
    }

    const logout = (newToken, newRole, rememberMe = false) => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{token, role, user, login, logout, register, refreshUser: fetchUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);