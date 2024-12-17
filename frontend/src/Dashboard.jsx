import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import jsPDF from "jspdf";
import LoadingSpinner from "./LoadingSpinner";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const token = localStorage.getItem("access_token");

  console.log("Token in Dashboard:", token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // States
  const [fitScore, setFitScore] = useState(null);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [unmatchedSkills, setUnmatchedSkills] = useState([]);
  const [improvementSuggestions, setImprovementSuggestions] = useState({
    skills: [],
    experience: [],
  });
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch current data
  useEffect(() => {
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
          throw new Error(
            "Incomplete analysis data. Resume or Job Description is missing."
          );
        }

        setResumeText(data.resume);
        setJobDescription(data.job_description);
      } catch (error) {
        console.error("Error fetching current data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentData();
  }, [token]);

  // Fetch analysis data
  useEffect(() => {
    if (resumeText && jobDescription) {
      const fetchAnalysisData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            "http://localhost:8000/api/calculate-fit",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                resume_text: resumeText,
                job_description: jobDescription,
              }),
            }
          );

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
        } catch (error) {
          console.error("Error fetching analysis data:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAnalysisData();
    }
  }, [resumeText, jobDescription, token]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10; // Space between lines
    const marginTop = 10;
    let cursorY = marginTop;
  
    const addText = (text) => {
      if (cursorY + lineHeight > pageHeight - marginTop) {
        doc.addPage(); // Add a new page
        cursorY = marginTop; // Reset cursor to top
      }
      doc.text(text, 10, cursorY);
      cursorY += lineHeight; // Move cursor down
    };
  
    // Title
    doc.setFontSize(16);
    addText("Resume Analysis Report");
  
    // Fit Score
    doc.setFontSize(12);
    addText(`Fit Score: ${fitScore !== null ? `${fitScore}%` : "N/A"}`);
  
    // Matched Keywords
    doc.setFontSize(14);
    addText("Matched Keywords:");
    doc.setFontSize(12);
    matchedSkills.forEach((skill) => addText(`- ${skill}`));
  
    // Improvement Suggestions
    addText("Improvement Suggestions:");
    const allFeedback = [
      ...improvementSuggestions.skills,
      ...improvementSuggestions.experience,
    ];
    allFeedback.forEach((item) => addText(`- ${item}`));
  
    // Save the PDF
    doc.save("Resume_Analysis_Report.pdf");
  };
  

  // Filter feedback
  const changeFeedback = (e) => {
    setSelectedCategory(e.target.value);
  };

  const renderFeedback = () => {
    let categoryFeedback = [];
    if (selectedCategory === "skills") {
      categoryFeedback = improvementSuggestions.skills;
    } else if (selectedCategory === "experience") {
      categoryFeedback = improvementSuggestions.experience;
    } else {
      categoryFeedback = [
        ...improvementSuggestions.skills,
        ...improvementSuggestions.experience,
      ];
    }

    return categoryFeedback.map((item, index) => (
      <li className="feedback" key={index}>
        {item}
      </li>
    ));
  };

  // // Loading state
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  const pieData = {
    labels: ["Fit Score", "Remaining"],
    datasets: [
      {
        data: [fitScore, 100 - fitScore],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        hoverBackgroundColor: ["#66bb6a", "#f5f5f5"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Resume Analysis Dashboard</h1>
      {loading && <LoadingSpinner />}

      {/* Fit Score Visualization */}
      <section className="dashboard-section">
        <h2>Resume Fit Score</h2>
        <Pie data={pieData} />
        <p>{fitScore !== null ? `Fit Score: ${fitScore}%` : "Data not available"}</p>
      </section>

      {/* Matched Skills Dropdown */}
      <section className="dashboard-section">
        <h2>Matched Skills</h2>
        <details className="dropdown">
          <summary>View Matched Skills</summary>
          <ul className="list">
            {matchedSkills.map((skill, index) => (
              <li key={index} className="list-item">
                {skill}
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* Unmatched Skills
      <section className="dashboard-section">
        <h2>Skills and Keywords Not Matched</h2>
        <ul className="list">
          {unmatchedSkills.length > 0 ? (
            unmatchedSkills.map((skill, index) => (
              <li key={index} className="list-item">
                {skill}
              </li>
            ))
          ) : (
            <li>No unmatched skills</li>
          )}
        </ul>
      </section> */}

      {/* Improvement Suggestions */}
      <section className="dashboard-section">
        <h2>Improvement Suggestions</h2>
        <label htmlFor="filter">Filter Feedback by Category: </label>
        <select id="filter" value={selectedCategory} onChange={changeFeedback}>
          <option value="all">All</option>
          <option value="skills">Skills</option>
          <option value="experience">Experience</option>
        </select>
        <ul>{renderFeedback()}</ul>
      </section>

      <button onClick={generatePDF} className="download-btn">
        Download PDF Report
      </button>
    </div>
  );
};

export default Dashboard;
