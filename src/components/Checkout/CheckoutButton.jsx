// src/components/Checkout/CheckoutButton.jsx
import React from "react";

const CheckoutButton = ({ loading, totalAmount, handlePayment }) => (
  <button
    onClick={handlePayment}
    disabled={loading}
    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded w-full"
  >
    {loading ? "Processing..." : `Pay ₹${totalAmount}`}
  </button>
);

export default CheckoutButton;
