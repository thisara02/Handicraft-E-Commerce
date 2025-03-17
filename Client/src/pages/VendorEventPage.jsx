import React from "react";
import NavBar from "../components/NavBar2";
import Footer from "../components/Footer1";

const events = [
  {
    id: 1,
    title: "Traditional Mask Exhibition",
    date: "July 10, 2025",
    location: "Colombo Art Gallery",
    description: "Explore the rich history and craftsmanship of traditional Sri Lankan masks.",
    image: process.env.PUBLIC_URL + "/assets/events/e-2.jpg",
  },
  {
    id: 2,
    title: "Handicrafts Workshop",
    date: "August 15, 2025",
    location: "Galle Fort Cultural Center",
    description: "Learn the art of making Sri Lankan handicrafts from expert artisans.",
    image: process.env.PUBLIC_URL + "/assets/events/e-1.jpg",
  },
  {
    id: 3,
    title: "Cultural Food Fest",
    date: "September 5, 2025",
    location: "Kandy City Center",
    description: "Taste and experience authentic Sri Lankan cuisine and traditional cooking.",
    image: process.env.PUBLIC_URL + "/assets/events/e-3.jpg",
  },
  {
    id: 1,
    title: "Traditional Laksha Exhibition",
    date: "July 10, 2024",
    location: "Colombo LAKSALA Premises",
    description: "Explore the rich history and craftsmanship of traditional Sri Lankan Laksha Industry.",
    image: process.env.PUBLIC_URL + "/assets/events/e-4.jpg",
  },
  {
    id: 2,
    title: "Gem and Jeweleries Exhibition",
    date: "August 15, 2024",
    location: "Galle Fort Cultural Center",
    description: "Dive through the Gem Industry in Sri Lanka",
    image: process.env.PUBLIC_URL + "/assets/events/e-5.jpeg",
  },
  {
    id: 3,
    title: "Cultural Fashion Fest",
    date: "September 5, 2024",
    location: "Kandy City Center",
    description: "Experience authentic Sri Lankan Clothes and Fashions.",
    image: process.env.PUBLIC_URL + "/assets/events/e-6.jpg",
  },
];

const EventPage = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto pt-40 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p className="text-gray-600">{event.date} | {event.location}</p>
                <p className="mt-2 text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-600 text-white text-center py-6 mt-10">
      <h2 className="text-4xl font-bold">📢 Post Your Event Ad Here!</h2>
      <p className="text-xl mt-2">Reach more people by advertising your event with us.</p>
      <p className="text-2xl font-semibold mt-1">Mobile: <span>+94-74 0563 227</span></p>
      <p className="font-semibold mt-1 text-2xl">Email: <span>serandibgalleria@gmal.com</span></p>
    </div>
      <Footer />
    </div>
  );
};

export default EventPage;
