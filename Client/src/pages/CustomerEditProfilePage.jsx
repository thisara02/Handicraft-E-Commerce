import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState('');
  //const [token, setToken] = useState("");

  // const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState({
    fullName: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    mobileNumber: "",
    shippingAddress: "",
  });
  const storedCustomer = JSON.parse(localStorage.getItem("customer"));

  // Load customer from localStorage
  useEffect(() => {
    //const storedToken = localStorage.getItem("token");
    

    if (storedCustomer) {
      setCustomer(storedCustomer);
      //setToken(storedToken);
      //alert(storedCustomer.id);
      setProfileData({
        fullName: storedCustomer.name || "",
        mobileNumber: storedCustomer.phone || "",
        shippingAddress: storedCustomer.address || "",
      });
    }
  }, []);


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

  const handleEditToggle = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/customers/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id:storedCustomer.id,
          name: profileData.fullName,
          phone: profileData.mobileNumber,
          address: profileData.shippingAddress,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Profile updated successfully!");
        setCustomer(data.customer);
        localStorage.setItem("customer", JSON.stringify(data.customer));
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred.");
    }
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
                src={`http://127.0.0.1:8000/${customer.profile_picture}`}
                alt={customer.name}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-semibold">{customer.name}</h1>
                <p className="text-gray-600">{customer.email}</p>
              </div>
            </div>
            {/* <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEditing ? "Save" : "Edit"}
            </button> */}

            {isEditing ? (
          <>
            <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
            <button onClick={() => setIsEditing(false)} style={{ marginLeft: "10px" }}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Profile</button>
        )}
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
                  <p className="p-2 bg-gray-50 rounded">{customer.name || "Your First Name"}</p>
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
                  <p className="p-2 bg-gray-50 rounded">{customer.phone || "Mobile Number"}</p>
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
              <p className="p-2 bg-gray-50 rounded h-24">{customer.address || "Your shipping address will appear here"}</p>
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