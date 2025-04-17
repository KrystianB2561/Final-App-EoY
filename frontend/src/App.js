import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import PostJob from './PostJob';
import ViewJobs from './ViewJobs';
import DraftContract from './DraftContract';
import ClientDashboard from './ClientDash';
import FreelancerDashboard from './FreelancerDash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/view-jobs" element={<ViewJobs />} />
        <Route path="/draft-contract" element={<DraftContract />} />
        <Route path="/freelance-dash" element={<FreelancerDashboard />} />
        <Route path ="/client-dash" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      setMessage(response.data.message);
      navigate('/dashboard');  // Redirect to the dashboard after login
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Log In</h1>
  
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="text" 
              placeholder="Type your email" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="login-input"
            />
          </div>
  
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Type your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="login-input"
            />
          </div>
          
          <div className="button-group">
            <button onClick={handleLogin} className="login-button login">Log In</button>
            <button onClick={handleRegister} className="login-button register">Register</button>
          </div>
  
          
  
          <div className="signup-link">No account yet? Sign Up</div>
  
          {message && (
            <p className="login-message">{message}</p>
          )}
        </div>
      </div>
    );
  }  

export default App;