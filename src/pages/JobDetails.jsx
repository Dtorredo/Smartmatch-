import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaArrowLeft } from "react-icons/fa";
import "./JobDetails.css";

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "Jobs", jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = () => {
    navigate(`/apply/${jobId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="error-container">
        <h2>Job Not Found</h2>
        <p>The job you're looking for doesn't exist or may have been removed.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      <div className="job-details-card">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back to Jobs
        </button>

        <div className="job-header">
          <h1>{job.job_title}</h1>
          <p className="company-name">{job.job_company || "Company not specified"}</p>
        </div>

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

        <div className="job-content">
          <div className="section">
            <h3>Job Description</h3>
            <p>{job.job_description || "No description provided."}</p>
          </div>

          {job.responsibilities && (
            <div className="section">
              <h3>Responsibilities</h3>
              <ul>
                {job.responsibilities.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && (
            <div className="section">
              <h3>Requirements</h3>
              <ul>
                {job.requirements.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="apply-section">
          <button onClick={handleSubmit} className="apply-button">
            Apply For This Position
          </button>
        </div>
      </div>
    </div>
  );
}
