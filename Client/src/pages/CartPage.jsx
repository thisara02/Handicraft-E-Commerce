import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link here
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { FaTimes } from "react-icons/fa";

// Simulate the product data with multiple images for each product
const products = Array.from({ length: 180 }, (_, i) => ({
  id: i + 1,
  name: `Handicraft Item ${i + 1}`,
  price: `Rs.${(i + 1) * 1000}`,
  description: `Description for Handicraft Item ${i + 1}`,
  category: i % 2 === 0 ? "Arts & Crafts" : "Jewelry Accessories",
  images: Array.from({ length: 5 }, (_, j) => `https://via.placeholder.com/300x200?text=Image+${i + 1}-${j + 1}`), // 5 images for each product
}));

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  // Update cart in localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart); // Update cart state
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
    setCart(updatedCart); // Update cart state
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => 
      item.id === productId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    );
    setCart(updatedCart); // Update cart state
  };

  const handleCheckout = () => {
    navigate("/checkout");  // Navigate to checkout page (ensure you have this route defined)
  };

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + parseInt(item.price.replace('Rs.', '').replace(',', '')) * item.quantity, 0);

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-40 pb-24">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty!</p>
        ) : (
          <div>
            {cart.map((product) => (
              <div key={product.id} className="flex items-center border-b py-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-blue-600 font-bold">{product.price}</p>
                  <p className="text-blue-600 font-bold"> Total : Rs.{parseInt(product.price.replace('Rs.', '').replace(',', '')) * product.quantity}</p>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <button
                      onClick={() => handleDecreaseQuantity(product.id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>Quantity: {product.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(product.id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="text-red-500"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-xl font-semibold">Total: Rs.{total}</p>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Products Section */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 ">You might Also Like</h2>
        <div className="grid grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow w-full">
              <img
                src={product.images[0]} // Show the first image for each suggested product
                alt={product.name}
                className="w-full h-56 object-cover mb-2 rounded-lg"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold">{product.price}</p>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <Link
                to={`/product/${product.id}`}
                className="text-teal-500 font-semibold mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
