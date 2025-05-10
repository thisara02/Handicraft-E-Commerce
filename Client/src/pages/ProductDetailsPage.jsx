import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCartPlus, FaArrowLeft, FaStar } from "react-icons/fa";
import NavBar from "../components/NavBar1"; // Adjust the import if your file path is different
import Footer from "../components/Footer1"; // Adjust the import if your file path is different

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(0); // Selected rating (1-5)
const [reviewText, setReviewText] = useState(""); // Review text
const [reviewError, setReviewError] = useState(""); // Error message for the form

  // Fetch product details from the backend
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
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
        quantity: 1, // Default quantity is 1
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
        alert(data.message || "Product added to cart successfully!");
      } else {
        alert(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const handleSubmitReview = async () => {
    try {
      const customerData = JSON.parse(localStorage.getItem("customer"));
      const customerId = customerData?.id;
  
      if (!customerId) {
        alert("Please log in to submit a review.");
        return;
      }
  
      if (!rating || !reviewText.trim()) {
        setReviewError("Please provide a rating and review text.");
        return;
      }
  
      const payload = {
        customer_id: customerId,
        product_id: product.id,
        review: reviewText,
        rating: rating,
      };
  
      const response = await fetch("http://127.0.0.1:8000/api/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Review submitted successfully!");
        setRating(0); // Reset rating
        setReviewText(""); // Reset review text
        setReviewError(""); // Clear error message
      } else {
        alert(data.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/reviews`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      console.log("Fetched Reviews:", data); // Debugging
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  fetchReviews();
}, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  // Ensure `product.images` is always an array
  const productImages = Array.isArray(product.images) ? product.images : [product.images];

  return (
    <div>
      {/* Include NavBar */}
      <NavBar />
      <div className="max-w-7xl mx-auto pb-24">
        {/* Back Button */}
        <div className="mb-6 pt-40">
          <Link to="/product" className="flex items-center text-gray-600 hover:text-blue-800 text-xl">
            <FaArrowLeft className="mr-2" size={20} /> Back to Products
          </Link>
        </div>

        {/* Product Info Section */}
        <div className="border p-6 rounded-lg shadow-lg mb-8">
          {/* Product Name and Price */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900">{product.name}</h3>
            <p className="text-gray-700 font-bold text-xl mt-2">{product.price}</p>
          </div>

          {/* Product Description */}
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          {/* Related Images */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={`${JSON.parse(product.images).length > 0 ? `http://127.0.0.1:8000/${JSON.parse(product.images)[0].replace(/\\/g, "")}` : "/path/to/default-image.jpg"}`}
                alt={`Related images for the selected ${index + 1}`}
                className="w-full h-56 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <FaCartPlus className="mr-2" /> Add to Cart
          </button>
        </div>

        {/* Rest of the Component */}
        {/* ... */}
      </div>
      <div className="border p-6 rounded-lg shadow-lg mb-8">
  <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Your Review</h3>
  {reviewError && <p className="text-red-500 text-sm mb-4">{reviewError}</p>}
  <div className="mb-4">
    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
      Your Review
    </label>
    <textarea
      id="review"
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      placeholder="Write your review here..."
      rows="4"
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
      Rating
    </label>
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => setRating(star)}
          className={`cursor-pointer mr-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
          size={24}
        />
      ))}
    </div>
  </div>
  <button
    onClick={handleSubmitReview}
    className="bg-teal-500 text-white px-4 py-2 rounded"
  >
    Submit Review
  </button>
</div>

<div className="border p-6 rounded-lg shadow-lg mb-8">
  <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
  {reviews.length > 0 ? (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4">
          <h4 className="text-lg font-semibold">{review.customer.name}</h4>
          <div className="flex items-center mb-2">
            {[...Array(review.rating)].map((_, starIndex) => (
              <FaStar key={starIndex} className="text-yellow-400" size={16} />
            ))}
            {[...Array(5 - review.rating)].map((_, starIndex) => (
              <FaStar key={starIndex} className="text-gray-400" size={16} />
            ))}
          </div>
          <p className="text-gray-600">{review.review}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No reviews yet.</p>
  )}
</div>

      <Footer />
    </div>
  );
};

export default ProductDetails;