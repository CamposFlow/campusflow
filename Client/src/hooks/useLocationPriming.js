import { useEffect } from 'react';
import { toast } from "sonner";

export const useLocationPriming = () => {
    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'prompt') {
                toast("📍 Allow location access for faster emergency alerts", { duration: 4000 });
                navigator.geolocation.getCurrentPosition(() => {}, () => {});
            }
        });
    }, []);
};