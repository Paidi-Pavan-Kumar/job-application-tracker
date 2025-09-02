import React, { useState } from 'react'
import { createJob } from '../api/jobs'
import { useNavigate } from 'react-router-dom'

const initialForm = {
  company: '',
  role: '',
  jd: '',
  platformApplied: '',
  jobLink: '',
  appliedDate: '',
  notes: '',
  referral: '',
  status: 'Applied',
  rounds: [
    {
      roundName: '',
      date: '',
      result: 'Pending'
    }
  ],
  resumeLink: ''
  // createdBy: '' // Set this if you have user authentication
}

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

const JobForm = () => {
  const [form, setForm] = useState(initialForm)
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRoundChange = (e, idx) => {
    const { name, value } = e.target
    const updatedRounds = form.rounds.map((round, i) =>
      i === idx ? { ...round, [name]: value } : round
    )
    setForm({ ...form, rounds: updatedRounds })
  }

  const addRound = () => {
    setForm({
      ...form,
      rounds: [...form.rounds, { roundName: '', date: '', result: 'Pending' }]
    })
  }

  const removeRound = idx => {
    setForm({
      ...form,
      rounds: form.rounds.filter((_, i) => i !== idx)
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await createJob(form)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
          Add New Job
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Company<span className="text-red-500">*</span></label>
            <input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Role<span className="text-red-500">*</span></label>
            <input
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Job Description</label>
            <input
              name="jd"
              placeholder="Job Description"
              value={form.jd}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Platform Applied</label>
            <input
              name="platformApplied"
              placeholder="Platform Applied (LinkedIn, Naukri, etc.)"
              value={form.platformApplied}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Job Link</label>
            <input
              name="jobLink"
              placeholder="Job Link"
              value={form.jobLink}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Applied Date</label>
            <input
              name="appliedDate"
              type="date"
              value={form.appliedDate ? form.appliedDate : Date.now()}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Notes</label>
            <input
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Referral (Name)</label>
            <input
              name="referral"
              placeholder="Referral (Name)"
              value={form.referral}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Resume Link</label>
            <input
              name="resumeLink"
              placeholder="Resume Link"
              value={form.resumeLink}
              onChange={handleChange}
              className="block w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="mb-6 mt-8">
          <label className="font-semibold text-gray-700 block mb-2 text-lg">Interview Rounds</label>
          {form.rounds.map((round, idx) => (
            <div
              key={idx}
              className="md:flex md:space-x-4 items-end bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200"
            >
              <div className="flex-1 mb-2 md:mb-0">
                <label className="block text-sm font-medium text-gray-600 mb-1">Round Name</label>
                <input
                  name="roundName"
                  placeholder="Round Name"
                  value={round.roundName}
                  onChange={e => handleRoundChange(e, idx)}
                  className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex-1 mb-2 md:mb-0">
                <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  value={round.date}
                  onChange={e => handleRoundChange(e, idx)}
                  className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex-1 mb-2 md:mb-0">
                <label className="block text-sm font-medium text-gray-600 mb-1">Result</label>
                <select
                  name="result"
                  value={round.result}
                  onChange={e => handleRoundChange(e, idx)}
                  className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {resultOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {form.rounds.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRound(idx)}
                  className="ml-4 text-red-500 text-xs font-semibold hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addRound}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            + Add Round
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg"
        >
          Create Job
        </button>
      </form>
    </div>
  )
}

export default JobForm
