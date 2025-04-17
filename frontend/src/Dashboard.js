import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const goToFreelancer = () => {
    navigate('/freelance-dash'); 
  };

  const goToClient = () => {
    navigate('/client-dash'); 
  };

  return (
    <div className="dashboard-wrapper">
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Dashboard"
          className="dashboard-image"
        />
        <div className="button-overlay">
          <button onClick={goToFreelancer}>Freelancer</button>
          <button onClick={goToClient}>Client</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;