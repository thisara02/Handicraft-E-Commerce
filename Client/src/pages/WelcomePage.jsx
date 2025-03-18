import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/welcome-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for transparency effect */}
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl px-6">
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-8" style={{ fontFamily: 'cursive' }}>
          Welcome to Serendib Galleria
        </h1>
        <p className="text-xs sm:text-base mb-12" >
        The Sri Lankan handicrafts industry is a treasure trove of timeless artistry, offering a stunning array of handmade products that embody the island’s rich cultural heritage and centuries-old craftsmanship. Each piece is a masterpiece, meticulously crafted by skilled artisans using age-old techniques passed down through generations. The industry boasts a wide range of beautiful products, from intricately carved wooden figurines and vibrant batik textiles to handwoven Dumbara mats, delicate brassware, and rustic pottery. These crafts are not only visually captivating but also steeped in meaning, often reflecting the traditions, history, and nature of Sri Lanka.
</p>
        {/* "Are You A" Section */}
        <h2 className="text-4xl font-semibold mb-6" style={{ fontFamily: 'Reggae One' }}>Are you ?</h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 text-xl bg-[#9b9c9c] text-black font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
          >
            Customer
          </button>
          <button
            onClick={() => navigate("/vendor/login")}
            className="px-8 py-4 text-xl bg-[#9b9c9c] text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105"
          >
            Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
