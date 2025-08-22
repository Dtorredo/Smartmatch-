import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Hero from "./components/Hero";
import JobListings from "./components/JobListings";
import Footer from "./components/Footer";
import "./Home.css";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Jobs"));
        const jobsList = [];
        querySnapshot.forEach((doc) => {
          jobsList.push({ id: doc.id, ...doc.data() });
        });
        setJobs(jobsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="home-container">
      <Hero />
      <JobListings jobs={jobs} loading={loading} />
      <Footer />
    </div>
  );
}

export default Home;
