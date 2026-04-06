// src/components/Sidebar.jsx
// Sidebar navigation component for the Finance Dashboard.
// Displays app logo and navigation links for Dashboard, Transactions, Settings, and Reports.

import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

/**
 * Sidebar
 * Renders the app logo and a list of navigation links.
 * Highlights the active route using NavLink.
 */
const Sidebar = () => {
  const pages = [
    { name: "Dashboard", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Settings", path: "/settings" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-icon" />
        <h2>Finance App</h2>
      </div>

      {/* Navigation Links */}
      <nav>
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            {page.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;