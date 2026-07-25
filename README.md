# LeadFlow

LeadFlow is a full-stack lead capture and management application built as part of the Digital Heroes Training Task.

The application allows potential clients to submit project enquiries through a public form while providing administrators with a protected workspace to review, search and manage those enquiries through a simple lead pipeline.

Task 2 extends the original lead-management application with real administrator authentication, protected API routes, persistent authentication and production deployment.

---

## Live Application

### Frontend
Add your Vercel production URL here

### Backend API
https://leadflow-rf5m.onrender.com

### Test Admin Credentials

Email:
admin@leadflow.demo

Password:
LeadFlow@2026Demo

These credentials are provided only for evaluation of the training task.

---

## Features

### Public Lead Capture

- Responsive public landing page
- Project enquiry form
- Name, email, budget range and project message
- Client-side validation
- Server-side validation
- Character limit validation
- Loading states
- Success and error feedback
- MongoDB persistence
- Public form submission without authentication

### Admin Dashboard

- Protected admin workspace
- Total lead count
- New lead count
- Contacted lead count
- Closed lead count
- Search leads by name, email or message
- Update lead status
- Responsive desktop table
- Mobile-friendly lead cards
- Loading states
- Empty states
- Error handling
- Persistent lead status

### Authentication

Task 2 introduces real administrator authentication.

- Admin credentials stored in MongoDB
- Password hashing using bcrypt
- JWT-based authentication
- Protected frontend `/admin` route
- Protected backend lead-management routes
- Bearer-token authentication
- Persistent login across page refreshes
- Automatic handling of invalid or expired authentication
- Logout functionality
- Public lead submission remains accessible without authentication

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token

### Deployment

- Vercel — frontend
- Render — backend API
- MongoDB Atlas — database

---

## Production Architecture

```text
                    Public User
                         |
                         v
                Vercel React App
                         |
                         |
                  HTTPS API Calls
                         |
                         v
                Render Express API
                         |
                         v
                 MongoDB Atlas


Administrator authentication:

Admin Login
     |
     v
POST /api/auth/login
     |
     v
MongoDB Admin Lookup
     |
     v
bcrypt Password Verification
     |
     v
JWT Generated
     |
     v
Token Stored by Client
     |
     v
Authorization: Bearer <token>
     |
     v
Authentication Middleware
     |
     v
Protected Lead Management APIs
```

---

# Data Model

LeadFlow uses two primary MongoDB models.

## Lead

A Lead represents a project enquiry submitted through the public website.

The model stores information including:

```text
name
email
budget
message
status
createdAt
updatedAt
```

### Status

Every new enquiry begins with:

```text
New
```

An administrator can move the lead through:

```text
New
   ↓
Contacted
   ↓
Closed
```

Status changes are persisted in MongoDB, so they remain after page refreshes and across different browser sessions.

---

## Admin

The Admin model represents an administrator allowed to access the protected management workspace.

It stores information including:

```text
name
email
password
createdAt
updatedAt
```

The administrator password is not stored as plain text.

Before persistence, it is hashed using bcrypt.

Authentication compares the submitted password against the stored password hash.

---

# Authentication Approach

LeadFlow uses JWT-based authentication.

## Login Flow

The administrator submits:

```text
email
password
```

to:

```text
POST /api/auth/login
```

The backend finds the administrator using the supplied email.

bcrypt compares the submitted password with the stored password hash.

If the credentials are valid, the backend generates a signed JWT.

The frontend stores the authentication token and includes it with protected requests using:

```text
Authorization: Bearer <JWT>
```

The backend authentication middleware verifies the token before allowing access to protected operations.

Without a valid token, protected requests return an unauthorized response.

---

## Protected Operations

The following administrative operations require authentication:

```text
GET /api/leads

PATCH /api/leads/:id/status
```

This prevents unauthenticated users from reading project enquiries or modifying lead statuses.

The public endpoint remains accessible:

```text
POST /api/leads
```

This is intentional because prospective clients must be able to submit enquiries without creating an account.

---

# API Endpoints

## Public

### Create Lead

```text
POST /api/leads
```

Creates a new project enquiry.

Authentication is not required.

---

## Authentication

### Admin Login

```text
POST /api/auth/login
```

Validates administrator credentials and returns an authentication token.

---

## Protected

### Get Leads

```text
GET /api/leads
```

Returns project enquiries.

Supports lead searching.

Requires administrator authentication.

### Update Lead Status

```text
PATCH /api/leads/:id/status
```

Updates a lead between:

```text
New
Contacted
Closed
```

Requires administrator authentication.

---

# Validation

LeadFlow implements validation at multiple layers.

## Client-Side Validation

The React application validates form data before sending requests to the backend.

This provides immediate feedback and avoids unnecessary requests.

## Server-Side Validation

The Express API independently validates incoming requests.

Client-side validation cannot be trusted as a security boundary, so invalid requests are rejected by the server even if frontend validation is bypassed.

## Database Validation

Mongoose schema rules provide an additional layer of data integrity.

---

# Security

The application includes several security measures:

- Administrator passwords are hashed using bcrypt
- JWTs are cryptographically signed
- Lead-management APIs require authentication
- MongoDB credentials are stored in environment variables
- JWT secrets are stored in environment variables
- Environment files are excluded from Git
- Authentication credentials are never stored directly in the source code
- Public users cannot retrieve or modify leads through protected APIs

The test administrator credentials included in this README are dedicated demonstration credentials and are not reused for personal accounts.

---

# Responsive Design

LeadFlow supports desktop, tablet and mobile layouts.

The public enquiry interface adapts to smaller screens.

The administrative workspace uses a table-oriented interface on larger displays and a mobile-friendly presentation on smaller devices.

---

# Project Structure

```text
LeadFlow/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Local Development

## 1. Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
cd LeadFlow
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create:

```text
server/.env
```

using:

```text
server/.env.example
```

as reference.

Required variables include:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ADMIN_NAME=LeadFlow Admin
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Create the initial administrator:

```bash
node scripts/createAdmin.js
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create:

```text
client/.env
```

with:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

# Production Deployment

The application is split into three production services.

### Frontend

React/Vite application deployed on Vercel.

### Backend

Node.js/Express API deployed on Render.

### Database

MongoDB Atlas stores leads and administrator data.

Production configuration is supplied using environment variables rather than committed secrets.

---

# Fresh Browser Verification

The production application was tested from a fresh browser session without existing local authentication state.

The verified flow was:

```text
Open production website
        ↓
Submit new project enquiry
        ↓
Lead stored in MongoDB Atlas
        ↓
Visit /admin
        ↓
Redirect to /login
        ↓
Authenticate using test administrator
        ↓
Open protected dashboard
        ↓
Locate newly submitted enquiry
        ↓
Change New → Contacted
        ↓
Refresh browser
        ↓
Contacted status persists
        ↓
Logout
        ↓
Attempt /admin
        ↓
Redirect to /login
```

This verifies the deployed frontend, backend, database and authentication flow together.

---

# Task 2 Improvements

The original lead-management application was extended for Task 2 with:

- Real administrator authentication
- MongoDB-backed administrator account
- bcrypt password hashing
- JWT token authentication
- Protected backend APIs
- Protected frontend routes
- Persistent authentication
- Logout functionality
- Production frontend deployment
- Production backend deployment
- Cloud-hosted MongoDB database
- Fresh-browser production verification

---

# Loom Walkthrough

Loom demonstration:

Add Loom URL here

The walkthrough demonstrates the complete flow from public form submission through administrator authentication and lead status management.

---

## Digital Heroes Training Task

Built for [Digital Heroes Training Task](https://digitalheroesco.com).