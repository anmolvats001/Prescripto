# Prescripto — Doctor Appointment & Analytics Platform

A healthcare scheduling platform built on the MERN stack, with role-based dashboards for patients, doctors, and admins, plus doctor performance analytics powered by MongoDB aggregation pipelines.

## Overview

Booking a doctor's appointment usually means separate flows for patients, doctors, and clinic admins, each needing different information. Prescripto handles all three in one platform — real-time availability, booking/cancellation flows, and analytics that give doctors and admins visibility into performance and load.

## Key Features

- **Role-based dashboards** — separate experiences for Patients, Doctors, and Admins
- **Real-time availability checks** during booking to prevent double-booking
- **Booking, cancellation, and status-management flows** for appointments
- **Doctor performance analytics** — appointment load, ratings, and availability trends computed via MongoDB aggregation pipelines
- **Global + local state management** using Redux and Context API

## Live Demo

`<add live link here>`

## Screenshots

`<add screenshots of Patient, Doctor, and Admin dashboards here>`

## Architecture

```
React Frontend (Material-UI, Redux, Context API)
                │
                ▼
        Node.js / Express API
                │
                ▼
        MongoDB
   ├── Appointments
   ├── Doctors
   ├── Patients
   └── Aggregation Pipelines ──► analytics (load, ratings, availability)
```

- **Redux** manages global state (auth, bookings)
- **Context API** handles more localized UI state
- **MongoDB aggregation pipelines** power the analytics views without needing a separate analytics service

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux, Context API, Material-UI |
| Backend | Node.js, Express.js |
| Database | MongoDB (Aggregation Framework) |

## Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd prescripto

# Backend setup
cd server
npm install
cp .env.example .env   # set MongoDB URI, JWT secret, etc.
npm run dev

# Frontend setup
cd ../client
npm install
npm start
```

## Roles & Permissions

| Role | Can Do |
|---|---|
| Patient | Search doctors, book/cancel appointments, view history |
| Doctor | Manage availability, view appointments, view own analytics |
| Admin | Manage doctors, view platform-wide analytics, oversee bookings |

## Possible Next Steps

- Payment integration for paid consultations
- Video consultation support
- Notification system (email/SMS) for appointment reminders

## License

MIT
