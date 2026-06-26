import {createContext, useContext, useState, useEffect, useRef} from "react";

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
    const [token, setToken] = useState(getStoredToken());
    const [role, setRole] = useState(getStoredRole());
        const logoutTimer = useRef(null);


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
            if(token) scheduleAutoLogout(token);
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
    }
    const logout = (newToken, newRole, rememberMe = false) => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
    }
    return (
        <AuthContext.Provider value={{token,role,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);