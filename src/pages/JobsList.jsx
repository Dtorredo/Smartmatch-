// JobListings.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase, FaSearch, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import "./JobListings.css";

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* auth listener */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return unsub;
  }, []);

  /* fetch jobs */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snap = await getDocs(collection(db, "Jobs"));
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.()?.toISOString() || new Date(d.data().createdAt).toISOString(),
        }));
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  /* logout handler */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  /* filter & CSV helpers */
  const filteredJobs = jobs.filter(
    (j) =>
      j.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.job_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.job_company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const csvData = filteredJobs.map((j) => ({
    "Job Title": j.job_title,
    Company: j.job_company,
    Location: j.job_location,
    Salary: j.job_salary,
    Type: j.job_type,
    Description: j.job_description,
    "Posted Date": new Date(j.createdAt).toLocaleDateString(),
  }));

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job listings…</p>
      </div>
    );
  }

  return (
    <div className="job-listings-container">
      {/* Header buttons */}
      <div className="header-buttons">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to="/profile" className="profile-link">
            <button className="profile-button">Profile</button>
          </Link>

          {user && (
            <button className="profile-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Page header */}
      <div className="job-listings-header">
        <h1>
          <FaBriefcase className="header-icon" />
          Current Job Openings
        </h1>
        <p className="subtitle">Find your next career opportunity</p>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search jobs by title, company or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Job grid */}
      <div className="job-listings-content">
        {filteredJobs.length === 0 ? (
          <div className="no-jobs-found">
            {searchTerm ? (
              <>
                <h3>No jobs found matching your search</h3>
                <p>Try different keywords or check back later.</p>
              </>
            ) : (
              <>
                <h3>No jobs posted yet</h3>
                <p>Check back soon for new opportunities.</p>
              </>
            )}
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <Link to={`/job-details/${job.id}`} key={job.id} className="job-card-link">
                <div className="job-card">
                  <div className="job-card-header">
                    <h3>{job.job_title}</h3>
                    {job.job_company && <p className="company">{job.job_company}</p>}
                  </div>

                  {job.job_description && (
                    <p className="job-description">
                      {job.job_description.length > 120
                        ? `${job.job_description.substring(0, 120)}…`
                        : job.job_description}
                    </p>
                  )}

                  <div className="job-meta">
                    {job.job_location && (
                      <div className="meta-item">
                        <FaMapMarkerAlt className="meta-icon" />
                        <span>{job.job_location}</span>
                      </div>
                    )}
                    {job.job_salary && (
                      <div className="meta-item">
                        <FaMoneyBillWave className="meta-icon" />
                        <span>{job.job_salary}</span>
                      </div>
                    )}
                    {job.job_type && (
                      <div className="meta-item">
                        <FaClock className="meta-icon" />
                        <span>{job.job_type}</span>
                      </div>
                    )}
                  </div>

                  <div className="view-details">
                    View Details <span className="arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Download CSV */}
      {filteredJobs.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <CSVLink data={csvData} filename="job-listings.csv" className="download-button">
            <FaDownload className="download-icon" />
            Download Jobs List
          </CSVLink>
        </div>
      )}
    </div>
  );
}