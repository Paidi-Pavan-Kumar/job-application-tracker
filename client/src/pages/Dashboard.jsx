import React, { useEffect, useState } from 'react'
import { getJobs } from '../api/jobs'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'

const statusOptions = [
  "All",
  "Waiting for Referral",
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Offer",
  "Rejected",
  "No Response"
]

const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    getJobs()
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load jobs')
        setLoading(false)
      })
  }, [])

  const filteredJobs = statusFilter === "All"
    ? jobs
    : jobs.filter(job => job.status === statusFilter)

  if (loading) return <Loader />
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold">Job Listings</h2>
        <div>
          <label className="mr-2 font-semibold text-gray-700">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4">
        {filteredJobs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No jobs found for this status.</div>
        ) : (
          filteredJobs.map(job => (
            <JobCard key={job.id || job._id} job={job} />
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
