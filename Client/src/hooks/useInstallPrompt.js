import { useState, useEffect, useCallback } from "react";

/**
 * Detects if the app is already running in standalone/installed mode.
 */
function isStandalone() {
    return (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true // iOS Safari
    );
}

/**
 * Detects iOS Safari specifically (no beforeinstallprompt support there).
 */
function isIos() {
    const ua = window.navigator.userAgent;
    return /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
}

/**
 * useInstallPrompt
 *
 * Handles the PWA "Add to Home Screen" flow across Android/Desktop Chrome
 * (via the native beforeinstallprompt event) and iOS Safari (which has no
 * such event, so we detect the platform and show manual instructions instead).
 *
 * Returns:
 * - isInstallable: true if we can show a custom install button (Chrome/Android/Desktop)
 * - isIosInstallable: true if we should show iOS "Add to Home Screen" instructions
 * - isInstalled: true if the app is already running standalone
 * - promptInstall(): triggers the native install prompt (Chrome/Android/Desktop only)
 */
export function useInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIosInstallable, setIsIosInstallable] = useState(false);

    useEffect(() => {
        if (isStandalone()) {
            setIsInstalled(true);
            return;
        }

        if (isIos()) {
            setIsIosInstallable(true);
            return;
        }

        const handleBeforeInstallPrompt = (event) => {
            // Prevent the default mini-infobar from appearing automatically
            event.preventDefault();
            setDeferredPrompt(event);
        };

        const handleAppInstalled = () => {
            setDeferredPrompt(null);
            setIsInstalled(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const promptInstall = useCallback(async () => {
        if (!deferredPrompt) return { outcome: "unavailable" };

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        // The event can only be used once, so clear it either way
        setDeferredPrompt(null);

        return choiceResult; // { outcome: "accepted" | "dismissed", platform }
    }, [deferredPrompt]);

    return {
        isInstallable: Boolean(deferredPrompt),
        isIosInstallable,
        isInstalled,
        promptInstall,
    };
}