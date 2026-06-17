import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"

export const Cookies = () => {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        const cookies = localStorage.getItem("cookiesConsent")

        if(!cookies){
            setShowBanner(true);
        }
    },[]);
    function acceptCookies () {
        localStorage.setItem("cookiesConsent","accepted");
        setShowBanner(false);
    }
    function rejectCookies () {
        localStorage.setItem("cookiesConsent","rejected");
        setShowBanner(false);
    }
    if (!showBanner) return null;
    return (
        <div className="fixed bottom-5 left-5 right-5 md:left-auto md:w-[450px] z-50 ">
            <div className="bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 text-white p-6 rounded-2xl shadow-2xl border border-white/20
            backdrop-blur-lg">
                <h3 text-xl font-bold mb-2>🍪 Cookie Preferences</h3>
                <p className="text-sm text-blue-100 leading-6">
                    CampusFlow uses cookies to improve your experience, remember your preferences, and provide better services.
                </p>

                <div className="flex gap-3 mt-5 flex-wrap">
<Button onClick={acceptCookies} className="bg-white text-blue-700 px-5 hover:scale-105 hover:bg-blue-400 hover:text-white">Accept All</Button>
                    <Button onClick={rejectCookies} className="bg-white text-blue-700 px-5 hover:scale-105 hover:bg-blue-400 hover:text-white">Reject All</Button>
                </div>

            </div>
        </div>
    )
}