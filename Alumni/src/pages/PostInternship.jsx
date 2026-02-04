import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar2.jsx";
import "../styles/internships.css";
import { postInternship } from "../api/internshipApi";

function PostInternship() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [formData, setFormData] = useState({
    title: "",
    company: user?.company || "",
    description: "",
    requirements: "",
    posted_by: user?.id || ""
  });

  function updateForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await postInternship(formData);
      const data = response.data;
      
      if (data.success) {
        alert("Internship posted successfully!");
        navigate("/internships");
      } else {
        alert("Error posting internship: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error posting internship:", err);
      alert("Error posting internship");
    }
  }

  return (
    <>
      <Navbar />

      <div className="internships-container">
        <h1 className="internships-title">Post New Internship</h1>
        <p className="internships-subtitle">
          Share opportunities with students in our alumni network
        </p>

        <form onSubmit={handleSubmit} className="internship-form">
          <div className="form-group">
            <label htmlFor="title">Internship Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Software Developer Intern"
              value={formData.title}
              onChange={updateForm}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="e.g., Google, Microsoft"
              value={formData.company}
              onChange={updateForm}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the internship opportunity, responsibilities, etc."
              value={formData.description}
              onChange={updateForm}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              placeholder="List required skills, qualifications, experience, etc."
              value={formData.requirements}
              onChange={updateForm}
              rows="3"
            />
          </div>

          <button type="submit" className="apply-btn">
            Post Internship
          </button>
        </form>
      </div>
    </>
  );
}

export default PostInternship;