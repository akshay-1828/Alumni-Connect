import API from "./api";

export const sendMessage = (data) => API.post("/messages", data);
export const getMessages = (userId1, userId2) => API.get(`/messages/${userId1}/${userId2}`);