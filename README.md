# LeadFlow

LeadFlow is a full-stack lead capture and management application built for the Digital Heroes Training Task.

It provides a public project enquiry experience and a protected administrative workspace for managing incoming leads through a simple sales pipeline.

## Features

### Public Lead Capture

- Responsive project enquiry landing page
- Name, email, budget range and project message fields
- Client-side form validation
- Server-side validation
- Loading, success and error states
- Lead persistence using MongoDB

### Admin Dashboard

- Protected admin workspace
- Dashboard statistics for Total, New, Contacted and Closed leads
- Search leads by name, email or message
- Responsive lead table on desktop
- Mobile-friendly lead cards
- Update lead status between:
  - New
  - Contacted
  - Closed
- Persistent status updates
- Loading, empty and error states

### Authentication

Admin authentication was implemented as an additional security enhancement.

- Secure admin login
- Password hashing with bcrypt
- JWT authentication
- Protected lead-management API routes
- Protected `/admin` frontend route
- Persistent login session
- Automatic handling of invalid/expired authentication
- Admin logout

Public users can submit enquiries without authentication, while lead data and pipeline-management operations are restricted to authenticated administrators.

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
- JSON Web Tokens
- bcryptjs

## Project Structure

```text
LeadFlow/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
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