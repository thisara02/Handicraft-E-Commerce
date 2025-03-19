import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar2";
import Footer from "../components/Footer1";

// Main Component
const VendorOrdersPage = () => {
  // Sample order data - in a real app, this would come from an API
  const [orders, setOrders] = useState([
    {
      id: "ORD-2023-001",
      date: "2025-03-18",
      status: "Processing",
      customer: {
        name: "Alex Johnson",
        email: "alex.j@example.com",
        phone: "555-123-4567",
        shippingAddress: "123 Pine Street, Apt 4B, Portland, OR 97204"
      },
      items: [
        { name: "Blue Cotton T-Shirt", price: 24.99, quantity: 2 },
        { name: "Black Denim Jeans", price: 59.99, quantity: 1 }
      ],
      total: 109.97
    },
    {
      id: "ORD-2023-002",
      date: "2025-03-17",
      status: "Shipped",
      customer: {
        name: "Sarah Williams",
        email: "s.williams@example.com",
        phone: "555-987-6543",
        shippingAddress: "456 Oak Avenue, Suite 300, Seattle, WA 98101"
      },
      items: [
        { name: "Red Leather Wallet", price: 34.99, quantity: 1 },
        { name: "Silver Watch", price: 129.99, quantity: 1 }
      ],
      total: 164.98
    },
    {
      id: "ORD-2023-003",
      date: "2025-03-15",
      status: "Delivered",
      customer: {
        name: "Michael Chen",
        email: "m.chen@example.com",
        phone: "555-456-7890",
        shippingAddress: "789 Maple Road, San Francisco, CA 94107"
      },
      items: [
        { name: "Wireless Headphones", price: 89.99, quantity: 1 },
        { name: "Phone Case", price: 19.99, quantity: 1 },
        { name: "USB-C Cable", price: 14.99, quantity: 2 }
      ],
      total: 139.96
    }
  ]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  
  // Status update modal state
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Apply filters when either filter changes
  useEffect(() => {
    let result = [...orders];
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(order => 
        order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Apply date filter
    if (dateFilter !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      const getDateRange = () => {
        switch(dateFilter) {
          case "today":
            return { start: today, end: new Date() };
          case "week": {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
            return { start: weekStart, end: new Date() };
          }
          case "month": {
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            return { start: monthStart, end: new Date() };
          }
          default:
            return null;
        }
      };
      
      const range = getDateRange();
      if (range) {
        result = result.filter(order => {
          const orderDate = new Date(order.date);
          return orderDate >= range.start && orderDate <= range.end;
        });
      }
    }
    
    setFilteredOrders(result);
  }, [statusFilter, dateFilter, orders]);

  // Handler for updating order status
  const updateOrderStatus = () => {
    if (!selectedOrderId || !newStatus) return;
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === selectedOrderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    setShowStatusModal(false);
    setSelectedOrderId(null);
    setNewStatus("");
  };

  // Open status update modal
  const openStatusModal = (orderId, currentStatus) => {
    setSelectedOrderId(orderId);
    setNewStatus(currentStatus);
    setShowStatusModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-grow pt-40 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Vendor Orders</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track all your customer orders
            </p>
          </div>

          {/* Order Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <select
                  id="date-filter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All time</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No orders match your current filters.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium">{order.id}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>Order Date: {order.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Customer Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Shipping Address:</p>
                        <p className="text-sm text-gray-600">{order.customer.shippingAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Order Items
                    </h4>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              Rs. {item.price.toFixed(2)}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              Rs. {(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Order Total */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-gray-900">
                        Rs. {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Status Update Button */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <button
                      onClick={() => openStatusModal(order.id, order.status)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Update Order Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mb-4 p-2 w-full border rounded-md"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={updateOrderStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md text-sm ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorOrdersPage;
