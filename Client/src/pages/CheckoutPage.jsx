import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";


const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in customer ID from localStorage
  const customerData = JSON.parse(localStorage.getItem("customer"));
  const customerId = customerData?.id;


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // Stop submission if form validation fails
    }
  
    try {
      const customerData = JSON.parse(localStorage.getItem("customer"));
      const customerId = customerData?.id;
  
      if (!customerId) {
        alert("Please log in to place an order.");
        return;
      }
  
      // Extract vendor ID from the cart items
      const vendorId = cart[0]?.product.vendor_id;
  
      if (!vendorId) {
        throw new Error("Vendor ID not found for products.");
      }
  
      // Prepare the order payload
      const payload = {
        customer_id: customerId,
        vendor_id: vendorId,
        full_name: formData.fullName,
        email_address: formData.emailAddress,
        phone_number: formData.phoneNumber,
        country: formData.country,
        street_address: formData.streetAddress,
        town_city: formData.townCity,
        total_amount: total + 100, // Include shipping cost
        order_summary: cart.map((item) => ({
          product_id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price.replace("Rs.", "").replace(",", "")),
          quantity: item.quantity,
        })),
      };
  
      console.log("Request Payload:", payload); // Log the payload for debugging
  
      // Send the request to the backend
      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || "Order placed successfully!");
        setCart([]); // Clear the cart
        navigate("/confirm"); // Redirect to confirmation page
      } else {
        throw new Error(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };
      

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!customerId) {
          throw new Error("Customer ID not found. Please log in.");
        }

        const response = await fetch(
          "http://127.0.0.1:8000/api/cart/get-items",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: customerId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCart(data.cart_items); // Update cart state with fetched data
      } catch (err) {
        console.error("Error fetching cart items:", err);
        alert(err.message || "Something went wrong while fetching cart items");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCartItems();
  }, [customerId]);

  // Calculate total price
  const total = cart.reduce(
    (acc, item) =>
      acc +
      parseInt(item.product.price.replace("Rs.", "").replace(",", "")) *
        item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.townCity.trim()) newErrors.townCity = "Town/City is required";
    // Phone validation (simple validation for numbers only)
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    // Email validation
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.emailAddress)
    ) {
      newErrors.emailAddress = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     // Place order logic would go here
  //     // For now, we'll just simulate success
  //     setOrderPlaced(true);

  //     // Clear cart on the backend (optional)
  //     fetch("http://127.0.0.1:8000/api/cart/clear", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ customer_id: customerId }),
  //     });

  //     // In a real application, you would send the order data to a server
  //     console.log("Order placed with details:", {
  //       formData,
  //       items: cart,
  //       total,
  //     });

  //     // Redirect to order confirmation after 2 seconds
  //     setTimeout(() => {
  //       navigate("/confirm");
  //     }, 2000);
  //   }
  // };

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Thank you for your order!
          </h2>
          <p className="mb-4">Your order has been placed successfully.</p>
          <p>Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-40 pb-24">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shipping Information Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">
                Shipping Information
              </h3>
              <div>
                <label className="block text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.streetAddress ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.streetAddress}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Town/City *</label>
                <input
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.townCity ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.townCity && (
                  <p className="text-red-500 text-sm mt-1">{errors.townCity}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.emailAddress ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailAddress}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded mt-6 w-full"
              >
                Place Order
              </button>
            </form>
          </div>
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b pb-3"
                    >
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>{item.product.price}</p>
                        <p className="text-sm font-semibold">
                          Total: Rs.
                          {parseInt(
                            item.product.price
                              .replace("Rs.", "")
                              .replace(",", "")
                          ) * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <p>Subtotal</p>
                    <p>Rs.{total}</p>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm my-2">
                    <p>Shipping</p>
                    <p>Rs.100</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <p>Total</p>
                    <p>Rs.{total + 100}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
