import React, { useState } from "react";
import NavBar from '../components/NavBar2';
import Footer from '../components/Footer1';
import { useNavigate } from "react-router-dom";
const Img2 = process.env.PUBLIC_URL + "/assets/vendors.png";

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize navigate


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/vendor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Get response as text first

      //console.log("Raw response:", text); // Log raw response

      //const data = JSON.parse(text); // Try parsing as JSON

      if (response.ok) {
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("vendor",JSON.stringify(data.vendor));
        //alert("Login Success.");
        //window.location.href = "/HomePage"; 
        navigate("/home"); // Redirect after login
      } else {
        alert("Login failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
    // setEmail()
    // setPassword()// Handle login logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center pt-40 px-8 py-12 bg-white">
        <div className="flex w-full max-w-5xl bg-[#F0EADD] shadow-lg rounded-2xl overflow-hidden">
          {/* Left Side - Image Grid */}
          <div className="w-1/2 p-6 hidden md:block">
            <img
              src={Img2}
              alt="Artisan Products"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-6xl font-bold text-[#634816] mb-3 text-center" style={{ fontFamily: 'cursive' }}>
              WELCOME TO
            </h2>
            <h1 className="text-6xl font-bold text-[#634816] text-center" style={{ fontFamily: 'Reggae One' }}>
              SERENDIB GALLERIA
            </h1>
            <p className="text-[#634816] text-center mb-6 text-2xl mt-4" style={{ fontFamily: 'italiana' }}>
              Take charge of your business. The world is waiting for your products.
            </p>

            <form className="w-full p-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164863]"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164863]"
              />
              <div className="flex justify-between text-sm mb-4">
                <a href="/vendorforgot-password" className="text-[#164863] hover:underline">Forgot Password</a>
              </div>
              <button
                type="submit"
                className="w-full bg-[#634816] text-white py-3 rounded-lg hover:bg-[#978845]"
              >
                Login
              </button>
            </form>
            <p className="mt-3 text-center">
              New Customer? <a href="/vendor/register" className="text-[#458ae4] hover:underline">Register Here</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VendorLogin;
