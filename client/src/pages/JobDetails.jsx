import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJob, updateJob, deleteJob } from '../api/jobs'
import Loader from '../components/Loader'

const statusOptions = [
  "Waiting for Referral",
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Offer",
  "Rejected",
  "No Response"
]

const resultOptions = ["Pending", "Cleared", "Rejected"]

const statusColors = {
  "Waiting for Referral": "bg-yellow-100 text-yellow-800",
  "Applied": "bg-blue-100 text-blue-800",
  "Shortlisted": "bg-green-100 text-green-800",
  "Interview Scheduled": "bg-purple-100 text-purple-800",
  "Offer": "bg-green-200 text-green-900",
  "Rejected": "bg-red-100 text-red-800",
  "No Response": "bg-gray-100 text-gray-700"
}

const resultColors = {
  "Pending": "bg-yellow-50 text-yellow-700",
  "Cleared": "bg-green-50 text-green-700",
  "Rejected": "bg-red-50 text-red-700"
}

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      setError('No job ID provided')
      setLoading(false)
      return
    }
    getJob(id)
      .then(data => {
        setJob(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load job')
        setLoading(false)
      })
  }, [id])

  const handleEdit = () => {
    setEditForm({ ...job })
    setEditMode(true)
  }

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleEditRoundChange = (e, idx) => {
    const { name, value } = e.target
    const updatedRounds = editForm.rounds.map((round, i) =>
      i === idx ? { ...round, [name]: value } : round
    )
    setEditForm({ ...editForm, rounds: updatedRounds })
  }

  const addEditRound = () => {
    setEditForm({
      ...editForm,
      rounds: [
        ...editForm.rounds,
        { roundName: '', date: '', result: 'Pending' }
      ]
    })
  }

  const removeEditRound = idx => {
    setEditForm({
      ...editForm,
      rounds: editForm.rounds.filter((_, i) => i !== idx)
    })
  }

  const handleUpdate = async e => {
    e.preventDefault()
    await updateJob(job._id, editForm)
    setJob(await getJob(job._id))
    setEditMode(false)
  }

  const handleDelete = async () => {
    await deleteJob(job._id)
    navigate('/')
  }

  if (loading) return <Loader />
  if (error) return <div className="text-red-500">{error}</div>
  if (!job) return <div>Job not found</div>

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-2xl mt-8 border border-gray-100">
      {!editMode && (
        <>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-1">{job.role}</h2>
              <div className="text-gray-700 font-semibold text-lg mb-1">{job.company}</div>
              <div className="flex flex-wrap gap-2">
                {job.platformApplied && (
                  <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded border border-blue-100">
                    {job.platformApplied}
                  </span>
                )}
                {job.referral && (
                  <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded border border-green-100">
                    Referral: {job.referral}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded text-xs font-semibold ${statusColors[job.status] || "bg-gray-100 text-gray-700"}`}>
                {job.status}
              </span>
              {job.appliedDate && (
                <span className="text-xs text-gray-400">
                  Applied: {new Date(job.appliedDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {job.jd && (
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Job Description</div>
              <div className="text-gray-600 whitespace-pre-line">{job.jd}</div>
            </div>
          )}

          {job.notes && (
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Notes</div>
              <div className="text-gray-600 whitespace-pre-line">{job.notes}</div>
            </div>
          )}

          <div className="mb-4 flex flex-wrap gap-4">
            {job.jobLink && (
              <a
                href={job.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm hover:text-blue-700"
              >
                Job Link
              </a>
            )}
            {job.resumeLink && (
              <a
                href={job.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 underline text-sm hover:text-purple-700"
              >
                Resume Link
              </a>
            )}
          </div>

          {job.rounds && job.rounds.length > 0 && (
            <div className="mb-6">
              <div className="font-semibold text-gray-700 mb-2">Interview Rounds</div>
              <div className="flex flex-col gap-2">
                {job.rounds.map((round, idx) => (
                  <div key={idx} className="flex flex-wrap items-center gap-2 bg-blue-50 rounded px-3 py-2 border border-blue-100">
                    <span className="font-medium text-blue-800">{round.roundName}</span>
                    {round.date && (
                      <span className="text-xs text-gray-500">
                        {new Date(round.date).toLocaleDateString()}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${resultColors[round.result] || "bg-gray-100 text-gray-700"}`}>
                      {round.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-400 mt-6 flex flex-wrap gap-4">
            <span>Created: {new Date(job.createdAt).toLocaleString()}</span>
            <span>Last Updated: {new Date(job.updatedAt).toLocaleString()}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <button onClick={handleEdit} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-yellow-500 hover:to-yellow-600 transition-colors">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-700 transition-colors">
              Delete
            </button>
          </div>
        </>
      )}

      {editMode && (
        <form onSubmit={handleUpdate} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Company<span className="text-red-500">*</span></label>
              <input name="company" value={editForm.company} onChange={handleEditChange} className="border p-2 rounded w-full" required placeholder="Company" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Role<span className="text-red-500">*</span></label>
              <input name="role" value={editForm.role} onChange={handleEditChange} className="border p-2 rounded w-full" required placeholder="Role" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Job Description</label>
              <input name="jd" value={editForm.jd} onChange={handleEditChange} className="border p-2 rounded w-full" placeholder="Job Description" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Platform Applied</label>
              <input name="platformApplied" value={editForm.platformApplied} onChange={handleEditChange} className="border p-2 rounded w-full" placeholder="Platform Applied" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Job Link</label>
              <input name="jobLink" value={editForm.jobLink} onChange={handleEditChange} className="border p-2 rounded w-full" placeholder="Job Link" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Applied Date</label>
              <input name="appliedDate" type="date" value={editForm.appliedDate ? editForm.appliedDate.slice(0,10) : ''} onChange={handleEditChange} className="border p-2 rounded w-full" placeholder="Applied Date" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Notes</label>
              <input name="notes" value={editForm.notes} onChange={handleEditChange} className="border p-2 rounded w-full" placeholder="Notes" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Referral</label>
              <input name="referral" value={editForm.referral} onChange={handleEditChange} className="border p-2 rounded w-full" placeholder="Referral" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Status</label>
              <select name="status" value={editForm.status} onChange={handleEditChange} className="border p-2 rounded w-full">
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Resume Link</label>
              <input name="resumeLink" value={editForm.resumeLink} onChange={handleEditChange} className="border p-2 rounded w-full" placeholder="Resume Link" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-2 text-lg">Interview Rounds</label>
            {editForm.rounds.map((round, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-2 items-center mb-2 bg-blue-50 rounded-lg p-3 border border-blue-100">
                <input name="roundName" value={round.roundName} onChange={e => handleEditRoundChange(e, idx)} className="border p-1 rounded w-full sm:w-auto" placeholder="Round Name" />
                <input name="date" type="date" value={round.date ? round.date.slice(0,10) : ''} onChange={e => handleEditRoundChange(e, idx)} className="border p-1 rounded w-full sm:w-auto" />
                <select name="result" value={round.result} onChange={e => handleEditRoundChange(e, idx)} className="border p-1 rounded w-full sm:w-auto">
                  {resultOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeEditRound(idx)} className="text-red-500 hover:underline text-sm mt-2 sm:mt-0">
                  Delete
                </button>
              </div>
            ))}
            <button type="button" onClick={addEditRound} className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 mt-2">
              + Add Round
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors text-lg">
              Save
            </button>
            <button type="button" onClick={() => setEditMode(false)} className="bg-gray-200 px-6 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition-colors text-lg">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default JobDetails
