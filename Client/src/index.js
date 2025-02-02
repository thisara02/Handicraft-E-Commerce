import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorLoginPage from "./pages/VendorLoginPage";
import CustomerLoginPage from "./pages/CustomerLoginPage";
import VendorRegistrationPage from "./pages/VendorRegistrationPage";
import CustomerRegistrationPage from "./pages/CustomerRegistrationPage";
import "./index.css"; // Tailwind CSS styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="" element={<CustomerLoginPage />} />
        <Route path="/vendor-login" element={<VendorLoginPage />} />
        <Route path="/vendor-register" element={<VendorRegistrationPage />} />
        <Route path="/customer-login" element={<CustomerLoginPage />} />
        <Route path="/customer-register" element={<CustomerRegistrationPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
