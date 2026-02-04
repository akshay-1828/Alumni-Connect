import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2.jsx";
import "../styles/applications.css";
import { getUserApplications } from "../api/internshipApi";

function Applications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function loadApplications() {
      if (!user) return;
      
      try {
        const response = await getUserApplications(user.id);
        const data = response.data;
        if (data.success) {
          setApplications(data.applications);
        }
      } catch (err) {
        console.error("Error loading applications:", err);
      }
    }
    loadApplications();
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="applications-container">
        <h1 className="app-title">My Applications</h1>
        <p className="app-subtitle">Track all internships you applied for</p>

        <div className="app-list">
          {applications.map((app) => (
            <div className="app-card" key={app.id}>
              <div>
                <h3 className="app-job">{app.title}</h3>
                <p className="app-company">
                  {app.company}
                </p>
                <p className="app-date">Applied on: {new Date(app.applied_at).toLocaleDateString()}</p>
              </div>

              <span
                className={`status-badge ${
                  app.status === "pending"
                    ? "status-applied"
                    : app.status === "accepted"
                    ? "status-accepted"
                    : "status-rejected"
                }`}
              >
                {app.status}
              </span>
            </div>
          ))}
          
          {applications.length === 0 && (
            <p>You haven't applied for any internships yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Applications;
