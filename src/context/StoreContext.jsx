// src/context/StoreContext.jsx
// Creates and exports the global context for the Finance Dashboard.
// Used to share state (like theme, user data, etc.) across the app without prop drilling.

import { createContext } from "react";

// StoreContext provides access to global app state
// Example shape: { theme: "light" | "dark", user: {...}, transactions: [...] }
export const StoreContext = createContext();