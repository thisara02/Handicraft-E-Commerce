import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate credentials (admin/admin)
    if (username === 'admin' && password === 'admin') {
      console.log('Login successful!');
      setIsLoggedIn(true);
      
      // Set timer to navigate to dashboard route
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } else {
      setError('Invalid username or password');
      console.log('Login failed: Invalid credentials');
    }
  };


  // Show success message if logged in but timer not yet elapsed
  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-blue-600">
        <div className="bg-white p-8 rounded text-center">
          <div className="flex justify-center mb-4 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Welcome, Admin!</h2>
          <p className="text-gray-600">You have logged in successfully.</p>
          <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-blue-600">
      {/* Login Container with ash color background */}
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          {/* Replace with actual image when uploaded */}
          <img 
            src="/api/placeholder/150/80" 
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