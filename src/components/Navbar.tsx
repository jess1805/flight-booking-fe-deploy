import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import {
  accentText,
  appName,
  dropdownItemClass,
  dropdownPanelClass,
  ghostButtonClass,
  primaryButtonClass,
} from "../styles/sharedStyles";

const logoFontFamily = "'Poppins', 'Avenir Next', 'Century Gothic', Futura, ui-rounded, sans-serif";

// logo icon
function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-teal-600">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  );
}

// dropdown chevron
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"transition-transform duration-150 " + (open ? "rotate-180" : "")}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// logout icon
function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const navLinkClass =
  "rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-700";

// profile dropdown
function NavDropdown({
  label,
  links,
  currentPath,
}: {
  label: string;
  links: { to: string; label: string }[];
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeAfterDelay() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  // click outside closes
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef} onMouseEnter={openNow} onMouseLeave={closeAfterDelay}>
      <button onClick={() => setOpen((o) => !o)} className={navLinkClass + " flex items-center gap-1"}>
        {label}
        <ChevronIcon open={open} />
      </button>

      <div
        className={
          dropdownPanelClass + " " + (open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0")
        }
      >
        {links.map((link, i) => (
          <Link
            key={`${link.to}-${i}`}
            to={link.to}
            onClick={() => setOpen(false)}
            className={dropdownItemClass + " " + (link.to === currentPath ? accentText + " font-medium" : "text-slate-700")}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// mobile menu button
function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="rounded-md p-2 transition-colors hover:bg-slate-100 sm:hidden"
      aria-label="Toggle menu"
      onClick={onClick}
    >
      <span className="block h-0.5 w-5 bg-slate-900" />
      <span className="mt-1 block h-0.5 w-5 bg-slate-900" />
      <span className="mt-1 block h-0.5 w-5 bg-slate-900" />
    </button>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setTimeout(() => navigate("/", { replace: true }), 0);
  }

  const navBarWrapperClass = "relative z-50 border-b border-slate-200 bg-white/95 backdrop-blur";

  const navBarLeftPadding = "pl-8";
  const navBarRightPadding = "pr-8";
  const navBarInnerClass = `flex items-center justify-between ${navBarLeftPadding} ${navBarRightPadding} py-3`;

  const navLinkGap = "gap-6";
  const navLinksRowClass = `hidden items-center ${navLinkGap} sm:flex`;

  const logoClass = "flex items-center gap-2 text-lg font-semibold text-slate-900";

  if (!user) {
    return (
      <nav className={navBarWrapperClass}>
        <div className={navBarInnerClass}>
          <Link to="/" className={logoClass} style={{ fontFamily: logoFontFamily }}>
            <PlaneIcon />
            {appName}
          </Link>

          <div className={navLinksRowClass}>
            <Link to="/" className={navLinkClass}>
              Home
            </Link>
            <Link to="/search" className={navLinkClass}>
              Search Flights
            </Link>
            <Link to="/login" className={primaryButtonClass + " ml-2 px-4 py-1.5"}>
              Login
            </Link>
          </div>

          <MobileMenuButton onClick={() => setMenuOpen((open) => !open)} />
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-slate-200 px-4 py-3 sm:hidden">
            <Link to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>
              Home
            </Link>
            <Link
              to="/search"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Search Flights
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className={primaryButtonClass + " mt-1"}>
              Login
            </Link>
          </div>
        )}
      </nav>
    );
  }

  if (user.role === "PASSENGER") {
    const profileDropdownLinks = [
      { to: "/profile", label: "My Profile" },
      { to: "/bookings", label: "My Bookings" },
    ];

    return (
      <nav className={navBarWrapperClass}>
        <div className={navBarInnerClass}>
          <Link to="/" className={logoClass} style={{ fontFamily: logoFontFamily }}>
            <PlaneIcon />
            {appName}
          </Link>

          <div className={navLinksRowClass}>
            <Link to="/" className={navLinkClass}>
              Home
            </Link>
            <Link to="/search" className={navLinkClass}>
              Search Flights
            </Link>
            <Link to="/feedback" className={navLinkClass}>
              Feedback
            </Link>

            <NavDropdown label="Profile" links={profileDropdownLinks} currentPath={location.pathname} />

            <button onClick={handleLogout} className={ghostButtonClass}>
              <LogoutIcon />
              Logout
            </button>
          </div>

          <MobileMenuButton onClick={() => setMenuOpen((open) => !open)} />
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-slate-200 px-4 py-3 sm:hidden">
            <Link to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>
              Home
            </Link>
            <Link
              to="/search"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Search Flights
            </Link>
            <Link
              to="/feedback"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Feedback
            </Link>
            {profileDropdownLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className={ghostButtonClass + " justify-start"}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        )}
      </nav>
    );
  }

  // admin (manager/staff)
  const isManager = user.role === "MANAGER";
  const adminLinks = [
    { to: "/admin/flights", label: "Flights" },
    ...(isManager ? [{ to: "/admin/gate-change", label: "Gate Change" }] : []),
    ...(isManager ? [{ to: "/admin/chatbot", label: "Chatbot" }] : []),
  ];

  return (
    <nav className={navBarWrapperClass}>
      <div className={navBarInnerClass}>
        <Link to="/admin/flights" className={logoClass} style={{ fontFamily: logoFontFamily }}>
          <PlaneIcon />
          {appName}
        </Link>

        <div className={navLinksRowClass}>
          {adminLinks.map((link) => (
            <Link key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <button onClick={handleLogout} className={ghostButtonClass}>
            <LogoutIcon />
            Logout
          </button>
        </div>

        <MobileMenuButton onClick={() => setMenuOpen((open) => !open)} />
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-slate-200 px-4 py-3 sm:hidden">
          {adminLinks.map((link) => (
            <Link
              key={`mobile-${link.to}`}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className={ghostButtonClass + " justify-start"}
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
