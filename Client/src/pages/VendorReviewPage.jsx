import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { Star } from "lucide-react";

const VendorReviewPage = () => {
  const { productId } = useParams(); // Get vendorId from URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews for the vendor from the backend
  useEffect(() => {
    const fetchVendorReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${productId}/reviews`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        console.log("API Response:", data); // Log the API response
        setReviews(data || []); // Ensure the data is an array
      } catch (err) {
        setError(err.message || "Something went wrong while fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorReviews();
  }, [productId]);

  useEffect(() => {
    console.log("Reviews State:", reviews); // Log the reviews state
  }, [reviews]);

  // Review Card Component
  const ReviewCard = ({ name, rating, date, review }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-80">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={index < rating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mt-3">{review}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6] pt-16">
      {/* Include NavBar */}
      <NavBar />

      <div className="flex flex-col items-center justify-center flex-grow pt-20 mt-10">
        {/* Customer Reviews Section */}
        <div className="bg-[#dddddd] p-8 rounded-2xl w-full max-w-6xl mb-8">
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="text-[#3f3e3e] text-lg font-bold">
              What Our Customers Say about this Vendor
            </div>
            <h2 className="text-3xl font-bold">Customer Reviews</h2>
          </div>

          {/* Loading State */}
          {loading && <p>Loading reviews...</p>}

          {/* Error State */}
          {error && <p className="text-red-500">{error}</p>}

          {/* No Reviews State */}
          {!loading && reviews.length === 0 && (
            <p className="text-gray-600">
              No reviews available for this vendor.
            </p>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.customer?.name || "Anonymous"}
                rating={review.rating}
                date={review.created_at}
                review={review.review}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorReviewPage;
