import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from 'lucide-react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
const logo = process.env.PUBLIC_URL + "/assets/logo.png";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '', timer: 0 });

  // Fetch pending products from the backend
  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/products/pending');
        if (!response.ok) {
          throw new Error('Failed to fetch pending products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching pending products:', error.message);
      }
    };

    fetchPendingProducts();
  }, []);

  // Approve a product
  const approveProduct = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/products/${productId}/approve`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to approve product');
      }
      const data = await response.json();
      setToast({ message: data.message, type: 'success', timer: 100 });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error approving product:', error.message);
      setToast({ message: 'Failed to approve product', type: 'error', timer: 100 });
    }
  };

  // Reject a product
  const rejectProduct = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/products/${productId}/reject`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to reject product');
      }
      const data = await response.json();
      setToast({ message: data.message, type: 'success', timer: 100 });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error rejecting product:', error.message);
      setToast({ message: 'Failed to reject product', type: 'error', timer: 100 });
    }
  };

  useEffect(() => {
    if (toast.timer > 0) {
      const timer = setInterval(() => {
        setToast((prevToast) => ({
          ...prevToast,
          timer: prevToast.timer - 1,
        }));
      }, 30); // Updates the timer every 30ms

      return () => clearInterval(timer); // Clean up the timer on unmount
    } else {
      setTimeout(() => setToast({ message: '', type: '', timer: 0 }), 300); // Hide toast after it disappears
    }
  }, [toast.timer]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md min-h-screen flex flex-col">
        <div className="p-4 flex items-center justify-center">
          <img src={logo} alt="Company Logo" className="h-16" />
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul>
            <li className="mb-2">
              <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center px-4 py-2 rounded ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'}`}>
                <Home className="w-5 h-5 mr-2" /> Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin/vendor-requests" className={({ isActive }) => `flex items-center px-4 py-2 rounded ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'}`}>
                <Users className="w-5 h-5 mr-2" /> Vendor Requests
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center px-4 py-2 rounded ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'}`}>
                <ShoppingCart className="w-5 h-5 mr-2" /> Orders Management
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin/events" className={({ isActive }) => `flex items-center px-4 py-2 rounded ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'}`}>
                <Calendar className="w-5 h-5 mr-2" /> Event Management
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin/products" className={({ isActive }) => `flex items-center px-4 py-2 rounded ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'}`}>
                <Package className="w-5 h-5 mr-2" /> Products Management
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button className="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center hover:bg-red-600" onClick={() => { 
            window.location.href = '/admin/login'; 
          }}>
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Product Approval</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Product List for Approval */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Pending Products for Approval</h2>

              {/* Toast Notifications */}
              {toast.message && (
                <div className={`fixed top-16 right-4 p-4 rounded-md text-white ${toast.type === 'success' ? 'bg-green-400' : 'bg-red-600'} transition-all duration-300 ease-in-out transform`}>
                  <div className="flex items-center">
                    <div className="mr-2">
                      {toast.type === 'success' ? <FaCheckCircle size={20} /> : <FaTimesCircle size={20} />}
                    </div>
                    <div>{toast.message}</div>
                  </div>
                  {/* Timer Bar */}
                  <div className="relative mt-2 h-1 bg-gray-400 rounded-full">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-[${toast.timer}ms] bg-${toast.type === 'success' ? 'green' : 'red'}-500`}
                      style={{ width: `${(toast.timer / 100) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Product List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div key={product.id} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">Vendor: {product.vendor}</p>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                    <p className="text-sm text-gray-600">Price: ${product.price}</p>
                    <p className="text-sm text-gray-500">Description: {product.description}</p>

                   {/* Approve and Reject Buttons */}
                   <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => approveProduct(product.id)}
                        className="text-green-600 hover:text-green-800 transition duration-200 ease-in-out"
                      >
                        <FaCheckCircle size={24} />
                      </button>
                      <button
                        onClick={() => rejectProduct(product.id)}
                        className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                      >
                        <FaTimesCircle size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProductPage;