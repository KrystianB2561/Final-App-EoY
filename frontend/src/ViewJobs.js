import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewjob.css';
import logo from './Logo_EoYCW.png';

function ViewJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/view-jobs`);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="jobs-container">
      <header className="top-bar">
              <div className="logo">
                <img src={logo} alt ="Sample Logo" />
              </div>
      
              <nav className="nav-links">
                <a href="/freelance-dash">Dashboard</a>
              </nav>
            </header>
      <h1>Available Jobs</h1>
      <div className="job-list">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-description">{job.description}</p>
            <p className="job-salary">Budget: ${job.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewJobs;
