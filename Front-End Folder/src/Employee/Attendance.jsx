import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Attendance = () => {
  const [name, setName] = useState('')
  const [timeIn, setTimeIn] = useState('')
  const [timeOut, setTimeOut] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/employee/attendance', {
      name: name, // Ensure name is included in the POST data
      timeIn: timeIn,
      timeOut: timeOut,
    })
    .then(response => {
      alert('Attendance marked successfully!')
      
    })
    .catch(error => {
      console.error('There was an error marking the attendance!', error)
    })
  }

  return (
    <div className="container">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeIn" className="form-label">Time In</label>
          <input 
            type="time" 
            className="form-control" 
            id="timeIn" 
            value={timeIn} 
            onChange={(e) => setTimeIn(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeOut" className="form-label">Time Out</label>
          <input 
            type="time" 
            className="form-control" 
            id="timeOut" 
            value={timeOut} 
            onChange={(e) => setTimeOut(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Attendance
