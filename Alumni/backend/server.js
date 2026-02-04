const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend access

// ----------------------- DATABASE CONNECTION -----------------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "akshay@282005",
  database: "alumni_db"
});

db.connect(err => {
  if (err) {
    console.log("❌ Database Connection Error:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ----------------------- REGISTER API -----------------------
app.post("/register", (req, res) => {
  const { name, email, phone, role, password } = req.body;

  const query = "INSERT INTO user (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, email, phone, role, password], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, message: "User Registered Successfully" });
  });
});

// ----------------------- LOGIN API -----------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }

    if (result.length > 0) {
      return res.json({ success: true, user: result[0] });
    } else {
      return res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

// SAVE OR UPDATE PROFILE
app.post("/profile", (req, res) => {
  const { userId, fullName, email, phone, bio, skills, experience, company, position, course, interests } = req.body;
  
  // Check if profile exists
  const checkQuery = "SELECT * FROM profile WHERE userId = ?";
  db.query(checkQuery, [userId], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    
    if (result.length > 0) {
      // Update existing profile
      const updateQuery = "UPDATE profile SET fullName = ?, email = ?, phone = ?, bio = ?, skills = ?, experience = ?, company = ?, position = ?, course = ?, interests = ? WHERE userId = ?";
      db.query(updateQuery, [fullName, email, phone, bio, skills, experience, company, position, course, interests, userId], (err, result) => {
        if (err) {
          return res.json({ success: false, message: err.message });
        }
        return res.json({ success: true, message: "Profile updated successfully" });
      });
    } else {
      // Create new profile
      const insertQuery = "INSERT INTO profile (userId, fullName, email, phone, bio, skills, experience, company, position, course, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(insertQuery, [userId, fullName, email, phone, bio, skills, experience, company, position, course, interests], (err, result) => {
        if (err) {
          return res.json({ success: false, message: err.message });
        }
        return res.json({ success: true, message: "Profile created successfully" });
      });
    }
  });
});

// GET PROFILE BY USER ID
app.get("/profile/:userId", (req, res) => {
  const query = "SELECT * FROM profile WHERE userId = ?";
  db.query(query, [req.params.userId], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    
    if (result.length > 0) {
      return res.json({ success: true, profile: result[0] });
    } else {
      return res.json({ success: false, message: "Profile not found" });
    }
  });
});

// GET ALL ALUMNI FOR MENTORS PAGE
app.get("/mentors", (req, res) => {
  const query = "SELECT u.id, u.name, u.email, p.company, p.position, p.skills, p.experience FROM user u JOIN profile p ON u.id = p.userId WHERE u.role = 'alumni'";
  db.query(query, (err, results) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, mentors: results });
  });
});

// GET ALL INTERNSHIPS
app.get("/internships", (req, res) => {
  const query = "SELECT i.*, u.name as postedByName FROM internships i JOIN user u ON i.posted_by = u.id";
  db.query(query, (err, results) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, internships: results });
  });
});

// CREATE NEW INTERNSHIP (ALUMNI POSTING)
app.post("/internships", (req, res) => {
  const { title, company, description, requirements, posted_by } = req.body;
  
  const query = "INSERT INTO internships (title, company, description, requirements, posted_by) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [title, company, description, requirements, posted_by], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, message: "Internship posted successfully", internshipId: result.insertId });
  });
});

// APPLY FOR INTERNSHIP
app.post("/applications", (req, res) => {
  const { internship_id, student_id } = req.body;
  
  const query = "INSERT INTO applications (internship_id, student_id) VALUES (?, ?)";
  db.query(query, [internship_id, student_id], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, message: "Application submitted successfully" });
  });
});

// GET APPLICATIONS FOR A USER
app.get("/applications/:userId", (req, res) => {
  const query = "SELECT a.*, i.title, i.company FROM applications a JOIN internships i ON a.internship_id = i.id WHERE a.student_id = ?";
  db.query(query, [req.params.userId], (err, results) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, applications: results });
  });
});

// SEND MENTORSHIP REQUEST
app.post("/mentorship-requests", (req, res) => {
  const { student_id, alumni_id, message } = req.body;
  
  const query = "INSERT INTO mentorship_requests (student_id, alumni_id, message) VALUES (?, ?, ?)";
  db.query(query, [student_id, alumni_id, message], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, message: "Mentorship request sent successfully" });
  });
});

// GET MENTORSHIP REQUESTS FOR A USER
app.get("/mentorship-requests/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT mr.*, u1.name as studentName, u2.name as alumniName 
                 FROM mentorship_requests mr 
                 JOIN user u1 ON mr.student_id = u1.id 
                 JOIN user u2 ON mr.alumni_id = u2.id 
                 WHERE mr.student_id = ? OR mr.alumni_id = ?`;
  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, requests: results });
  });
});

// UPDATE MENTORSHIP REQUEST STATUS
app.put("/mentorship-requests/:id", (req, res) => {
  const { status } = req.body;
  
  const query = "UPDATE mentorship_requests SET status = ? WHERE id = ?";
  db.query(query, [status, req.params.id], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, message: `Request ${status} successfully` });
  });
});

// SEND MESSAGE
app.post("/messages", (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  
  const query = "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)";
  db.query(query, [sender_id, receiver_id, content], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, message: "Message sent successfully" });
  });
});

// GET MESSAGES BETWEEN TWO USERS
app.get("/messages/:userId1/:userId2", (req, res) => {
  const query = `SELECT m.*, u1.name as senderName, u2.name as receiverName 
                 FROM messages m 
                 JOIN user u1 ON m.sender_id = u1.id 
                 JOIN user u2 ON m.receiver_id = u2.id 
                 WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?) 
                 ORDER BY m.sent_at ASC`;
  db.query(query, [req.params.userId1, req.params.userId2, req.params.userId2, req.params.userId1], (err, results) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, messages: results });
  });
});

// ----------------------- SERVER START -----------------------
app.listen(3001, () => {
  console.log("🚀 Backend running on http://localhost:3001");
});
