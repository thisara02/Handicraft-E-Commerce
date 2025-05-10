import React, { useState } from "react";
import './style.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NavBar from '../components/NavBar1';
import Footer from '../components/Footer1';
const Img2 = process.env.PUBLIC_URL + "/assets/img2.jpeg";

const CustomerRegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert("Password doesn't meet the required criteria.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!phone) {
      alert("Phone number is required.");
      return;
    }

    const profilePicInput = document.getElementById("productImages");
    const file = profilePicInput.files[0];
    
    if (!file) {
      alert("Please select a profile picture.");
      return;
    }

    if (file.size > 1048576) { // 1MB in bytes
      alert("Profile picture must be less than or equal to 1MB.");
      return;
    }


    const reader = new FileReader();


    reader.onloadend = async () => {
      try {
        const payload = {
          ...formData,
          phone: phone,
          profilePic: reader.result,
        };

        const res = await fetch("http://127.0.0.1:8000/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 422 && errorData.errors) {
            const firstError = Object.values(errorData.errors)[0][0];
            alert(firstError);
          } else {
            alert(errorData.message || "An error occurred.");
          }
          return;
        }

        const data = await res.json();
        if (data.success) {
          localStorage.setItem("pendingCustomer", JSON.stringify(payload));
          window.location.href = "/otp";
        } else {
          alert(data.message || "Failed to send OTP");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
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
        <h1 className="text-4xl font-bold mb-12 font-aptos text-center text-[#000000]">
          Customer Registration
        </h1>
        <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg min-h-[800px]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex flex-col items-left mb-8">
                <h2 className="bebas-neue-regular text-6xl font-bold my-2 text-[#687864] text-center">Welcome to</h2>
                <h2 className="bebas-neue-regular text-6xl font-bold my-2 text-[#000000] text-left">Serendib Galleria</h2>
              </div>
              <div className="mb-8 flex items-center justify-center h-fit">
                <img src={Img2} alt="Vendor Registration Banner" className="rounded-lg shadow-md" />
              </div>
            </div>

            <div className="space-y-6" style={{ minHeight: "600px" }}>
              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="fullName">Full Name<sup className="text-red-500">*</sup></label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Contact Number<sup className="text-red-500">*</sup></label>
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={handlePhoneChange}
                  inputClass="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  containerStyle={{ marginBottom: "1rem" }}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="email">Email<sup className="text-red-500">*</sup></label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="address">Shipping Address<sup className="text-red-500">*</sup></label>
                <textarea
                  id="address"
                  placeholder="Enter Shipping Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                  style={{ resize: "none", height: "100px" }}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Password<sup className="text-red-500">*</sup></label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-3 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Confirm Password<sup className="text-red-500">*</sup></label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full p-3 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Upload Profile Picture<sup className="text-red-500">*</sup></label>
                <input
                  id="productImages"
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerRegistrationPage;
