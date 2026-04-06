// src/context/StoreProvider.jsx
// Provides global state management for the Finance Dashboard using React Context.
// Manages theme, user role, transactions, user profile, and currency settings.

import React, { useState, useEffect } from "react";
import { StoreContext } from "./StoreContext";

/**
 * StoreProvider
 * Wraps the application and provides global state via StoreContext.
 * @param {React.ReactNode} children - Components that will have access to global state.
 */
export const StoreProvider = ({ children }) => {
  // Theme state: "light" or "dark"
  const [theme, setTheme] = useState("light");

  // User role: default is "user" (can be extended for admin, manager, etc.)
  const [role, setRole] = useState("user");

  // Transaction list with sample data
  const [transactions, setTransactions] = useState([
    { id: "1", description: "Salary", amount: 5000, type: "income", category: "Salary", date: "2026-04-01" },
    { id: "2", description: "Groceries", amount: 150.5, type: "expense", category: "Food", date: "2026-04-02" },
    { id: "3", description: "Electric Bill", amount: 80, type: "expense", category: "Utilities", date: "2026-04-03" },
    { id: "4", description: "Freelance Work", amount: 800, type: "income", category: "Freelance", date: "2026-04-04" },
    { id: "5", description: "Netflix", amount: 15.99, type: "expense", category: "Entertainment", date: "2026-04-05" },
    { id: "6", description: "Dinner out", amount: 65, type: "expense", category: "Food", date: "2026-04-06" },

    // Previous month (March)
    { id: "7", description: "March Salary", amount: 5000, type: "income", category: "Salary", date: "2026-04-28" },
    { id: "8", description: "March Rent", amount: 1200, type: "expense", category: "Housing", date: "2026-03-10" },
    { id: "9", description: "March Groceries", amount: 200, type: "expense", category: "Food", date: "2026-03-15" },

    // Last year (2025)
    { id: "10", description: "2025 Bonus", amount: 10000, type: "income", category: "Bonus", date: "2025-12-20" },
    { id: "11", description: "2025 Rent", amount: 1200, type: "expense", category: "Housing", date: "2025-12-01" },
    { id: "12", description: "2025 Vacation", amount: 3000, type: "expense", category: "Travel", date: "2025-07-10" }
  ]);

  // User profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com"
  });

  // Currency settings
  const [currency, setCurrency] = useState({ code: "INR", symbol: "₹" });

  // Apply theme class to body element whenever theme changes
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Add a new transaction (prepend to the list)
  const addTransaction = (tx) => setTransactions([tx, ...transactions]);

  // Update a transaction by id
  const updateTransaction = (id, updatedData) =>
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedData } : t));

  // Delete a transaction by id
  const deleteTransaction = (id) =>
    setTransactions(transactions.filter(t => t.id !== id));

  return (
    <StoreContext.Provider
      value={{
        theme, setTheme,
        role, setRole,
        transactions, addTransaction, updateTransaction, deleteTransaction,
        profile, setProfile,
        currency, setCurrency
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};