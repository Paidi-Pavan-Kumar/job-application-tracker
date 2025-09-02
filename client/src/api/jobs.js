import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getJobs = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const getJob = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

export const createJob = async (job) => {
  const res = await axios.post(API_URL, job)
  return res.data
}

// Update a job
export const updateJob = async (id, job) => {
  const res = await axios.put(`${API_URL}/${id}`, job)
  return res.data
}

// Delete a job
export const deleteJob = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`)
  return res.data
}

// Add a round to a job
export const addRound = async (id, round) => {
  const res = await axios.post(`${API_URL}/${id}/rounds`, round)
  return res.data
}

// Update a round by index
export const updateRound = async (id, roundIndex, round) => {
  const res = await axios.put(`${API_URL}/${id}/rounds/${roundIndex}`, round)
  return res.data
}

// Delete a round by index
export const deleteRound = async (id, roundIndex) => {
  const res = await axios.delete(`${API_URL}/${id}/rounds/${roundIndex}`)
  return res.data
}
