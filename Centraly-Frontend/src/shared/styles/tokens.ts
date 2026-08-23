/**
 * CENTRALY DESIGN SYSTEM — Design Tokens
 * Single source of truth for all shared class names.
 * Usage: import { tokens } from '@/shared/styles/tokens'
 */

export const tokens = {
  // --- Typography ---
  font: {
    label:      "text-sm font-semibold text-gray-700",
    helperText: "text-xs text-gray-500",
    muted:      "text-sm text-gray-500",
  },

  // --- Form Inputs ---
  input: "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",
  select: "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white",

  // --- Buttons ---
  btn: {
    primary:   "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
    secondary: "px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium text-sm",
    ghost:     "px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors font-medium",
  },

  // --- Table ---
  table: {
    header: "px-6 py-3 font-semibold text-gray-600 text-sm whitespace-nowrap",
    cell:   "px-6 py-4",
  },

  // --- Badge ---
  badge: {
    indigo: "bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium",
  },

  // --- Card / Surface ---
  card: "bg-white rounded-xl shadow-sm border border-gray-200",

  // --- Sidebar ---
  sidebar: {
    root:       "w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed right-0 top-0 border-l border-slate-800",
    logo:       "h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950",
    groupTitle: "px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2",
    link:       "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
    activeLink: "bg-blue-600 text-white",
    hoverLink:  "hover:bg-slate-800 hover:text-white",
  },
} as const;
