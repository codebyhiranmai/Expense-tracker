// main.jsx
// Entry point of the React application.
// Renders the <App /> component into the root div in index.html.
// React.StrictMode is used to highlight potential problems in development.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);