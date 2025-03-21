import React, { useState } from "react";
import NavBar from "../components/NavBar2";
import Footer from "../components/Footer1";
import { FaEdit, FaCheck, FaTimes, FaCamera, FaTrash } from "react-icons/fa";
import AddProductModal from "../components/AddProductModal"; 
// Main Component
const VendorProfilePage = () => {
  const [companyLogo, setCompanyLogo] = useState("assets/c-6.jpg");

  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("Ceylon Crafts LK");
  const [description, setDescription] = useState(
    "Welcome to Ceylon Crafts! We offer authentic Sri Lankan Handmade crafts and unique cultural items."
  );
  const [phoneNumber, setPhoneNumber] = useState("+94 777 562396");

  // Backup values to revert on cancel
  const [backup, setBackup] = useState({});

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleEdit = () => {
    if (!isEditing) {
      setBackup({ companyName, description, phoneNumber }); // Save current values
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setCompanyName(backup.companyName);
    setDescription(backup.description);
    setPhoneNumber(backup.phoneNumber);
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCompanyLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  
  // Sample product data
  const products = [
    { id: 1, image: "/assets/c-1.jpg", price: "Rs. 3,500" },
    { id: 2, image: "/assets/c-2.jpg", price: "Rs. 5,200" },
    { id: 3, image: "/assets/c-3.jpg", price: "Rs. 2,800" },
    { id: 4, image: "/assets/c-4.jpg", price: "Rs. 4,100" },
    { id: 5, image: "/assets/c-5.png", price: "Rs. 1,950" },
    { id: 6, image: "/assets/c-6.jpg", price: "Rs. 3,200" },
  ];

  // Function to handle product deletion
  const handleDeleteProduct = (id) => {
    console.log(`Deleting product with id: ${id}`);
  };

  // Function to handle product editing
  const handleEditProduct = (id) => {
    console.log(`Editing product with id: ${id}`);
  };

  const handleAddNewItem = () => {
    setIsAddProductModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
      {/* Header (NavBar) */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-grow pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section with company info */}
          <div className="relative flex items-start gap-4 mb-8 bg-white p-6 rounded-lg shadow">
      {/* Edit Button (Top-Right) */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={handleEdit}
      >
        {isEditing ? <FaTimes size={20} /> : <FaEdit size={20} />}
      </button>

      {/* Company Logo */}
      <div className="relative">
        <img
          src={companyLogo}
          alt="Ceylon Crafts Logo"
          className="w-24 h-24 rounded-full bg-red-900 object-cover cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        />
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {/* Edit Icon on the Logo */}
        <div
          className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FaCamera size={14} />
        </div>
      </div>

      {/* Editable Content */}
      <div className="flex-grow">
        {isEditing ? (
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="text-2xl font-bold border p-1 w-full rounded"
          />
        ) : (
          <h1 className="text-2xl font-bold">{companyName}</h1>
        )}

        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm my-2 border p-1 w-full rounded"
          />
        ) : (
          <p className="text-sm my-2">{description}</p>
        )}

        <div className="flex items-center">
          {isEditing ? (
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-sm border p-1 w-full rounded"
            />
          ) : (
            <p className="text-sm">{phoneNumber}</p>
          )}
        </div>

        {/* Save & Cancel Buttons */}
        {isEditing && (
          <div className="mt-2 flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() => setIsEditing(false)}
            >
              <FaCheck className="mr-2" /> Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded flex items-center"
              onClick={handleCancel}
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Products section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="text-teal-500 text-lg font-bold">My Store</div>
              <h2 className="text-3xl font-bold">Uploaded Products</h2>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {products.map((product, index) => (
                  <div key={product.id} className="relative bg-white rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={`Product ${product.id}`} 
                      className="w-full h-40 object-cover"
                    />
                    
                    {/* Edit button */}
                    <button 
                      className="absolute top-2 right-2 bg-white p-1 rounded shadow"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <FaEdit className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    </button>
                    
                    {/* Delete button */}
                    <button 
                      className="absolute top-2 left-2 bg-white p-1 rounded shadow"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <FaTrash className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer" />
                    </button>
                    
                    <div className="absolute bottom-0 right-0 bg-red-500 text-white text-xs px-2 py-1">
                      {product.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add new item button - navigates to another page */}
              <button 
                onClick={handleAddNewItem}
                className="mt-4 w-full bg-white border border-gray-200 rounded-md py-3 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-2 border-gray-800 rounded-full flex items-center justify-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="text-center text-sm">
                    <div>Click Here</div>
                    <div className="text-xs text-gray-500">to</div>
                    <div>Add New Item</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddProductModal 
        isOpen={isAddProductModalOpen} 
        onClose={() => setIsAddProductModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorProfilePage;