import React from "react";
import { useState } from "react";
import './style.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';
const Img2 =  process.env.PUBLIC_URL + "/assets/img2.jpeg";

const CustomerRegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F7F9FB" }}>
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow pt-40">
        <h1 className="text-4xl font-bold mb-12 font-aptos text-center text-[#000000]">
          Customer Registration
        </h1>

        {/* Form Section */}
        <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg min-h-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Column */}
            <div className="space-y-6">
            <div className="flex flex-col items-left mb-8">
              <h2 className="bebas-neue-regular text-6xl font-bold my-2 text-[#687864] text-center">Welcome to</h2>
              <h2 className="bebas-neue-regular text-6xl font-bold my-2 text-[#000000] text-left">Serendib Galleria</h2>  {/* Heading */}
            </div>
              <div className="mb-8 flex items-center justify-center h-fit">
                <img
                  src={Img2} // Replace with the correct path to your image
                  alt="Vendor Registration Banner"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-6" style={{ minHeight: "600px" }}>

            <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="fullName">Full Name<sup className="text-red-500">*</sup></label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div>
                  <label className="block text-lg font-semibold mb-2" htmlFor="phoneCode">Contact Number<sup className="text-red-500">*</sup></label>
                  <PhoneInput
                    country={"us"} // Default country
                    value={phone}
                    onChange={handlePhoneChange}
                    inputClass="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    containerStyle={{ marginBottom: "1rem" }} // Adjust container styling
                    />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-lg font-semibold mb-2" >
                 Shipping Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  placeholder="Enter Shipping Address"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                  style={{ resize: "none", height: "100px" }} // Set a fixed height
                ></textarea>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="email">Email Address<sup className="text-red-500">*</sup></label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="productImages">Profile Picture</label>
                <input
                  id="productImages"
                  type="file"
                  multiple
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-6">
              {/* Password Field */}
              <div className="relative">
                <label className="block text-lg font-semibold mb-2" htmlFor="password">
                  Password
                  <sup className="text-red-500">*</sup>
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="text-red-500 text-sm mt-2 space-y-1">
                <p>* Must be at least 8 characters long</p>
                <p>* Must include at least one uppercase and one lowercase letter</p>
                <p>* Must contain at least one number or special character (e.g., @, #, $)</p>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <label className="block text-lg font-semibold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                  <sup className="text-red-500">*</sup>
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* Centered Submit and Login Text */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#164863] text-white font-semibold rounded-md hover:bg-[#228b86] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>

          <p className="mt-2 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerRegistrationPage;
