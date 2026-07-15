import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiClient, setAuthSession, clearAuthSession, getAuthAudience } from "../../../lib/apiClient";
import type { User } from "../../../types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  loginAdmin: (email: string, password: string) => Promise<void>;
  loginPassenger: (email: string, password: string) => Promise<void>;
  registerAdmin: (email: string, password: string, role: "MANAGER" | "STAFF") => Promise<void>;
  registerPassenger: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthResponse {
  data: {
    token: string;
  };
}

interface ProfileResponse {
  data: User;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProfile(audience: "ADMIN" | "PASSENGER") {
    const path = audience === "ADMIN" ? "/admin/profile" : "/passengers/profile";
    const res = await apiClient.get<ProfileResponse>(path);
    setUser(res.data.data);
  }

  // Restore session on load if a token is already stored.
  useEffect(() => {
    const audience = getAuthAudience();
    const token = localStorage.getItem("auth_token");
    if (!token || !audience) {
      setIsLoading(false);
      return;
    }

    fetchProfile(audience)
      .catch(() => clearAuthSession())
      .finally(() => setIsLoading(false));
  }, []);

  async function loginAdmin(email: string, password: string) {
    const res = await apiClient.post<AuthResponse>("/admin/login", { email, password });
    setAuthSession(res.data.data.token, "ADMIN");
    await fetchProfile("ADMIN");
  }

  async function loginPassenger(email: string, password: string) {
    const res = await apiClient.post<AuthResponse>("/passengers/login", { email, password });
    setAuthSession(res.data.data.token, "PASSENGER");
    await fetchProfile("PASSENGER");
  }

  async function registerAdmin(email: string, password: string, role: "MANAGER" | "STAFF") {
    const res = await apiClient.post<AuthResponse>("/admin/register", { email, password, role });
    setAuthSession(res.data.data.token, "ADMIN");
    await fetchProfile("ADMIN");
  }

  async function registerPassenger(name: string, email: string, password: string) {
    const res = await apiClient.post<AuthResponse>("/passengers/register", {
      name,
      email,
      password,
    });
    setAuthSession(res.data.data.token, "PASSENGER");
    await fetchProfile("PASSENGER");
  }

  function logout() {
    clearAuthSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, loginAdmin, loginPassenger, registerAdmin, registerPassenger, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
