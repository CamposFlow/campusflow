import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { AuthProvider } from "./pages/AuthContext.jsx";
import App from "./App.jsx";
import 'leaflet/dist/leaflet.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
      </GoogleOAuthProvider>
  </StrictMode>,
);
