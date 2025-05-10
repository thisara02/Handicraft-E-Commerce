import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from 'lucide-react';

const logo = process.env.PUBLIC_URL + "/assets/logo.png";

const AdminDashboardPage = () => {
  const [username, setUsername] = useState('');
  const [events, setEvents] = useState([]); // State to store fetched events
  const navigate = useNavigate();
  const [approvedVendorsCount, setApprovedVendorsCount] = useState(0);
  const [pendingVendorsCount, setPendingVendorsCount] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pendingProductsCount, setPendingProductsCount] = useState(0); 
  const [totalOrderCount, setTotalOrderCount] = useState(0); // State for total order count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingProductsCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/products/pending-count');
        if (!response.ok) {
          throw new Error('Failed to fetch pending products count');
        }
        const data = await response.json();
        setPendingProductsCount(data.pendingProductsCount);
      } catch (error) {
        console.error('Error fetching pending products count:', error.message);
      }
    };
    fetchPendingProductsCount();
  }, []);

  // Fetch total customer count
  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/customers/total');
        if (!response.ok) {
          throw new Error('Failed to fetch total customers');
        }
        const data = await response.json();
        setTotalCustomers(data.totalCustomers);
      } catch (error) {
        console.error('Error fetching total customers:', error.message);
      }
    };
    fetchTotalCustomers();
  }, []);

  // Fetch total approved vendor count
  useEffect(() => {
    const fetchApprovedVendorsCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/vendors/approved-count');
        if (!response.ok) {
          throw new Error('Failed to fetch approved vendors count');
        }
        const data = await response.json();
        setApprovedVendorsCount(data.approvedVendorsCount);
      } catch (error) {
        console.error('Error fetching approved vendors count:', error.message);
      }
    };
    fetchApprovedVendorsCount();
  }, []);

  // Fetch pending vendor count
  useEffect(() => {
    const fetchPendingVendorsCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/vendors/pending-count');
        if (!response.ok) {
          throw new Error('Failed to fetch pending vendors count');
        }
        const data = await response.json();
        setPendingVendorsCount(data.pendingVendorsCount);
      } catch (error) {
        console.error('Error fetching pending vendors count:', error.message);
      }
    };
    fetchPendingVendorsCount();
  }, []);

  useEffect(() => {
    // Retrieve username from localStorage
    const adminUsername = localStorage.getItem('admin_username');
    if (adminUsername) {
      setUsername(adminUsername);
    } else {
      // Redirect to login if no username is found
      navigate('/admin/login');
    }

    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        data.events.forEach((event) => {
          console.log('Image URL:', `http://127.0.0.1:8000/storage/${event.poster}`);
        });
        setEvents(data.events.map((event) => ({
          ...event,
          posterUrl: `http://127.0.0.1:8000/storage/${event.poster}`, // Construct the full URL
        }))); // Set events in state
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };
    fetchEvents();
  }, [navigate]);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('admin_username');
    // Redirect to login page
    navigate('/admin/login');
  };

  const totalUsers = approvedVendorsCount + totalCustomers;

  useEffect(() => {
    const fetchTotalOrderCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/orders/total-count");
        const data = await response.json();
        if (data.success) {
          setTotalOrderCount(data.total_count);
        } else {
          setError(data.message || "Failed to fetch total order count.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong while fetching total order count.");
      } finally {
        setLoading(false);
      }
    };
    fetchTotalOrderCount();
  }, []);

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
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Logged in as:</p>
              <p className="text-lg font-semibold text-gray-800">{username}</p>
            </div>
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
                  <div className="text-6xl font-bold">{totalUsers}</div>
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
                  <div className="text-6xl font-bold">{totalCustomers}</div>
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
                  <div className="text-6xl font-bold">{approvedVendorsCount}</div>
                  <div className="text-sm">Vendors</div>
                </div>
              </div>
              {/* Pending Vendor Registration Requests */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4">
                  <h3 className="text-xl font-semibold mb-2">Pending Vendor Registrations</h3>
                  <div className="text-3xl font-bold text-red-600">{pendingVendorsCount}</div>
                </div>
              </div>
              {/* Pending Product Approval Requests */}
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 rounded-lg shadow-lg flex items-center">
                <div className="mr-4">
                  <h3 className="text-xl font-semibold mb-2">Pending Product Approvals</h3>
                  <div className="text-3xl font-bold text-orange-600">{pendingProductsCount}</div>
                </div>
              </div>
              {/* Total Order Count Section */}
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 rounded-lg shadow-lg flex items-center">
              
              <div className="mr-4">
              {/* Pending Orders Count */}
                  
                      <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
                      <div className="text-3xl font-bold text-yellow-600">{totalOrderCount}</div>
                   
                </div>
              </div>
            </div>
            {/* Upcoming Events */}
            <div className="bg-gradient-to-r from-blue-200 to-cyan-300 p-6 rounded-lg shadow-lg w-auto">
              <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
              <div className="flex flex-wrap gap-4">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-4 bg-indigo-100 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3"
                    >
                      {/* Event Poster Image */}
                      <div className="mb-4">
                        <img
                          src={event.posterUrl} // Use the constructed URL
                          alt={`${event.name} Poster`}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                      {/* Event Details */}
                      <h4 className="text-lg font-semibold text-indigo-600 mb-2">{event.name}</h4>
                      <p className="text-gray-500">{event.description}</p>
                      <p className="text-gray-500">{event.location}</p>
                      <p className="text-gray-500">{event.organizer}</p>
                      <span className="mt-2 text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No upcoming events available.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;