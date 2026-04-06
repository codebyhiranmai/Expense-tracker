// src/components/InsightCard.jsx
// Reusable card component to display key insights or metrics in the Finance Dashboard.
// Can display a title, value, optional subtitle, and an icon with custom colors.

import React from "react";

/**
 * InsightCard
 * @param {string} title - Main title of the card (e.g., "Total Income").
 * @param {string|number} value - Primary value to display.
 * @param {string} subText - Optional secondary text or subtitle.
 * @param {string} bgColor - Background color class for the icon container (default: "bg-gray").
 * @param {React.ReactNode} icon - Icon element to display in the card.
 * @param {string} textColor - Optional text color for the value.
 */
const InsightCard = ({ title, value, subText = "", bgColor = "bg-gray", icon, textColor = "" }) => {
  return (
    <div className="insight-card">
      {/* Icon container */}
      <div className={`insight-icon ${bgColor}`}>
        {icon}
      </div>

      {/* Text information */}
      <div className="insight-info">
        <h3>{title}</h3>
        <p className="insight-value" style={{ color: textColor }}>{value}</p>
        {subText && <small className="insight-subtitle">{subText}</small>}
      </div>
    </div>
  );
};

export default InsightCard;