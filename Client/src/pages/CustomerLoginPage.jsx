import React from "react";
import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';
const Img3 = process.env.PUBLIC_URL + "/assets/crafts.png";

const CustomerLoginPage = () => {
    return (
      <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
        {/* Header (NavBar) */}
        <NavBar />
  
        {/* Main Content */}
        <div className="flex flex-grow items-center justify-center pt-40 px-8 py-12 bg-white">
          <div className="flex w-full max-w-5xl bg-[#DDE8F0] shadow-lg rounded-lg overflow-hidden">
            {/* Left Side - Image Grid */}
            <div className="w-1/2 p-6 hidden md:block">
              <img 
                src={Img3} 
                alt="Artisan Products" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-6xl font-bold text-[#164863] mb-3 text-center" style={{ fontFamily: 'cursive' }}>
                WELCOME TO
              </h2>
              <h1 className="text-6xl font-bold text-[#164863] text-center" style={{ fontFamily: 'Reggae One' }}>
                SERENDIB GALLERIA
              </h1>
              <p className="text-gray-600 text-center mb-6 text-2xl mt-4"style={{ fontFamily: 'italiana' }}>
                Handcrafted treasures await! Shop the finest creations from Sri Lankan artisans.
              </p>
              
              <form className="w-full p-4">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164863]"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164863]"
                />
                <div className="flex justify-between text-sm mb-4">
                  <a href="/forgot-password" className="text-[#164863] hover:underline">Forgot Password</a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#164863] text-white py-3 rounded-lg hover:bg-[#228b86]"
                >
                  Login
                </button>
              </form>
              <p className="mt-3 text-center">
                New Customer? <a href="/customer-register" className="text-[#228b86] hover:underline">Register Here</a>
              </p>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <Footer />
      </div>
    );
  };
  
export default CustomerLoginPage;
