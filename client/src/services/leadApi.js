import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("leadflow_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      localStorage.getItem("leadflow_token")
    ) {
      localStorage.removeItem("leadflow_token");
      localStorage.removeItem("leadflow_admin");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const createLead = (leadData) =>
  API.post("/leads", leadData);

export const getLeads = (search = "") =>
  API.get("/leads", {
    params: {
      search,
    },
  });

export const updateLeadStatus = (id, status) =>
  API.patch(`/leads/${id}/status`, {
    status,
  });

export const loginAdmin = (credentials) =>
  API.post("/auth/login", credentials);

export default API;