// App.js
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import JobPost from './components/JobPost';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [jobs, setJobs] = useState([]);
  
  // Function to add a new job
  const addJob = (job) => {
    // Generate a simple job ID (for demo purposes)
    const jobId = `JOB-${Date.now().toString().slice(-6)}`;
    const newJob = { ...job, id: jobId };
    setJobs([...jobs, newJob]);
    return jobId;
  };

  // Page navigation handler
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Render the appropriate component based on the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'jobpost':
        return <JobPost navigateTo={navigateTo} addJob={addJob} />;
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} jobs={jobs} />;
      default:
        return <MainPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>HR Management System</h1>
        {currentPage !== 'main' && (
          <button onClick={() => navigateTo('main')} className="back-button">
            Back to Main
          </button>
        )}
      </header>
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;