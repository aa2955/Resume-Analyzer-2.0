import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./App.css";

const Dashboard = () => {
  const token = localStorage.getItem("access_token");

  // State variables
  const [fitScore, setFitScore] = useState(null);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [unmatchedSkills, setUnmatchedSkills] = useState([]);
  const [improvementSuggestions, setImprovementSuggestions] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch existing data (resume & job description)
  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCurrentData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/current-data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch current analysis data");
        }

        const data = await response.json();
        if (data.status === "incomplete") {
          throw new Error("Incomplete analysis data. Resume or Job Description is missing.");
        }

        setResumeText(data.resume);
        setJobDescription(data.job_description);
      } catch (err) {
        console.error("Error fetching current data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentData();
  }, [token]);

  // Fetch analysis data when resume & job description are available
  useEffect(() => {
    if (resumeText && jobDescription) {
      const fetchAnalysisData = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:8000/api/calculate-fit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              resume_text: resumeText,
              job_description: jobDescription,
            }),
          });

          if (!response.ok) {
            const errorDetails = await response.text();
            console.error("Backend Error Details:", errorDetails);
            throw new Error("Failed to fetch analysis data");
          }

          const data = await response.json();
          setFitScore(data.fit_score);
          setMatchedSkills(data.matched_keywords);
          setUnmatchedSkills(data.unmatched_keywords);
          setImprovementSuggestions(data.feedback);
        } catch (err) {
          console.error("Error fetching analysis data:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAnalysisData();
    }
  }, [resumeText, jobDescription, token]);

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Redirect to login if no token is found
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Filter feedback based on selected category
  const filteredFeedback = improvementSuggestions.filter((item) =>
    selectedCategory === "all" ? true : item.category === selectedCategory
  );

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Resume Analysis Report", 10, 10);

    doc.setFontSize(12);
    doc.text(`Fit Score: ${fitScore || "N/A"}%`, 10, 30);

    doc.setFontSize(14);
    doc.text("Matched Keywords:", 10, 50);
    matchedSkills.forEach((skill, index) => {
      doc.text(`- ${skill}`, 10, 60 + index * 10);
    });

    doc.text("Improvement Suggestions:", 10, 80 + matchedSkills.length * 10);
    filteredFeedback.forEach((item, index) => {
      doc.text(`- ${item.text}`, 10, 90 + matchedSkills.length * 10 + index * 10);
    });

    doc.save("Resume_Analysis_Report.pdf");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Resume Analysis Dashboard</h1>

      {/* Resume Fit Score */}
      <section className="dashboard-section">
        <h2>Resume Fit Score</h2>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${fitScore || 0}%` }}></div>
        </div>
        <p>{fitScore !== null ? `${fitScore}%` : "Data not available"}</p>
      </section>

      {/* Matched Skills */}
      <section className="dashboard-section">
        <h2>Skills and Keywords Matched</h2>
        <ul className="list">
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill, index) => (
              <li key={index} className="list-item">{skill}</li>
            ))
          ) : (
            <li>No matched skills</li>
          )}
        </ul>
      </section>

      {/* Unmatched Skills */}
      <section className="dashboard-section">
        <h2>Skills and Keywords Not Matched</h2>
        <ul className="list">
          {unmatchedSkills.length > 0 ? (
            unmatchedSkills.map((skill, index) => (
              <li key={index} className="list-item">{skill}</li>
            ))
          ) : (
            <li>No unmatched skills</li>
          )}
        </ul>
      </section>

      {/* Improvement Suggestions */}
      <section className="dashboard-section">
        <h2>Improvement Suggestions</h2>
        <label htmlFor="filter">Filter Feedback by Category: </label>
        <select
          id="filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="skills">Skills</option>
          <option value="experience">Experience</option>
          <option value="formatting">Formatting</option>
        </select>
        <ul className="list">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((item, index) => (
              <li key={index} className="list-item">{item.text}</li>
            ))
          ) : (
            <li>No suggestions available</li>
          )}
        </ul>
      </section>

      {/* Download PDF Button */}
      <button onClick={generatePDF} className="download-btn">
        Download PDF Report
      </button>
    </div>
  );
};

export default Dashboard;
