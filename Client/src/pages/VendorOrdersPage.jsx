import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const VendorOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const vendorData = JSON.parse(localStorage.getItem("vendor"));
  const vendorId = vendorData?.id; // Ensure vendorData exists and has an 'id' property
  const [updatedOrders, setUpdatedOrders] = useState([]);

  const handleUpdateShippingStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/vendor/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          shipping_status: newStatus,
        }),
      });
  
     
    const data = await response.json();
    if (data.success) {
      alert(data.message || "Shipping status updated successfully");

      // Update the local state to reflect the new shipping status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, shipping_status: newStatus } : order
        )
      );
    } else {
      alert(data.message || "Failed to update shipping status");
    }
  } catch (error) {
    console.error("Error updating shipping status:", error);
    alert("Something went wrong. Please try again.");
  }
  };
  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!vendorId) {
          throw new Error("Vendor ID not found. Please log in.");
        }

        const response = await fetch(`http://127.0.0.1:8000/api/vendor/orders?vendor_id=${vendorId}`);
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [vendorId]); 

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "unsuccessful":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-grow pt-40 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Orders</h1>

          {/* Orders List */}
          <div className="space-y-6 mt-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No orders available.</p>
              </div>
            ) : (
              orders.map((order) => (
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
                        <p className="text-sm font-medium text-gray-900">{order.full_name}</p>
                        <p className="text-sm text-gray-600">{order.email_address}</p>
                        <p className="text-sm text-gray-600">{order.phone_number}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Shipping Address:</p>
                        <p className="text-sm text-gray-600">{order.shippingaddress}</p>
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
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item Name
                          </th>
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
          Rs. {typeof order.total === 'number' ? order.total.toFixed(2) : 'N/A'}
        </span>
                    </div>
                   {/* Shipping Status Selector */}
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">Shipping Status</label>
    <select
      value={order.shipping_status || 'processing'} // Bind the value to the current shipping status
      onChange={(e) => handleUpdateShippingStatus(order.id, e.target.value)} // Update the status on change
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="processing">processing</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="canceled">canceled</option>
    </select>
  </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorOrdersPage;