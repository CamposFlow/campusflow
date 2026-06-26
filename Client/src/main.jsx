import { StrictMode } from 'react'
import { HashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider} from "@react-oauth/google";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="823852762530-duvspc976md508mc3cq6s4jesgneqamv.apps.googleusercontent.com">
          <HashRouter>
              <App />
          </HashRouter>
      </GoogleOAuthProvider>
  </StrictMode>,
)
