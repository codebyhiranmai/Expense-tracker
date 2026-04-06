// src/components/TransactionTable.jsx
// Table component to display, sort, and manage transactions.
// Supports admin actions (edit/delete) and sortable columns.

import React, { useContext, useState, useMemo } from "react";
import { StoreContext } from "../context/StoreContext";
import TransactionModal from "./TransactionModal";
import DeleteModal from "./DeleteModal";

/**
 * formatCurrency
 * Utility to format a number as Indian Rupees currency string.
 * @param {number} amount - The numeric value to format
 * @returns {string} - Formatted currency string, e.g., ₹1,234.00
 */
const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * TransactionTable
 * Displays a list of transactions in a table with sortable columns.
 * Admin users can edit or delete transactions via modals.
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns JSX.Element
 */
const TransactionTable = ({ transactions }) => {
  const { role, deleteTransaction } = useContext(StoreContext);

  // State for currently selected transaction for editing
  const [selectedTx, setSelectedTx] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State for delete confirmation
  const [deleteTxId, setDeleteTxId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State for sorting configuration: key and direction
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  /**
   * sortedTransactions
   * Memoized sorted copy of transactions based on sortConfig
   */
  const sortedTransactions = useMemo(() => {
    if (!transactions) return [];
    const txCopy = [...transactions];

    if (sortConfig.key) {
      txCopy.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Convert amount to float for numeric sorting
        if (sortConfig.key === "amount") {
          valA = parseFloat(valA);
          valB = parseFloat(valB);
        }

        // Case-insensitive comparison for strings
        if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return txCopy;
  }, [transactions, sortConfig]);

  /**
   * handleSort
   * Toggles sorting direction if same column is clicked, else sets new column
   * @param {string} key - Column key to sort by
   */
  const handleSort = (key) =>
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );

  /**
   * sortIndicator
   * Returns a visual arrow indicator for current sorted column
   * @param {string} key - Column key
   * @returns {string} - Arrow symbol or empty string
   */
  const sortIndicator = (key) =>
    sortConfig.key === key ? (sortConfig.direction === "asc" ? " ⬆" : " ⬇") : "";

  // Show empty state if no transactions
  if (!transactions || transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No transactions found</h3>
        <p>Add a new transaction to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Transactions Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
              Date{sortIndicator("date")}
            </th>
            <th onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>
              Description{sortIndicator("description")}
            </th>
            <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
              Category{sortIndicator("category")}
            </th>
            <th onClick={() => handleSort("type")} style={{ cursor: "pointer" }}>
              Type{sortIndicator("type")}
            </th>
            <th className="text-right" onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>
              Amount{sortIndicator("amount")}
            </th>
            {role === "admin" && <th className="actions-col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td>{tx.category}</td>
              <td>
                <span className={`badge ${tx.type === "income" ? "badge-income" : "badge-expense"}`}>
                  {tx.type}
                </span>
              </td>
              <td className="text-right">{formatCurrency(tx.amount)}</td>

              {/* Admin Actions: Edit/Delete */}
              {role === "admin" && (
                <td className="admin-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => setSelectedTx(tx)}
                    aria-label="Edit Transaction"
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => {
                      setDeleteTxId(tx.id);
                      setShowDeleteModal(true);
                    }}
                    aria-label="Delete Transaction"
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transaction Modal for Add/Edit */}
      {(selectedTx || showModal) && (
        <TransactionModal
          transaction={selectedTx}
          onClose={() => {
            setSelectedTx(null);
            setShowModal(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteTransaction(deleteTxId);
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default TransactionTable;