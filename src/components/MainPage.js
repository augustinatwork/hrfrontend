// components/MainPage.js
import React from 'react';

function MainPage({ navigateTo }) {
  return (
    <div className="main-page">
      <h2>Welcome to the HR Portal</h2>
      <div className="options-container">
        <div className="option-card" onClick={() => navigateTo('jobpost')}>
          <h3>Job Post</h3>
          <button type="submit" className="submit-button">Create a new job posting</button>
        </div>
        <div className="option-card" onClick={() => navigateTo('dashboard')}>
          <h3>Dashboard</h3>
          <button type="submit" className="submit-button">View candidate analysis reports</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;