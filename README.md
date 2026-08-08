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

`https://prescripto-1-9coo.onrender.com/`

## Screenshots

`<add screenshots of Patient, Doctor, and Admin dashboards here>`
<img width="1869" height="968" alt="image" src="https://github.com/user-attachments/assets/a8a5b37d-16bb-448c-b026-b1d6d87a131d" />
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/52ab73d5-5ed0-44eb-ba7f-0e560f2220e9" />
<img width="1820" height="911" alt="image" src="https://github.com/user-attachments/assets/28186986-6b73-41dd-ac6f-f5018b19d504" />


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
git clone https://github.com/anmolvats001/Prescripto.git
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
