import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Round
export const addRound = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.rounds.push(req.body); // { roundName, date, result }
    await job.save();

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Round
export const updateRound = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const roundIndex = req.params.roundIndex;
    if (!job.rounds[roundIndex]) {
      return res.status(404).json({ message: "Round not found" });
    }

    job.rounds[roundIndex] = { ...job.rounds[roundIndex]._doc, ...req.body };
    await job.save();

    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Round
export const deleteRound = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const roundIndex = req.params.roundIndex;
    if (!job.rounds[roundIndex]) {
      return res.status(404).json({ message: "Round not found" });
    }

    job.rounds.splice(roundIndex, 1);
    await job.save();

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
