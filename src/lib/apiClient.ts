import axios from "axios";

// Backend base URL — adjust in .env if different
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1",
});

// Dual auth: admin (Manager/Staff) and passenger use separate JWTs.
// We only ever have one active session at a time in this app, so we
// store which "audience" the current token belongs to alongside it.
export type AuthAudience = "ADMIN" | "PASSENGER";

export function setAuthSession(token: string, audience: AuthAudience) {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_audience", audience);
}

export function clearAuthSession() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_audience");
}

export function getAuthAudience(): AuthAudience | null {
  return localStorage.getItem("auth_audience") as AuthAudience | null;
}

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthSession();
    }
    return Promise.reject(error);
  }
);
