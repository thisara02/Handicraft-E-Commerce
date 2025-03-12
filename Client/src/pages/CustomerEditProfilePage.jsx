import React, { useState} from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    mobileNumber: "",
    gender: "",
    country: "",
    shippingAddress: "",
  });

  // Sample order history data
  const orderHistory = [
    {
      id: "3354654654526",
      date: "Feb 16, 2024",
      status: "Delivered",
    },
    {
      id: "3354654654526",
      date: "May 1, 2024",
      status: "In Transit",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save logic would go here in a real application
      console.log("Saving profile data:", profileData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex flex-col">
        <NavBar />
      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto pt-40 px-4 py-8 w-full">
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/80x80" 
                alt="Alexa Rawles"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-semibold">{profileData.fullName}</h1>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
            </div>
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{profileData.fullName || "Your First Name"}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <div className="relative">
                    <p className="p-2 bg-gray-50 rounded">{profileData.gender || "Your Gender"}</p>
                    <svg className="absolute right-3 top-3 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Mobile Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={profileData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{profileData.mobileNumber || "Mobile Number"}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Country</label>
                {isEditing ? (
                  <select
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    {/* Add more countries as needed */}
                  </select>
                ) : (
                  <div className="relative">
                    <p className="p-2 bg-gray-50 rounded">{profileData.country || "Your Country"}</p>
                    <svg className="absolute right-3 top-3 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Shipping Address</label>
            {isEditing ? (
              <textarea
                name="shippingAddress"
                value={profileData.shippingAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              ></textarea>
            ) : (
              <p className="p-2 bg-gray-50 rounded h-24">{profileData.shippingAddress || "Your shipping address will appear here"}</p>
            )}
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Order History</h2>
          
          <div className="space-y-4">
            {orderHistory.map((order, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-600">Order date: {order.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      Status: <span className={`font-medium ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}>{order.status}</span>
                    </p>
                    <button className="flex items-center text-gray-500 border px-3 py-1 rounded hover:bg-gray-50">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;