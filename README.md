<<<<<<< HEAD
# Expense-tracker
=======
Finance Dashboard

A simple, interactive finance dashboard built with React to visualize transactions, track expenses, and analyze income. This project demonstrates frontend development skills, component structuring, state management, and data visualization.
________________________________________

Project Structure
finance-dashboard/
├─ public/
│  └─ index.html
├─ src/
│  ├─ assets/           # Images and icons
│  ├─ components/       # Reusable UI components (Header, Sidebar, ExportButton, DeleteModal, InsightCard, Insights, TransactionModal, TransactionTable)
│  ├─ context/          # State management (StoreProvider, StoreContext)
│  ├─ pages/            # Pages (Dashboard, Transactions, Reports, Settings)
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ vite.config.js
└─ README.md
________________________________________

Getting Started
Prerequisites
•	Node.js >= 18.x
•	npm or yarn
Installation
# Clone the repository
git clone <your-repo-link>
cd finance-dashboard

# Install dependencies
npm install
# or
yarn install
Running the App
npm run dev
# or
yarn dev
Open the app in your browser at http://localhost:5173.
________________________________________

Features
1. Dashboard Overview
•	Summary cards showing Total Income, Total Expenses, and Net Savings.
•	Line & Bar charts to visualize income vs expenses trends.
•	Pie chart to display category-wise expenses.

2. Transactions Section
•	Lists all transactions with Date, Amount, Category, and Type.
•	Filter transactions by Weekly, Monthly, or Yearly date ranges.
•	Role-based UI:
o	Admin: Can add/edit transactions.
o	Viewer: Can only view transactions.

3. Reports & Insights
•	Highest spending category highlighted via Pie chart.
•	Monthly and yearly comparisons of income vs expenses.
•	Visual insights for quick financial decision-making.

4. State Management
•	Managed using React Context.
•	Handles transactions, filters, roles, and theme (dark/light mode).

5. Export Functionality
•	Export filtered transaction data to CSV or JSON using the Export button.
________________________________________

UI/UX
•	Clean and responsive design for multiple screen sizes.
•	Handles empty/no data gracefully with charts and summaries.
•	Supports dark mode for better readability in low-light environments.
________________________________________

Role-Based Behavior
•	Admin role: Full control to add, edit, and view transactions.
•	Viewer role: View-only access; UI controls for editing/adding are hidden or disabled.
•	Role switching available via dropdown in the header.
________________________________________

Charts
•	Line & Bar Charts: Compare income and expenses over time (weekly, monthly, yearly).
•	Pie Chart: Shows category-wise expense distribution.
•	Fully responsive and adapts to screen size.
•	Dark mode friendly: Labels and chart text adjust to theme.
________________________________________

Observations & Insights
•	Quickly identify high-spending categories.
•	Track net savings month-over-month.
•	Helps users make informed financial decisions.
________________________________________

Technology Stack
•	React 18
•	Vite
•	React Router
•	Chart.js
•	CSS / Custom Styling
•	Optional: Dark mode, CSV/JSON export
________________________________________

Optional Enhancements Implemented
•	Dark mode toggle
•	Role-based UI simulation
•	Responsive design
•	Export functionality (CSV/JSON)
________________________________________

Author
Hiranmai Kuruvella

>>>>>>> 99f38ea (Initial commit)
