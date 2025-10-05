// src/components/Orders/OrderCard.jsx
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import FeedbackForm from "../feedback/FeedBackForm";

const OrderCard = ({ order }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const totalAmount = order.cartItems
    ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const statusColor =
    order.paymentStatus === "paid"
      ? "bg-green-500"
      : order.paymentStatus === "pending"
      ? "bg-yellow-500"
      : "bg-purple-500";

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Order ID and Date */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">
          Order ID:{" "}
          <span className="text-purple-700">
            {order.razorpayOrderId || order._id}
          </span>
        </div>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          Date: {new Date(order.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="border-b border-gray-200 mb-4"></div>

      {/* Products */}
      {order.cartItems?.length > 0 && (
        <div className="mb-4 space-y-2">
          {order.cartItems.map((item) => (
            <OrderItem key={item.cartId} item={item} />
          ))}
        </div>
      )}

      {/* Order Total & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
        <div className="text-gray-800 font-semibold text-lg">
          Total: <span className="text-purple-700">₹{totalAmount}</span>
        </div>
        <div
          className={`mt-4 md:mt-0 px-4 py-1 rounded-full text-white text-sm font-semibold ${statusColor}`}
        >
          {order.paymentStatus.toUpperCase()}
        </div>
      </div>

      {/* Feedback Button */}
      <div className="mt-4">
        <button
          onClick={() => setShowFeedback(true)}
          className="px-4 py-2 border border-purple-600 text-purple-700 rounded-lg hover:bg-purple-600 hover:text-white transition"
        >
          Give Feedback
        </button>
      </div>

      {/* Feedback Popup */}
      {showFeedback && <FeedbackForm onClose={() => setShowFeedback(false)} />}
    </div>
  );
};

export default OrderCard;

