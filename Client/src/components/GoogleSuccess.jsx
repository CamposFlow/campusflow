import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../pages/AuthContext.jsx"
import { jwtDecode } from "jwt-decode";

export const GoogleSuccess = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) return navigate("/login");

        const decoded = jwtDecode(token);
        login(token, decoded.role, true);

        if (!decoded.matricNumber) {
            navigate("/onboarding");
        } else {
            const redirectMap = { admin: "/admin", staff: "/staff", student: "/dashboard" };
            navigate(redirectMap[decoded.role] || "/dashboard");
        }
    }, []);

    return <div className="min-h-screen flex items-center justify-center">Signing you in...</div>;
};
export default GoogleSuccess;