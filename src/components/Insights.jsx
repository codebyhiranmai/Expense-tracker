// src/components/Insights.jsx
// Calculates and displays key financial insights as cards using InsightCard component.
// Shows Total Balance, Total Expenses, Highest Spending Category, and Monthly Comparison.

import React, { useContext, useMemo } from "react";
import { StoreContext } from "../context/StoreContext";
import InsightCard from "./InsightCard";

/**
 * formatCurrency
 * Formats a number as Indian Rupees currency string.
 * @param {number} amount 
 * @returns {string} Formatted currency
 */
const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Insights
 * Calculates aggregated metrics from transactions and renders InsightCard components.
 */
const Insights = () => {
  const { transactions } = useContext(StoreContext);

  // Compute insights only when transactions change
  const insights = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        balance: 0,
        expense: 0,
        highestCategory: "N/A",
        highestAmount: 0,
        monthlyComparison: "N/A",
        monthlyObservation: "--",
      };
    }

    let income = 0,
      expense = 0;
    const categoryMap = {};

    // Aggregate transactions
    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else {
        expense += t.amount;
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      }
    });

    // Find highest spending category
    let highestCategory = "N/A",
      highestAmount = 0;
    Object.entries(categoryMap).forEach(([cat, amt]) => {
      if (amt > highestAmount) {
        highestAmount = amt;
        highestCategory = cat;
      }
    });

    const balance = income - expense;
    const monthlyComparison = balance >= 0 ? "Net Positive" : "Net Negative";
    const monthlyObservation = balance >= 0
      ? `+ ${formatCurrency(balance)} saved!`
      : `- ${formatCurrency(Math.abs(balance))} deficit.`;

    return { balance, expense, highestCategory, highestAmount, monthlyComparison, monthlyObservation };
  }, [transactions]);

  return (
    <section className="insights">
      {/* Total Balance Card */}
      <InsightCard
        title="Total Balance"
        value={formatCurrency(insights.balance)}
        bgColor="bg-blue"
        icon={
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
          </svg>
        }
      />

      {/* Total Expenses Card */}
      <InsightCard
        title="Total Expenses"
        value={formatCurrency(insights.expense)}
        bgColor="bg-red"
        icon={
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6">
            </path>
          </svg>
        }
      />

      {/* Highest Spending Category Card */}
      <InsightCard
        title="Highest Category"
        value={insights.highestCategory}
        subText={insights.highestAmount > 0 ? formatCurrency(insights.highestAmount) : "--"}
        bgColor="bg-purple"
        icon={
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z">
            </path>
          </svg>
        }
      />

      {/* Monthly Comparison Card */}
      <InsightCard
        title="Monthly Comparison"
        value={insights.monthlyComparison}
        subText={insights.monthlyObservation}
        bgColor={insights.balance >= 0 ? "bg-green" : "bg-red"} 
        textColor={
          insights.monthlyComparison === "N/A"
            ? "var(--text-main)" // default black
            : insights.balance >= 0
            ? "var(--success)"   // green
            : "var(--danger)"    // red
        }
        icon={
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
            </path>
          </svg>
        }
      />
    </section>
  );
};

export default Insights;