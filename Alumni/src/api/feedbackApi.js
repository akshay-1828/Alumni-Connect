import API from "./api";

export const submitFeedback = (data) =>
  API.post("/feedback", data);

export const getFeedbackForMentor = (mentorId) =>
  API.get(`/feedback/mentor/${mentorId}`);
