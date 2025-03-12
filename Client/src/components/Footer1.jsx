import React from 'react';
const Flogo =  process.env.PUBLIC_URL + "/assets/Footerlogo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Logo and Company Info */}
        <div className="mb-6 md:mb-0">
          <img 
            src={Flogo}
            alt="Serendib Galleria" 
            className="w-32 h-24 object-contain" // Fixed width and height
            style={{ width: '200px', height: '200px' }} // Inline style as backup
          />
        </div>

        {/* Support Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-medium mb-4">Support</h3>
          <ul>
            <li className="mb-2">Serendib Galleria</li>
            <li className="mb-2">
              <a href="mailto:supportgaleeria@gmail.com" className="text-gray-300 hover:text-white">
                supportgaleeria@gmail.com
              </a>
            </li>
            <li className="mb-2">
              <a href="tel:+94912250764" className="text-gray-300 hover:text-white">
                +94 912250764
              </a>
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-medium mb-4">Account</h3>
          <ul>
            <li className="mb-2">
              <a href="/my-account" className="text-gray-300 hover:text-white">
                My Account
              </a>
            </li>
            <li className="mb-2">
              <a href="/login" className="text-gray-300 hover:text-white">
                Login / Register
              </a>
            </li>
            <li className="mb-2">
              <a href="/cart" className="text-gray-300 hover:text-white">
                Cart
              </a>
            </li>
            <li className="mb-2">
              <a href="/wishlist" className="text-gray-300 hover:text-white">
                Wishlist
              </a>
            </li>
            <li className="mb-2">
              <a href="/shop" className="text-gray-300 hover:text-white">
                Shop
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="md:max-w-xs">
          <h3 className="text-lg font-medium mb-4">Newsletter</h3>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your Email Here"
              className="bg-white text-gray-800 p-2 mb-2 w-full rounded"
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded w-28">
              Subscribe
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            Subscribe now to get exclusive offers, product updates, and 10% off your
            first purchase!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;