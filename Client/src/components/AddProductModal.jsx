import React, { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const AddProductModal = ({ isOpen, onClose }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImages = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...newImages].slice(0, 4)); // Limit to 4 images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendor = JSON.parse(localStorage.getItem("vendor"));

    const base64Images = await Promise.all(
      selectedImages.map(async (imgUrl) => {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        return await convertBlobToBase64(blob);
      })
    );

    const productData = {
      vendor_id: vendor.id,
      name,
      description,
      category,
      price,
      images: base64Images,
    };

    const response = await fetch("http://127.0.0.1:8000/api/products/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (data.success) {
      //alert("Product added successfully!");
      resetForm();
      onClose();
       // Reload the page
    window.location.reload();
    } else {
      alert("Failed to add product");
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  const resetForm = () => {
    setSelectedImages([]);
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Product Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-16 h-16 object-cover border rounded"
                  />
                </div>
              ))}
              {selectedImages.length < 4 && (
                <div
                  onClick={handleAddImageClick}
                  className="w-16 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Name Product"
              className="w-full border rounded p-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Brief description about product"
              className="w-full border rounded p-2 text-sm min-h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Arts & Crafts",
                "Food & Beverages",
                "Household Items",
                "Gifts & Souvenirs",
                "Jewelry Accessories",
                "Fashion & Clothing"
              ].map((cat) => (
                <div key={cat} className="flex items-center">
                  <input
                    type="radio"
                    id={cat.replace(/\s+/g, '')}
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="mr-2"
                  />
                  <label htmlFor={cat.replace(/\s+/g, '')} className="text-sm">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Price</label>
            <div className="relative">
              <input
                type="number"
                placeholder="Add Price"
                className="w-full border rounded p-2 pr-16 text-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 bg-gray-100 rounded-r border-l">
                <span className="text-sm font-medium">LKR</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;