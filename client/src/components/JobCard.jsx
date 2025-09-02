import React from 'react'
import { Link } from 'react-router-dom'

const statusColors = {
  "Waiting for Referral": "bg-yellow-100 text-yellow-800",
  "Applied": "bg-blue-100 text-blue-800",
  "Shortlisted": "bg-green-100 text-green-800",
  "Interview Scheduled": "bg-purple-100 text-purple-800",
  "Offer": "bg-green-200 text-green-900",
  "Rejected": "bg-red-100 text-red-800",
  "No Response": "bg-gray-100 text-gray-700"
}

const JobCard = ({ job }) => (
  <div className="p-5 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:shadow-2xl transition-shadow duration-200 group">
    <div className="flex-1 w-full">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-xl font-extrabold text-blue-700">{job.role}</span>
        <span className="text-gray-500 font-semibold text-lg">@ {job.company}</span>
        {job.platformApplied && (
          <span className="ml-2 px-2 py-0.5 rounded bg-blue-50 text-xs text-blue-600 border border-blue-100 font-medium">
            {job.platformApplied}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold shadow-sm ${statusColors[job.status] || "bg-gray-100 text-gray-700"}`}>
          {job.status}
        </span>
        {job.appliedDate && (
          <span className="text-xs text-gray-400 font-medium">
            Applied: {new Date(job.appliedDate).toLocaleDateString()}
          </span>
        )}
        {job.referral && (
          <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 font-medium">
            Referral: {job.referral}
          </span>
        )}
      </div>
      {job.jd && (
        <p className="text-gray-600 text-sm mt-1 line-clamp-2 italic">{job.jd}</p>
      )}
      {job.rounds && job.rounds.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {job.rounds.map((round, idx) => (
            <span
              key={idx}
              className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full border border-purple-100 font-semibold"
            >
              {round.roundName}
              {round.result !== "Pending" && (
                <span className="ml-1 font-normal text-purple-500">- {round.result}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
    <div className="flex flex-row md:flex-col items-end gap-2 min-w-[120px]">
      {job.jobLink && (
        <a
          href={job.jobLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-sm hover:text-blue-700 font-semibold transition-colors"
        >
          Job Link
        </a>
      )}
      <Link
        to={`/jobs/${job._id}`}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Details
      </Link>
    </div>
  </div>
)

export default JobCard
