
import { useEffect, useRef } from 'react';

export const usePolling = (callback, intervalMs = 15000) => {
    const savedCallback = useRef(callback);

    // always keep the latest version of the callback,
    // without needing to restart the interval when it changes
    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => savedCallback.current();
        tick(); // run once immediately, don't wait for the first interval
        const interval = setInterval(tick, intervalMs);
        return () => clearInterval(interval);
    }, [intervalMs]);
};