import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { AuthProvider } from "./pages/AuthContext.jsx";
import App from "./App.jsx";
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
);
