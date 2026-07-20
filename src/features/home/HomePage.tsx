import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  appName,
  cardHoverClass,
  cardTint,
  primaryButtonLargeClass,
} from "../../styles/sharedStyles";

// Placeholder hero photo (airplane wing above clouds) from Unsplash — a
// free stock photo source. Swap this URL for your own image whenever
// you're ready; nothing else needs to change.
const heroImageUrl =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80";

// Photos for the static "Dining, Shopping & Lounges" section below — all
// free-to-use Unsplash stock photos. Purely illustrative (no links), so
// swapping these URLs is the only thing needed to change the pictures.
const diningShoppingLounges = [
  {
    label: "Restaurants & Cafés",
    description: "Grab a bite between flights, from quick counters to sit-down dining.",
    imageUrl: "https://images.unsplash.com/photo-1553024042-28c8e2e0d5fc?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Duty-Free Shopping",
    description: "Browse duty-free stores for fragrances, souvenirs, and last-minute gifts.",
    imageUrl: "https://images.unsplash.com/photo-1574079970322-08d2781d8d1a?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Retail & Boutiques",
    description: "Explore fashion, electronics, and specialty boutiques across the terminal.",
    imageUrl: "https://images.unsplash.com/photo-1742589977991-0417bf1ca3b1?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Airport Lounges",
    description: "Relax in comfortable lounge seating with views of the tarmac.",
    imageUrl: "https://images.unsplash.com/photo-1627750673161-02af15c7c722?auto=format&fit=crop&w=800&q=80",
  },
];

// --- Icon setup ---
// Every card icon below (Terminal Maps, Check-in, etc.) is built on top of
// this one wrapper, so they all share the exact same size and stroke
// width instead of each icon picking its own.

// Size (width/height, in pixels) used for every card icon.
const cardIconSize = 22;
// Stroke width used for every card icon — keeping this the same number
// everywhere is what makes the icons feel like one consistent set.
const cardIconStrokeWidth = 1.75;

function CardIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={cardIconSize}
      height={cardIconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth={cardIconStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function TerminalMapIcon() {
  return (
    <CardIcon>
      <path d="M3 6 9 4l6 2 6-2v14l-6 2-6-2-6 2Z" />
      <path d="M9 4v14M15 6v14" />
    </CardIcon>
  );
}

function CheckInIcon() {
  return (
    <CardIcon>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="m9 13 2 2 4-4" />
    </CardIcon>
  );
}

function BaggageIcon() {
  return (
    <CardIcon>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </CardIcon>
  );
}

// The arrow shown on the right edge of every card. Same stroke width as
// the icons above (cardIconStrokeWidth) for a consistent look, but a
// touch smaller since it's a secondary/decorative element, not the main
// icon for the card.
function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth={cardIconStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// --- Card data ---

const airportInfo = [
  { label: "Terminal Maps", icon: <TerminalMapIcon /> },
  { label: "Check-in Information", icon: <CheckInIcon /> },
  { label: "Baggage Services", icon: <BaggageIcon /> },
];

// --- Card styling ---
// Text color used in the card's default (non-hover) state — near-black,
// so it reads as "black text" on the light teal background.
const cardDefaultTextClass = "text-slate-900";

// The full set of classes for one Airport Information tile: layout + the
// shared teal/green color pair from sharedStyles.ts.
const serviceCardClass =
  `flex cursor-pointer items-center justify-between gap-3 rounded-xl px-5 py-4 shadow-sm ` +
  `transition-all duration-200 ${cardTint} ${cardDefaultTextClass} ${cardHoverClass}`;

function ServiceCard({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <div className={serviceCardClass}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <ArrowRightIcon />
    </div>
  );
}

export function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold">Welcome to {appName}</h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Search flights, manage bookings, and explore everything our airport
              has to offer.
            </p>

            <Link to="/search" className={primaryButtonLargeClass + " mt-8"}>
              Search Flights
            </Link>
          </div>

          {/* Hidden on small screens so the hero stays text-only on mobile,
              same as before. */}
          <div className="hidden lg:block">
            <img
              src={heroImageUrl}
              alt="Airplane wing above the clouds"
              className="h-80 w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Dining, Shopping & Lounges — purely informational, no links or
          buttons. Light teal-tinted section background, so it's clearly a
          different area of the page from the plain white above it and the
          gray "Airport Information" section below it. */}
      <section className="bg-teal-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading size — bigger than a normal section heading so this
              reads as the start of a new part of the page. */}
          <h2 className="text-4xl font-extrabold text-slate-900">Dining, Shopping &amp; Lounges</h2>

          {/* Thin teal underline bar under the heading — a small accent so
              it doesn't look like plain bold text. Adjust the width/color
              classes below to change it. */}
          <div className="mt-3 mb-8 h-1 w-16 rounded-full bg-teal-500" />

          <p className="mb-8 max-w-2xl text-slate-600">
            From quick bites to duty-free finds and relaxed lounge seating, the
            terminal has plenty to enjoy before your flight.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {diningShoppingLounges.map((item) => (
              <div key={item.label} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <img
                  src={item.imageUrl}
                  alt={item.label}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{item.label}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Information — darker gray background than the Dining,
          Shopping & Lounges section above, but still much lighter than the
          navy navbar/footer. */}
      <section className="bg-slate-200 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Airport Information
          </h2>

          <div className="mt-3 mb-8 h-1 w-16 rounded-full bg-teal-500" />

          <div className="grid gap-6 md:grid-cols-3">
            {airportInfo.map((info) => (
              <ServiceCard key={info.label} label={info.label} icon={info.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 text-center">
        © 2026 {appName}. All Rights Reserved.
      </footer>
    </main>
  );
}
