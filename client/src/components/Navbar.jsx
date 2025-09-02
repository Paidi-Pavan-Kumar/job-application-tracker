import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav className="bg-gray-800 p-4 text-white flex justify-between">
    <Link to="/" className="font-bold">Job Tracker</Link>
    <Link to="/jobs/new" className="bg-blue-500 px-3 py-1 rounded">Add Job</Link>
  </nav>
)

export default Navbar
