// Brand

export const appName = "SkyRoute";

// Accent color

const accentSolid = "bg-teal-600";
const accentSolidHover = "hover:bg-teal-700";
const accentSolidActive = "active:bg-teal-800";

export const accentTint = "bg-teal-50";

export const accentText = "text-teal-700";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

// Buttons

export const primaryButtonClass =
  `inline-flex items-center justify-center gap-2 rounded-lg ${accentSolid} px-4 py-2 ` +
  `text-sm font-medium text-white shadow-sm transition-colors ` +
  `${accentSolidHover} ${accentSolidActive} ` +
  `disabled:opacity-50 disabled:pointer-events-none ` +
  focusRing;

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

// Dropdown menus

export const dropdownPanelClass =
  `absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl border border-teal-100 ${accentTint} py-1.5 shadow-lg ` +
  `transition-all duration-150`;

export const dropdownItemClass =
  "block px-4 py-2 text-sm transition-colors " +
  "hover:bg-teal-600 hover:text-white";

// Form fields

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
  "placeholder:text-slate-400 transition-colors " +
  "hover:border-slate-400 focus-visible:border-teal-500 " +
  focusRing;

export const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export const errorTextClass = "mt-1.5 text-sm text-red-600";

// Cards

export const cardClass = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

export const cardInteractiveClass =
  cardClass +
  " transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md";

// Info card colors

export const cardTint = "bg-teal-100";

export const cardHoverClass =
  "hover:bg-teal-600 hover:text-white hover:-translate-y-1 hover:shadow-lg";

// Typography

export const pageHeadingClass = "text-2xl font-semibold tracking-tight text-slate-900";
export const sectionHeadingClass = "text-lg font-semibold text-slate-900";
export const mutedTextClass = "text-sm text-slate-500";
