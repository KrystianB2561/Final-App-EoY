import React, { useState } from 'react';
import axios from 'axios';
import logo from './Logo_EoYCW.png';
import './postjob.css';

function PostJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { title, description, salary};

    try {
      const response = await axios.post(`http://localhost:5000/post-job`, jobData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
      <header className="top-bar">
        <div className="logo">
          <img src={logo} alt ="Sample Logo" />
        </div>

        <nav className="nav-links">
          <a href="/client-dash">Dashboard</a>
        </nav>
      </header>
        <h2>Post a Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
          <input
            type="number"
            placeholder="Project Budget"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <button type="submit">Post Project</button>
        </form>
        {message && <p className="response-message">{message}</p>}
      </div>
    </div>
  );
}

export default PostJob;
