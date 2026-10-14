# GovtJob Portal – Personalized Government Job Alert System

A React + Express + MongoDB project for account creation, profile-based government-job suggestions, job search, deadline alerts, saved jobs, application tracking, and an admin API for job management.

> **Important:** Initial recruitment entries are demonstration examples, not a verified live vacancy feed. Always check the official recruitment notification and official website before applying. The app currently uses stored deadlines for alerts; it does not automatically fetch vacancies from government websites.

## Requirements
- Node.js 20+ (recommended)
- npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code

## 1. Extract and open the project
Extract `govt-job-portal-main.zip`. Open the extracted `govt-job-portal-main` folder in VS Code.

## 2. Configure the backend
Open a VS Code terminal:

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env`. Edit the values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/govtjobportal
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_ORIGIN=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose_a_strong_password
```

Make sure MongoDB is running. Change the admin password before using the app. The admin account is created on the first successful database connection when these environment variables are configured.

Start the backend in the `server` terminal:

```bash
npm run dev
```

You should see `GovtJob Portal API listening on http://localhost:5000`. Visit `http://localhost:5000/api/health` to check the API.

## 3. Configure and run the frontend
Open a **second** VS Code terminal in the project root (`govt-job-portal-main`, not `server`):

```bash
npm install
```

Copy the root `.env.example` to `.env` (or create `.env`) and set:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 4. Test the application
1. Choose **Create an account** and register with a username, email, and password of at least 8 characters.
2. Log in, then complete the profile. Required fields have an asterisk.
3. Click **Save profile**. The dashboard should show `Profile Created Successfully!`.
4. Explore **Jobs for Me** and **All Government Jobs**. Use search and qualification filters.
5. Click the bookmark icon to save a job.
6. Click **Track application** to add the job to My Applications. This records your tracking status only; it does not submit the real government application.
7. Review **Alerts & upcoming deadlines** on the dashboard. Demo dates are examples and may not correspond to currently open registrations.
8. Open the official link and verify the current notification before applying.

## 5. Admin access
Use the admin email and password set in `server/.env`. Admin-only endpoints are available at `/api/admin/jobs` for listing, creating, editing, and deleting job records. These endpoints are protected by JWT and role checks. The current frontend focuses on the student portal; manage the admin API through an API client such as Postman until an admin UI is added.

## Project structure
```text
src/                 React frontend
  App.jsx             Auth, profile, dashboard, job modules and tracking
  App.css             Responsive styling
  index.css            Global styles
server/
  src/server.js        Express API, MongoDB models, auth, jobs and tracking
  .env.example         Backend environment template
.env.example           Frontend API URL template
```

## Notes and limitations
- Passwords are hashed with bcrypt and the API uses JWT authentication.
- Do not commit `.env` files or real credentials to GitHub.
- Example job data is intentionally marked unverified. Official vacancy data needs to be entered and verified by an administrator or imported from a permitted official data source.
- Deadline alerts are based on the dates stored in the job database. A production deployment should add a scheduled email/push notification worker and a verified notification update process.
- This is a college-project starting point. Before public deployment, add password reset, email verification, stronger rate limiting, production secrets, audit logs, and thorough testing.
