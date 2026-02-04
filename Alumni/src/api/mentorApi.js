import API from "./api";

export const getMentors = () => API.get("/mentors");
export const sendMentorshipRequest = (data) => API.post("/mentorship-requests", data);
export const getMentorshipRequests = (userId) => API.get(`/mentorship-requests/${userId}`);
export const updateMentorshipRequest = (id, data) => API.put(`/mentorship-requests/${id}`, data);