import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-500">Checking your session…</div>;
  }

  if (!user) {
    // send them to login, remembering where they were headed
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
