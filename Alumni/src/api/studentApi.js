import API from "./api";

export const createStudent = (data) =>
  API.post("/students", data);

export const getStudentByUserId = (userId) =>
  API.get(`/students/user/${userId}`);
