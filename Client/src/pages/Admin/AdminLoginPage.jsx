import React, { useState } from 'react';

const logo =  process.env.PUBLIC_URL + "/assets/logo.png";

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();


        if (response.status === 422 && data.errors) {
          // Laravel validation errors
          const messages = Object.values(data.errors).flat().join("\n");
          alert(messages);
        } else if (response.status === 401) {
          // Invalid credentials
          alert(data.message || "Invalid email or password. Try again.");
        } else if (response.status === 200) {
          // Success
          localStorage.setItem("admin_username",username);
          //alert("Login successful!");
          window.location.href = "/admin/dashboard";
        } else {
          alert(data.message || "Login failed. Try again.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong. Please try again later.");
      }
   
};


  // Show success message if logged in but timer not yet elapsed
  
  return (
    <div className="flex items-center justify-center w-full h-screen bg-cover bg-center relative flex-co " style={{
      backgroundImage: "url('/assets/c-3.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>
      {/* Login Container with ash color background */}
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md relative">
        {/* Logo */}
        <div className="mb-8 text-center">
          {/* Replace with actual image when uploaded */}
          <img 
            src={logo} 
            alt="S|G SERENDIR GALLERIA" 
            className="mx-auto mb-2"
          />
          {/* Fallback text in case image doesn't load */}
          <p className="text-xs tracking-widest text-black mt-1">SERENDIR GALLERIA</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full">
          
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="USERNAME"
                className="w-full py-2 px-10 border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full py-2 px-10 border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 px-4 text-white uppercase text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;