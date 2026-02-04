import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2.jsx";
import "../styles/mentorship.css";
import { getMentorshipRequests, updateMentorshipRequest } from "../api/mentorApi";

function MentorshipRequests() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function loadRequests() {
      if (!user) return;
      
      try {
        const response = await getMentorshipRequests(user.id);
        const data = response.data;
        if (data.success) {
          setRequests(data.requests);
        }
      } catch (err) {
        console.error("Error loading requests:", err);
      }
    }
    loadRequests();
  }, [user]);

  async function handleRequestAction(requestId, status) {
    try {
      const response = await updateMentorshipRequest(requestId, { status });
      const data = response.data;
      
      if (data.success) {
        // Update the request status in the local state
        setRequests(requests.map(req => 
          req.id === requestId ? { ...req, status } : req
        ));
        alert(`Request ${status} successfully!`);
      } else {
        alert(`Error updating request: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error updating request:", err);
      alert("Error updating request");
    }
  }

  // Separate requests based on user role
  const studentRequests = requests.filter(req => req.student_id === user?.id);
  const alumniRequests = requests.filter(req => req.alumni_id === user?.id);

  return (
    <>
      <Navbar />

      <div className="mentor-req-container">
        
        {/* Title */}
        <h1 className="req-title">Mentorship Requests</h1>
        <p className="req-sub">Manage mentorship requests between students and alumni.</p>

        {/* Requests List */}
        <div className="req-list">
          {/* Student Requests */}
          {studentRequests.length > 0 && (
            <>
              <h2>Your Requests</h2>
              {studentRequests.map(request => (
                <div key={request.id} className="req-card">
                  <div className="req-info">
                    <h3>Requested Mentor: <span>{request.alumniName}</span></h3>
                    <p className="req-date">Requested on: {new Date(request.requested_at).toLocaleDateString()}</p>
                    <p className="req-msg">
                      Message: {request.message}
                    </p>
                  </div>

                  <div className={`req-status status-${request.status}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Alumni Requests */}
          {alumniRequests.length > 0 && (
            <>
              <h2>Requests to You</h2>
              {alumniRequests.map(request => (
                <div key={request.id} className="req-card">
                  <div className="req-info">
                    <h3>Student: <span>{request.studentName}</span></h3>
                    <p className="req-date">Requested on: {new Date(request.requested_at).toLocaleDateString()}</p>
                    <p className="req-msg">
                      Message: {request.message}
                    </p>
                  </div>

                  {request.status === 'pending' ? (
                    <div className="req-actions">
                      <button 
                        className="approve-btn"
                        onClick={() => handleRequestAction(request.id, 'accepted')}
                      >
                        Approve
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleRequestAction(request.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className={`req-status status-${request.status}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {requests.length === 0 && (
            <p>No mentorship requests found.</p>
          )}
        </div>

      </div>
    </>
  );
}

export default MentorshipRequests;
