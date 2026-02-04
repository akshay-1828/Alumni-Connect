import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mentors from "./pages/Mentors";
import Internships from "./pages/Internships";
import Messages from "./pages/Messages";
import MentorshipRequests from "./pages/MentorshipRequests";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import PostInternship from "./pages/PostInternship";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/post-internship" element={<PostInternship />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/mentorship" element={<MentorshipRequests />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
