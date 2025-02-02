import React from "react";
import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';
const Img3 =  process.env.PUBLIC_URL + "/assets/img5.png";


const CustomerLoginPage = () => {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Header (NavBar) */}
        <NavBar />
  
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-grow bg-gray-50">

          <form className="w-full max-w-sm p-4 bg-white shadow rounded">
          <h1 className="text-3xl font-bold mb-4 text-center text-[#164863]">Customer Login</h1>
          <div className="flex justify-center mb-6">
            <img
              src={Img3} // Replace with the correct image path or URL
              alt="Login Illustration"
              className="w-100 h-50 object-cover rounded-md shadow-md" // Adjust size and styles as needed
            />
          </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-[#164863] text-white py-2 rounded hover:bg-[#228b86]"
            >
              Login
            </button>
            <p className="mt-2 text-center">
              New customer?{" "}
              <a href="/customer-register" className="text-green-500 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
  
        {/* Footer */}
        <Footer />
      </div>
    );
  };
  
  export default CustomerLoginPage;
