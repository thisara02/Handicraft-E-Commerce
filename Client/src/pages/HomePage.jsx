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
  process.env.PUBLIC_URL + "/assets/Home-C7.jpg",
  process.env.PUBLIC_URL + "/assets/Home-C8.jpg",
  process.env.PUBLIC_URL + "/assets/Home-C9.png",

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
    <div className="flex flex-col min-h-screen bg-[#E6EFF6] pt-16">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center pt-20 mt-10">
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
        <div className="bg-[#0396A6] text-white p-10 max-w-5xl mt-10 rounded-lg shadow-lg flex items-center mb-20">
          <div className="w-2/3 pr-6">
            <h2 className="text-3xl font-bold">
              Bringing the Heart of Sri Lanka to You
            </h2>
            <p className="mt-4 text-lg py-10">
              Serendib Galleria is a platform dedicated to supporting Sri Lankan
              SME craftworkers and artisans by helping them showcase and sell
              their handmade creations. From traditional crafts to modern
              handmade items, each product reflects the skill, creativity, and
              passion of local makers.
            </p>
            <p className="mt-4 text-lg">
              Our mission is to connect these talented artisans with customers
              who appreciate authentic, Sri Lankan-made goods, while helping
              them grow their businesses. Shop with us to discover unique,
              high-quality products that celebrate the essence of Sri Lankan
              craftsmanship.
            </p>
          </div>
          <div className="w-1/3">
            <img
              src={process.env.PUBLIC_URL + "/assets/hp-1.png"}
              alt="Sri Lanka"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
