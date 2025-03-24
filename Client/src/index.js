import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import ScrollToTop from "./components/ScrollToTop";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorLoginPage from "./pages/VendorLoginPage";
import CustomerLoginPage from "./pages/CustomerLoginPage";
import VendorRegistrationPage from "./pages/VendorRegistrationPage";
import HomePage from "./pages/HomePage";
import CustomerRegistrationPage from "./pages/CustomerRegistrationPage";
import EventPage from "./pages/EventPage";
import ProductPage from "./pages/ProductPage";
import OffersPage from "./pages/OffersPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WhishlistPage from "./pages/WhishlistPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CheckoutPage from "./pages/CheckoutPage";
import CustomerEditProfilePage from "./pages/CustomerEditProfilePage";
import VendorProfilePage from "./pages/VendorProfilePage";
import VendorEventPage from "./pages/VendorEventPage";
import VendorOrdersPage from "./pages/VendorOrdersPage";
import WelcomePage from "./pages/WelcomePage";
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminVendorReqPage from './pages/Admin/AdminVendorReqPage';
import AdminOrdersPage from './pages/Admin/AdminOrdersPage';
import AdminEventPage from './pages/Admin/AdminEventPage';
import AdminProductPage from './pages/Admin/AdminProductPage';
import OTPVerifyPage from './pages/OTPVerifyPage';
import VendorReviewPage from './pages/VendorReviewPage';
import "./index.css"; // Tailwind CSS styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <ScrollToTop />
      <Routes>
      <Route path="" element={<WelcomePage  />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/vendor/login" element={<VendorLoginPage />} />
        <Route path="/vendor/register" element={<VendorRegistrationPage />} />
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/register" element={<CustomerRegistrationPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/whish" element={<WhishlistPage />} />
        <Route path="/confirm" element={<OrderConfirmationPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/editprofile" element={<CustomerEditProfilePage />} />
        <Route path="/vendor/profile" element={<VendorProfilePage />} />
        <Route path="/vendor/event" element={<VendorEventPage />} />
        <Route path="/vendor/orders" element={<VendorOrdersPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/vendor-requests" element={<AdminVendorReqPage />} />
        <Route path="/vendor/review" element={<VendorReviewPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/events" element={<AdminEventPage />} />
        <Route path="/admin/products" element={<AdminProductPage />} />
        <Route path="/otp" element={<OTPVerifyPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
