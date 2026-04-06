// src/pages/Settings.jsx
import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";

/**
 * Settings Page
 */
const Settings = () => {
  const { theme, setTheme, profile, setProfile, currency, setCurrency } = useContext(StoreContext);
  const [password, setPassword] = useState("");

  // Update profile fields dynamically
  const handleProfileChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Toggle between light and dark themes
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="settings-page page-column">
      
      {/* Profile Section */}
      <SectionCard title="Profile">
        <div className="form-column">
          <InputField label="Name" name="name" value={profile.name} onChange={handleProfileChange} />
          <InputField label="Email" type="email" name="email" value={profile.email} onChange={handleProfileChange} />
          <button className="btn btn-primary">Save Profile</button>
        </div>
      </SectionCard>

      {/* Preferences Section */}
      <SectionCard title="Preferences">
        <div className="form-column">
          <button className="btn btn-outline" onClick={toggleTheme}>
            Toggle Theme ({theme})
          </button>

          <SelectField
            label="Currency"
            value={currency.code}
            onChange={(e) => {
              const selected = e.target.value;
              const symbol = selected === "USD" ? "$" : selected === "EUR" ? "€" : "₹";
              setCurrency({ code: selected, symbol });
            }}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
          </SelectField>

          <SelectField label="Notifications">
            <option value="all">All</option>
            <option value="important">Important Only</option>
            <option value="none">None</option>
          </SelectField>
        </div>
      </SectionCard>

      {/* Security Section */}
      <SectionCard title="Security">
        <div className="form-column">
          <InputField label="Change Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-primary">Update Password</button>
          <button className="btn btn-outline">Logout</button>
        </div>
      </SectionCard>
    </div>
  );
};

/* -------------------- Helper Components -------------------- */

/**
 * Section Card Wrapper
 */
const SectionCard = ({ title, children }) => (
  <section
    style={{
      backgroundColor: "var(--bg-card)",
      padding: "1.5rem",
      borderRadius: "12px",
      border: "1px solid var(--border-color)",
      marginBottom: "1.5rem",
    }}
  >
    <h2>{title}</h2>
    {children}
  </section>
);

/**
 * Input Field
 */
const InputField = ({ label, ...props }) => (
  <div className="form-group" style={{ marginBottom: "1rem" }}>
    <label>{label}</label>
    <input className="form-input" {...props} />
  </div>
);

/**
 * Select Field
 */
const SelectField = ({ label, children, ...props }) => (
  <div className="form-group" style={{ marginBottom: "1rem" }}>
    <label>{label}</label>
    <select className="select-input" {...props}>
      {children}
    </select>
  </div>
);

export default Settings;