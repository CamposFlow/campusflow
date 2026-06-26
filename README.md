# Campus Flow - Core Authentication & Security API

---

## 🚀 Architectural Circuit Flow

1. **Registration/Login:** User validates credentials against the PostgreSQL database.
2. **Token Minting:** Upon verification, the server creates a cryptographically signed JWT containing non-sensitive metadata (`id`, `username`, `role`) with a 24-hour expiration window.
3. **Protected Requests:** The client attaches the JWT token via the HTTP `Authorization` header.
4. **Middleware Inspection:** Passport intercepts the incoming packet, verifies the signature using the server's private `JWT_SECRET`, checks the database, and injects user attributes directly into `req.user`.


---

## 🛑 Layered Rate Limiting Thresholds

To protect the server from Denial of Service (DDoS) loops, brute-force hacking, and email API cost exhaustion, client IPs are throttled dynamically across endpoints:

| Scope | Apply Area | Threshold Constraint | Purpose |
| :--- | :--- | :--- | :--- |
| **Global Limiter** | All App Endpoints | Max 120 requests / 1 minute | Protects overall server infrastructure |
| **Auth Limiter** | `/login`, `/register` | Max 30 requests / 5 minutes | Designed safely for shared school Wi-Fi IPs |
| **OTP Limiter** | `/forgot-password`, `/reset-password` | Max 5 requests / 15 minutes | Prevents mail server resource spam abuse |

---

## 📡 API Endpoint Reference

### 1. Account Creation
* **Endpoint:** `POST /register`
* **Content-Type:** `application/json`
* **Payload:**
  ```json
  {
    "username": "kendrick",
    "email": "kendrick@example.com",
    "role": "student",
    "password": "securePassword123"
  }
  ```
* **Response (`201 Created`):**
  ```json
  {
    "message": "User registered successfully",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "2",
      "username": "kendrick",
      "role": "student"
    }
  }
  ```

### 2. User Authentication
* **Endpoint:** `POST /login`
* **Content-Type:** `application/json`
* **Payload:**
  ```json
  {
    "username": "kendrick",
    "password": "securePassword123"
  }
  ```
* **Response (`200 OK`):**
  ```json
  {
    "message": "Logged in successfully",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "2",
      "username": "kendrick",
      "role": "student"
    }
  }
  ```

### 3. Fetch User Context
* **Endpoint:** `GET /me`
* **Required Header:** `Authorization: Bearer <your_jwt_token>`
* **Response (`200 OK`):**
  ```json
  {
    "user": {
      "id": "2",
      "username": "kendrick",
      "email": "kendrick@example.com"
    }
  }
  ```

### 4. Password Recovery Request
* **Endpoint:** `POST /forgot-password`
* **Payload:**
  ```json
  {
    "email": "prayskeyo@gmail.com"
  }
  ```
* **Response (`200 OK`):**
  *(Note: This returns 200 regardless of database existence to prevent account harvesting)*
  ```json
  {
    "message": "If that email address exists in our system, an OTP code has been sent."
  }
  ```

### 5. Finalize Password Reset
* **Endpoint:** `POST /reset-password`
* **Payload:**
  ```json
  {
    "email": "prayskeyo@gmail.com",
    "otp": "482019",
    "newPassword": "campusFlowSecure2026"
  }
  ```
* **Response (`200 OK`):**
  ```json
  {
    "message": "Password reset successful. You can now log in with your new password."
  }
  ```
* **Potential Errors (`400 Bad Request`):** `{"error": "Invalid OTP"}`, `{"error": "OTP expired"}`

### 6. Session Invalidation
* **Endpoint:** `GET /logout`
* **Response (`200 OK`):**
  ```json
  {
    "message": "Logged out successfully. Please delete the token from client storage."
  }
  ```

---

## 💻 Frontend Implementation Blueprint (Axios)

Integrate this interceptor engine inside your frontend source layout to handle authorization headers and track expired tokens effortlessly:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

// Request Interceptor: Automatically appends the JWT bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token; // Must include 'Bearer ' string prefix
  }
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Catches 401 token expirations and re-routes users cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Access token expired. Wiping cache and redirecting to login...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🏃 Local Development Initialization

To launch your development ecosystem locally, navigate to your workspace directory and execute the following commands:

```bash
# 1. Access Server Workspace directory
cd Server

# 2. Extract and establish all packages
npm install

# 3. Boot runtime daemon via Nodemon
npm run dev
```
Your backend will spin up instantly at `http://localhost:3000`.
