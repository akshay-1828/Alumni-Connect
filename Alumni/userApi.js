import API from "./api";

export const registerUser = (data) =>
  API.post("/user/register", data);

export const loginUser = (data) =>
  API.post("/user/login", data);
