import { useState } from "react";
import { X, Download, Share } from "lucide-react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

/**
 * InstallBanner
 *
 * Shows a dismissible banner prompting the user to install CampusFlow
 * as a PWA. Handles Android/Desktop Chrome (native prompt) and iOS Safari
 * (manual "Add to Home Screen" instructions) separately.
 *
 * Drop this near the root of your app (e.g. in App.jsx or a layout component)
 * so it can appear on any page once the app becomes installable.
 */
export default function InstallBanner() {
    const { isInstallable, isIosInstallable, isInstalled, promptInstall } =
        useInstallPrompt();
    const [dismissed, setDismissed] = useState(false);

    if (isInstalled || dismissed) return null;
    if (!isInstallable && !isIosInstallable) return null;

    const handleInstallClick = async () => {
        const result = await promptInstall();
        if (result.outcome === "accepted" || result.outcome === "dismissed") {
            setDismissed(true);
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
            <div className="flex items-center gap-3 rounded-xl bg-[#0A1628] text-white shadow-lg px-4 py-3 border border-[#2563EB]/30">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#2563EB] shrink-0">
                    {isIosInstallable ? (
                        <Share size={18} />
                    ) : (
                        <Download size={18} />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">
                        Install CampusFlow
                    </p>
                    <p className="text-xs text-gray-300 leading-tight mt-0.5">
                        {isIosInstallable
                            ? "Tap Share, then \"Add to Home Screen\""
                            : "Get faster access and offline support"}
                    </p>
                </div>

                {isInstallable && (
                    <button
                        onClick={handleInstallClick}
                        className="shrink-0 text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4fd1] transition-colors rounded-lg px-3 py-2"
                    >
                        Install
                    </button>
                )}

                <button
                    onClick={() => setDismissed(true)}
                    aria-label="Dismiss install prompt"
                    className="shrink-0 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}