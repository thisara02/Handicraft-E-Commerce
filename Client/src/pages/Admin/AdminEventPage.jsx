import React, { useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Home, Users, ShoppingCart, Calendar, Package, LogOut } from 'lucide-react';

const logo = process.env.PUBLIC_URL + "/assets/logo.png";

const AdminEventPage = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');
  const [eventPoster, setEventPoster] = useState(null);
  const fileInputRef = useRef(null); // Ref for the file input

  // Add new event to the database
  const addEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('date', eventDate);
    formData.append('location', eventLocation);
    formData.append('description', eventDescription);
    formData.append('organizer', eventOrganizer);
    formData.append('poster', eventPoster); // Append the file

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/events', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Event added successfully!');
        // Reset the form
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setEventDescription('');
        setEventOrganizer('');
        setEventPoster(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input
        }
      } else {
        alert(data.message || 'Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Remove event from the list
  const removeEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEventPoster(file); // Store the file object for sending to the backend
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
            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Add Event Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
              <form onSubmit={addEvent}>
                {/* Event Name */}
                <div className="mb-4">
                  <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter event name"
                  />
                </div>
                {/* Event Date */}
                <div className="mb-4">
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Event Location */}
                <div className="mb-4">
                  <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">
                    Event Location
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter event location"
                  />
                </div>
                {/* Event Description */}
                <div className="mb-4">
                  <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                    Event Description
                  </label>
                  <textarea
                    id="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    required
                    rows="4"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter event description"
                  ></textarea>
                </div>
                {/* Event Organizer */}
                <div className="mb-4">
                  <label htmlFor="eventOrganizer" className="block text-sm font-medium text-gray-700">
                    Organizer
                  </label>
                  <input
                    type="text"
                    id="eventOrganizer"
                    value={eventOrganizer}
                    onChange={(e) => setEventOrganizer(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter event organizer"
                  />
                </div>
                {/* Event Poster Image */}
                <div className="mb-4">
                  <label htmlFor="eventPoster" className="block text-sm font-medium text-gray-700">
                    Event Poster Image
                  </label>
                  <input
                    type="file"
                    id="eventPoster"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  {eventPoster && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(eventPoster)}
                        alt="Event Poster"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </div>
            {/* Added Events - Display as Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
                  {/* Remove Icon */}
                  <button
                    onClick={() => removeEvent(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="h-6 w-6" />
                  </button>
                  {/* Event Poster Image */}
                  <div className="mb-4">
                    <img
                      src={event.poster}
                      alt="Event Poster"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  {/* Event Details */}
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-500 mt-2">{event.description}</p>
                  <p className="text-sm text-gray-700 mt-2">Organizer: {event.organizer}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEventPage;