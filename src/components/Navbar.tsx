import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const links = !user
    ? [{ to: "/", label: "Search flights" }]
    : user.role === "PASSENGER"
    ? [
        { to: "/", label: "Search flights" },
        { to: "/bookings", label: "My bookings" },
        { to: "/profile", label: "Profile" },
      ]
    : [
        { to: "/admin", label: "Dashboard" },
        { to: "/admin/chatbot", label: "Feedback assistant" },
        { to: "/profile", label: "Profile" },
      ];

  return (
    <nav className="border-b border-slate-200">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-semibold text-slate-900">
          FlightBooker
        </Link>

        <div className="hidden items-center gap-4 sm:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm text-slate-600 hover:text-slate-900">
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="text-sm text-slate-600 hover:text-slate-900">
              Log out
            </button>
          ) : (
            <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900">
              Log in
            </Link>
          )}
        </div>

        <button
          className="sm:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block h-0.5 w-5 bg-slate-900" />
          <span className="mt-1 block h-0.5 w-5 bg-slate-900" />
          <span className="mt-1 block h-0.5 w-5 bg-slate-900" />
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-3 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-600"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="text-left text-sm text-slate-600">
              Log out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600">
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
