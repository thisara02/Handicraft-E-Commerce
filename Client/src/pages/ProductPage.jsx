import React, { useState } from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { FaSearch, FaFilter, FaTimes, FaChevronLeft, FaChevronRight, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const products = Array.from({ length: 180 }, (_, i) => ({
  id: i + 1,
  name: `Handicraft Item ${i + 1}`,
  price: `Rs.${(i + 1) * 1000}`,
  image: `https://via.placeholder.com/300x200?text=Product+${i + 1}`, // Temporary image link
  description: `Description for Handicraft Item ${i + 1}`,
  category: i % 2 === 0 ? "Arts & Crafts" : "Jewelry Accessories",
}));

const itemsPerPage = 15;
const totalPages = 12; // Fixed number of pages

const ProductPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(500000);
  const [currentPage, setCurrentPage] = useState(1);

  // Load cart from localStorage
  const loadCartFromStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const [cart, setCart] = useState(loadCartFromStorage);

  // Paginate products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Function to convert price string to number
  const getPriceNumber = (priceString) => {
    const numericPrice = parseFloat(priceString.replace('Rs.', '').trim());
    return isNaN(numericPrice) ? 0 : numericPrice; // Fallback to 0 if parsing fails
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar & Filter Button */}
        <div className="flex items-center justify-between mb-6 pt-40">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="border border-gray-400 px-10 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-full flex items-center"
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
              <button
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setIsFilterOpen(false)}
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-xl font-bold mb-4">Filters</h3>

              {/* Price Filter */}
              <div className="mb-4">
                <label className="block text-gray-700">Price Range</label>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Rs. 500</span>
                  <span>Rs. 500,000</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="500000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full mt-1"
                />
                <div className="text-center mt-2 text-blue-600 font-semibold">
                  Selected: Rs. {priceRange}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select className="w-full border p-2 rounded">
                  <option>All</option>
                  <option>Arts & Crafts</option>
                  <option>Household Items</option>
                  <option>Jewelry Accessories</option>
                  <option>Food & Beverages</option>
                  <option>Gifts & Souvenirs</option>
                  <option>Fashion & Clothing</option>
                </select>
              </div>

              <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Apply Filter</button>
            </div>
          </div>
        )}

        {/* Product Grid - 4 items per row, 6 rows per page */}
        <div className="grid grid-cols-4 gap-6">
          {paginatedProducts.map((product) => {
            const priceNumber = getPriceNumber(product.price); // Convert price to number

            return (
              <div key={product.id} className="border p-4 rounded-lg shadow w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover mb-2 rounded-lg cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-blue-600 font-bold">Rs.{priceNumber}</p> {/* Display the numeric price */}
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-gray-500 text-xs mt-2">{product.category}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 bg-teal-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
                >
                  <FaCartPlus className="mr-2" /> Add to Cart
                </button>
              </div>
            );
          })}
        </div>

        {/* Cart Display */}
        <div className="mt-8 text-right">
          <span className="font-semibold text-xl">Cart: {cart.length} items</span>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            className={`p-2 bg-gray-200 rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`p-2 bg-gray-200 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
