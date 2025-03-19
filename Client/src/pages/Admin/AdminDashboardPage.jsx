import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from 'lucide-react';
const logo = process.env.PUBLIC_URL + "/assets/logo.png";

const AdminDashboardPage = () => {
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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-14">
              {/* Total Count of Users - Customers and Vendors */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                  <p className="text-white">Customers and Vendors</p>
                </div>
                <div className="flex flex-col items-center text-white">
                  <div className="text-6xl font-bold">1234</div> {/* Increased Font Size */}
                  <div className="text-sm">Total</div>
                </div>
              </div>

              {/* Total Customer Count */}
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Customers</h3>
                  <p className="text-white">Total Customers in the System</p>
                </div>
                <div className="flex flex-col items-center text-white">
                  <div className="text-6xl font-bold">900</div> {/* Increased Font Size */}
                  <div className="text-sm">Customers</div>
                </div>
              </div>

              {/* Total Vendor Count */}
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Vendors</h3>
                  <p className="text-white">Total Vendors in the System</p>
                </div>
                <div className="flex flex-col items-center text-white">
                  <div className="text-6xl font-bold">334</div> {/* Increased Font Size */}
                  <div className="text-sm">Vendors</div>
                </div>
              </div>

              {/* Pending Vendor Registration Requests */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4">
                  <h3 className="text-xl font-semibold mb-2">Pending Vendor Registrations</h3>
                  <div className="text-3xl font-bold text-red-600">5</div> {/* Example Count */}
                </div>
              </div>

              {/* Pending Product Approval Requests */}
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4">
                  <h3 className="text-xl font-semibold mb-2">Pending Product Approvals</h3>
                  <div className="text-3xl font-bold text-orange-600">8</div> {/* Example Count */}
                </div>
              </div>

              {/* Pending Orders Count */}
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4">
                  <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
                  <div className="text-3xl font-bold text-yellow-500">12</div> {/* Example Count */}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gradient-to-r from-blue-200 to-cyan-300 p-6 rounded-lg shadow-lg w-auto">
              <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
              <div className="flex flex-wrap gap-4">
                {/* Event Card 1 */}
                <div className="flex flex-col p-4 bg-indigo-100 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                  <h4 className="text-lg font-semibold text-indigo-600 mb-2">Event Name 1</h4>
                  <p className="text-gray-500">A brief description or details about the event.</p>
                  <span className="mt-2 text-gray-400">March 25, 2025</span>
                </div>

                {/* Event Card 2 */}
                <div className="flex flex-col p-4 bg-indigo-100 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                  <h4 className="text-lg font-semibold text-indigo-600 mb-2">Event Name 2</h4>
                  <p className="text-gray-500">A brief description or details about the event.</p>
                  <span className="mt-2 text-gray-400">April 5, 2025</span>
                </div>

                {/* Event Card 3 */}
                <div className="flex flex-col p-4 bg-indigo-100 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                  <h4 className="text-lg font-semibold text-indigo-600 mb-2">Event Name 3</h4>
                  <p className="text-gray-500">A brief description or details about the event.</p>
                  <span className="mt-2 text-gray-400">April 20, 2025</span>
                </div>
                <div className="flex flex-col p-4 bg-indigo-100 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                  <h4 className="text-lg font-semibold text-indigo-600 mb-2">Event Name 4</h4>
                  <p className="text-gray-500">A brief description or details about the event.</p>
                  <span className="mt-2 text-gray-400">April 20, 2025</span>
                </div>

                {/* More Events can be added here similarly */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
