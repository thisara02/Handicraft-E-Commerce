import React, { useState } from "react";
import './style.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from '../components/NavBar2';
import Footer from '../components/Footer1';

const Img1 = process.env.PUBLIC_URL + "/assets/vendor-reg.jpg";

const VendorRegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    business_name: "",
    mobile_number: "",
    address: "",
    nic: "",
    email: "",
    product_description: "",
    product_types: [],
    password: "",
    confirmPassword: "",
    profile_picture: null,
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      product_types: checked
        ? [...prev.product_types, value]
        : prev.product_types.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert("Password doesn't meet the required criteria.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const profilePicInput = document.getElementById("profile_picture");
    const file = profilePicInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const payload = {
          ...formData,
          profile_picture: reader.result,
        };

        const res = await fetch("http://127.0.0.1:8000/api/vendor/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          const firstError = Object.values(data.errors || {})[0]?.[0];
          alert(firstError || data.message || "An error occurred.");
          return;
        }

        if (data.success) {
          localStorage.setItem("pendingVendor", JSON.stringify(payload));
          window.location.href = "/otp";
        } else {
          alert(data.message || "Failed to send OTP");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      alert("Please select a profile picture.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F7F9FB" }}>
      <NavBar />

      <div className="flex flex-col items-center justify-center flex-grow pt-40">
        <h1 className="text-4xl font-bold mb-12 font-aptos text-center text-[#634816]">
          Vendor Registration
        </h1>

        <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg min-h-[800px]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="mb-8 flex items-center justify-center">
                <img src={Img1} alt="Vendor Banner" className="rounded-lg shadow-md" />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Full Name *</label>
                <input type="text" required className="w-full p-3 border rounded-md" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Business Name *</label>
                <input type="text" required className="w-full p-3 border rounded-md" value={formData.business_name} onChange={(e) => setFormData({ ...formData, business_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Mobile Number *</label>
                <input type="tel" required className="w-full p-3 border rounded-md" value={formData.mobile_number} onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })} />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">NIC *</label>
                <input type="text" required className="w-full p-3 border rounded-md" value={formData.nic} onChange={(e) => setFormData({ ...formData, nic: e.target.value })} />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2">Email *</label>
                <input type="email" required className="w-full p-3 border rounded-md" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Address *</label>
                <textarea rows="4" className="w-full p-3 border rounded-md" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Product Description *</label>
                <textarea rows="3" className="w-full p-3 border rounded-md" required value={formData.product_description} onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Product Types</label>
                <div className="flex flex-wrap gap-4">
                  {["Arts & Crafts", "Household Items", "Jewelry Accessories","Food & Beverages","Gifts & Souvenirs","Fashion & Clothing"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input type="checkbox" value={type} checked={formData.product_types.includes(type)} onChange={handleCheckboxChange} />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Profile Picture *</label>
                <input id="profile_picture" type="file" className="w-full p-3 border rounded-md" required />
              </div>

              {/* Password Fields */}
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-lg font-semibold mb-2">Password *</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    required
                  />
                  <button type="button" className="absolute right-3 top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="relative">
                  <label className="block text-lg font-semibold mb-2">Confirm Password *</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    required
                  />
                  <button type="button" className="absolute right-3 top-3 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="text-red-500 text-sm mt-2 space-y-1">
                  <p>* At least 8 characters</p>
                  <p>* Includes uppercase & lowercase letters</p>
                  <p>* Contains a number or special character</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button type="submit" className="w-full py-3 px-6 bg-[#634816] text-white font-semibold rounded-md hover:bg-[#816340]">
              Submit
            </button>
          </div>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/vendor/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default VendorRegistrationPage;
