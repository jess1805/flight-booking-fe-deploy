import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import type { Role } from "../types";

interface RoleGatedRouteProps {
  allowedRoles: Role[];
}

export function RoleGatedRoute({ allowedRoles }: RoleGatedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-500">Checking your session…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // wrong role redirect
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
