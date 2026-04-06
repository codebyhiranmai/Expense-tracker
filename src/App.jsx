// src/App.jsx
// Main application component for the Finance Dashboard.
// Sets up routing, global state, and theming for the app.

import React, { useContext, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider } from "./context/StoreProvider";
import { StoreContext } from "./context/StoreContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";

import "./index.css";

/**
 * AppContent
 * Core content of the app, wrapped with router context.
 * Handles theme switching, routing, and dynamic document titles.
 */
const AppContent = () => {
  const { theme } = useContext(StoreContext); // Get current theme (light/dark) from global context
  const location = useLocation(); // Current route path

  // Map of routes to page titles (memoized for performance)
  const routeTitles = useMemo(
    () => ({
      "/": "Dashboard",
      "/transactions": "Transactions",
      "/reports": "Reports",
      "/settings": "Settings",
    }),
    []
  );

  // Update document title whenever route changes
  useEffect(() => {
    const pageTitle = routeTitles[location.pathname] || "Finance App";
    document.title = `${pageTitle} | Finance App`;
  }, [location.pathname, routeTitles]);

  return (
    <div className={`app-container ${theme === "dark" ? "dark" : ""}`}>
      {/* Sidebar navigation */}
      <Sidebar />

      <main className="main-content">
        {/* Top header */}
        <Header />

        {/* Page content based on route */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
};

/**
 * App
 * Wraps the application with global state provider and router.
 */
const App = () => (
  <StoreProvider>
    <Router>
      <AppContent />
    </Router>
  </StoreProvider>
);

export default App;