// src/pages/Reports.jsx
// Reports page for Finance Dashboard.
// Displays financial charts (line, bar, pie) and summary cards.
// Supports filtering by date range and dynamic theme colors.

import React, { useState, useContext, useMemo } from "react";
import { StoreContext } from "../context/StoreContext";
import ExportButton from "../components/ExportButton";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Reports Page
 * Displays financial reports with summary cards and charts.
 * Features:
 * - Filter transactions by date range: weekly, monthly, yearly, all
 * - Shows income vs expense as line and bar charts
 * - Shows category-wise expenses as a pie chart
 * - Theme-aware coloring (dark/light mode)
 *
 * @returns JSX.Element
 */
const Reports = () => {
  const { transactions, theme } = useContext(StoreContext);
  const [dateRange, setDateRange] = useState("monthly"); // Default filter

  /**
   * formatCurrency
   * Formats a number as Indian Rupees currency string.
   */
  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // ---------------- FILTERED TRANSACTIONS ----------------
  /**
   * filteredTransactions
   * Memoized list of transactions filtered by selected date range
   */
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    if (!transactions?.length) return [];
    return transactions.filter((t) => {
      const tDate = new Date(t.date);
      switch (dateRange) {
        case "weekly": {
          const diffDays = Math.floor((now - tDate) / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays < 7;
        }
        case "monthly":
          return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
        case "yearly":
          return tDate.getFullYear() === now.getFullYear();
        case "all":
          return true;
        default:
          return true;
      }
    });
  }, [transactions, dateRange]);

  // ---------------- TIME SERIES DATA FOR LINE/BAR ----------------
  /**
   * timeSeriesData
   * Generates chart data for Line/Bar charts based on filtered transactions.
   */
  const timeSeriesData = useMemo(() => {
    if (!filteredTransactions.length) return { labels: [], datasets: [] };
    const now = new Date();

    // Weekly: last 7 days
    if (dateRange === "weekly") {
      const weekMap = Array.from({ length: 7 }, () => ({ income: 0, expense: 0 }));
      filteredTransactions.forEach((t) => {
        const diffDays = Math.floor((now - new Date(t.date)) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 7) {
          const index = 6 - diffDays; // Map older days to left
          if (t.type === "income") weekMap[index].income += t.amount;
          else weekMap[index].expense += t.amount;
        }
      });
      return {
        labels: ["6d ago", "5d ago", "4d ago", "3d ago", "2d ago", "Yesterday", "Today"],
        datasets: [
          { label: "Income", data: weekMap.map((m) => m.income), borderColor: "#4CAF50", backgroundColor: "#4CAF50", fill: false },
          { label: "Expenses", data: weekMap.map((m) => m.expense), borderColor: "#F44336", backgroundColor: "#F44336", fill: false },
        ],
      };
    }

    // Monthly: each day of current month
    if (dateRange === "monthly") {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const dayMap = Array.from({ length: daysInMonth }, () => ({ income: 0, expense: 0 }));
      filteredTransactions.forEach((t) => {
        const tDate = new Date(t.date);
        const day = tDate.getDate() - 1;
        if (t.type === "income") dayMap[day].income += t.amount;
        else dayMap[day].expense += t.amount;
      });
      return {
        labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
        datasets: [
          { label: "Income", data: dayMap.map((m) => m.income), borderColor: "#4CAF50", backgroundColor: "#4CAF50", fill: false },
          { label: "Expenses", data: dayMap.map((m) => m.expense), borderColor: "#F44336", backgroundColor: "#F44336", fill: false },
        ],
      };
    }

    // Yearly: each month of current year
    if (dateRange === "yearly") {
      const monthMap = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));
      filteredTransactions.forEach((t) => {
        const month = new Date(t.date).getMonth();
        if (t.type === "income") monthMap[month].income += t.amount;
        else monthMap[month].expense += t.amount;
      });
      return {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          { label: "Income", data: monthMap.map((m) => m.income), borderColor: "#4CAF50", backgroundColor: "#4CAF50", fill: false },
          { label: "Expenses", data: monthMap.map((m) => m.expense), borderColor: "#F44336", backgroundColor: "#F44336", fill: false },
        ],
      };
    }

    // All-time: group by year-month
    if (dateRange === "all") {
      const yearMonthMap = {};
      filteredTransactions.forEach(t => {
        const d = new Date(t.date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (!yearMonthMap[key]) yearMonthMap[key] = { income: 0, expense: 0 };
        if (t.type === "income") yearMonthMap[key].income += t.amount;
        else yearMonthMap[key].expense += t.amount;
      });
      const labels = Object.keys(yearMonthMap).map(k => {
        const [y, m] = k.split("-");
        return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m]} ${y}`;
      });
      const incomeData = Object.values(yearMonthMap).map(v => v.income);
      const expenseData = Object.values(yearMonthMap).map(v => v.expense);
      return {
        labels,
        datasets: [
          { label: "Income", data: incomeData, borderColor: "#4CAF50", backgroundColor: "#4CAF50", fill: false },
          { label: "Expenses", data: expenseData, borderColor: "#F44336", backgroundColor: "#F44336", fill: false },
        ],
      };
    }

    return { labels: [], datasets: [] };
  }, [filteredTransactions, dateRange]);

  // ---------------- PIE CHART DATA ----------------
  /**
   * pieChartData
   * Generates chart data for category-wise expenses (pie chart)
   */
  const pieChartData = useMemo(() => {
    if (!filteredTransactions.length) return { labels: [], datasets: [] };
    const categoryTotals = {};
    filteredTransactions.forEach((t) => {
      if (t.type !== "expense") return;
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryTotals),
          backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#8E44AD","#2ECC71","#E67E22","#1ABC9C","#FF9F40"],
        },
      ],
    };
  }, [filteredTransactions]);

  // ---------------- CHART OPTIONS ----------------
  const lineBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { callbacks: { label: (ctx) => formatCurrency(ctx.raw) } },
    },
    scales: { y: { beginAtZero: true }, x: { ticks: { maxRotation: 0, minRotation: 0, autoSkip: false } } },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${formatCurrency(ctx.raw)}` } },
    },
  };

  // ---------------- TOTALS ----------------
  const totals = useMemo(() => {
    const income = timeSeriesData.datasets.find(d => d.label === "Income")?.data.reduce((a, b) => a + b, 0) || 0;
    const expenses = timeSeriesData.datasets.find(d => d.label === "Expenses")?.data.reduce((a, b) => a + b, 0) || 0;
    return { income, expenses, net: income - expenses };
  }, [timeSeriesData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header: Date Range + Export */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Financial Reports</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label htmlFor="dateRange" style={{ fontWeight: "500" }}>Date Range:</label>
          <select id="dateRange" value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="select-input">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="all">All Transactions</option>
          </select>
          <ExportButton />
        </div>
      </div>

      {/* Summary Cards */}
      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {[ 
          { title: "Total Income", value: totals.income, bg: "#4CAF50" },
          { title: "Total Expenses", value: totals.expenses, bg: "#F44336" },
          { title: "Net Savings", value: totals.net, bg: "#673AB7" },
        ].map(card => (
          <div key={card.title} style={{ flex: 1, minWidth: "200px", padding: "2rem", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", backgroundColor: card.bg }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{card.title}</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{formatCurrency(card.value)}</p>
          </div>
        ))}
      </section>

      {/* Line Chart */}
      <section style={{ height: "350px", width: "100%", padding: "1rem 1rem 4rem 1rem", backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5", borderRadius: "12px" }}>
        <h3 style={{ color: theme === "dark" ? "#fff" : "#000" }}>Income vs Expenses (Line Chart)</h3>
        <Line data={timeSeriesData} options={{ ...lineBarOptions, plugins: { ...lineBarOptions.plugins, legend: { ...lineBarOptions.plugins.legend, labels: { color: theme === "dark" ? "#fff" : "#000" } } }, scales: { y: { ...lineBarOptions.scales.y, ticks: { color: theme === "dark" ? "#fff" : "#000" } }, x: { ...lineBarOptions.scales.x, ticks: { ...lineBarOptions.scales.x.ticks, color: theme === "dark" ? "#fff" : "#000" } } } }} />
      </section>

      {/* Bar Chart */}
      <section style={{ height: "350px", width: "100%", padding: "1rem 1rem 4rem 1rem", backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5", borderRadius: "12px" }}>
        <h3 style={{ color: theme === "dark" ? "#fff" : "#000" }}>Income vs Expenses (Bar Chart)</h3>
        <Bar data={timeSeriesData} options={{ ...lineBarOptions, plugins: { ...lineBarOptions.plugins, legend: { ...lineBarOptions.plugins.legend, labels: { color: theme === "dark" ? "#fff" : "#000" } } }, scales: { y: { ...lineBarOptions.scales.y, ticks: { color: theme === "dark" ? "#fff" : "#000" } }, x: { ...lineBarOptions.scales.x, ticks: { ...lineBarOptions.scales.x.ticks, color: theme === "dark" ? "#fff" : "#000" } } } }} />
      </section>

      {/* Pie Chart */}
      <section style={{ height: "350px", padding: "1rem", backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5", borderRadius: "12px" }}>
        <h3 style={{ color: theme === "dark" ? "#fff" : "#000" }}>Category-wise Expenses</h3>
        <Pie data={pieChartData} options={{ ...pieOptions, plugins: { ...pieOptions.plugins, legend: { ...pieOptions.plugins.legend, labels: { color: theme === "dark" ? "#fff" : "#000" } } } }} />
      </section>
    </div>
  );
};

export default Reports;