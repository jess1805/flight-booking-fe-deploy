import { useAuth } from "./context/AuthContext";
import { Mail, ShieldCheck, LogOut, Heart, User } from "lucide-react";
import { TwoToneHeading } from "../../components/TwoToneHeading";

export function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-sm text-center">
        <TwoToneHeading first="My" second="Profile" className="text-3xl font-bold" />
        <p className="mt-3 text-slate-400">Manage your account details and preferences</p>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
          {/* Avatar */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600">
              <User size={30} className="text-white" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 text-left">
            <div className="flex items-center gap-3 border-b border-slate-200 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                <Mail size={18} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold text-slate-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                <ShieldCheck size={18} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p className="font-semibold text-slate-900">{user.role}</p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>

        {/* Footer line */}
        <div className="mt-8 flex items-center justify-center gap-2 text-teal-500">
          <Heart size={16} className="fill-teal-500" />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Thank you for choosing SkyRoute.</p>
            <p className="text-sm text-slate-400">We wish you a safe and comfortable journey!</p>
          </div>
        </div>
      </div>
    </div>
  );
}