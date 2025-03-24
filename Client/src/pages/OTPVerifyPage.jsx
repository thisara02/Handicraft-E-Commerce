import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";

const OtpVerifyPage = () => {
  //const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Add OTP verification logic here
    console.log("Verifying OTP:", otp);
  };

  const handleResend = () => {
    // Add OTP resend logic here
    console.log("Resending OTP");
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
