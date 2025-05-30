import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const logo = process.env.PUBLIC_URL + "/assets/logo.png";

const AdminVendorReqPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending vendors from the backend
  useEffect(() => {
    const fetchPendingVendors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/vendors/pending');
        if (!response.ok) {
          throw new Error('Failed to fetch vendors');
        }
        const data = await response.json();
        setVendors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vendors:', error.message);
        setLoading(false);
      }
    };

    fetchPendingVendors();
  }, []);

  // Handle Approve/Reject Actions
  const handleAction = async (id, action) => {
    try {
      let url;
      if (action === 'Approved') {
        url = `http://127.0.0.1:8000/api/admin/vendors/${id}/approve`;
      } else if (action === 'Rejected') {
        url = `http://127.0.0.1:8000/api/admin/vendors/${id}/reject`;
      }

      const response = await fetch(url, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to update vendor status');
      }

      // Update the local state
      setVendors((prevVendors) =>
        prevVendors.filter((vendor) => vendor.id !== id)
      );

      // Show toast notification
      if (action === 'Approved') {
        toast.success(`Vendor ${action} successfully!`, { autoClose: 1000 });
      } else if (action === 'Rejected') {
        toast.error(`Vendor ${action} successfully!`, { autoClose: 1000 });
      }
    } catch (error) {
      console.error('Error updating vendor status:', error.message);
      toast.error('Failed to update vendor status. Please try again.', { autoClose: 1000 });
    }
  };

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
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${
                    isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <Home className="w-5 h-5 mr-2" /> Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/vendor-requests"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${
                    isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <Users className="w-5 h-5 mr-2" /> Vendor Requests
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${
                    isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> Orders Management
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/events"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${
                    isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <Calendar className="w-5 h-5 mr-2" /> Event Management
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${
                    isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                <Package className="w-5 h-5 mr-2" /> Products Management
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button
            className="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center hover:bg-red-600"
            onClick={() => {
              // Handle logout logic here
              window.location.href = '/admin/login';
            }}
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Vendor Registration Requests</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Vendor Name</th>
                      <th className="border border-gray-300 p-2">Business Name</th>
                      <th className="border border-gray-300 p-2">Mobile</th>
                      <th className="border border-gray-300 p-2">Address</th>
                      <th className="border border-gray-300 p-2">NIC</th>
                      <th className="border border-gray-300 p-2">Email</th>
                      <th className="border border-gray-300 p-2">Description</th>
                      <th className="border border-gray-300 p-2">Product Types</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border border-gray-300">
                        <td className="border border-gray-300 p-2">{vendor.full_name}</td>
                        <td className="border border-gray-300 p-2">{vendor.business_name}</td>
                        <td className="border border-gray-300 p-2">{vendor.mobile_number}</td>
                        <td className="border border-gray-300 p-2">{vendor.address}</td>
                        <td className="border border-gray-300 p-2">{vendor.nic}</td>
                        <td className="border border-gray-300 p-2">{vendor.email}</td>
                        <td className="border border-gray-300 p-2">{vendor.product_description}</td>
                        <td className="border border-gray-300 p-2">{vendor.product_types}</td>
                        <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                          <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => handleAction(vendor.id, 'Approved')}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleAction(vendor.id, 'Rejected')}
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AdminVendorReqPage;