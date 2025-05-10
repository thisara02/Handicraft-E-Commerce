import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

// Carousel Images
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

// Image Cards for Categories
const imageCards = [
  {
    id: 1,
    image: process.env.PUBLIC_URL + "/assets/c-1.jpg",
    text: "Arts & Crafts",
  },
  {
    id: 2,
    image: process.env.PUBLIC_URL + "/assets/c-2.jpg",
    text: "Household Items",
  },
  {
    id: 3,
    image: process.env.PUBLIC_URL + "/assets/c-3.jpg",
    text: "Jewelry Accessories",
  },
  {
    id: 4,
    image: process.env.PUBLIC_URL + "/assets/c-4.jpg",
    text: "Food & Beverages",
  },
  {
    id: 5,
    image: process.env.PUBLIC_URL + "/assets/c-5.png",
    text: "Gifts & Souvenirs",
  },
  {
    id: 6,
    image: process.env.PUBLIC_URL + "/assets/c-6.jpg",
    text: "Fashion & Clothing",
  },
];

// ImageCard Component
const ImageCard = ({ image, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "0.5rem",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      className="hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={text || "Image Card"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {text && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "0.5rem",
            textAlign: "center",
            fontSize: "0.875rem",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

// HomePage Component
const HomePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading state for products

  // Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6] pt-16">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow pt-20 mt-10">
        {/* Image Carousel */}
        <div className="relative w-full max-w-6xl overflow-hidden rounded-lg">
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
        <div className="bg-[#0396A6] text-white p-10 max-w-6xl mt-10 rounded-lg shadow-lg flex items-center mb-20">
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

        {/* Best Selling Products Section */}
        <div className="bg-blue-200 p-8 rounded-2xl w-full max-w-6xl mb-8">
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="text-teal-500 text-lg font-bold">This Month</div>
            <h2 className="text-3xl font-bold">Best Selling Products</h2>
          </div>
          <div className="border border-blue-200 rounded-lg">
            {/* Horizontal scroll container */}
            <div
              className="flex overflow-x-auto no-scrollbar pb-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {loading ? (
                <p>Loading products...</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none mr-6 bg-white p-6 rounded-lg w-72"
                  >
                    <div className="mb-4 w-full">
                      <img
                      src={`${JSON.parse(product.images).length > 0 ? `http://127.0.0.1:8000/${JSON.parse(product.images)[0].replace(/\\/g, "")}` : "/path/to/default-image.jpg"}`}
                      alt={product.alt}
                        className="w-full h-52 object-cover rounded"
                      />
                    </div>
                    <div className="justify-between text-base font-bold text-center mb-5">
                      {product.name}
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <span className="font-medium text-lg">{product.price}</span>
                      <button
                        onClick={() => navigate(`/product/${product.id}`)} // Navigate to product details page
                        className="bg-blue-800 text-white text-sm py-3 px-4 rounded hover:bg-blue-700 transition-colors"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="relative w-full max-w-6xl mb-20">
          <img
            src={process.env.PUBLIC_URL + "/assets/HomePage.jpeg"}
            alt="Promotional banner for Serendib Galleria"
            className="w-full h-auto rounded-xl"
          />
          <button
            onClick={() => navigate("/register")}
            className="absolute bottom-8 right-8 bg-[#0b4d3c] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Register Now
          </button>
        </div>

        {/* Categories Section */}
        <div className="bg-blue-200 p-8 rounded-2xl w-full max-w-6xl mb-8">
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="text-teal-500 text-lg font-bold">Our Main</div>
            <h2 className="text-3xl font-bold">Categories</h2>
          </div>
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {imageCards.slice(0, 3).map((card) => (
                <ImageCard key={card.id} image={card.image} text={card.text} />
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}
            >
              {imageCards.slice(3, 6).map((card) => (
                <ImageCard key={card.id} image={card.image} text={card.text} />
              ))}
            </div>
          </div>
        </div>

        {/* Vendor Registration Banner */}
        <div className="relative w-full max-w-6xl mb-20">
          <img
            src={process.env.PUBLIC_URL + "/assets/HP-4.jpg"}
            alt="vendors Registration Section for Serendib Galleria"
            className="w-full h-auto rounded-xl"
          />
          <h1 className="absolute top-8 left-8 text-[#3f2626] text-2xl font-serif font-bold">
            Unlock your potential.
          </h1>
          <h1 className="absolute top-16 left-8 text-[#3f2626] text-2xl font-serif font-bold">
            Every sale starts with a single step
          </h1>
          <h1 className="absolute top-24 left-8 text-[#3f2626] text-2xl font-serif font-bold">
            Expand your Items towards Global
          </h1>
          <button
            onClick={() => navigate("/vendor/register")}
            className="absolute top-40 left-8 bg-[#302213] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Click Here to Register Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;