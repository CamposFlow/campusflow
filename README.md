# CampusFlow

**Stress-free campus. Powered by blockchain.**

CampusFlow is a blockchain-powered smart campus platform built for Nigerian universities. It replaces slow, fragmented, paper-based administration — clearance, certificate verification, and campus safety — with a single trustless, tamper-proof system.

Built for **Hack4FUTO** by **Team The Navigators**.

---

## Table of Contents

- [The Problem](#the-problem)
- [Core Features](#core-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Authentication & Security](#authentication--security)
- [API Reference](#api-reference)
    - [Auth API](#auth-api)
    - [Google OAuth 2.0](#google-oauth-20)
    - [Blockchain API](#blockchain-api-apisolana)
- [Frontend Implementation](#frontend-implementation)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Team](#team)

---

## The Problem

Nigerian university administration runs on manual, disconnected systems:

- **Certificate fraud** — no reliable way to verify a credential is real
- **Clearance confusion** — students lost between offices with no tracking
- **Manual verification** — weeks to confirm credentials, no digital backbone
- **Campus safety gaps** — no fast, reliable way to report an emergency

CampusFlow exists to close all four gaps in one platform, with blockchain as the source of truth so no single admin can quietly alter or delete a record.

---

## Core Features

| Feature | What it does |
|---|---|
| **Smart Digital Clearance** | Guided, step-by-step clearance tracking with every stage recorded on-chain |
| **Blockchain-Powered Certificate Verification** | Certificates are SHA-256 hashed and stored on Solana — anyone can verify authenticity instantly, no account required |
| **SOS & Incident Reporting** | One-tap emergency alerts with live GPS, powered by Alerta, routed to a live Telegram security channel |
| **Multi-University Support** | Each university gets its own isolated, secure digital workspace |
| **Secure Document Storage** | Physical/soft-copy documents stored via Cloudinary |
| **Google OAuth + Local Auth** | Students and admins can register/sign in with email or Google |

---

## System Architecture

CampusFlow uses blockchain as the **truth layer** and a fast relational database as the **readable copy** — every write goes on-chain first, then gets mirrored to Postgres for fast queries, so the app never has to wait on-chain to render a page.

```
                     Frontend (React + Vite)
                              │
                              ▼
                  Backend (Node.js + Express)
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     Supabase/PostgreSQL   Solana Chain     Alerta API
      (fast readable copy)  (source of         │
                              truth)            ▼
                                         Telegram Security Group
```

- **On-chain writes**: university registration, certificate issuance/revocation, verification records
- **Off-chain only (for now)**: incident reports (chain write path exists but is currently disabled)

Live Telegram alerts channel: https://t.me/campusflowteam

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite, Tailwind CSS, Framer Motion, GSAP |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Blockchain | Solana (via Anchor), deployed to devnet |
| File Storage | Cloudinary |
| Auth | Passport.js (Local strategy + JWT + Google OAuth 2.0) |
| Email | Resend |
| Push Notifications | OneSignal |
| Incident Alerts | Alerta → Telegram |
| Frontend Hosting | Render |
| Backend Hosting | Vercel |

**Live app:** https://campusflow-mmt9.onrender.com
**Live API:** https://campusflowserver-uc79.vercel.app

---

## Database Schema

Simplified view of the core entities (PostgreSQL via Supabase):

**users**
| Column | Notes |
|---|---|
| `id` | Primary key |
| `fullname` | |
| `email` | |
| `matric_number` | Primary student identifier |
| `role` | `student` \| `admin` \| `superadmin` |
| `university_id` | Links to the student's university |
| `is_approved` | `null` (pending) / `true` (approved) / `false` (rejected) — clearance state |

**universities**
| Column | Notes |
|---|---|
| `university_id` | Also used as a PDA seed on-chain |
| `name` | |
| `admin` | Wallet/account managing the university |
| `pda_address` | On-chain program-derived address |

**certificates**
| Column | Notes |
|---|---|
| `hash` | SHA-256 hash of the certificate — the on-chain identifier |
| `student_id`, `student_name` | |
| `is_valid` | Flipped to `false` on revocation |
| `tx_signature`, `pda_address` | On-chain reference |

**verification_records**
| Column | Notes |
|---|---|
| `document_hash` | The certificate being verified |
| `verifier_org` | Who requested verification |
| `timestamp` | |

**incidents**
| Column | Notes |
|---|---|
| `incident_id` | |
| `student_id`, `university_id` | |
| `category` | e.g. `suspicious` |
| `location_text`, `latitude`, `longitude` | |
| `description` | |

> A single backend wallet registers all universities on-chain; individual universities are differentiated by `university_id` in their PDA seeds, not by separate wallets.

---

## Authentication & Security

### Auth Flow

1. **Registration/Login** — credentials validated against PostgreSQL.
2. **Token Minting** — server issues a signed JWT containing `id`, `fullname`, and `role`, with a 24-hour expiry.
3. **Protected Requests** — client attaches the JWT via the `Authorization` header.
4. **Middleware Inspection** — Passport verifies the signature using `JWT_SECRET`, checks the database, and injects the user into `req.user`.

### Rate Limiting

| Scope | Endpoints | Limit | Purpose |
|---|---|---|---|
| Global | All endpoints | 120 req / 1 min | Protects overall server |
| Auth | `/login`, `/register` | 30 req / 5 min | Safe for shared campus Wi-Fi |
| OTP | `/forgot-password`, `/reset-password` | 5 req / 15 min | Prevents mail API abuse |

### CORS

The backend allows requests only from an explicit list of trusted frontend origins — configured in `app.js`, not left open with a wildcard in production.

---

## API Reference

### Auth API

#### `POST /register`
```json
{
  "fullname": "kendrick jackson",
  "email": "kendrick@example.com",
  "role": "student",
  "password": "securePassword123"
}
```
**`201`**
```json
{
  "message": "User registered successfully",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "2", "fullname": "kendrick jackson", "role": "student" }
}
```

#### `POST /login`
```json
{ "fullname": "kendrick jackson", "password": "securePassword123" }
```
**`200`** — same shape as `/register`.

#### `GET /me`
**Headers:** `Authorization: Bearer <token>`
```json
{ "user": { "id": "2", "fullname": "kendrick jackson", "email": "kendrick@example.com" } }
```

#### `POST /forgot-password`
> Always returns `200`, regardless of whether the email exists — prevents account enumeration.
```json
{ "email": "user@example.com" }
```

#### `POST /reset-password`
```json
{ "email": "user@example.com", "otp": "482019", "newPassword": "campusFlowSecure2026" }
```
**Errors `400`:**
```json
{ "error": "Invalid OTP" }
{ "error": "OTP expired" }
```

#### `GET /logout`
```json
{ "message": "Logged out successfully. Please delete the token from client storage." }
```

---

### Google OAuth 2.0

#### `GET /auth/google`
Initiates the OAuth flow. Must be triggered via browser navigation — **do not use Axios or Fetch**.
```js
const handleGoogleLogin = () => {
  window.location.href = "https://campusflowserver-uc79.vercel.app/auth/google";
};
```

#### `GET /auth/google/callback`
Handled automatically by Google. Verifies the profile, persists to the database, and mints a session.

**`200`**
```json
{
  "message": "Logged in successfully",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 12, "email": "student@example.com", "role": null, "isNewUser": true }
}
```

- `isNewUser: true` → redirect to `/complete-profile` to collect `university` and `role`.
- `isNewUser: false` → redirect directly to the dashboard.

---

### Blockchain API (`/api/solana`)

All protected routes require a JWT in the `Authorization` header.

#### Universities

**`POST /`** — Register a university on-chain and in the database. *(No auth required.)*
```json
{ "universityId": "FUTO_UNI", "name": "Federal University of Technology Owerri" }
```

**`GET /`** — Fetch all universities from chain + database. *(No auth required.)*

#### Certificates

**`POST /certificate`** — Issue a certificate on-chain and save to database. Hash is auto-generated from student details.
```json
{
  "studentId": "FUT/2021/001",
  "studentName": "Ezichi Jenissi",
  "certificateType": "B.Tech Software Engineering",
  "institution": "FUTO"
}
```

**`GET /certificate`** — Fetch all certificates for the authenticated user's university (chain + DB).

**`GET /certificate/:id`** — Fetch a single certificate by its database UUID.

**`PATCH /certificate/revoke`** — Revoke a certificate on-chain and update the database. University-restricted.
```json
{ "hash": "abc123..." }
```

#### Certificate Verification

**`POST /verify`** — Verify a certificate on-chain and log the verification record.
```json
{ "document_hash": "abc123...", "verifier_org": "Federal Ministry of Education" }
```

**`GET /record/verify`** — Fetch all verification records for the authenticated user's university.

**`GET /records/:hash`** — Fetch all verification records for a specific certificate hash. University-restricted.

#### Incidents

**`POST /incidents`** — Report a campus incident. *(Currently saved to DB only — chain write is implemented but commented out.)*
```json
{
  "category": "suspicious",
  "locationText": "Engineering Block, Gate 2",
  "description": "A man was loitering around the parked bikes.",
  "latitude": 5.392691,
  "longitude": 6.986264
}
```

**`GET /incidents`** — Fetch all incidents for the authenticated user's university (chain + DB, filtered by university).

---

## Frontend Implementation

Axios instance with automatic JWT injection and 401 handling:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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

Routing uses React Router's `BrowserRouter`, with clean paths (no `#`) supported via a server-side rewrite that falls back to `index.html` for any unmatched route.

---

## Local Development

### Prerequisites
- Node.js
- A Supabase/PostgreSQL instance
- Solana CLI + Anchor (for blockchain interaction)

### Backend

```bash
cd Server
npm install
npm run dev
```

Server runs at `http://localhost:3000`.

Required environment variables (`.env` in `Server/`):
```
JWT_SECRET=
FRONTEND_URL=
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=
CLOUDINARY_URL=
ONESIGNAL_APP_ID=
ONESIGNAL_REST_API_KEY=
SOLANA_RPC_URL=
NODE_ENV=development
```

### Frontend

```bash
cd Client
npm install
npm run dev
```

Required environment variables (`.env` in `Client/`):
```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=
VITE_ONESIGNAL_APP_ID=
```

---

## Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | Render (Static Site) | Rewrite rule `/* → /index.html` required for client-side routing |
| Backend | Vercel | `FRONTEND_URL` env var must exactly match the deployed frontend origin (CORS) |
| Database | Supabase | Managed PostgreSQL |
| Blockchain | Solana Devnet | Program deployed via Anchor |

---

## Team

Built by **Team The Navigators** for Hack4FUTO.

| Name | Role |
|---|---|
| Ezichi Jenissi | Full-Stack Developer |
| Lucky-Daniel | Front-End Developer |
| Prayskey Ogbonna | Full-Stack / ML Developer |

---

**Every Nigerian student deserves a campus that works for them.**