import React from "react";
// import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar2";
import Footer from "../components/Footer1";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aisha Perera",
    rating: 5,
    date: "March 15, 2025",
    review:
      "Absolutely loved the craftsmanship! The wooden mask I bought is stunning and arrived in perfect condition.",
  },
  {
    id: 2,
    name: "Kavindu Senanayake",
    rating: 4,
    date: "March 10, 2025",
    review:
      "Great collection of handicrafts. The delivery was a bit delayed, but the quality was worth the wait!",
  },
  {
    id: 3,
    name: "Shanika Fernando",
    rating: 5,
    date: "March 8, 2025",
    review:
      "Fantastic experience! The brass wall hanging is gorgeous and adds such a cultural touch to my home.",
  },
  {
    id: 4,
    name: "Ramesh Wijesinghe",
    rating: 4,
    date: "March 5, 2025",
    review:
      "The jewelry set I ordered is beautiful. Packaging was also impressive! Highly recommend this platform.",
  },
];

const ReviewCard = ({ name, rating, date, review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
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
      <p className="text-gray-500 text-sm mt-1">{date}</p>
      <p className="text-gray-700 mt-3">{review}</p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6] pt-16">
      <NavBar />
      
      <div className="flex flex-col items-center justify-center flex-grow pt-20 mt-10">
        {/* Customer Reviews Section */}
        <div className="bg-[#dddddd] p-8 rounded-2xl w-full max-w-6xl mb-8">
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="text-[#3f3e3e] text-lg font-bold">What Our Customers Say about Product</div>
            <h2 className="text-3xl font-bold">Customer Reviews</h2>
          </div>
          
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
