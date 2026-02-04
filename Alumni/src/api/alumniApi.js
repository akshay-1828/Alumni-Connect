import API from "./api";

export const createAlumni = (data) =>
  API.post("/alumni", data);

export const getAlumniByUserId = (userId) =>
  API.get(`/alumni/user/${userId}`);
