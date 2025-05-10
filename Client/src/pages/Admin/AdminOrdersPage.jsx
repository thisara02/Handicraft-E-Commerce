import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from "lucide-react";

const logo = process.env.PUBLIC_URL + "/assets/logo.png";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/orders");
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate total counts for each order status
  const getTotalCountByStatus = (status) => {
    return orders.filter((order) => order.shipping_status === status).length;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
                    isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:bg-gray-200"
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
                    isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:bg-gray-200"
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
                    isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:bg-gray-200"
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
                    isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:bg-gray-200"
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
                    isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:bg-gray-200"
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
              window.location.href = "/admin/login";
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
            <h1 className="text-3xl font-bold text-gray-900">Orders Summary</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Total Order Count Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Total Order Counts</h2>
              <div className="grid grid-cols-4 gap-4">
        
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Processing</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("processing")}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Shipped</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("shipped")}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("delivered")}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Canceled</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("Canceled")}</p>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Vendor Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Payment Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Shipping Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.vendor_name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer_name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.email_address}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.phone_number}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.payment_status}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.shipping_status}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Rs. {order.total_amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminOrdersPage;