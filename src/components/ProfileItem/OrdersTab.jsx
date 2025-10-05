// src/components/Profile/OrdersTab.jsx
import React from 'react';

const OrdersTab = ({ orders }) => {
  const getTotalAmount = (cartItems) => cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order) => (
        <div key={order._id} className="mb-6 border-b pb-4">
          <h3 className="font-bold text-purple-700 mb-2">Order ID: {order._id}</h3>
          <p className="mb-2">Payment Status: {order.paymentStatus}</p>
          <p className="mb-2">Payment Method: {order.paymentMethod}</p>
          <p className="mb-2">Total Amount: ₹{getTotalAmount(order.cartItems)}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {order.cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersTab;
