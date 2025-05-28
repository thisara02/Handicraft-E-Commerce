import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { FaTimes } from "react-icons/fa";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]); // State for suggested products
  const navigate = useNavigate();

  // Fetch logged-in customer ID from localStorage
  const customerData = JSON.parse(localStorage.getItem("customer"));
  const customerId = customerData?.id;

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!customerId) {
          throw new Error("Customer ID not found. Please log in.");
        }

        const response = await fetch("http://127.0.0.1:8000/api/cart/get-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customer_id: customerId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCart(data.cart_items); // Update cart state with fetched data
      } catch (err) {
        setError(err.message || "Something went wrong while fetching cart items");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCartItems();
  }, [customerId]);

  // Fetch suggested products from the backend
  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/suggested");
        if (!response.ok) {
          throw new Error("Failed to fetch suggested products");
        }
        const data = await response.json();
        setSuggestedProducts(data.products); // Update suggested products state
      } catch (err) {
        console.error("Error fetching suggested products:", err);
      }
    };

    fetchSuggestedProducts();
  }, []);

  // Handle remove item from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      if (!customerId) {
        throw new Error("Customer ID not found. Please log in.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/cart/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customerId,
          product_id: productId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Update local cart state
      const updatedCart = cart.filter((item) => item.product_id !== productId);
      setCart(updatedCart);
      alert("Item removed from cart successfully");
    } catch (err) {
      console.error("Error removing item from cart:", err);
      alert(err.message || "Failed to remove item from cart");
    }
  };

  // Handle update quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      if (!customerId) {
        throw new Error("Customer ID not found. Please log in.");
      }

      const response = await fetch("http://127.0.0.1:8000/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customerId,
          product_id: productId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      // Update local cart state
      const updatedCart = cart.map((item) =>
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      alert("Cart item updated successfully");
    } catch (err) {
      console.error("Error updating cart item:", err);
      alert(err.message || "Failed to update cart item");
    }
  };

  // Calculate total price
  const total = cart.reduce(
    (acc, item) =>
      acc +
      parseInt(item.product.price.replace("Rs.", "").replace(",", "")) * item.quantity,
    0
  );

  // Render loading state
  if (loading) {
    return <p>Loading cart items...</p>;
  }

  // Render error state
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-20 pb-24">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty!</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <img
                  src={`${
                    JSON.parse(item.product.images).length > 0
                      ? `http://127.0.0.1:8000/${JSON.parse(item.product.images)[0].replace(/\\/g, "")}`
                      : "/path/to/default-image.jpg"
                  }`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-blue-600 font-bold">{item.product.price}</p>
                  <p className="text-blue-600 font-bold">
                    Total : Rs.
                    {parseInt(item.product.price.replace("Rs.", "").replace(",", "")) *
                      item.quantity}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 text-gray-600">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.product_id, Math.max(1, item.quantity - 1))
                      }
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>Quantity: {item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.product_id)}
                  className="text-red-500"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-xl font-semibold">Total: Rs.{total}</p>
              <button
                onClick={() => navigate("/checkout")}
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
        <h2 className="text-3xl font-bold mb-6">You might Also Like</h2>
        <div className="grid grid-cols-4 gap-6">
          {suggestedProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow w-full">
            <img
                      src={`${JSON.parse(product.images).length > 0 ? `http://127.0.0.1:8000/${JSON.parse(product.images)[0].replace(/\\/g, "")}` : "/path/to/default-image.jpg"}`}
                      alt={product.name}
                    className="w-full h-56 object-cover mb-2 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold">{product.price}</p>
              {/*<p className="text-gray-600 text-sm">{product.description}</p>*/}
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