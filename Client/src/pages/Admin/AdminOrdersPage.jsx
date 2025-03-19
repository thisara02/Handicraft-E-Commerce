import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from 'lucide-react';
const logo =  process.env.PUBLIC_URL + "/assets/logo.png";

const AdminOrdersPage = () => {

  const vendorsData = [
    {
      id: "V001",
      name: "Vendor One",
      email: "vendor1@example.com",
      contact: "555-987-6543",
      orders: [
        { id: "ORD-2023-001", status: "Processing" },
        { id: "ORD-2023-002", status: "Shipped" },
        { id: "ORD-2023-003", status: "Delivered" },
        { id: "ORD-2023-004", status: "Pending" },
        { id: "ORD-2023-005", status: "Delivered" },
        { id: "ORD-2023-001", status: "Processing" },
        { id: "ORD-2023-002", status: "Shipped" },
        { id: "ORD-2023-003", status: "Delivered" },
        { id: "ORD-2023-004", status: "Pending" },
        { id: "ORD-2023-005", status: "Delivered" }
      ]
    },
    {
      id: "V002",
      name: "Vendor Two",
      email: "vendor2@example.com",
      contact: "555-123-4567",
      orders: [
        { id: "ORD-2023-006", status: "Shipped" },
        { id: "ORD-2023-007", status: "Processing" },
        { id: "ORD-2023-008", status: "Delivered" }
      ]
    }
  ];

  const [vendors,] = useState(vendorsData);

  const getOrderCountByStatus = (vendor, status) => {
    return vendor.orders.filter((order) => order.status === status).length;
  };

  // Calculate total counts for each order status across all vendors
  const getTotalCountByStatus = (status) => {
    return vendors.reduce((total, vendor) => {
      return total + vendor.orders.filter((order) => order.status === status).length;
    }, 0);
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
            // Handle logout logic here
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
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("Pending")}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Processing</p>
            <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("Processing")}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Shipped</p>
            <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("Shipped")}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-2xl font-bold text-gray-900">{getTotalCountByStatus("Delivered")}</p>
          </div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Vendor ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Vendor Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Orders</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Processing Orders</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Shipped Orders</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Delivered Orders</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.contact}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{getOrderCountByStatus(vendor, "Pending")}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{getOrderCountByStatus(vendor, "Processing")}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{getOrderCountByStatus(vendor, "Shipped")}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{getOrderCountByStatus(vendor, "Delivered")}</td>
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
