import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './employee.css'  // Import the CSS file

const EmployeeProfile = () => {
  const employee = useOutletContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/')
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className="profile-container">
      {employee.image && (
        <div className="profile-image-box">
          <img src={`http://localhost:3000/Images/${employee.image}`} className='profile-image' alt="Employee" />
        </div>
      )}
      <div className='profile-details'>
        <h3>Name: {employee.name}</h3>
        <h3>Email: {employee.email}</h3>
        <h3>Salary: ${employee.salary}</h3>
        <h3>Address: {employee.address}</h3>
        {/* Add other details as needed */}
      </div>
      <button className='btn btn-danger logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default EmployeeProfile
