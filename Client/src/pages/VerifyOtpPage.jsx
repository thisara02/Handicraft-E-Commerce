import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const VerifyOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    console.log("Payload:", { email: location.state.email, otp });
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/fverify-otp", {
        email: location.state.email,
        otp: String(otp),
      });
      Swal.fire("Success", response.data.message, "success");
      navigate("/reset-password", { state: { email: location.state.email } });
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;