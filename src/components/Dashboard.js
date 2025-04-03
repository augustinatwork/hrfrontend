// components/Dashboard.js
import React, { useState } from 'react';
import { candidateData } from '../data/dummyData';

function Dashboard({ navigateTo, jobs }) {
  const [jobId, setJobId] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSearch = () => {
    if (!jobId) {
      alert('Please enter a Job ID');
      return;
    }
    
    // Find the job
    const job = jobs.find(job => job.id === jobId);
    if (!job) {
      alert('Job not found with the provided ID');
      setFilteredCandidates([]);
      setHasSearched(true);
      setSelectedJob(null);
      return;
    }
    
    // Filter candidates by job ID (from dummy data)
    const candidates = candidateData.filter(candidate => candidate.jobId === jobId);
    setFilteredCandidates(candidates);
    setHasSearched(true);
    setSelectedJob(job);
  };

  return (
    <div className="dashboard">
      <h2>Candidate Analysis Dashboard</h2>
      <div className="search-container">
        <input
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          placeholder="Enter Job ID"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      
      {hasSearched && selectedJob && (
        <div className="job-details">
          <h3>Job Details</h3>
          <p><strong>Title:</strong> {selectedJob.title}</p>
          <p><strong>Location:</strong> {selectedJob.location}</p>
          <p><strong>ID:</strong> {selectedJob.id}</p>
        </div>
      )}
      
      {hasSearched && (
        <div className="candidates-container">
          <h3>Candidates ({filteredCandidates.length})</h3>
          {filteredCandidates.length > 0 ? (
            <div className="candidates-grid">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="candidate-card">
                  <div className="candidate-header">
                    <h4>{candidate.name}</h4>
                    <span className={`status ${candidate.status.toLowerCase()}`}>
                      {candidate.status}
                    </span>
                  </div>
                  <p><strong>Email:</strong> {candidate.email}</p>
                  <p><strong>Phone:</strong> {candidate.phone}</p>
                  <p><strong>Experience:</strong> {candidate.experience} years</p>
                  <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
                  <div className="score-container">
                    <div className="score">
                      <span>Match Score</span>
                      <div className="score-value">{candidate.matchScore}%</div>
                    </div>
                  </div>
                  <button className="view-details-button">View Details</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-candidates">No candidates found for this job.</p>
          )}
        </div>
      )}
      
      {(!hasSearched || filteredCandidates.length === 0) && (
        <div className="jobs-list">
          <h3>Recent Job Postings</h3>
          {jobs.length > 0 ? (
            <ul>
              {jobs.map((job) => (
                <li key={job.id} onClick={() => setJobId(job.id)} className="job-item">
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <p>{job.location}</p>
                  </div>
                  <div className="job-id">ID: {job.id}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs have been posted yet. <button onClick={() => navigateTo('jobpost')} className="inline-button">Create a job posting</button></p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;