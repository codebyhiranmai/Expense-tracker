// src/components/TransactionModal.jsx
// Modal component for adding or editing a transaction.
// Supports description, amount, date, type (income/expense), and category fields.

import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

/**
 * TransactionModal
 * @param {Object} transaction - Existing transaction data for editing (optional)
 * @param {Function} onClose - Callback to close the modal
 */
const TransactionModal = ({ transaction, onClose }) => {
  const { addTransaction, updateTransaction } = useContext(StoreContext);

  /**
   * getInitialFormData
   * Returns initial form data, either from transaction or defaults
   */
  const getInitialFormData = () => ({
    description: transaction?.description || "",
    amount: transaction?.amount || "",
    date: transaction?.date || new Date().toISOString().split("T")[0],
    type: transaction?.type || "expense",
    category: transaction?.category || "",
  });

  const [formData, setFormData] = useState(getInitialFormData);

  // Reset form data whenever the transaction changes
  useEffect(() => {
    setFormData(getInitialFormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction?.id]);

  /**
   * handleChange
   * Updates form state when inputs change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  /**
   * handleSave
   * Adds a new transaction or updates existing transaction
   */
  const handleSave = () => {
    if (transaction) {
      updateTransaction(transaction.id, formData);
    } else {
      addTransaction(formData);
    }
    onClose();
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h3>{transaction ? "Edit Transaction" : "Add Transaction"}</h3>
          <button className="btn-icon" onClick={onClose} aria-label="Close Modal">
            ❌
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-input"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              className="form-input"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              className="form-input"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              className="form-input"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              className="form-input"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {transaction ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;