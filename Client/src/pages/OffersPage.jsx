import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { FaTag, FaShoppingBag, FaCartPlus, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Sample offers data - in a real application, this would come from an API
const sampleOffers = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get up to 40% off on selected handcrafted items",
    discount: "40% OFF",
    validUntil: "2025-03-31",
    category: "Seasonal",
    image: "https://via.placeholder.com/600x300?text=Summer+Sale",
    featuredProducts: [1, 5, 9, 12]
  },
  {
    id: 2,
    title: "New Customer Special",
    description: "First-time customers get Rs.500 off on orders above Rs.2000",
    discount: "Rs.500 OFF",
    validUntil: "2025-12-31",
    category: "New Users",
    image: "https://via.placeholder.com/600x300?text=New+Customer+Special",
    featuredProducts: [2, 7, 14, 18]
  },
  {
    id: 3,
    title: "Weekend Flash Sale",
    description: "Limited time offer! 25% off on all jewelry items",
    discount: "25% OFF",
    validUntil: "2025-03-10",
    category: "Flash Sale",
    image: "https://via.placeholder.com/600x300?text=Weekend+Flash+Sale",
    featuredProducts: [3, 6, 11, 15]
  },
  {
    id: 4,
    title: "Free Shipping",
    description: "Free shipping on all orders above Rs.1500",
    discount: "FREE SHIPPING",
    validUntil: "2025-04-15",
    category: "Shipping",
    image: "https://via.placeholder.com/600x300?text=Free+Shipping",
    featuredProducts: [4, 8, 13, 17]
  },
  {
    id: 5,
    title: "Bundle Discount",
    description: "Buy any 3 items from our Arts & Crafts collection and get the 4th free",
    discount: "BUY 3 GET 1 FREE",
    validUntil: "2025-05-01",
    category: "Bundle",
    image: "https://via.placeholder.com/600x300?text=Bundle+Discount",
    featuredProducts: [10, 20, 30, 40]
  }
];

// Sample products data - this would typically be fetched from your API
const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Handicraft Item ${i + 1}`,
  price: `Rs.${(i + 1) * 1000}`,
  image: `https://via.placeholder.com/300x200?text=Product+${i + 1}`,
  description: `Description for Handicraft Item ${i + 1}`,
  category: i % 2 === 0 ? "Arts & Crafts" : "Jewelry Accessories",
}));

const OffersPage = () => {
  const navigate = useNavigate();
  const [offers] = useState(sampleOffers);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Load cart from localStorage
  useEffect(() => {
    const loadCartFromStorage = () => {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    };

    setCart(loadCartFromStorage());
  }, []);

  // Function to add item to cart
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Get unique categories
  const categories = ["All", ...new Set(offers.map(offer => offer.category))];

  // Filter offers by category
  const filteredOffers = activeCategory === "All" 
    ? offers 
    : offers.filter(offer => offer.category === activeCategory);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Function to get featured products for an offer
  const getFeaturedProducts = (productIds) => {
    return products.filter(product => productIds.includes(product.id));
  };

  // Function to convert price string to number
  const getPriceNumber = (priceString) => {
    const numericPrice = parseFloat(priceString.replace("Rs.", "").trim());
    return isNaN(numericPrice) ? 0 : numericPrice;
  };

  // Check if an offer is expiring soon (within 7 days)
  const isExpiringSoon = (dateString) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    const timeDiff = expiryDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff > 0 && daysDiff <= 7;
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-40">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Special Offers & Promotions</h1>
          <p className="text-gray-600 mt-2">Discover amazing deals on our handcrafted products</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Offers List */}
        <div className="space-y-10">
          {filteredOffers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Offer Header */}
              <div className="relative">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-transparent opacity-70"></div>
                <div className="absolute inset-0 flex items-center p-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{offer.title}</h2>
                    <div className="mt-2 inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {offer.discount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6">
                <p className="text-gray-700 mb-4">{offer.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>Valid until: {formatDate(offer.validUntil)}</span>
                    {isExpiringSoon(offer.validUntil) && (
                      <span className="ml-2 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                        Expiring soon!
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaTag className="mr-2" />
                    <span>Category: {offer.category}</span>
                  </div>
                </div>

                {/* Featured Products */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <FaShoppingBag className="mr-2" /> Featured Products
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {getFeaturedProducts(offer.featuredProducts).map(product => (
                      <div key={product.id} className="border rounded-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-32 object-cover cursor-pointer"
                          onClick={() => handleProductClick(product.id)}
                        />
                        <div className="p-3">
                          <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-blue-600 text-sm font-bold">
                              Rs.{getPriceNumber(product.price)}
                            </span>
                            <button 
                              onClick={() => addToCart(product)}
                              className="p-1 rounded bg-teal-500 text-white"
                              title="Add to Cart"
                            >
                              <FaCartPlus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => navigate("/products")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOffers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-6">No offers available in this category</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              View All Offers
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OffersPage;