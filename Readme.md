# Job Tracking System

A full-stack web application to help you track your job applications, interview rounds, and statuses.

---

## Features

- **Add, view, edit, and delete job applications**
- **Track interview rounds for each job**
- **Status tracking (Applied, Shortlisted, Offer, etc.)**
- **Responsive and modern UI**
- **Built with MERN stack (MongoDB, Express, React, Node.js)**

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API:** RESTful endpoints

---

## API Endpoints

- `POST   /api/jobs`              - Create a new job
- `GET    /api/jobs`              - Get all jobs
- `GET    /api/jobs/:id`          - Get a single job
- `PUT    /api/jobs/:id`          - Update a job
- `DELETE /api/jobs/:id`          - Delete a job
- `POST   /api/jobs/:id/rounds`   - Add a round to a job
- `PUT    /api/jobs/:id/rounds/:roundIndex`    - Update a round
- `DELETE /api/jobs/:id/rounds/:roundIndex`    - Delete a round

---