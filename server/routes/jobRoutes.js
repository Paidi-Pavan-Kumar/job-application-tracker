import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  addRound,
  updateRound,
  deleteRound
} from "../controllers/jobController.js";

const router = express.Router();

// CRUD for Jobs
router.post("/", createJob);        // Create new job application
router.get("/", getJobs);           // Get all job applications
router.get("/:id", getJobById);     // Get single job by ID
router.put("/:id", updateJob);      // Update job details
router.delete("/:id", deleteJob);   // Delete job application

// Round-specific routes
router.post("/:id/rounds", addRound);            // Add new round to job
router.put("/:id/rounds/:roundIndex", updateRound); // Update round by index
router.delete("/:id/rounds/:roundIndex", deleteRound); // Delete round

export default router;
