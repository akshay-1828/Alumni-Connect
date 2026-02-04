import API from "./api";

export const getInternships = () => API.get("/internships");
export const postInternship = (data) => API.post("/internships", data);
export const applyForInternship = (data) => API.post("/applications", data);
export const getUserApplications = (userId) => API.get(`/applications/${userId}`);