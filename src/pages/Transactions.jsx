// src/pages/Transactions.jsx
// Page for managing and viewing all transactions with filtering, searching, and add/edit functionality

import React, { useState, useContext, useMemo } from "react";
import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/TransactionModal";
import { StoreContext } from "../context/StoreContext";

/**
 * Transactions Page
 * @component
 */
const Transactions = () => {
  const { transactions, role } = useContext(StoreContext);

  // Modal & edit state
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState(null);

  // Filter state
  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /**
   * Compute filtered transactions based on type, search, and date range
   */
  const filteredTx = useMemo(() => {
    return transactions.filter((tx) => {
      const typeMatch = filterType === "all" || tx.type === filterType;
      const searchMatch =
        tx.description.toLowerCase().includes(searchText.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchText.toLowerCase()) ||
        tx.date.includes(searchText);
      const fromMatch = fromDate ? tx.date >= fromDate : true;
      const toMatch = toDate ? tx.date <= toDate : true;

      return typeMatch && searchMatch && fromMatch && toMatch;
    });
  }, [transactions, filterType, searchText, fromDate, toDate]);

  return (
    <div className="transactions-page page-column">
      {/* 1. Filters & Quick Actions */}
      <Filters
        role={role}
        filterType={filterType}
        setFilterType={setFilterType}
        searchText={searchText}
        setSearchText={setSearchText}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        setShowModal={setShowModal}
      />

      {/* 2. Transactions Table */}
      <div className="table-container">
        <TransactionTable
          transactions={filteredTx}
          onEditTx={(tx) => role === "admin" && setEditTx(tx)}
        />
      </div>

      {/* 3. Add/Edit Transaction Modal */}
      {(showModal || editTx) && role === "admin" && (
        <TransactionModal
          transaction={editTx}
          onClose={() => {
            setShowModal(false);
            setEditTx(null);
          }}
        />
      )}
    </div>
  );
};

/**
 * Filters Component
 * @param {Object} props
 */
const Filters = ({
  role,
  filterType,
  setFilterType,
  searchText,
  setSearchText,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setShowModal,
}) => (
  <div className="section-header filters-row">
    <h2>All Transactions</h2>
    <div className="section-actions form-row">
      {/* Type Filter */}
      <select
        className="select-input"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Search Field */}
      <input
        type="text"
        className="form-input"
        placeholder="Search by description, category or date..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Date Range Filters */}
      <input
        type="date"
        className="form-input"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        className="form-input"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      {/* Add Transaction Button */}
      {role === "admin" && (
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Transaction
        </button>
      )}
    </div>
  </div>
);

export default Transactions;