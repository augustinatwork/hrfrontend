// components/JobPost.js
import React, { useState } from 'react';

function JobPost({ navigateTo, addJob }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: ''
  });
  const [jobId, setJobId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill all fields');
      return;
    }
    
    const newJobId = addJob(formData);
    setJobId(newJobId);
    setIsSubmitted(true);
  };

  return (
    <div className="job-post">
      <h2>Create New Job Posting</h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows="6"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Create Job Posting
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Job Posted Successfully!</h3>
          <p>
            Your job has been posted with ID: <strong>{jobId}</strong>
          </p>
          <p>Please save this ID for tracking applications.</p>
          <div className="button-group">
            <button onClick={() => {
              setIsSubmitted(false);
              setFormData({ title: '', location: '', description: '' });
            }} className="action-button">
              Post Another Job
            </button>
            <button onClick={() => navigateTo('dashboard')} className="action-button">
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobPost;