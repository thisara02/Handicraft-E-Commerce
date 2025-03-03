import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { FaTimes } from "react-icons/fa";

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

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-40">
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
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;
