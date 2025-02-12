import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const images = [
  process.env.PUBLIC_URL + "/assets/Home-C1.jpg",
  process.env.PUBLIC_URL + "/assets/Home-C2.jpg",
  process.env.PUBLIC_URL + "/assets/Home-C3.webp",
  process.env.PUBLIC_URL + "/assets/Home-C4.jpeg",
  process.env.PUBLIC_URL + "/assets/Home-C5.jpg",
  process.env.PUBLIC_URL + "/assets/Home-C6.webp",
];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center pt-7">
        {/* Image Carousel */}
        <div className="relative w-full max-w-5xl overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[500px] object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 mx-1 rounded-full ${
                currentIndex === index ? "bg-blue-500" : "bg-gray-400"
              } transition-all duration-300`}
            ></span>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-white p-6 max-w-5xl mt-6 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Bringing the Heart of Sri Lanka to You
          </h2>
          <p className="mt-3 text-gray-600">
            Serendib Galleria is a platform dedicated to supporting Sri Lankan
            SME craftworkers and artisans by helping them showcase and sell
            their handmade creations. From traditional crafts to modern handmade
            items, each product reflects the skill, creativity, and passion of
            local makers.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
