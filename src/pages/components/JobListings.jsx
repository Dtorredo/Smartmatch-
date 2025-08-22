import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JobListings = ({ jobs, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter(job => 
    job.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="job-listings-container">
      <h2>Latest Job Opportunities</h2>
      <p>Find your perfect match from our curated list of opportunities</p>
      <div className="job-search">
        <input 
          type="text" 
          placeholder="Search for jobs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : filteredJobs.length === 0 ? (
        <div className="no-jobs">
          <p>No job listings match your search. Check back later!</p>
        </div>
      ) : (
        <div className="job-cards-container">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.job_title}</h3>
              <p className="company">{job.job_company}</p>
              <div className="location">
                <span>📍</span>
                <span>{job.job_location}</span>
              </div>
              {job.job_salary && (
                <div className="salary">
                  <span>💰</span>
                  <span>{job.job_salary}</span>
                </div>
              )}
              <div className="details">
                <span className="job-type">{job.job_type || "Available"}</span>
                <Link to={`/job-details/${job.id}`} className="view-details">View Details <span>→</span></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobListings;