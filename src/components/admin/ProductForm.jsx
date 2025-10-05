import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ product = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    genre: "",
    author: "",
    year: "",
    price: "",
    oldprice: "",
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);

  // If editing, populate form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        desc: product.desc || "",
        genre: product.genre || "",
        author: product.author || "",
        year: product.year || "",
        price: product.price || "",
        oldprice: product.Oldprice || "",
        imageUrl: product.image?.url || "",
      });
    }
  }, [product]);

  // Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "product-image");

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqrl7xhco/image/upload",
        uploadData
      );
      setFormData({ ...formData, imageUrl: res.data.secure_url });
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("Please upload an image first");

    try {
      const payload = { ...formData, image: { url: formData.imageUrl }, Oldprice: formData.oldprice };

      if (product?._id) {
        // Update existing product
        await axios.put(`https://clevr-e-com-boew.onrender.com/api/products/${product._id}`, payload);
        alert("Product updated successfully!");
      } else {
        // Create new product
        await axios.post("https://clevr-e-com-boew.onrender.com/api/products", payload);
        alert("Product added successfully!");
      }

      onSuccess && onSuccess();
      setFormData({
        name: "",
        desc: "",
        genre: "",
        author: "",
        year: "",
        price: "",
        oldprice: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {product ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Genre"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Old Price"
            value={formData.oldprice}
            onChange={(e) => setFormData({ ...formData, oldprice: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image upload */}
        <div className="flex flex-col items-start gap-2">
          <input type="file" onChange={handleImageUpload} className="border p-2 rounded w-full" />
          {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="preview" className="w-32 h-32 object-cover rounded" />
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

