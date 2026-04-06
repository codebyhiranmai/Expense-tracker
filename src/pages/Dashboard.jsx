// src/pages/Dashboard.jsx
// Main Dashboard page showing insights, recent transactions, quick actions, and monthly summary.

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Insights from "../components/Insights";
import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/TransactionModal";
import ExportButton from "../components/ExportButton";
import { StoreContext } from "../context/StoreContext";

/**
 * Dashboard Page
 * @component
 */
const Dashboard = () => {
  const { transactions, role } = useContext(StoreContext);
  const navigate = useNavigate();

  // Show only the 5 most recent transactions
  const latestTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-page" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* 1. Insight Cards */}
      <section className="insights">
        <Insights />
      </section>

      {/* 2. Quick Actions */}
      <section className="quick-actions">
        <h2 style={{ marginBottom: "1rem" }}>Quick Actions</h2>
        <div className="actions-row">
          {role === "admin" && (
            <TransactionModalWrapper>
              {(openModal) => (
                <button className="btn btn-primary" onClick={openModal}>
                  Add Transaction
                </button>
              )}
            </TransactionModalWrapper>
          )}
          <button className="btn btn-outline" onClick={() => navigate("/reports")}>
            Generate Report
          </button>
          <ExportButton />
        </div>
      </section>

      {/* 3. Recent Transactions */}
      <section className="transactions-section">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <div className="section-actions">
            <button className="btn btn-outline" onClick={() => navigate("/transactions")}>
              View All
            </button>
          </div>
        </div>
        <div className="table-container">
          <TransactionTable transactions={latestTransactions} />
        </div>
      </section>

      {/* 4. Monthly Summary */}
      <section className="reports-summary">
        <h2>Monthly Summary</h2>
        <MonthlySummary transactions={transactions} />
      </section>
    </div>
  );
};

/**
 * Wrapper component to manage TransactionModal state
 * @param {function} children - render prop receiving openModal function
 */
const TransactionModalWrapper = ({ children }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      {children(() => setShowModal(true))}
      {showModal && <TransactionModal onClose={() => setShowModal(false)} />}
    </>
  );
};

/**
 * MonthlySummary Component
 * Displays income, expenses, and balance
 * @param {Array} transactions - list of transactions
 */
const MonthlySummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {/* Income Card */}
      <div
        style={{
          flex: 1,
          minWidth: "200px",
          backgroundColor: "var(--bg-card)",
          borderRadius: "12px",
          padding: "1rem",
          border: "1px solid var(--border-color)",
        }}
      >
        <h3>Income</h3>
        <p>₹{totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
      </div>

      {/* Expenses Card */}
      <div
        style={{
          flex: 1,
          minWidth: "200px",
          backgroundColor: "var(--bg-card)",
          borderRadius: "12px",
          padding: "1rem",
          border: "1px solid var(--border-color)",
        }}
      >
        <h3>Expenses</h3>
        <p>₹{totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
      </div>

      {/* Balance Card */}
      <div
        style={{
          flex: 2,
          minWidth: "250px",
          backgroundColor: "var(--bg-card)",
          borderRadius: "12px",
          padding: "1rem",
          border: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 500,
          color: balance >= 0 ? "var(--success)" : "var(--danger)",
        }}
      >
        Balance: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default Dashboard;