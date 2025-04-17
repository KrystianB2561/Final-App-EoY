import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function FreelancerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/3182792/pexels-photo-3182792.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Freelancer Dashboard"
          className="dashboard-image"
        />
        <div className="button-overlay">
          <button onClick={() => navigate('/view-jobs')}>View Jobs</button>
          <button onClick={() => navigate('/draft-contract')}>Draft Contract</button>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboard;
