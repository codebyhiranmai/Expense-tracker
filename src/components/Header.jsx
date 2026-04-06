// src/components/Header.jsx
// Top header component for the Finance Dashboard.
// Displays dynamic page title/subtitle, role selector, dark mode toggle, and export button.

import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import ExportButton from "./ExportButton";

/**
 * Header
 * Displays dynamic page title/subtitle, user role selector,
 * theme toggle button, and export functionality.
 */
const Header = () => {
  const { theme, setTheme, role, setRole } = useContext(StoreContext);
  const location = useLocation();

  // Map of routes to header titles and subtitles
  const headerMap = {
    "/": {
      title: "Dashboard",
      subtitle: "Welcome back! Here's a brief overview of your finances.",
    },
    "/transactions": {
      title: "Transactions",
      subtitle: "View and manage all your transactions.",
    },
    "/reports": {
      title: "Reports",
      subtitle: "Generate and export financial reports.",
    },
    "/settings": {
      title: "Settings",
      subtitle: "Configure your preferences and profile.",
    },
  };

  // Default title/subtitle if route not found
  const { title, subtitle } = headerMap[location.pathname] || {
    title: "Page",
    subtitle: "",
  };

  // Toggle light/dark theme
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Handle role selection change
  const handleRoleChange = (e) => setRole(e.target.value);

  return (
    <header className="top-header">
      {/* Dynamic Title / Subtitle */}
      <div className="header-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {/* Header Controls */}
      <div className="header-controls">
        {/* Export transactions button */}
        <ExportButton />

        {/* Role selector dropdown */}
        <div className="role-selector">
          <label htmlFor="role-select">Role:</label>
          <select
            id="role-select"
            className="select-input"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Theme toggle button */}
        <button
          className="btn-icon"
          aria-label="Toggle Dark Mode"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;