import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCartPlus, FaArrowLeft, FaStar } from "react-icons/fa";
import NavBar from "../components/NavBar1";  // Adjust the import if your file path is different
import Footer from "../components/Footer1";  // Adjust the import if your file path is different

// Simulate the product data with multiple images for each product
const products = Array.from({ length: 180 }, (_, i) => ({
  id: i + 1,
  name: `Handicraft Item ${i + 1}`,
  price: `Rs.${(i + 1) * 1000}`,
  description: `Description for Handicraft Item ${i + 1}`,
  category: i % 2 === 0 ? "Arts & Crafts" : "Jewelry Accessories",
  images: Array.from({ length: 5 }, (_, j) => `https://via.placeholder.com/300x200?text=Image+${i + 1}-${j + 1}`), // 5 images for each product
}));

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [allReviewsLoaded, setAllReviewsLoaded] = useState(false); // Track if all reviews are loaded
  
  useEffect(() => {
    const foundProduct = products.find((prod) => prod.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    // Implement Add to Cart functionality
    alert(`${product.name} added to cart!`);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    // Implement the logic for submitting the review
    alert("Review submitted!");
  };

  const handleShowMoreReviews = () => {
    setAllReviewsLoaded(true); // Show all reviews when clicked
  };

  // Sample customer reviews with added review date and time
  const customerReviews = [
    { name: "John Doe", review: "Amazing product, really loved it!", rating: 5, date: "2025-03-01 10:30:00" },
    { name: "Jane Smith", review: "Good quality, but could be improved.", rating: 3, date: "2025-02-28 15:20:00" },
    { name: "Alice Cooper", review: "Not satisfied with the product. It broke after a week.", rating: 1, date: "2025-02-25 08:50:00" },
    { name: "Bob Johnson", review: "Decent for the price. Would recommend.", rating: 4, date: "2025-02-20 14:15:00" },
    { name: "Emma Watson", review: "Very high quality, totally worth the money!", rating: 5, date: "2025-02-18 17:10:00" },
    { name: "Tom Hanks", review: "Good, but not as expected. A little disappointing.", rating: 2, date: "2025-02-15 12:30:00" },
    { name: "Meryl Streep", review: "Perfect! Exactly what I wanted.", rating: 5, date: "2025-02-10 11:00:00" },
    { name: "Will Smith", review: "Great value for the price.", rating: 4, date: "2025-02-08 16:40:00" },
    { name: "Chris Hemsworth", review: "Loved it, good quality", rating: 5, date: "2025-02-05 09:20:00" },
    { name: "Scarlett Johansson", review: "Not what I expected, but still good.", rating: 3, date: "2025-02-01 13:30:00" },
    { name: "Mark Ruffalo", review: "Excellent! Totally worth it.", rating: 5, date: "2025-01-28 18:40:00" },
    { name: "Robert Downey Jr.", review: "Not bad for the price.", rating: 4, date: "2025-01-25 07:25:00" },
    { name: "Jeremy Renner", review: "Good quality, but it took a while to arrive.", rating: 3, date: "2025-01-20 19:00:00" },
    { name: "Chris Evans", review: "Exactly as described, loved it.", rating: 5, date: "2025-01-15 10:10:00" },
    { name: "Natalie Portman", review: "Okay, but would not buy again.", rating: 2, date: "2025-01-10 12:55:00" }
  ];

  // Display all reviews or the initial batch based on the `allReviewsLoaded` state
  const reviewsToShow = allReviewsLoaded ? customerReviews : customerReviews.slice(0, 4);

  return (
    <div>
      {/* Include NavBar */}
      <NavBar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Link to go back to the product list */}
        <div className="mb-6 pt-40">
          <Link to="/product" className="flex items-center text-gray-600 hover:text-blue-800 text-xl">
            <FaArrowLeft className="mr-2" size={20} /> Back to Products
          </Link>
        </div>

        {/* Product Info Section - Bordered */}
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
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Related images for the selected product ${index + 1}`}
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

        {/* About Seller Section */}
        <div className="border p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Seller</h2>
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/100x100"
              alt="Seller's Profile"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold text-xl">John's Handicrafts</h3>
              <p className="text-gray-600">Business Name: John's Handicrafts</p>
              <p className="text-gray-600">Address: 123 Craft Lane, City, Country</p>
              <p className="text-gray-600">Phone: +1234567890</p>
              <p className="text-gray-600">Email: john@example.com</p>
            </div>
          </div>
        </div>

        {/* Add Review Section */}
        <div className="border p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Your Review</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <textarea
              placeholder="Your Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              rows="4"
            />
          </div>
          {/* Star Rating */}
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRatingClick(star)}
                className={`cursor-pointer mr-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                size={24}
              />
            ))}
          </div>
          <button
            onClick={handleSubmitReview}
            className="bg-teal-500 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>

        {/* Customer Reviews Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsToShow.map((review, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, starIndex) => (
                    <FaStar key={starIndex} className="text-yellow-400" size={16} />
                  ))}
                  {[...Array(5 - review.rating)].map((_, starIndex) => (
                    <FaStar key={starIndex} className="text-gray-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.review}</p>
                <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Show All Reviews Button */}
          {!allReviewsLoaded && (
            <button
              onClick={handleShowMoreReviews}
              className="text-teal-500 font-semibold mt-6 inline-block"
            >
              Show More Reviews
            </button>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 pt-16">You might Also Like</h2>
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
      </div>

      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetails;
