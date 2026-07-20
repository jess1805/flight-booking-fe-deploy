// Shared Tailwind class strings used across the app so that buttons, inputs,
// and cards look the same everywhere instead of each page inventing its own
// styling. Every constant here is a complete, ready-to-use className string —
// just drop it straight onto an element, e.g.:
//
//   <button className={primaryButtonClass}>Save</button>
//
// Accent color: teal (used for primary buttons, focus rings, active links).
// Neutral color: slate (used for text, borders, backgrounds).

// --- Brand ---

// The app's name. Shown in the navbar logo and the browser tab title.
// Change this single value to rename the app everywhere.
export const appName = "SkyRoute";

// --- Accent color (teal) ---
// This is the ONE accent color used everywhere in the app: buttons, active
// nav links, focus rings, and dropdown highlights. To re-theme the app,
// change these values (they follow Tailwind's color scale: 50 = lightest
// tint, 600 = the main solid color, 900 = darkest).

// Main brand accent color (solid) — used for primary buttons and for the
// highlighted item inside an open dropdown menu.
const accentSolid = "bg-teal-600";
// Slightly darker shade shown while hovering a solid-accent element.
const accentSolidHover = "hover:bg-teal-700";
// Darkest shade shown while a solid-accent element is being clicked.
const accentSolidActive = "active:bg-teal-800";

// A very light tint of the accent color — used as the background of open
// dropdown menus, and as the "you are here" highlight behind the active
// nav link, so it stays readable on a white page.
export const accentTint = "bg-teal-50";

// Accent-colored text — used for the active nav link and for dropdown
// links that match the current page.
export const accentText = "text-teal-700";

// The color the focus ring (the outline shown when tabbing with a
// keyboard) uses everywhere in the app.
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

// --- Buttons ---
// Four button looks used throughout the app:
//   primary            - the main action on a page (e.g. "Book seat", "Log in")
//   secondary           - a lower-priority action (e.g. "Previous", "Keep booking")
//   destructive         - a solid red button for a confirmed dangerous action
//   destructiveOutline  - an outlined red button for "Cancel" style actions
//   ghost               - a plain-text button, used mostly in the navbar

export const primaryButtonClass =
  `inline-flex items-center justify-center gap-2 rounded-lg ${accentSolid} px-4 py-2 ` +
  `text-sm font-medium text-white shadow-sm transition-colors ` +
  `${accentSolidHover} ${accentSolidActive} ` +
  `disabled:opacity-50 disabled:pointer-events-none ` +
  focusRing;

// Same as primaryButtonClass, but bigger — used for stand-out hero/CTA
// buttons like the homepage's "Search Flights" button.
export const primaryButtonLargeClass =
  `inline-flex items-center justify-center gap-2 rounded-lg ${accentSolid} px-6 py-3 ` +
  `text-base font-semibold text-white shadow-sm transition-colors ` +
  `${accentSolidHover} ${accentSolidActive} ` +
  `disabled:opacity-50 disabled:pointer-events-none ` +
  focusRing;

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 " +
  "text-sm font-medium text-slate-700 shadow-sm transition-colors " +
  "hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  focusRing;

export const destructiveButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 " +
  "text-sm font-medium text-white shadow-sm transition-colors " +
  "hover:bg-red-700 active:bg-red-800 " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";

export const destructiveOutlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 " +
  "text-sm font-medium text-red-600 transition-colors " +
  "hover:bg-red-50 active:bg-red-100 " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";

export const ghostButtonClass =
  "inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors " +
  "hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 " +
  focusRing;

// --- Dropdown menus ---
// Used by the "Profile" menu in the navbar.

// The dropdown panel itself: a light teal tint (instead of plain white) so
// it stands out clearly against the white page background.
export const dropdownPanelClass =
  `absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl border border-teal-100 ${accentTint} py-1.5 shadow-lg ` +
  `transition-all duration-150`;

// A single link/row inside the dropdown panel. On hover it fills with the
// solid accent color and the text turns white, for a clear "selected" look.
// Note: this does NOT set a text color for the normal (non-hover) state —
// the caller passes that in, since it depends on whether the link is the
// current page (see navLinkClass usage in Navbar.tsx).
//
// The "hover:bg-teal-600" below is written out in full on purpose (instead
// of building it from accentSolid above) — Tailwind only generates CSS for
// class names it can find as literal text in the source, so combining a
// variant prefix like "hover:" with a class name stored in a variable at
// runtime doesn't work. If you change the teal shade in accentSolid above,
// update this line to match.
export const dropdownItemClass =
  "block px-4 py-2 text-sm transition-colors " +
  "hover:bg-teal-600 hover:text-white";

// --- Form fields ---

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
  "placeholder:text-slate-400 transition-colors " +
  "hover:border-slate-400 focus-visible:border-teal-500 " +
  focusRing;

export const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export const errorTextClass = "mt-1.5 text-sm text-red-600";

// --- Cards ---
// cardClass: a plain card (rounded corners + soft shadow instead of a hard border look)
// cardInteractiveClass: the same card, plus a hover effect for cards that are clickable

export const cardClass = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

export const cardInteractiveClass =
  cardClass +
  " transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md";

// --- Info card colors (Airport Information tiles) ---
// A separate light-teal/dark-green color pairing used only for these
// hoverable info cards on the homepage — distinct from the main teal
// button accent above, so change these independently if needed.

// Light teal background — the card's default (non-hover) state.
export const cardTint = "bg-teal-100";

// Everything that changes when hovering one of these cards: the
// background turns dark green, the text turns white, the card lifts up
// slightly, and a soft shadow appears (no glow). Written as one complete
// string of literal classes on purpose, not built from a variable — see
// the note on dropdownItemClass above for why "hover:" can't be combined
// with a variable at the usage site.
export const cardHoverClass =
  "hover:bg-teal-600 hover:text-white hover:-translate-y-1 hover:shadow-lg";

// --- Typography ---

export const pageHeadingClass = "text-2xl font-semibold tracking-tight text-slate-900";
export const sectionHeadingClass = "text-lg font-semibold text-slate-900";
export const mutedTextClass = "text-sm text-slate-500";
