import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from 'lucide-react';
const logo =  process.env.PUBLIC_URL + "/assets/logo.png";

const AdminVendorReqPage = () => {
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
            <h1 className="text-3xl font-bold text-gray-900">Vendor Registrations Requests</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Welcome to your dashboard</h2>
                <p className="text-gray-500">This is where you would manage your application.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminVendorReqPage;
