import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const OrderConfirmationPage = () => {
  // Generate a random order ID
  const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
  
  return (
    <div>
      <NavBar />
      <div className="max-w-3xl mx-auto p-6 pt-40 pb-24">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is now being
            processed.
          </p>
          
          <div className="bg-gray-50 p-4 rounded mb-6">
            <p className="text-sm text-gray-700 mb-2">Order Reference:</p>
            <p className="text-lg font-bold text-gray-800">{orderId}</p>
          </div>
          
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to your email address.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors"
            >
              Continue Shopping
            </Link>
            
            <Link
              to="/account"
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300 transition-colors"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;