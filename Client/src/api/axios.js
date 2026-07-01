import axios from "axios";



const api = axios.create({
    baseURL: "https://campusflowserver-uc79.vercel.app",
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")|| sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, (error)=> Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response && error.response.status;
        const isLoggedIn = error.config.url.includes("/login");
        if ( status === 401 && !isLoggedIn ) {
            console.warn('Access token expired. Wiping cache and redirecting to login...');
            localStorage.removeItem('token');
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            localStorage.removeItem('role');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

export const loginUser = async (email, password) => {
    const response = await api.post("/login", {
        email,
        password});
    return response.data;
}

export const registerUser = async (fullname, email, password, university, role) => {
    const response = await api.post("/register", { fullname, email, password, university, role });
    return response.data;
}
export const completeProfile = async (role, university) => {
    const response = await api.post("/complete-profile", { role, university });
    return response.data;
}

export const forgotPassword = async (email) => {
    const response = await api.post("/forgot-password", {
        email
    })
    return response.data;
}

