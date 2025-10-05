import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#E74C3C"];

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://clevr-e-com-boew.onrender.com/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalProducts = products.length;
  const totalPrice = products.reduce((acc, p) => acc + Number(p.price || 0), 0);

  const genreData = Object.values(
    products.reduce((acc, p) => {
      if (!acc[p.genre]) acc[p.genre] = { name: p.genre, value: 0 };
      acc[p.genre].value += 1;
      return acc;
    }, {})
  );

  const authorPriceData = Object.values(
    products.reduce((acc, p) => {
      if (!acc[p.author]) acc[p.author] = { author: p.author, totalPrice: 0 };
      acc[p.author].totalPrice += Number(p.price || 0);
      return acc;
    }, {})
  );

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Admin Dashboard
      </h2>

      {/* Stats cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow flex-1 text-center">
          <h3 className="text-lg font-bold">Total Products</h3>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow flex-1 text-center">
          <h3 className="text-lg font-bold">Total Price</h3>
          <p className="text-2xl">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
  <h3 className="font-bold mb-2 text-center">Genre Distribution</h3>
  <div className="min-w-[250px] h-64">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={genreData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {genreData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>


        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2 text-center">Total Price by Author</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={authorPriceData}>
              <XAxis dataKey="author" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalPrice" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



