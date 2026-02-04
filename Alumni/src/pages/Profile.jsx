import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { getProfile, saveProfile } from "../api/profileApi";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    userId: user?.id || "",
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    skills: "",
    bio: "",
    company: "",
    position: "",
    experience: "",
    course: "",
    interests: ""
  });

  useEffect(() => {
    async function loadProfile() {
      if (user?.id) {
        try {
          const response = await getProfile(user.id);
          const data = response.data;
          if (data.success && data.profile) {
            setForm({
              ...form,
              ...data.profile
            });
          }
        } catch (err) {
          console.error("Error loading profile:", err);
        }
      }
    }
    loadProfile();
  }, [user]);

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await saveProfile(form);
      const data = response.data;
      
      if (data.success) {
        alert("Profile Updated!");
      } else {
        alert("Error saving profile: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error saving profile");
    }
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      <form onSubmit={handleSubmit}>
        {/* Common Fields */}
        <textarea
          name="skills"
          placeholder="Your skills (e.g., Java, React, SQL)"
          value={form.skills}
          onChange={updateForm}
          required
        />

        <textarea
          name="bio"
          placeholder="Write a short bio"
          value={form.bio}
          onChange={updateForm}
        />

        {/* Student Fields */}
        {user?.role === "student" && (
          <>
            <input
              name="course"
              placeholder="Course (e.g., BCA, B.Tech)"
              value={form.course}
              onChange={updateForm}
            />

            <textarea
              name="interests"
              placeholder="Your interests (AI, Web Dev, ML...)"
              value={form.interests}
              onChange={updateForm}
            />
          </>
        )}

        {/* Alumni Fields */}
        {user?.role === "alumni" && (
          <>
            <input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={updateForm}
            />

            <input
              name="position"
              placeholder="Job Position"
              value={form.position}
              onChange={updateForm}
            />

            <input
              name="experience"
              placeholder="Experience (Years)"
              value={form.experience}
              onChange={updateForm}
            />
          </>
        )}

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;
