# 🚀 CampusFlow

CampusFlow is a blockchain-powered university management platform designed to streamline student clearance, certificate verification, incident reporting, and document management across higher institutions.

The platform combines blockchain technology with a secure backend to ensure transparency, tamper-proof records, and efficient communication.

---

## 📌 Core Features

* 🎓 Digital Certificate Issuance
* ✅ Student Clearance Management
* 🔐 Blockchain-backed Certificate Verification
* 🚨 Campus Emergency & Incident Reporting
* 📂 Secure Physical Document Storage
* 🏫 Multi-University Support
* 🤖 Telegram Security Alerts using Alerta

---

## 🏗️ System Architecture

```
Frontend (React + Vite)
        │
        ▼
Backend (Node.js + Express)
        │
        ├── PostgreSQL Database
        ├── Solana Blockchain
        └── Alerta API
                │
                ▼
        Telegram Security Group
```

Telegram Group For Alerta Alerts:

https://t.me/campusflowteam

---

# Database Schema

## Universities

Stores all registered institutions.

```sql
CREATE TABLE universities (
    id UUID PRIMARY KEY,
    university_id TEXT UNIQUE,
    name TEXT NOT NULL,
    admin TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    timestamp BIGINT,
    tx_signature TEXT,
    pda_address TEXT
);
```

---

## Certificates

Stores issued digital certificates.

```sql
CREATE TABLE certificates (
    id UUID PRIMARY KEY,
    hash TEXT UNIQUE NOT NULL,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    certificate_type TEXT NOT NULL,
    institution TEXT NOT NULL,
    university_id TEXT REFERENCES universities(university_id),
    timestamp BIGINT,
    is_valid BOOLEAN DEFAULT TRUE,
    tx_signature TEXT,
    pda_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Incidents

Stores emergency incidents reported by students.

```sql
CREATE TABLE incidents (
    id UUID PRIMARY KEY,
    incident_id TEXT UNIQUE NOT NULL,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    category TEXT NOT NULL,
    location_text TEXT,
    latitude TEXT NOT NULL,
    longitude TEXT NOT NULL,
    description TEXT NOT NULL,
    university_id TEXT REFERENCES universities(university_id),
    timestamp BIGINT,
    is_resolved BOOLEAN DEFAULT FALSE,
    tx_signature TEXT,
    pda_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Verification Records

Stores every certificate verification carried out.

```sql
CREATE TABLE verification_records (
    id UUID PRIMARY KEY,
    document_hash TEXT NOT NULL REFERENCES certificates(hash),
    verifier_org TEXT NOT NULL,
    verifier_id TEXT NOT NULL,
    university_id TEXT REFERENCES universities(university_id),
    timestamp BIGINT,
    tx_signature TEXT,
    pda_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Clearance Records

Stores each approval stage of the student clearance process.

```sql
CREATE TABLE clearance_records (
    id UUID PRIMARY KEY,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    document_hash TEXT NOT NULL,
    staff_id TEXT NOT NULL,
    university_id TEXT REFERENCES universities(university_id),
    timestamp BIGINT,
    is_approved BOOLEAN DEFAULT FALSE,
    tx_signature TEXT,
    pda_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Documents

Stores uploaded physical documents required during clearance.

```sql
CREATE TABLE documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id TEXT NOT NULL,
    university_id TEXT REFERENCES universities(university_id),
    stage_name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT NOW()
);
```

---

---

# Project Flow

```
Student
    │
    ▼
React Frontend
    │
    ▼
Express Backend
    │
    ├── PostgreSQL
    ├── Solana Blockchain
    └── Alerta API
            │
            ▼
Telegram Security Team
```
















# Campus Flow - Core Authentication & Security API

---

## 🚀 Architectural Circuit Flow

1. **Registration/Login:** User validates credentials against the PostgreSQL database.
2. **Token Minting:** Upon verification, the server creates a cryptographically signed JWT containing non-sensitive metadata (`id`, `fullname`, `role`) with a 24-hour expiration window.
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
    "fullname": "kendrick jackson",
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
      "fullname": "kendrick jackson",
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
    "fullname": "kendrick jackson",
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
      "fullname": "kendrick jackson",
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
      "fullname": "kendrick jackson",
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
### 📡 Google OAuth 2.0 Endpoints

#### 1. Initiate Google Authentication
* **Endpoint:** `GET /auth/google`
* **Description:** Initiates the Google OAuth 2.0 flow. **Do not** fetch this route with Axios or the Fetch API; it must be called directly via browser navigation.
* **Frontend Implementation Blueprint:**
  ```html
  <!-- HTML Link -->
  <a href="http://localhost:3000/auth/google">Sign in with Google</a>
  ```
  ```javascript
  // JavaScript Handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  ```

#### 2. Google OAuth Callback Validation
* **Endpoint:** `GET /auth/google/callback`
* **Description:** Automatically targeted by Google upon successful user authentication to verify profiles, manage database persistence, and mint sessions.
* **Success Response (`200 OK`):**
  ```json
  {
    "message": "Logged in successfully",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 12,
      "email": "student@example.com",
      "role": null,
      "isNewUser": true
    }
  }
  ```
* **Frontend Workflow Logic:**
  * **If `isNewUser: true`**: Intercept the flow and redirect the user layout straight to the onboarding screen (`/complete-profile`) to harvest required fields like `university` and `role`.
  * **If `isNewUser: false`**: Access token is valid for returning accounts; redirect directly to the main workspace dashboard.

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
