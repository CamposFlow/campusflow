import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/pages/AuthContext.jsx";

export const GoogleSuccess = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const queryString = hash.includes("?") ? hash.split("?")[1] : "";
        const params = new URLSearchParams(queryString);

        const token = params.get("token");
        const isNewUser = params.get("isNewUser") === "true";

        if (!token) {
            navigate("/login");
            return;
        }

        if (isNewUser) {
            sessionStorage.setItem("token", token);
            navigate("/onboarding");
        } else {
            const payload = JSON.parse(atob(token.replace("Bearer ", "").split(".")[1]));
            login(token, payload.role);
            const redirectMap = { admin: "/admin", staff: "/staff", student: "/dashboard" };
            navigate(redirectMap[payload.role] || "/dashboard");
        }
    }, []);


    return <p className="text-center mt-20 text-gray-500">Signing you in...</p>;
};