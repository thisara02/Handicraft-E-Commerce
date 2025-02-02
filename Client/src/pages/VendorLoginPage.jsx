import React, { useState } from "react";
import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';
const Img2 =  process.env.PUBLIC_URL + "/assets/img2.jpeg";

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex items-center justify-center flex-grow bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#164863]">Vendor Login</h2>
          
          {/* Image Section */}
          <div className="flex justify-center mb-6">
            <img
              src={Img2} // Replace with the correct image path or URL
              alt="Login Illustration"
              className="w-100 h-50 object-cover rounded-md shadow-md" // Adjust size and styles as needed
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#164863] text-white font-semibold rounded-lg shadow-md hover:bg-[#228b86]"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/vendor-register" className="text-indigo-600 hover:text-indigo-700">Create a Vendor Account</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default VendorLogin;
