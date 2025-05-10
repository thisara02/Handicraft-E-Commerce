import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const EditProductModal = ({ isOpen, onClose, productData, onSave }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (productData) {

      setName(productData.name);
      setDescription(productData.description);
      setCategory(productData.category);
      setPrice(productData.price);
      setSelectedImages(productData.images || []);
      //alert(productData.images);
    }

    try {
      const parsedImages = productData?.images ? JSON.parse(productData.images) : [];
      setSelectedImages(parsedImages || []);
    } catch (error) {
      console.error("Error parsing images:", error);
      setSelectedImages([]);
    }
  }, [productData, isOpen]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setSelectedImages(prev => [...prev, ...files].slice(0, 4)); // Store File objects
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass updated product data to parent component
    onSave({
      id: productData.id,  // Assuming productData includes an id
      name,
      description,
      category,
      price,
      images: selectedImages
    });

    // Reset form and close modal
    resetForm();
    onClose();
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
          <h2 className="text-xl font-bold">Edit Product Information</h2>
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
              {(selectedImages || []).map((img, index) => {
                const imageSrc = typeof img === "string"
                  ? `http://localhost:8000/${img.replace(/\\/g, "")}`
                  : URL.createObjectURL(img);

                return (
                  <div key={index} className="relative w-24 h-24 mr-2">
                    <img
                      src={imageSrc}
                      alt={`Selected ${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                );
              })}

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
