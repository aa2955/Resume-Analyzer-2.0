import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ResumeUpload from './ResumeUpload_Job';
import CurrentData from './CurrentData';
import './App.css';

const HomePage = () => (
  <div className="homepage">
    <div className="hero-section">
      <h1>Welcome to Resume Analyzer</h1>
      <p>
        Transform your job application process with our cutting-edge AI-powered
        resume analysis tools. Perfect your resume and match with your dream
        job effortlessly!
      </p>
      <button className="cta-button">
        <Link to="/resume-upload">Get Started</Link>
      </button>
    </div>
    <div className="features-section">
      <h2>What Can You Do?</h2>
      <table className="features-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Upload Your Resume</strong>
            </td>
            <td>
              Upload a PDF version of your resume to analyze its content and
              structure.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Job Description Analysis</strong>
            </td>
            <td>
              Provide a job description, and we'll assess how well your resume
              aligns with the job requirements.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Personalized Feedback</strong>
            </td>
            <td>
              Receive actionable feedback to improve your resume and increase
              your chances of success.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Downloadable Reports</strong>
            </td>
            <td>
              Generate a detailed PDF report with insights, matched keywords,
              and improvement suggestions.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('access_token');
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              Resume Analyzer
            </Link>
            <ul className="navbar-menu">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/resume-upload">Resume Upload</Link>
                  </li>
                  <li>
                    <Link to="/current-data">Data</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="navbar-button">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="navbar-button">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="navbar-button">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/resume-upload"
              element={isLoggedIn ? <ResumeUpload /> : <Navigate to="/login" />}
            />
            <Route
              path="/current-data"
              element={isLoggedIn ? <CurrentData /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
