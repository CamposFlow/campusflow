import {useNavigate} from "react-router-dom";
import {Zap, Search} from "lucide-react";
import Navbar from "../components/Navbar.jsx"
import FilterChips from "../components/ListingCard.jsx";
export const Home = () => {

    const navigate = useNavigate();
    function removeToken() {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div className="min-h-screen bg-surface p-6 bg-orange-50">
<div className="bg-white px-4 pt-4 pb-3 shadow-sm flex justify-between rounded-2xl">
    <div className="flex items-center gap-1 mb-3">
        <Zap size={20} className="text-primary fill-amber-500"/>
        <span className="text-primary font-bold text-xl">UniPlug</span>

    </div>
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
       <Search size={16} className="text-gray-500"/>
        <input
            type="text"
            placeholder="Search Campus Deals..."
            className="bg-transparent flex-1 text-sm text-gray-700 outline-none
         placeholder-gray-500"/>
    </div>

</div>
            <Navbar />
            <FilterChips />


        <button onClick={removeToken}>Logout</button>
        </div>
    )
}
export default Home;