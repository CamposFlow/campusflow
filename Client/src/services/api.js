import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export default API;


export const loginUser = async (username, password) => {
    const formData = new URLSearchParams()
    formData.append("username", username)
    formData.append("password", password)

    const response = await API.post('/login', formData,{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    return response.data
}

export const registerUser = async (username, email, password, full_name) => {
    const response = await API.post('/user/', {email,username,password,full_name})
    return response.data
}
export const getCategories = async () => {
    const response = await API.get('/listings/categories')
    return response.data
}

// export const getListings = async (params={}){
//     const response = await API.get('/listings/',{params})
//     return response.data
// }