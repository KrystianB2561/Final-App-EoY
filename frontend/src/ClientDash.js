import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/7641842/pexels-photo-7641842.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Client Dashboard"
          className="dashboard-image"
        />
        <div className="button-overlay">
          <button onClick={() => navigate('/post-job')}>Post Job</button>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
