import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import './EmployeeDetail.css'; // Import the CSS file

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="container-fluid d-flex flex-column vh-100">
      <div className="header p-2 d-flex justify-content-center shadow">
        <h4>KrishTec Employee Management</h4>
      </div>
      <div className="d-flex flex-grow-1">
        <div className="sidebar col-md-2 bg-light">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="attendance">Attendance</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="leave">Leave</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="task">Task Assigned</Link>
            </li>
            {/* Add other options here */}
          </ul>
        </div>
        <div className="content col-md-10 p-3">
          <Outlet context={employee} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
