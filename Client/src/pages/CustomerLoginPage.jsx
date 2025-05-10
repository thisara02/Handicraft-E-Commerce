import React, { useState } from "react";
// import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';

const Img3 = process.env.PUBLIC_URL + "/assets/crafts.png";

const CustomerLoginPage = () => {


  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://127.0.0.1:8000/api/customer-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.status === 422 && data.errors) {
        // Laravel validation errors
        const messages = Object.values(data.errors).flat().join("\n");
        alert(messages);
      } else if (res.status === 401) {
        // Invalid credentials
        alert(data.message || "Invalid email or password. Try again.");
      } else if (res.ok && data.success) {
        // Success
        localStorage.setItem("customer", JSON.stringify(data.customer));
        //alert("Login successful!");
        window.location.href = "/home";
      } else {
        alert(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };
  


  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
      {/* Header (NavBar) */}
      {/* <NavBar /> */}

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
            <p className="text-gray-600 text-center mb-6 text-2xl mt-4" style={{ fontFamily: 'italiana' }}>
              Handcrafted treasures await! Shop the finest creations from Sri Lankan artisans.
            </p>

            <form className="w-full p-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164863]"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
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
              New Customer? <a href="/register" className="text-[#228b86] hover:underline">Register Here</a>
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
