import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2.jsx";
import "../styles/internships.css";
import { getInternships, applyForInternship } from "../api/internshipApi";

function InternshipList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    async function loadInternships() {
      try {
        const response = await getInternships();
        const data = response.data;
        if (data.success) {
          setInternships(data.internships);
        }
      } catch (err) {
        console.error("Error loading internships:", err);
      }
    }
    loadInternships();
  }, []);

  async function applyForPosition(internshipId) {
    if (!user) {
      alert("Please log in first");
      return;
    }
    
    try {
      const applicationData = {
        internship_id: internshipId,
        student_id: user.id
      };
      
      const response = await applyForInternship(applicationData);
      const data = response.data;
      
      if (data.success) {
        alert("Application submitted successfully!");
      } else {
        alert("Error submitting application: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error applying for internship:", err);
      alert("Error submitting application");
    }
  }

  return (
    <>
      <Navbar />

      <div className="internships-container">

        {/* Header */}
        <h1 className="internships-title">Internship Opportunities</h1>
        <p className="internships-subtitle">
          Explore internships posted by alumni and boost your career!
        </p>

        {/* Internship Cards Grid */}
        <div className="internship-grid">
          {internships.map(internship => (
            <div key={internship.id} className="internship-card">
              <div className="intern-top">
                <span className="company-badge">{internship.company}</span>
                <span className="deadline-badge">Posted by: {internship.postedByName}</span>
              </div>

              <h3 className="intern-title">{internship.title}</h3>

              <p className="intern-description">
                {internship.description}
              </p>

              {internship.requirements && (
                <p className="intern-requirements">
                  Requirements: {internship.requirements}
                </p>
              )}

              <div className="intern-actions">
                <button 
                  className="apply-btn"
                  onClick={() => applyForPosition(internship.id)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}

          {internships.length === 0 && (
            <p>No internships available at the moment.</p>
          )}
        </div>

      </div>
    </>
  );
}

export default InternshipList;
