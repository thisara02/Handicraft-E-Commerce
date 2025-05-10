import React, { useEffect, useState } from "react";
import { FaHeart, FaCartPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const loadCartFromStorage = () => {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    };

    setCart(loadCartFromStorage());
  }, []);

  // Fetch wishlist items from the backend
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const customerData = JSON.parse(localStorage.getItem("customer"));
        const customerId = customerData?.id;

        if (!customerId) {
          alert("Please log in to view your wishlist.");
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:8000/api/wishlist/getItems`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: customerId }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setWishlist(data.wishlist_items);
        } else {
          throw new Error(data.message || "Failed to fetch wishlist items");
        }
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        alert("Something went wrong while fetching wishlist items.");
      }
    };

    fetchWishlistItems();
  }, []);

  // Function to remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const customerData = JSON.parse(localStorage.getItem("customer"));
      const customerId = customerData?.id;

      if (!customerId) {
        alert("Please log in to modify your wishlist.");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/wishlist/remove`,
        {
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
          throw new Error("Failed to remove item from wishlist");
        }
  
        // Update local cart state
        const updatedwishlist = cart.filter((item) => item.product_id !== productId);
        setCart(updatedwishlist);
        alert("Item removed from wishlist successfully");
      } catch (err) {
        console.error("Error removing item from wishlist:", err);
        alert(err.message || "Failed to remove item from wishlist");
      }
    };
      

  // Function to add item to cart
  const addToCart = async (product) => {
    try {
      const customerData = JSON.parse(localStorage.getItem("customer"));
      const customerId = customerData?.id;

      if (!customerId) {
        alert("Please log in to add products to the cart.");
        return;
      }

      const payload = {
        customer_id: customerId,
        product_id: product.id,
        quantity: 1,
      };

      const response = await fetch("http://127.0.0.1:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedCart = [...cart];
        const existingProduct = updatedCart.find(
          (item) => item.id === product.id
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(data.message || "Product added to cart successfully!");
      } else {
        throw new Error(data.message || "Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Function to handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Function to convert price string to number
  const getPriceNumber = (priceString) => {
    const numericPrice = parseFloat(priceString.replace("Rs.", "").trim());
    return isNaN(numericPrice) ? 0 : numericPrice;
  };

  return (
    <div>
      {/* Include NavBar */}
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-40">
        <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => {
                const product = item.product; // Extract product details
                const priceNumber = getPriceNumber(product.price);

                return (
                  <div
                    key={product.id}
                    className="border p-4 rounded-lg shadow relative"
                  >
                    <div className="absolute top-2 right-2 z-10 flex space-x-2">
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-2 bg-white bg-opacity-75 rounded-full hover:bg-red-100 transition"
                        title="Remove from wishlist"
                      >
                        <FaTrash className="text-red-500" size={16} />
                      </button>
                    </div>

                    <img
                      src={`${
                        JSON.parse(product.images).length > 0
                          ? `http://127.0.0.1:8000/${JSON.parse(
                              product.images
                            )[0].replace(/\\/g, "")}`
                          : "/path/to/default-image.jpg"
                      }`}
                      alt={product.name}
                      className="w-full h-64 object-cover mb-4 rounded-lg cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-blue-600 font-bold">
                          Rs.{priceNumber}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {product.category}
                        </p>
                      </div>
                      <span className="bg-red-100 p-2 rounded-full">
                        <FaHeart className="text-red-500" size={18} />
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm my-3">
                      {product.description}
                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-2 bg-teal-500 text-white px-4 py-2 rounded w-full flex items-center justify-center hover:bg-teal-600 transition"
                    >
                      <FaCartPlus className="mr-2" /> Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => navigate("/products")}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>

              <div className="text-right">
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">{wishlist.length}</span> items
                  in wishlist
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WishlistPage;
