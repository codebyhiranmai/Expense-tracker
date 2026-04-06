// src/components/ExportButton.jsx
// Button component that allows exporting transactions to CSV or JSON.
// Includes a dropdown menu and handles outside clicks to close the menu.

import React, { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

/**
 * ExportButton
 * Renders a button to export transactions in CSV or JSON format.
 * Uses a dropdown menu that closes on outside click.
 */
const ExportButton = () => {
  const { transactions } = useContext(StoreContext); // Get transactions from global state
  const [open, setOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Format number as currency
  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Convert transactions to CSV string
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    return [
      headers.join(","), // CSV header row
      ...data.map(tx =>
        headers.map(h =>
          h === "amount" ? `"${formatCurrency(tx[h])}"` : `"${tx[h]}"`
        ).join(",")
      )
    ].join("\n");
  };

  // Export as CSV
  const handleExportCSV = () => {
    if (!transactions.length) return alert("No transactions!");

    const csvContent = "\uFEFF" + convertToCSV(transactions); // BOM for Excel
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  // Export as JSON
  const handleExportJSON = () => {
    if (!transactions.length) return alert("No transactions!");

    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div className="export-dropdown" ref={dropdownRef}>
      <button className="btn btn-outline" onClick={() => setOpen(!open)}>
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export
      </button>

      {open && (
        <div className="export-menu">
          <button onClick={handleExportCSV}>CSV</button>
          <button onClick={handleExportJSON}>JSON</button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;