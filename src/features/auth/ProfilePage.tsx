import { useAuth } from "./context/AuthContext";

export function ProfilePage() {
  const { user, logout } = useAuth();
  

  if (!user) return null;

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Profile</h1>
      <div className="rounded-lg border border-slate-200 p-4 text-sm">
        <p className="text-slate-500">Email</p>
        <p className="mb-3 font-medium text-slate-900">{user.email}</p>
        <p className="text-slate-500">Role</p>
        <p className="font-medium text-slate-900">{user.role}</p>
      </div>
      <button
        onClick={logout}
        className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
      >
        Log out
      </button>
    </div>
  );
}
