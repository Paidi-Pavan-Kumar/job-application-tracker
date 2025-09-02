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

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/job-tracking-system.git
   cd job-tracking-system
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**
   - In `server/.env`, add your MongoDB URI:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

5. **Run the backend server:**
   ```bash
   cd ../server
   npm start
   ```

6. **Run the frontend:**
   ```bash
   cd ../client
   npm run dev
   ```

7. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

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