# CampusFlow

A blockchain-powered university management platform for student clearance, certificate verification, incident reporting, and document management.

---

## Table of Contents

- [Core Features](#core-features)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Authentication & Security API](#authentication--security-api)
- [API Reference](#api-reference)
- [Frontend Implementation](#frontend-implementation)
- [Local Development](#local-development)

---

## Core Features

- Digital Certificate Issuance
- Student Clearance Management
- Blockchain-backed Certificate Verification
- Campus Emergency & Incident Reporting
- Secure Physical Document Storage
- Multi-University Support
- Telegram Security Alerts via Alerta

---

## System Architecture

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

Telegram alerts channel: https://t.me/campusflowteam

---

## Database Schema

### Universities

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

### Certificates

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

### Incidents

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

### Verification Records

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

### Clearance Records

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

### Documents

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


Good, I have everything I need. A few quick bugs I spotted first before writing the README:

**Bug 1 — `solana.routes.js`: revoke route has dot instead of slash**
```js
// Wrong
routes.patch('/certificate.revoke', ...)

// Correct
routes.patch('/certificate/revoke', ...)
```

**Bug 2 — `solana.routes.js`: `getVerificationByHash` route has no `:hash` param**
```js
// Wrong
routes.get('/records', authMiddleware, getVerificationByHash);

// Correct
routes.get('/records/:hash', authMiddleware, getVerificationByHash);
```

**Bug 3 — `solana.controllers.js`: `getVerificationByHash` missing `return` on 403**
```js
// Wrong - execution continues after 403
res.status(403).json({...});

// Correct
return res.status(403).json({...});
```

---

Now here's the README endpoint documentation:

---

# CampusFlow API — Blockchain Endpoints

Base URL: `/api/solana`  
All protected routes require a JWT token in the `Authorization` header.

---

## Universities

### `POST /`
Register a university on-chain and in the database.

**Auth:** None  
**Body:**
```json
{ "universityId": "FUTO_UNI", "name": "Federal University of Technology Owerri" }
```
**Returns:**
```json
{
  "success": true,
  "message": "University registered successfully.",
  "data": { "tx": "...", "universityPDA": "..." },
  "db": { "university_id": "FUTO_UNI", "name": "...", "admin": "...", "tx_signature": "...", "pda_address": "..." }
}
```

---

### `GET /`
Fetch all universities from chain and database.

**Auth:** None  
**Returns:**
```json
{
  "success": true,
  "count": 1,
  "data": [{ "universityPDA": "...", "universityId": "...", "name": "...", "isActive": true }],
  "db": [{ "university_id": "...", "name": "...", "admin": "..." }]
}
```

---

## Certificates

### `POST /certificate`
Issue a certificate on-chain and save to database. Hash is auto-generated from student details.

**Auth:** Required  
**Body:**
```json
{
  "studentId": "FUT/2021/001",
  "studentName": "Ezichi Jenissi",
  "certificateType": "B.Tech Software Engineering",
  "institution": "FUTO"
}
```
**Returns:**
```json
{
  "success": true,
  "message": "Certificate Issued Successfully.",
  "database": { "hash": "...", "student_id": "...", "is_valid": true, "tx_signature": "...", "pda_address": "..." },
  "chain": { "tx": "...", "certificatePDA": "..." }
}
```

---

### `GET /certificate`
Fetch all certificates for the authenticated user's university (chain + DB).

**Auth:** Required  
**Returns:**
```json
{
  "success": true,
  "count": 5,
  "db": [ { "hash": "...", "student_name": "...", "is_valid": true } ],
  "chain": [ { "hash": "...", "studentName": "...", "certificateType": "..." } ]
}
```

---

### `GET /certificate/:id`
Fetch a single certificate by its database UUID.

**Auth:** Required  
**Params:** `id` — certificate UUID  
**Returns:**
```json
{
  "success": true,
  "db": { "id": "...", "hash": "...", "student_name": "...", "is_valid": true }
}
```

---

### `PATCH /certificate/revoke`
Revoke a certificate on-chain and update database. University-restricted.

**Auth:** Required  
**Body:**
```json
{ "hash": "abc123..." }
```
**Returns:**
```json
{
  "success": true,
  "message": "Certificate was revoked successfully",
  "data": { "hash": "...", "is_valid": false },
  "chain": { "tx": "...", "certificatePDA": "..." }
}
```

---

## Certificate Verification

### `POST /verify`
Verify a certificate on-chain and log the verification record.

**Auth:** Required  
**Body:**
```json
{
  "document_hash": "abc123...",
  "verifier_org": "Federal Ministry of Education"
}
```
**Returns:**
```json
{
  "success": true,
  "message": "Certificate verified successfully.",
  "certificate": { "hash": "...", "student_name": "...", "is_valid": true },
  "verification": { "document_hash": "...", "verifier_org": "...", "tx_signature": "..." },
  "chain": { "tx": "...", "verificationPDA": "..." }
}
```

---

### `GET /record/verify`
Fetch all verification records for the authenticated user's university.

**Auth:** Required  
**Returns:**
```json
{
  "success": true,
  "count": 3,
  "db": [ { "document_hash": "...", "verifier_org": "...", "timestamp": 1234567890 } ],
  "chaindb": [ { "verificationPDA": "...", "documentHash": "...", "verifierOrg": "..." } ]
}
```

---

### `GET /records/:hash`
Fetch all verification records for a specific certificate hash. University-restricted.

**Auth:** Required  
**Params:** `hash` — certificate document hash  
**Returns:**
```json
{
  "success": true,
  "count": 2,
  "db": [ { "document_hash": "...", "verifier_org": "...", "verifier_id": "..." } ]
}
```

---

## Incidents

### `POST /incidents`
Report a campus incident. Saved to DB only (chain write commented out for now).

**Auth:** Required  
**Body:**
```json
{
  "category": "suspicious",
  "locationText": "Engineering Block, Gate 2",
  "description": "A man was loitering around the parked bikes.",
  "latitude": 5.392691,
  "longitude": 6.986264
}
```
**Returns:**
```json
{
  "success": true,
  "message": "Incident reported Successfully.",
  "data": { "incident_id": "...", "student_id": "...", "category": "suspicious", "university_id": "..." }
}
```

---

### `GET /incidents`
Fetch all incidents for the authenticated user's university (chain + DB, filtered by university).

**Auth:** Required  
**Returns:**
```json
{
  "success": true,
  "count": 4,
  "chain": [ { "incidentPDA": "...", "studentName": "...", "description": "..." } ],
  "database": [ { "incident_id": "...", "category": "...", "location_text": "..." } ]
}
```

## Authentication & Security API

### Auth Flow

1. **Registration/Login** — Credentials validated against PostgreSQL.
2. **Token Minting** — Server issues a signed JWT containing `id`, `fullname`, and `role` with a 24-hour expiry.
3. **Protected Requests** — Client attaches the JWT via the `Authorization` header.
4. **Middleware Inspection** — Passport verifies the signature using `JWT_SECRET`, checks the database, and injects the user into `req.user`.

### Rate Limiting

| Scope | Endpoints | Limit | Purpose |
|---|---|---|---|
| Global | All endpoints | 120 req / 1 min | Protects overall server |
| Auth | `/login`, `/register` | 30 req / 5 min | Safe for shared campus Wi-Fi |
| OTP | `/forgot-password`, `/reset-password` | 5 req / 15 min | Prevents mail API abuse |

---

## API Reference

### `POST /register`

**Content-Type:** `application/json`

**Request:**
```json
{
  "fullname": "kendrick jackson",
  "email": "kendrick@example.com",
  "role": "student",
  "password": "securePassword123"
}
```

**Response `201`:**
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

---

### `POST /login`

**Request:**
```json
{
  "fullname": "kendrick jackson",
  "password": "securePassword123"
}
```

**Response `200`:**
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

---

### `GET /me`

**Headers:** `Authorization: Bearer <token>`

**Response `200`:**
```json
{
  "user": {
    "id": "2",
    "fullname": "kendrick jackson",
    "email": "kendrick@example.com"
  }
}
```

---

### `POST /forgot-password`

> Returns `200` regardless of whether the email exists, to prevent account enumeration.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response `200`:**
```json
{
  "message": "If that email address exists in our system, an OTP code has been sent."
}
```

---

### `POST /reset-password`

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "482019",
  "newPassword": "campusFlowSecure2026"
}
```

**Response `200`:**
```json
{
  "message": "Password reset successful. You can now log in with your new password."
}
```

**Errors `400`:**
```json
{ "error": "Invalid OTP" }
{ "error": "OTP expired" }
```

---

### `GET /logout`

**Response `200`:**
```json
{
  "message": "Logged out successfully. Please delete the token from client storage."
}
```

---

## Google OAuth 2.0

### `GET /auth/google`

Initiates the OAuth flow. Must be triggered via browser navigation — **do not use Axios or Fetch**.

```html
<a href="http://localhost:3000/auth/google">Sign in with Google</a>
```

```js
const handleGoogleLogin = () => {
  window.location.href = "http://localhost:3000/auth/google";
};
```

---

### `GET /auth/google/callback`

Handled automatically by Google after authentication. Verifies the profile, persists to the database, and mints a session.

**Response `200`:**
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

**Frontend logic:**

- `isNewUser: true` → Redirect to `/complete-profile` to collect `university` and `role`.
- `isNewUser: false` → Redirect directly to the dashboard.

---

## Frontend Implementation

Axios instance with automatic JWT injection and 401 handling:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token; // Must include 'Bearer ' prefix
  }
  return config;
}, (error) => Promise.reject(error));

// Handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Local Development

```bash
# Navigate to server directory
cd Server

# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs at `http://localhost:3000`.
