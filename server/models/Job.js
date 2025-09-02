import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  roundName: { type: String },     // e.g., "Technical Round 1"
  date: { type: Date },
  result: { 
    type: String, 
    enum: ["Pending", "Cleared", "Rejected"], 
    default: "Pending" 
  }
}, { _id: false });

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  jd: { type: String }, // Job Description
  platformApplied: { type: String }, // LinkedIn, Naukri, Company Careers page
  jobLink: { type: String },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String },
  referral: { type: String }, // name of referrer, or null
  status: {
    type: String,
    enum: [
      "Waiting for Referral",
      "Applied",
      "Shortlisted",
      "Interview Scheduled",
      "Offer",
      "Rejected",
      "No Response"
    ],
    default: "Applied"
  },
  rounds: [roundSchema],
  resumeLink: { type: String }, // Google Drive link, etc.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
