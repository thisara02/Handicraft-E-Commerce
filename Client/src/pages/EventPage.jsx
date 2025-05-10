import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        data.events.forEach((event) => {
          console.log(
            "Image URL:",
            `http://127.0.0.1:8000/event_posters/${event.poster}`
          );
        });

        setEvents(
          data.events.map((event) => ({
            ...event,
            posterUrl: `http://127.0.0.1:8000/event_posters/${event.poster}`, // Construct the full URL
          }))
        );
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto pt-40 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col p-4 bg-indigo-100 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3"
              >
                {/* Event Poster Image */}
                <div className="mb-4">
                  <imgfi
                    src={`http://127.0.0.1:8000/event_posters/${event.poster}`}
                    alt={`${event.name} Poster`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                {/* Event Details */}
                <h4 className="text-lg font-semibold text-indigo-600 mb-2">
                  {event.name}
                </h4>
                <p className="text-gray-500">{event.description}</p>
                <p className="text-gray-500">{event.location}</p>
                <p className="text-gray-500">{event.organizer}</p>
                <span className="mt-2 text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No upcoming events available.
            </p>
          )}
        </div>
      </div>
      <div className="bg-blue-600 text-white text-center py-6 mt-10">
        <h2 className="text-4xl font-bold">📢 Post Your Event Ad Here!</h2>
        <p className="text-xl mt-2">
          Reach more people by advertising your event with us.
        </p>
        <p className="text-2xl font-semibold mt-1">
          Mobile: <span>+94-74 0563 227</span>
        </p>
        <p className="font-semibold mt-1 text-2xl">
          Email: <span>serandibgalleria@gmail.com</span>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
