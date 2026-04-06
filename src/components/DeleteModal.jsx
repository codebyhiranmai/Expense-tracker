// src/components/DeleteModal.jsx
import React from "react";

/**
 * DeleteModal
 * @param {Function} onClose - Close the modal
 * @param {Function} onConfirm - Confirm deletion
 */
const DeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay active">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h3>Delete Transaction</h3>
          <button className="btn-icon" onClick={onClose} aria-label="Close Modal">
            ❌
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p>Are you sure you want to delete this transaction?</p>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-outline"
            onClick={onClose}
            style={{ minWidth: "100px" }}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            style={{
              minWidth: "120px",
              backgroundColor: "#e53935",
              color: "#fff",
              border: "none",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;