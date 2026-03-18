import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTasks = (params) =>
  apiClient.get("/tasks", { params });

export const createTask = (data) =>
  apiClient.post("/tasks", data);

export const updateTask = (id, data) =>
  apiClient.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  apiClient.delete(`/tasks/${id}`);

export default apiClient;
