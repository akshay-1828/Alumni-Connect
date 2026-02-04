import API from "./api";

export const saveProfile = (data) => API.post("/profile", data);
export const getProfile = (userId) => API.get(`/profile/${userId}`);