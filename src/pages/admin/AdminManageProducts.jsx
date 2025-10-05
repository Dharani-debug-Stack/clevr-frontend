import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../components/admin/ProductForm";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://clevr-e-com-boew.onrender.com/api/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!search) {
      setFilteredProducts(products);
    } else {
      const lower = search.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.author.toLowerCase().includes(lower) ||
          p.genre.toLowerCase().includes(lower)
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`https://clevr-e-com-boew.onrender.com/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    fetchProducts();
  };

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Manage Products
      </h2>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
        <button
          onClick={handleAddNew}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Product
        </button>

        <input
          type="text"
          placeholder="Search by name, author, genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Genre</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Old Price</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.genre}</td>
                <td className="border p-2">{p.author}</td>
                <td className="border p-2">{p.year}</td>
                <td className="border p-2">{p.price}</td>
                <td className="border p-2">{p.Oldprice}</td>
                <td className="border p-2">
                  {p.image?.url && (
                    <img
                      src={p.image.url}
                      alt={p.name}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="border rounded shadow p-4 flex flex-col gap-2 bg-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <div className="space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p><strong>Genre:</strong> {p.genre}</p>
            <p><strong>Author:</strong> {p.author}</p>
            <p><strong>Year:</strong> {p.year}</p>
            <p><strong>Price:</strong> {p.price}</p>
            <p><strong>Old Price:</strong> {p.Oldprice}</p>
            {p.image?.url && (
              <img
                src={p.image.url}
                alt={p.name}
                className="w-full h-48 object-cover mt-2 rounded"
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleCloseForm}
            >
              ✕
            </button>
            <ProductForm
              product={editingProduct}
              onSuccess={handleFormSuccess}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageProducts;
