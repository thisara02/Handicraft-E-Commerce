import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="mt-4">
          <a href="/privacy" className="text-gray-400 hover:text-gray-200 mx-2">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-gray-200 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
