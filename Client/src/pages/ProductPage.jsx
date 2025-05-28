import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // Loading state
  const [error, setError] = useState(null);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [categories, setCategories] = useState([]); // Initialize categories as an empty array

  

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const loadCart = () => {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    };

    const loadWishlist = () => {
      const wishlistData = localStorage.getItem("wishlist");
      return wishlistData ? JSON.parse(wishlistData) : [];
    };

    setCart(loadCart());
    setWishlist(loadWishlist());
  }, []);

  // Save wishlist and cart to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsFetching(true);
        const response = await fetch('http://127.0.0.1:8000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setIsFetching(false);
      } catch (error) {
        setError(error.message);
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, []);
 // Fetch unique categories from the backend
 useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/categories");
      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);
 // Handle category filter change
 const handleCategoryChange = (e) => {
  setFilters({ ...filters, category: e.target.value });
};
  // Paginate products
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // Add product to cart
  const handleAddToCart = async (product) => {
    try {
      const customerData = JSON.parse(localStorage.getItem("customer"));
      const customerId = customerData?.id;
  
      if (!customerId) {
        alert('Please log in to add products to the cart.');
        return;
      }
  
      const payload = {
        customer_id: customerId,
        product_id: product.id,
        quantity: 1,
      };
  
      console.log('Payload:', payload);
  
      const response = await fetch('http://127.0.0.1:8000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const text = await response.text(); // Get the raw response as text
      console.log('Server Response:', text);
  
      let data;
      try {
        data = JSON.parse(text); // Attempt to parse the response as JSON
      } catch (e) {
        console.error('Invalid JSON response:', text);
        throw new Error('Invalid server response');
      }
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add product to cart');
      }
  
      alert(data.message);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to handle search
  const handleSearch = async () => {
      try {
          setIsFetching(true);
          const response = await fetch(`http://127.0.0.1:8000/api/products/search?query=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
  
          if (data.success) {
              setProducts(data.products); // Update the product list with search results
          } else {
              setError(data.message || "Failed to fetch products.");
          }
      } catch (error) {
          setError(error.message || "Something went wrong while searching.");
      } finally {
          setIsFetching(false);
      }
  };
  
  // Trigger search on Enter key press
  const handleKeyPress = (e) => {
      if (e.key === "Enter") {
          handleSearch();
      }
  };
  const [filters, setFilters] = useState({
    category: "",
    minPrice: null,
    maxPrice: null,
});

// Function to apply filters
const applyFilters = async () => {
    try {
        setIsFetching(true);
        const queryParams = new URLSearchParams({
            category: filters.category,
            min_price: filters.minPrice,
            max_price: filters.maxPrice,
        }).toString();

        const response = await fetch(`http://127.0.0.1:8000/api/products/search?${queryParams}`);
        const data = await response.json();

        if (data.success) {
            setProducts(data.products); // Update the product list with filtered results
        } else {
            setError(data.message || "Failed to fetch products.");
        }
    } catch (error) {
        setError(error.message || "Something went wrong while applying filters.");
    } finally {
        setIsFetching(false);
    }
};
  const toggleWishlist = async (e, product) => {
    e.stopPropagation(); // Prevent triggering the product click event
  
    try {
      const customerData = JSON.parse(localStorage.getItem("customer"));
      const customerId = customerData?.id;
  
      if (!customerId) {
        alert("Please log in to add products to the wishlist.");
        return;
      }
  
      const isInWishlist = wishlist.some((item) => item.id === product.id);
  
      let endpoint, method, payload;
  
      if (isInWishlist) {
        // Remove from wishlist
        endpoint = `http://127.0.0.1:8000/api/wishlist/remove/${product.id}`;
        method = "DELETE";
      } else {
        // Add to wishlist
        endpoint = "http://127.0.0.1:8000/api/wishlist/add";
        method = "POST";
        payload = {
          customer_id: customerId,
          product_id: product.id,
        };
      }
  
      console.log("Payload:", payload);
  
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "POST" ? JSON.stringify(payload) : null,
      });
  
      const text = await response.text(); // Get the raw response as text
      console.log("Server Response:", text);
  
      let data;
      try {
        data = JSON.parse(text); // Attempt to parse the response as JSON
      } catch (e) {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid server response");
      }
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update wishlist");
      }
  
      if (isInWishlist) {
        // Remove from local state
        const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
        setWishlist(updatedWishlist);
        alert(data.message || "Product removed from wishlist");
      } else {
        // Add to local state
        setWishlist([...wishlist, product]);
        alert(data.message || "Product added to wishlist");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const getPriceNumber = (priceString) => {
    const numericPrice = parseFloat(priceString.replace("Rs.", "").trim());
    return isNaN(numericPrice) ? 0 : numericPrice; // Fallback to 0 if parsing fails
  };
  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    </div>
    
    
    {/* Category Filter */}
  
        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="border border-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
              ))}
        </select>

    {/* Price Range Filter */}
    <div className="inline-flex items-center">
        <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ""}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="border border-gray-400 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="px-2">-</span>
        <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ""}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border border-gray-400 px-4 py-2 rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    {/* Apply Filters Button */}
    <button
        onClick={applyFilters}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
    >
        Apply Filters
    </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-6">
          {isFetching ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => {
              const priceNumber = getPriceNumber(product.price); // Convert price to number
              const inWishlist = isProductInWishlist(product.id);

              return (
                <div key={product.id} className="border p-4 rounded-lg shadow w-full relative">
                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => toggleWishlist(e, product)}
                    className="absolute top-2 right-2 z-10 p-2 bg-white bg-opacity-75 rounded-full"
                  >
                    {inWishlist ? (
                      <FaHeart className="text-red-500" size={18} />
                    ) : (
                      <FaRegHeart className="text-gray-500" size={18} />
                    )}
                  </button>

                  <img
                      src={`${JSON.parse(product.images).length > 0 ? `http://127.0.0.1:8000/${JSON.parse(product.images)[0].replace(/\\/g, "")}` : "/path/to/default-image.jpg"}`}
                      alt={product.name}
                    className="w-full h-56 object-cover mb-2 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-blue-600 font-bold">Rs.{priceNumber}</p> {/* Display the numeric price */}
                  {/* <p className="text-gray-600 text-sm">{product.description}</p> */}
                  <p className="text-gray-500 text-xs mt-2">{product.category}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 bg-teal-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
                  >
                    <FaCartPlus className="mr-2" /> Add to Cart
                  </button>
                </div>
              );
            })
          ) : (
            <p>No products available.</p>
          )}
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