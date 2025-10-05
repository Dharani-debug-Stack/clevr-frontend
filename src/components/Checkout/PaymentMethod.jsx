// src/components/Checkout/PaymentMethod.jsx
import React from "react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => (
  <div className="mb-6 text-purple-700">
    <label className="mr-6">
      <input
        type="radio"
        checked={paymentMethod === "cod"}
        onChange={() => setPaymentMethod("cod")}
        className="mr-2"
      />
      Cash on Delivery
    </label>
    <label>
      <input
        type="radio"
        checked={paymentMethod === "razorpay"}
        onChange={() => setPaymentMethod("razorpay")}
        className="mr-2"
      />
      Razorpay
    </label>
  </div>
);

export default PaymentMethod;
