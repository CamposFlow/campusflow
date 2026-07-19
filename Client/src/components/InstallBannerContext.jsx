import { createContext, useContext, useState } from "react";

const InstallBannerContext = createContext({ visible: false, setVisible: () => {} });

export const InstallBannerProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    return (
        <InstallBannerContext.Provider value={{ visible, setVisible }}>
            {children}
        </InstallBannerContext.Provider>
    );
};

export const useInstallBannerVisible = () => useContext(InstallBannerContext);