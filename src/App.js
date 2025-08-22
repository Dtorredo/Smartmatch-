import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListings from './pages/jobs';
import JobDetails from './pages/JobDetails';
import JobApplication from './pages/JobApplication';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';
import Approved from './pages/Approved';
import JobsList from './pages/JobsList';
import Reviews from './pages/Reviews';
import Navbar from './components/Navbar.jsx';
import { Toaster } from 'react-hot-toast';

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/' || location.pathname === '/reviews';

  return (
    <>
      {showNavbar && <Navbar />}
      <div className={!showNavbar ? 'main-content-no-navbar' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/job-details/:jobId" element={<JobDetails />} />
          <Route path="/apply/:jobId" element={<JobApplication />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/approved" element={<Approved />} />
          <Route path="/jobs-list" element={<JobsList />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
