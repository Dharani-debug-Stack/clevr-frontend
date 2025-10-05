import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders from admin route
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://clevr-e-com-boew.onrender.com/api/admin/orders");
      setOrders(res.data.orders || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`https://clevr-e-com-boew.onrender.com/api/admin/orders/update-status/${orderId}`, {
        status: newStatus,
      });
      fetchOrders(); // refresh after update
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  if (loading) return <p className="text-center mt-12">Loading orders...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-8">All Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border rounded p-4 mb-6 shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Order ID: {order._id}</h3>
            <span
              className={`px-2 py-1 rounded ${
                order.paymentStatus === "paid"
                  ? "bg-green-600 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {order.paymentStatus.toUpperCase()}
            </span>
          </div>
          <p><strong>Customer:</strong> {order.name}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Mobile:</strong> {order.mobile}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

          <h4 className="font-semibold mt-4 mb-2">Cart Items:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {order.cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-2 border p-2 rounded">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Total: ₹{item.total}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            {order.paymentStatus !== "paid" && (
              <button
                className="bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => handleStatusChange(order._id, "paid")}
              >
                Mark Paid
              </button>
            )}
            {order.paymentStatus !== "pending" && (
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleStatusChange(order._id, "pending")}
              >
                Mark Pending
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;





