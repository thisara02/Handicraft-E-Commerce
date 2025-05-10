import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const OtpVerifyPage = () => {
  //const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const customerData = JSON.parse(localStorage.getItem("pendingCustomer"));
      const vendorData = JSON.parse(localStorage.getItem("pendingVendor"));

      const isCustomer = customerData && customerData.email;
      const isVendor = vendorData && vendorData.email;

      if (!otp) {
        alert("Please enter the OTP");
        return;
      }

      let endpoint = "";
      let email = "";

      if (isCustomer) {
        endpoint = "http://127.0.0.1:8000/api/verify-otp";
        email = customerData.email;
      } else if (isVendor) {
        endpoint = "http://127.0.0.1:8000/api/vendor/verifyOtp";
        email = vendorData.email;
      } else {
        alert("No registration data found.");
        return;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const text = await res.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error("Not JSON:", text);
        alert("Unexpected server response.");
        return;
      }

      if (res.ok && result.success) {
        alert("Email Verified & Registration Successful!");

        // Remove localStorage for the correct type
        if (isCustomer) {
          localStorage.removeItem("pendingCustomer");
          window.location.href = "/login";
        } else {
          localStorage.removeItem("pendingVendor");
          window.location.href = "/vendor/login";
        }
      } else {
        alert(result.message || "Invalid or expired OTP");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      alert("An unexpected error occurred.");
    }
  };



  // const handleVerify = async () => {
  //   try {
  //     const formData = JSON.parse(localStorage.getItem("pendingCustomer"));
  //     const res = await fetch("http://127.0.0.1:8000/api/verify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: formData.email, otp }),
  //     });

  //     const result = await res.json();
  //     if (result.success) {
  //       alert("Email Verified & Registration Successful!");
  //       localStorage.removeItem("pendingCustomer");
  //       window.location.href = "/login";
  //     } else {
  //       alert("Invalid or expired OTP");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occurred during OTP verification");
  //   }
  // };


  const handleResend = async () => {
    const customerData = JSON.parse(localStorage.getItem("pendingCustomer"));
    const vendorData = JSON.parse(localStorage.getItem("pendingVendor"));

    const isCustomer = customerData && customerData.email;
    const isVendor = vendorData && vendorData.email;

    let endpoint = "";
    let dataToSend = null;

    if (isCustomer) {
      endpoint = "http://127.0.0.1:8000/api/send-otp";
      dataToSend = customerData;
    } else if (isVendor) {
      endpoint = "http://127.0.0.1:8000/api/vendor/send-otp";
      dataToSend = vendorData;
    } else {
      alert("No user data found to resend OTP.");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();
      if (result.success) {
        alert("OTP resent successfully!");
      } else {
        alert("Failed to resend OTP");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while resending OTP");
    }
  };



  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6] pt-16">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 pt-20 mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
          <p className="text-center text-gray-600 mb-6">
            Enter the OTP sent to your registered email or phone number.
          </p>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4 text-center text-lg"
            placeholder="Enter OTP"
          />

          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
          >
            Verify
          </button>

          <button
            onClick={handleResend}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Resend OTP
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OtpVerifyPage;
