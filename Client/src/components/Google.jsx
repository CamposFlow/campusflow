import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/pages/AuthContext.jsx";

export const GoogleSuccess = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const role = searchParams.get("role");

        if (token && role) {
            login(token, role);
            navigate(role === "admin" ? "/admin" : "/dashboard");
        } else {
            navigate("/login");
        }
    }, []);

    return <p>Signing you in...</p>;
};