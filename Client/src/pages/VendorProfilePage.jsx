import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar2";
import Footer from "../components/Footer1";
import { FaEdit, FaTimes, FaCamera, FaTrash } from "react-icons/fa";
import AddProductModal from "../components/AddProductModal"; 
import EditProductModal from "../components/EditProductModal"; 

const VendorProfilePage = () => {
  const [companyLogo, setCompanyLogo] = useState("assets/c-6.jpg");
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("Ceylon Crafts LK");
  const [description, setDescription] = useState(
    "Welcome to Ceylon Crafts! We offer authentic Sri Lankan Handmade crafts and unique cultural items."
  );
  const [phoneNumber, setPhoneNumber] = useState("+94 777 562396");
  const [backup, setBackup] = useState({});
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false); // Make sure this is defined correctly


  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/vendor/review/`);
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove product from the list
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  const handleAddNewItem = () => {
    setIsAddProductModalOpen(true);
  };

  const handleEditItem = () => {
    setIsEditProductModalOpen(true);
  };

  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, image: "/assets/c-1.jpg", price: "Rs. 3,500" },
    { id: 2, image: "/assets/c-2.jpg", price: "Rs. 5,200" },
    { id: 3, image: "/assets/c-3.jpg", price: "Rs. 2,800" },
    { id: 4, image: "/assets/c-4.jpg", price: "Rs. 4,100" },
    { id: 5, image: "/assets/c-5.png", price: "Rs. 1,950" },
    { id: 6, image: "/assets/c-6.jpg", price: "Rs. 3,200" },
  ]);

  const handleSaveChanges = () => {
    setBackup({ companyName, description, phoneNumber });
    setIsEditing(false);
    Swal.fire("Saved!", "Your changes have been saved.", "success");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E6EFF6]">
      <NavBar />

      <div className="flex-grow pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-start gap-4 mb-8 bg-white p-6 rounded-lg shadow">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <FaTimes size={20} /> : <FaEdit size={20} />}
            </button>

            <div className="relative">
              <img
                src={companyLogo}
                alt="Ceylon Crafts Logo"
                className="w-24 h-24 rounded-full object-cover cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setCompanyLogo(ev.target.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div
                className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <FaCamera size={14} />
              </div>
            </div>

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
            {isEditing && (
            <div className="flex justify-center">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4"
              >
                Save Changes
              </button>
            </div>
          )}
          </div>

          {/* Products section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h2 className="text-3xl font-bold">Uploaded Products</h2>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-white rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleCardClick(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      className="w-full h-40 object-cover"
                    />

                    {/* Edit button */}
                    <button
                      className="absolute top-2 right-2 bg-white p-1 rounded shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditItem(product.id);
                      }}
                    >
                      <FaEdit className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    </button>

                    {/* Delete button */}
                    <button
                      className="absolute top-2 left-2 bg-white p-1 rounded shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(product.id);
                      }}
                    >
                      <FaTrash className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer" />
                    </button>

                    <div className="absolute bottom-0 right-0 bg-red-500 text-white text-xs px-2 py-1">
                      {product.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Item Button */}
              <button 
                onClick={handleAddNewItem}
                className="mt-4 w-full bg-white border border-gray-200 rounded-md py-3 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                + Add New Item
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddProductModal 
        isOpen={isAddProductModalOpen} 
        onClose={() => setIsAddProductModalOpen(false)}
      />

      <EditProductModal 
        isOpen={isEditProductModalOpen} 
        onClose={() => setIsEditProductModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default VendorProfilePage;
