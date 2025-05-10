import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar1";
import Footer from "../components/Footer1";
import { FaEdit, FaTimes, FaCamera, FaTrash } from "react-icons/fa";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

const VendorProfilePage = () => {
  const [vendor, setVendor] = useState("");
  const storedVendor = JSON.parse(localStorage.getItem("vendor"));

  const [companyLogo, setCompanyLogo] = useState(
    vendor.profile_picture
      ? `http://127.0.0.1:8000/${vendor.profile_picture}`
      : null
  );
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

  // Load customer from localStorage
  useEffect(() => {
    //const storedToken = localStorage.getItem("token");

    if (storedVendor) {
      setVendor(storedVendor);

      setCompanyName(storedVendor.business_name);
      setDescription(storedVendor.product_description);
      setPhoneNumber(storedVendor.mobile_number);
      setCompanyLogo(`http://127.0.0.1:8000/${storedVendor.profile_picture}`);
    }
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/vendor/review/${productId}`);
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a DELETE request to the Vendor Controller endpoint
          const response = await fetch(`http://127.0.0.1:8000/api/vendor/delete-product/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ vendor_id: storedVendor.id }), // Optional: Pass vendor ID for validation
          });
  
          const data = await response.json();
  
          if (data.success) {
            // Remove the product from the frontend state
            setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  
            // Show success notification
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          } else {
            // Handle backend errors
            Swal.fire("Error", data.message || "Failed to delete the product.", "error");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error", "An error occurred while deleting the product.", "error");
        }
      }
    });
  };

  const handleAddNewItem = () => {
    setIsAddProductModalOpen(true);
  };
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditItem = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setIsEditProductModalOpen(true);
  };

  // Sample product data
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/vendor/products/${storedVendor.id}`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.products); // expects products to be an array
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching vendor products:", err);
      }
    };

    fetchVendorProducts();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("id", vendor.id);
      formData.append("business_name", companyName);
      formData.append("mobile_number", phoneNumber);
      formData.append("product_description", description);

      // If companyLogo is updated and is a file (base64 string check or similar)
      if (companyLogo && companyLogo.startsWith("data:image")) {
        const blob = await fetch(companyLogo).then((res) => res.blob());
        const file = new File([blob], "company_logo.png", { type: blob.type });
        formData.append("profile_picture", file);
      }

      //const vendorData = JSON.parse(localStorage.getItem("vendor"));

      const response = await fetch("http://127.0.0.1:8000/api/vendor/update", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Saved!", "Your changes have been saved.", "success");
        setVendor(data.vendor);
        localStorage.setItem("vendor", JSON.stringify(data.vendor));
        setBackup({ companyName, description, phoneNumber });
        setIsEditing(false);
      } else {
        Swal.fire("Error", "Failed to update profile.", "error");
      }
    } catch (error) {
      console.error("Error updating vendor profile:", error);
      Swal.fire("Error", "An error occurred while updating.", "error");
    }
  };

  const handleSaveEditedProduct = async (updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append("id", updatedProduct.id);
      formData.append("name", updatedProduct.name);
      formData.append("description", updatedProduct.description);
      formData.append("category", updatedProduct.category);
      formData.append("price", updatedProduct.price);

      // Attach images (newly selected File objects OR existing strings)
      updatedProduct.images.forEach((img, index) => {
        if (typeof img === "string") {
          // Existing image path
          formData.append(`existing_images[]`, img);
        } else {
          // New image file
          formData.append(`images[]`, img);
        }
      });

      const response = await fetch(
        "http://127.0.0.1:8000/api/vendor/product/update",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire("Success", "Product updated successfully", "success");

        // Update the product in your frontend state
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === data.product.id ? data.product : p))
        );
      } else {
        Swal.fire("Error", "Failed to update product", "error");
      }
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
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
            <div className="flex justify-between bg-white rounded-2xl p-6 mb-6">
              <h2 className="text-3xl font-bold">Uploaded Products</h2>
              <a
                href="/vendor/orders"
                className="text-black relative group pb-1 fw-bold fs-4"
              >
                My Orders
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
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
                      src={`${
                        JSON.parse(product.images).length > 0
                          ? `http://127.0.0.1:8000/${JSON.parse(
                              product.images
                            )[0].replace(/\\/g, "")}`
                          : "/path/to/default-image.jpg"
                      }`}
                      alt={product.name}
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
        productData={selectedProduct}
        onSave={handleSaveEditedProduct}
      />

      <Footer />
    </div>
  );
};

export default VendorProfilePage;
