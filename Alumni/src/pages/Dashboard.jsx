import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar2.jsx";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load logged-in user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/"); // redirect to login if not logged in
      return;
    }

    // 🔥 FIX: Normalize role to lowercase
    storedUser.role = storedUser.role.toLowerCase();

    setUser(storedUser);
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div className="dash-container">

        {/* Welcome Banner */}
        <div className="welcome-card">
          <h2>Welcome back, {user.name} 👋</h2>
          <p>Your learning and career journey continues today.</p>
        </div>

        {/* Quick Action Cards */}
        <div className="quick-grid">

          {/* STUDENT OPTIONS */}
          {user.role === "student" && (
            <>
              <div className="quick-card" onClick={() => navigate("/mentors")}>
                <h3>Find Mentors</h3>
                <p>Connect with experienced alumni</p>
              </div>

              <div className="quick-card" onClick={() => navigate("/internships")}>
                <h3>Internships</h3>
                <p>Find opportunities posted by alumni</p>
              </div>

              <div className="quick-card" onClick={() => navigate("/mentorship")}>
                <h3>Mentorship Requests</h3>
                <p>Track your requests & progress</p>
              </div>

              <div className="quick-card" onClick={() => navigate("/messages")}>
                <h3>Messages</h3>
                <p>Chat with your mentor/student</p>
              </div>

              <div className="quick-card" onClick={() => navigate("/applications")}>
                <h3>My Applications</h3>
                <p>Internships you applied for</p>
              </div>
            </>
          )}

          {/* ALUMNI OPTIONS */}
          {user.role === "alumni" && (
            <>
              <div className="quick-card" onClick={() => navigate("/post-internship")}>
                <h3>Post Internship</h3>
                <p>Help students get opportunities</p>
              </div>

              <div className="quick-card" onClick={() => navigate("/mentorship")}>
                <h3>Mentor Students</h3>
                <p>Guide juniors and share knowledge</p>
              </div>

              <div className="quick-card" onClick={() => navigate("/messages")}>
                <h3>Messages</h3>
                <p>Connect with students</p>
              </div>
            </>
          )}

        </div>

        {/* Two-Column Section */}
        <div className="two-col">

          {/* Suggested Mentors */}
          <div className="col-card">
            <h3 className="col-title">Suggested Mentors</h3>

            <div className="mentor-mini-card">
              <div className="mentor-avatar-sm">R</div>
              <div>
                <h4>Rohit Kumar</h4>
                <p>Software Engineer @ Infosys</p>
              </div>
            </div>

            <div className="mentor-mini-card">
              <div className="mentor-avatar-sm">S</div>
              <div>
                <h4>Sunil</h4>
                <p>Backend Developer @ TCS</p>
              </div>
            </div>

            <button className="view-all-btn" onClick={() => navigate("/mentors")}>
              View All Mentors →
            </button>
          </div>

          {/* Latest Internships */}
          <div className="col-card">
            <h3 className="col-title">Latest Internships</h3>

            <div className="intern-mini-card">
              <h4>Java Developer Intern</h4>
              <p>Infosys • Bangalore</p>
            </div>

            <div className="intern-mini-card">
              <h4>React Frontend Intern</h4>
              <p>TCS • Remote</p>
            </div>

            <button className="view-all-btn" onClick={() => navigate("/internships")}>
              Explore Internships →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
