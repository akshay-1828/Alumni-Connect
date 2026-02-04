import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2.jsx";
import "../styles/mentors.css";
import { getMentors, sendMentorshipRequest } from "../api/mentorApi";

function Mentors() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  useEffect(() => {
    async function loadMentors() {
      try {
        const response = await getMentors();
        const data = response.data;
        if (data.success) {
          setMentors(data.mentors);
        }
      } catch (err) {
        console.error("Error loading mentors:", err);
      }
    }
    loadMentors();
  }, []);

  async function connectWithMentor(mentorId) {
    if (!user) {
      alert("Please log in first");
      return;
    }
    
    try {
      const requestData = {
        student_id: user.id,
        alumni_id: mentorId,
        message: "I would like to connect with you for mentorship."
      };
      
      const response = await sendMentorshipRequest(requestData);
      const data = response.data;
      
      if (data.success) {
        alert("Mentorship request sent successfully!");
      } else {
        alert("Error sending request: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error sending mentorship request:", err);
      alert("Error sending mentorship request");
    }
  }

  // Filter mentors based on search criteria
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = !searchTerm || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.skills && mentor.skills.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mentor.company && mentor.company.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesExperience = !experienceFilter || 
      (mentor.experience && mentor.experience.includes(experienceFilter));
      
    const matchesCompany = !companyFilter || 
      (mentor.company && mentor.company.includes(companyFilter));
      
    return matchesSearch && matchesExperience && matchesCompany;
  });

  return (
    <>
      <Navbar />

      <div className="mentors-container">

        {/* Header */}
        <h1 className="mentors-title">Find Your Mentor</h1>
        <p className="mentors-subtitle">Connect with experienced alumni for guidance & career support.</p>

        {/* Search Bar */}
        <div className="search-filter-box">
          <input
            type="text"
            placeholder="Search alumni by name, skill, or company..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select 
            className="filter-select"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="">Filter by Experience</option>
            <option value="1-3">1–3 years</option>
            <option value="3-5">3–5 years</option>
            <option value="5+">5+ years</option>
          </select>

          <select 
            className="filter-select"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="">Filter by Company</option>
            <option>Infosys</option>
            <option>TCS</option>
            <option>Wipro</option>
            <option>Accenture</option>
          </select>
        </div>

        {/* Mentor Cards Grid */}
        <div className="mentors-grid">
          {filteredMentors.map(mentor => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-avatar">
                {mentor.name.charAt(0).toUpperCase()}
              </div>

              <h3 className="mentor-name">{mentor.name}</h3>
              <p className="mentor-role">{mentor.position} @ {mentor.company}</p>

              <div className="mentor-skills">
                {mentor.skills && mentor.skills.split(',').map((skill, index) => (
                  <span key={index}>{skill.trim()}</span>
                ))}
              </div>

              <p className="experience-text">{mentor.experience}+ years experience</p>

              <div className="mentor-actions">
                <button 
                  className="connect-btn"
                  onClick={() => connectWithMentor(mentor.id)}
                >
                  Connect
                </button>
                <a href="#" className="linkedin-btn">LinkedIn</a>
              </div>
            </div>
          ))}

          {filteredMentors.length === 0 && (
            <p>No mentors found matching your criteria.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Mentors;
